import {requireAutomateXUser,jsonError} from '@/lib/automatex/server';
export async function POST(req){
 const ctx=await requireAutomateXUser();if(ctx.error)return jsonError(ctx.error,ctx.status);
 let b;try{b=await req.json()}catch{return jsonError('Invalid request.')}
 const attemptId=String(b?.attemptId||''),questionId=String(b?.questionId||''),index=Number(b?.optionIndex);
 if(!/^[0-9a-f-]{36}$/i.test(attemptId)||!/^M[1-8]-(?:Q\d+|S\d+)$/.test(questionId)||!Number.isInteger(index)||index<0||index>3)return jsonError('Invalid answer.');
 const {admin,user}=ctx;const {data:a}=await admin.from('ax_test_attempts').select('id,status,course_cycle').eq('id',attemptId).eq('user_id',user.id).maybeSingle();
 if(!a||a.status!=='in_progress')return jsonError('This test is no longer active.',409);
 const {data:e}=await admin.from('ax_enrollments').select('course_cycle').eq('user_id',user.id).maybeSingle();if(a.course_cycle!==(e?.course_cycle||1))return jsonError('This test belongs to an earlier course run.',409);
 const {data:ok,error}=await admin.rpc('ax_save_test_answer',{p_attempt_id:attemptId,p_user_id:user.id,p_question_id:questionId,p_option_index:index});if(error)return jsonError('Your answer could not be saved. This test may have been submitted already.',409);
 await admin.from('ax_enrollments').update({last_activity_at:new Date().toISOString()}).eq('user_id',user.id);return Response.json({ok:Boolean(ok)},{headers:{'Cache-Control':'no-store'}});
}
