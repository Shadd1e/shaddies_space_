import { requireAutomateXUser, jsonError } from '@/lib/automatex/server';
export async function POST(req){
 const ctx=await requireAutomateXUser();if(ctx.error)return jsonError(ctx.error,ctx.status);
 let body;try{body=await req.json()}catch{return jsonError('Invalid request.')}
 const attemptId=String(body?.attemptId||'');if(!/^[0-9a-f-]{36}$/i.test(attemptId))return jsonError('Invalid test attempt.');
 const {admin,user}=ctx;
 const {data:attempt}=await admin.from('ax_test_attempts').select('id,status,course_cycle').eq('id',attemptId).eq('user_id',user.id).maybeSingle();
 if(!attempt)return jsonError('This test was not found.',404);
 const {data:enrol}=await admin.from('ax_enrollments').select('course_cycle').eq('user_id',user.id).maybeSingle();
 if(attempt.course_cycle!==(enrol?.course_cycle||1))return jsonError('This test belongs to an earlier course run.',409);
 const {data:result,error}=await admin.rpc('ax_finalize_test',{p_attempt_id:attemptId,p_user_id:user.id});
 if(error)return jsonError(error.message?.includes('Answer all')?'Answer all eight questions before submitting.':'Your result could not be finalized. Your saved answers remain available; try again.',409);
 const {data:module}=await admin.from('ax_modules').select('pass_message,fail_message').eq('id',attempt.module_id).maybeSingle();
 const {data:rows}=await admin.from('ax_test_attempt_questions').select('question_id,selected_option,is_correct,position').eq('attempt_id',attemptId).order('position');
 const {data:keys}=await admin.from('ax_questions').select('id,explanation,topic,prompt,options,correct_option').in('id',(rows||[]).map(r=>r.question_id));
 const keyMap=new Map((keys||[]).map(q=>[q.id,q]));
 const review=(rows||[]).filter(r=>keyMap.has(r.question_id)).map(r=>{const q=keyMap.get(r.question_id);return {prompt:q.prompt,topic:q.topic,correct:Boolean(r.is_correct),selectedAnswer:q.options[r.selected_option],correctAnswer:q.options[q.correct_option],explanation:q.explanation};});
 await admin.from('ax_enrollments').update({last_activity_at:new Date().toISOString()}).eq('user_id',user.id);
 return Response.json({...result,percent:Math.round((result.score/result.total)*100),message:result.passed?(module?.pass_message||'You passed this module test.'): (module?.fail_message||'Review what you missed and try again.'),review},{headers:{'Cache-Control':'no-store'}});
}
