'use client';
import {useState} from 'react';
export default function LessonActions({lesson}){
 const [choice,setChoice]=useState('');const [feedback,setFeedback]=useState('');const [busy,setBusy]=useState(false);
 async function complete(){if(!choice)return;setBusy(true);setFeedback('');try{const r=await fetch('/api/automatex/progress',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({lessonId:lesson.id,answer:choice})});const d=await r.json();if(!r.ok)throw new Error(d.error||'Could not save progress.');setFeedback(`${d.correct?'Correct.':'Saved. Not quite.'} ${d.explanation}`); }catch(e){setFeedback(e.message)}finally{setBusy(false)}}
 return <section className="mt-8 rounded-2xl border p-5 space-y-4" style={{borderColor:'var(--border)',background:'var(--surface)'}}>
  <h2 className="text-lg font-semibold">Quick check</h2><p>{lesson.check_prompt}</p>
  <div className="grid gap-2">{Object.entries(lesson.check_options||{}).map(([key,value])=><label key={key} className="flex gap-3 items-start rounded-xl border p-3 cursor-pointer" style={{borderColor:choice===key?'var(--neon)':'var(--border)'}}><input type="radio" name="lesson-check" value={key} checked={choice===key} onChange={()=>setChoice(key)} /><span><b>{key}.</b> {value}</span></label>)}</div>
  <button className="btn btn-primary" disabled={!choice||busy} onClick={complete}>{busy?'Saving…':'Check and save progress'}</button>{feedback&&<p role="status" className="text-sm" style={{color:'var(--muted)'}}>{feedback}</p>}
 </section>
}
