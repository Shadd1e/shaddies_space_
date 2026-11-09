import { requireAutomateXUser, jsonError, shuffle, voidStaleExam } from '@/lib/automatex/server';
import { randomUUID } from 'node:crypto';
async function presentExam(admin,attempt){
 const {data:rows}=await admin.from('ax_exam_attempt_questions').select('question_id,position,option_order,selected_option').eq('attempt_id',attempt.id).order('position');
 const {data:qs}=await admin.from('ax_questions').select('id,prompt,options').in('id',(rows||[]).map(r=>r.question_id));const qmap=new Map((qs||[]).map(q=>[q.id,q]));
 const questions=(rows||[]).filter(r=>qmap.has(r.question_id)).map(r=>({id:r.question_id,prompt:qmap.get(r.question_id).prompt,options:r.option_order.map(k=>qmap.get(r.question_id).options[k]),selectedIndex:r.selected_option?r.option_order.indexOf(r.selected_option):null}));
 return questions.length===30?{attemptId:attempt.id,expiresAt:attempt.expires_at,questions}:null;
}
export async function POST(){
 const ctx=await requireAutomateXUser();if(ctx.error)return jsonError(ctx.error,ctx.status);const {admin,user}=ctx;
 const stale=await voidStaleExam(admin,user.id);if(stale?.status==='in_progress'){const resumed={...stale,last_seen_at:new Date().toISOString()};await admin.from('ax_exam_attempts').update({last_seen_at:resumed.last_seen_at}).eq('id',stale.id);const payload=await presentExam(admin,resumed);return payload?Response.json(payload,{headers:{'Cache-Control':'no-store'}}):jsonError('Your exam is still being prepared. Refresh in a moment.',409);}
 const {data:profile}=await admin.from('ax_enrollments').select('profile_complete,course_cycle,age_confirmed').eq('user_id',user.id).maybeSingle();if(!profile?.age_confirmed)return jsonError('Age confirmation is required.',403);if(!profile?.profile_complete)return jsonError('Complete your profile before the final exam.',403);
 const {data:mods}=await admin.from('ax_modules').select('id');const {data:passed}=await admin.from('ax_test_attempts').select('module_id').eq('user_id',user.id).eq('status','submitted').eq('passed',true).eq('course_cycle',profile?.course_cycle||1);
 if(!mods||!passed||mods.some(m=>!passed.some(p=>p.module_id===m.id)))return jsonError('Pass all eight module tests before the final exam.',403);
 const {data:previous}=await admin.from('ax_exam_attempts').select('id,status').eq('user_id',user.id).eq('status','submitted').eq('course_cycle',profile?.course_cycle||1).limit(1);if(previous?.length)return jsonError('Your completed final exam attempt is already recorded. Use your dashboard to review your next steps.',409);
 const since=new Date(Date.now()-3600000).toISOString();const {count:recentCount}=await admin.from('ax_exam_attempts').select('id',{count:'exact',head:true}).eq('user_id',user.id).gte('started_at',since);if((recentCount||0)>=5)return jsonError('Too many exam starts in a short period. Contact support if you need help.',429);
 const {data:pool,error}=await admin.from('ax_questions').select('id,source_module').eq('kind','exam');if(error||!pool||pool.length!==60)return jsonError('The final exam is not ready. Contact support.',503);
 const {data:priorAttempts}=await admin.from('ax_exam_attempts').select('id').eq('user_id',user.id).eq('course_cycle',profile?.course_cycle||1).eq('status','voided');
 const priorIds=(priorAttempts||[]).map(x=>x.id);const seenIds=new Set();
 if(priorIds.length){const {data:priorRows}=await admin.from('ax_exam_attempt_questions').select('question_id').in('attempt_id',priorIds);for(const row of priorRows||[])seenIds.add(row.question_id);}
 // Guarantee representation from all eight modules. Prefer questions not seen in a voided attempt;
 // only reuse previously seen questions where the remaining unseen pool cannot fill the 30 slots.
 const selected=[];const used=new Set();
 for(let module=1;module<=8;module++){
  const group=pool.filter(q=>q.source_module===module);const fresh=shuffle(group.filter(q=>!seenIds.has(q.id)));const old=shuffle(group.filter(q=>seenIds.has(q.id)));const picks=[...fresh,...old].slice(0,3);
  if(picks.length!==3)return jsonError('The exam bank is missing questions for one or more modules. Contact support.',503);
  for(const q of picks){selected.push(q);used.add(q.id);}
 }
 const remainingFresh=shuffle(pool.filter(q=>!used.has(q.id)&&!seenIds.has(q.id)));
 const remainingOld=shuffle(pool.filter(q=>!used.has(q.id)&&seenIds.has(q.id)));
 const extras=[...remainingFresh,...remainingOld].slice(0,6);if(extras.length!==6)return jsonError('We could not prepare a complete exam. Contact support.',503);
 selected.push(...extras);const finalSelection=shuffle(selected);
 const started=new Date();const expires=new Date(started.getTime()+45*60*1000);const attemptId=randomUUID();
 const {error:ae}=await admin.from('ax_exam_attempts').insert({id:attemptId,user_id:user.id,started_at:started.toISOString(),last_seen_at:started.toISOString(),expires_at:expires.toISOString(),course_cycle:profile?.course_cycle||1,total:30});if(ae){const {data:race}=await admin.from('ax_exam_attempts').select('*').eq('user_id',user.id).eq('status','in_progress').maybeSingle();if(race){const resumed={...race,last_seen_at:new Date().toISOString()};await admin.from('ax_exam_attempts').update({last_seen_at:resumed.last_seen_at}).eq('id',race.id);const payload=await presentExam(admin,resumed);return payload?Response.json(payload,{headers:{'Cache-Control':'no-store'}}):jsonError('Your exam is still being prepared. Refresh in a moment.',409);}return jsonError('Could not start the final exam.',500);}
 const rows=finalSelection.map((q,i)=>({attempt_id:attemptId,question_id:q.id,position:i+1,option_order:shuffle(['A','B','C','D'])}));const {error:qe}=await admin.from('ax_exam_attempt_questions').insert(rows);if(qe){await admin.from('ax_exam_attempts').update({status:'voided',void_reason:'setup_failed'}).eq('id',attemptId);return jsonError('Could not prepare the final exam.',500)}
 const {data:created}=await admin.from('ax_exam_attempts').select('*').eq('id',attemptId).single();const payload=await presentExam(admin,created);return payload?Response.json(payload,{headers:{'Cache-Control':'no-store'}}):jsonError('The exam could not be prepared. Contact support.',500);
}
