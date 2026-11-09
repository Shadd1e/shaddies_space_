import { requireAutomateXUser, jsonError, voidExamAndNotify } from '@/lib/automatex/server';
export async function POST(req){
 const ctx=await requireAutomateXUser();if(ctx.error)return jsonError(ctx.error,ctx.status);
 let b;try{b=await req.json()}catch{return jsonError('Invalid request.')}
 const {admin,user}=ctx;const id=String(b?.attemptId||''),qid=String(b?.questionId||''),idx=Number(b?.optionIndex);
 if(!/^[0-9a-f-]{36}$/i.test(id)||!/^X-\d+$/.test(qid)||!Number.isInteger(idx)||idx<0||idx>3)return jsonError('Invalid answer.');
 const {data:enrol}=await admin.from('ax_enrollments').select('course_cycle').eq('user_id',user.id).maybeSingle();
 const {data:a}=await admin.from('ax_exam_attempts').select('*').eq('id',id).eq('user_id',user.id).maybeSingle();
 if(!a||a.status!=='in_progress')return jsonError('Exam is not active.',409);
 if(a.course_cycle!==(enrol?.course_cycle||1))return jsonError('This exam belongs to an earlier course run.',409);
 const {data:ok,error}=await admin.rpc('ax_save_exam_answer',{p_attempt_id:id,p_user_id:user.id,p_question_id:qid,p_option_index:idx});
 if(error){const reason=error.message?.includes('Reconnect grace')?'reconnect_grace_expired':error.message?.includes('time expired')?'time_expired':null;if(reason)await voidExamAndNotify(admin,a,reason);return jsonError(reason==='reconnect_grace_expired'?'The three-minute reconnect window passed. Your attempt was cancelled; your module results are safe.':reason==='time_expired'?'The 45-minute exam time has ended.':'Your answer could not be saved. Check your connection and try again.',409);}
 await admin.from('ax_enrollments').update({last_activity_at:new Date().toISOString()}).eq('user_id',user.id);
 return Response.json({ok:Boolean(ok)},{headers:{'Cache-Control':'no-store'}});
}
