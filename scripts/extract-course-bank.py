#!/usr/bin/env python3
"""Extract the Automate-X DOCX bank into validated JSON for the trusted loader."""
import argparse, json, re, sys
from docx import Document

LABELS = ('Card ID:', 'Reading time:', 'Lesson text:', 'Story title:', 'Story:', 'Story lesson:', 'In simple terms:', 'Go deeper:', 'Check question:', 'A:', 'B:', 'C:', 'D:', 'Correct:', 'Why:')
def clean(cell): return cell.text.strip()
def table_rows(table): return [[clean(c) for c in r.cells] for r in table.rows]
def parse_bank(path):
    doc=Document(path); paras=[p.text.strip() for p in doc.paragraphs]
    modules=[]; lessons=[]; questions=[]; placement=[]; exam=[]
    # Module metadata tables are the small two-column tables headed by Module ID.
    for ti,t in enumerate(doc.tables):
        rows=table_rows(t)
        if not rows or rows[0][0] != 'Module ID': continue
        meta={r[0]:r[1] for r in rows if len(r)>1}
        mid=meta.get('Module ID','').strip()
        if not re.fullmatch(r'M[1-8]',mid): continue
        modules.append({'id':mid,'position':int(mid[1:]),'title':meta.get('Title','').strip(),
          'summary':meta.get('After this module the learner can','').strip(),
          'pass_message':meta.get('Pass message (60% or more)','').strip(),
          'fail_message':meta.get('Not-yet message (under 60%)','').strip(),
          'est_hours':float(meta.get('Estimated hours','0') or 0),'outcomes':meta.get('After this module the learner can','').strip()})
    # Find each lesson heading and parse labelled paragraphs until the next lesson heading.
    starts=[]
    for i,p in enumerate(paras):
        m=re.match(r'^(M[1-8]-L[1-5]):',p)
        if m: starts.append((i,m.group(1),p))
    for n,(start,lid,heading) in enumerate(starts):
        end=starts[n+1][0] if n+1<len(starts) else len(paras)
        block=paras[start:end]
        module_id=lid.split('-')[0]; pos=int(lid.split('L')[1])
        title=heading.split(':',2)[-1].strip() or heading
        def after(label):
            for j,s in enumerate(block):
                if s.startswith(label): return s[len(label):].strip(),j
            return '',-1
        reading,_=after('Reading time:')
        # Lesson text may span multiple paragraphs until the next labelled section.
        def section(label, stops):
            value,idx=after(label)
            if idx<0:return ''
            chunks=[value] if value else []
            for s in block[idx+1:]:
                if any(s.startswith(x) for x in stops): break
                if s: chunks.append(s)
            return '\n\n'.join(chunks).strip()
        body=section('Lesson text:',('Story title:','Story:','Story lesson:','In simple terms:','Go deeper:','Check question:'))
        simple=section('In simple terms:',('Go deeper:','Check question:'))
        deeper=section('Go deeper:',('Paid course note:','Check question:'))
        paid_note,_=after('Paid course note:')
        st,_=after('Story title:'); story=section('Story:',('Story lesson:','In simple terms:','Go deeper:','Check question:')); sl,_=after('Story lesson:')
        check,_=after('Check question:'); opts={}
        for letter in 'ABCD': opts[letter]=after(letter+':')[0]
        answer,_=after('Correct:'); explanation,_=after('Why:')
        body_parts=[x for x in [body,('**In simple terms:** '+simple) if simple else '',('**Go deeper:** '+deeper) if deeper else ''] if x]
        lessons.append({'id':lid,'module_id':module_id,'position':pos,'title':title,
          'reading_minutes':int(re.search(r'\d+',reading).group()) if re.search(r'\d+',reading) else 5,
          'body_md':'\n\n'.join(body_parts),'story_title':st or None,'story_md':story or None,'story_lesson':sl or None,'paid_course_note':paid_note or None,
          'check_prompt':check or None,'check_options':opts if all(opts.values()) else None,
          'check_answer':answer.strip().upper() or None,'check_explanation':explanation or None})
    # Structured question tables.
    for t in doc.tables:
        rows=table_rows(t)
        if not rows: continue
        h=rows[0]
        if h[:6]==['ID','Topic','Diff','Min level','Type','Question']:
            for r in rows[1:]:
                if len(r)<12: continue
                questions.append({'id':r[0],'module_id':re.match(r'(M[1-8])',r[0]).group(1),'topic':r[1],
                  'difficulty':int(r[2]),'min_level':int(r[3]),'kind':r[4].lower(),'prompt':r[5],
                  'options':dict(zip('ABCD',r[6:10])),'correct_option':r[10].upper(),'explanation':r[11]})
        elif h[:5]==['ID','Module','Topic','Diff','Question']:
            for r in rows[1:]:
                if len(r)<11: continue
                exam.append({'id':r[0],'module_id':None,'topic':r[2],'difficulty':int(r[3]),'min_level':0,'kind':'exam','prompt':r[4],
                  'options':dict(zip('ABCD',r[5:9])),'correct_option':r[9].upper(),'explanation':r[10],'source_module':int(r[1])})
        elif h[:2]==['ID','Question'] and 'Points A/B/C/D' in h:
            for r in rows[1:]:
                if len(r)<7: continue
                pts=[int(x) for x in r[6].split('/')]
                placement.append({'id':r[0],'kind':'placement','prompt':r[1],'options':dict(zip('ABCD',r[2:6])),'points':dict(zip('ABCD',pts))})
    errors=[]
    if len(modules)!=8: errors.append(f'Expected 8 module headers; found {len(modules)}')
    if len(lessons)!=40: errors.append(f'Expected 40 lesson cards; found {len(lessons)}')
    if len(questions)!=184: errors.append(f'Expected 184 module questions (160 test + 24 scenario); found {len(questions)}')
    if len(exam)!=60: errors.append(f'Expected 60 exam questions; found {len(exam)}')
    if len(placement)!=10: errors.append(f'Expected 10 placement questions; found {len(placement)}')
    ids=[x['id'] for group in [modules,lessons,questions,exam,placement] for x in group]
    if len(ids)!=len(set(ids)): errors.append('Duplicate IDs found across extracted records')
    if any(not re.fullmatch(r'M[1-8]',x['id']) for x in modules): errors.append('Invalid module ID')
    if any(not re.fullmatch(r'M[1-8]-L[1-5]',x['id']) for x in lessons): errors.append('Invalid lesson ID')
    if any(not re.fullmatch(r'M[1-8]-(?:Q\d+|S\d+)',x['id']) for x in questions): errors.append('Invalid module question ID')
    if any(not re.fullmatch(r'X-\d+',x['id']) for x in exam): errors.append('Invalid exam question ID')
    if any(not re.fullmatch(r'P-\d+',x['id']) for x in placement): errors.append('Invalid placement question ID')
    for q in questions+exam:
        if set(q['options'])!=set('ABCD') or q['correct_option'] not in 'ABCD' or not all(q['options'].values()): errors.append(f"Invalid options/answer in {q['id']}")
        if q['difficulty'] not in (1,2,3) or q['min_level'] not in (0,1,2,3): errors.append(f"Invalid difficulty/level in {q['id']}")
    for m in modules:
        ls=[x for x in lessons if x['module_id']==m['id']]
        qs=[x for x in questions if x['module_id']==m['id']]
        if len(ls)!=5: errors.append(f"{m['id']} must have 5 lessons; found {len(ls)}")
        if sum(x['kind']=='test' for x in qs)!=20 or sum(x['kind']=='scenario' for x in qs)!=3: errors.append(f"{m['id']} must have 20 test and 3 scenario questions")
    # Stories are either complete or absent; never silently load half a story.
    for lesson in lessons:
        if not lesson['body_md'] or not lesson['check_prompt'] or not lesson['check_options'] or lesson['check_answer'] not in ('A','B','C','D'): errors.append(f"{lesson['id']} is missing lesson text or a valid quick check")
        story_fields=[lesson['story_title'],lesson['story_md'],lesson['story_lesson']]
        if any(story_fields) and not all(story_fields): errors.append(f"{lesson['id']} has an incomplete story insert")
    module_texts={re.sub(r'\s+',' ',q['prompt'].strip().lower()) for q in questions}
    for q in exam:
        if re.sub(r'\s+',' ',q['prompt'].strip().lower()) in module_texts: errors.append(f"Exam question {q['id']} duplicates a module question")
    for q in placement:
        if set(q['points'])!=set('ABCD') or any(v<0 or v>3 for v in q['points'].values()): errors.append(f"Invalid placement points in {q['id']}")
    if errors: raise ValueError('\n'.join(errors))
    return {'version':'1.0','modules':modules,'lessons':lessons,'questions':questions,'exam_questions':exam,'placement_questions':placement}

if __name__=='__main__':
    ap=argparse.ArgumentParser(); ap.add_argument('docx'); ap.add_argument('-o','--output',default='scripts/automatex-course-bank.json'); a=ap.parse_args()
    try:
        data=parse_bank(a.docx)
        with open(a.output,'w',encoding='utf-8') as f: json.dump(data,f,ensure_ascii=False,indent=2)
        print(f"Validated and extracted {len(data['modules'])} modules, {len(data['lessons'])} lessons, {len(data['questions'])} module questions, {len(data['exam_questions'])} exam questions and {len(data['placement_questions'])} placement questions -> {a.output}")
    except Exception as e:
        print(f'Course bank validation failed. Nothing was written: {e}',file=sys.stderr); sys.exit(1)
