import { requireAutomateXUser, jsonError, voidExamAndNotify } from '@/lib/automatex/server';
export async function POST(req){
 const ctx=await requireAutomateXUser();if(ctx.error)return jsonError(ctx.error,ctx.status);
 let b;try{b=await req.json()}catch{return jsonError('Invalid request.')}
 const id=String(b?.attemptId||'');if(!/^[0-9a-f-]{36}$/i.test(id))return jsonError('Invalid exam attempt.');
 const {admin,user}=ctx;const {data:a}=await admin.from('ax_exam_attempts').select('*').eq('id',id).eq('user_id',user.id).maybeSingle();
 if(!a||a.status!=='in_progress')return jsonError('Exam is no longer active.',409);
 const {data:enrol}=await admin.from('ax_enrollments').select('course_cycle').eq('user_id',user.id).maybeSingle();if(a.course_cycle!==(enrol?.course_cycle||1))return jsonError('This exam belongs to an earlier course run.',409);
 const now=Date.now();if(now-Date.parse(a.last_seen_at)>180000){await voidExamAndNotify(admin,a,'reconnect_grace_expired');return jsonError('The reconnect window passed. Your attempt was cancelled.',409)}
 if(now>Date.parse(a.expires_at)){await voidExamAndNotify(admin,a,'time_expired');return jsonError('The 45-minute exam time has ended.',409)}
 const {data:stillActive,error:updateError}=await admin.from('ax_exam_attempts').update({last_seen_at:new Date().toISOString()}).eq('id',id).eq('status','in_progress').select('id').maybeSingle();if(updateError||!stillActive)return jsonError('Exam is no longer active.',409);
 await admin.from('ax_enrollments').update({last_activity_at:new Date().toISOString()}).eq('user_id',user.id);
 return Response.json({ok:true,expiresAt:a.expires_at,remainingSeconds:Math.max(0,Math.floor((Date.parse(a.expires_at)-now)/1000))},{headers:{'Cache-Control':'no-store'}});
}
