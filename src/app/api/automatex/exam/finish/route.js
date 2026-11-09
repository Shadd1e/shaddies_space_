import { requireAutomateXUser, jsonError, voidExamAndNotify } from '@/lib/automatex/server';
import {sendBrevoEmail,emailShell} from '@/lib/email/brevo';
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export async function POST(req){
 const ctx=await requireAutomateXUser();if(ctx.error)return jsonError(ctx.error,ctx.status);
 let b;try{b=await req.json()}catch{return jsonError('Invalid request.')}
 const id=String(b?.attemptId||'');if(!/^[0-9a-f-]{36}$/i.test(id))return jsonError('Invalid exam attempt.');
 const {admin,user}=ctx;const {data:a}=await admin.from('ax_exam_attempts').select('*').eq('id',id).eq('user_id',user.id).maybeSingle();
 if(!a)return jsonError('Exam attempt not found.',404);
 const {data:enrol}=await admin.from('ax_enrollments').select('course_cycle').eq('user_id',user.id).maybeSingle();if(a.course_cycle!==(enrol?.course_cycle||1))return jsonError('This exam belongs to an earlier course run.',409);
 if(a.status==='voided')return jsonError('This exam attempt was cancelled. Start a fresh attempt.',409);
 if(a.status==='in_progress'){
  const now=Date.now();if(now-Date.parse(a.last_seen_at)>180000){await voidExamAndNotify(admin,a,'reconnect_grace_expired');return jsonError('Reconnect grace period expired.',409)}
  if(now>Date.parse(a.expires_at)){await voidExamAndNotify(admin,a,'time_expired');return jsonError('Exam time has expired.',409)}
 }
 const {data,error}=await admin.rpc('ax_finalize_exam',{p_attempt_id:id,p_user_id:user.id});
 if(error)return jsonError('The exam could not be finalized. Your saved answers remain available; contact support if this continues.',409);
 if(process.env.BREVO_API_KEY&&process.env.BREVO_SENDER_EMAIL){
  const {data:claim}=await admin.from('ax_exam_attempts').update({result_email_sent_at:new Date().toISOString()}).eq('id',id).is('result_email_sent_at',null).select('id').maybeSingle();
  if(claim){try{
   const [{data:{user:authUser}},{data:enrol},{data:answers}]=await Promise.all([admin.auth.admin.getUserById(user.id),admin.from('ax_enrollments').select('username,unsubscribe_token').eq('user_id',user.id).maybeSingle(),admin.from('ax_exam_attempt_questions').select('question_id,selected_option').eq('attempt_id',id)]);
   const base=(process.env.NEXT_PUBLIC_SITE_URL||'https://shaddies.space').replace(/\/$/,'');const username=enrol?.username||'learner';const unsub=`${base}/api/automatex/unsubscribe?token=${enrol?.unsubscribe_token||''}`;let subject='Your Automate X exam result';let body='';
   if(data.percent>=90&&data.discount?.percent_off===50){subject=`You did it, ${username}: ${data.percent}%`;body=`<p>Hi ${esc(username)},</p><p>You scored ${data.percent}% in one sitting. That is outstanding. Your certificate is ready: <a href="${base}/automatex/course/certificate">view your certificate</a>.</p><p>You have also earned 50% off the paid course. Your code is <b>${esc(data.discount.code)}</b> and it is valid until ${new Date(data.discount.expires_at).toLocaleDateString('en-NG')}.</p>`;}
   else if(data.percent>=75&&data.percent<90&&data.discount?.percent_off===30){subject=`You passed, ${username}: ${data.percent}%`;body=`<p>Hi ${esc(username)},</p><p>You scored ${data.percent}% and passed. Your certificate is ready: <a href="${base}/automatex/course/certificate">view your certificate</a>.</p><p>You have earned 30% off the paid course. Your code is <b>${esc(data.discount.code)}</b> and it is valid until ${new Date(data.discount.expires_at).toLocaleDateString('en-NG')}.</p>`;}
   else {
    const ids=(answers||[]).map(x=>x.question_id);const {data:qs}=ids.length?await admin.from('ax_questions').select('id,topic,correct_option').in('id',ids):{data:[]};const qmap=new Map((qs||[]).map(q=>[q.id,q]));const topics=[...new Set((answers||[]).filter(a=>qmap.has(a.question_id)&&a.selected_option!==qmap.get(a.question_id).correct_option).map(a=>qmap.get(a.question_id).topic).filter(Boolean))];const topicText=topics.length?topics.join(', '):'the lesson cards and ideas you found most challenging';
    if(data.percent>=60){subject=`You passed, ${username}: ${data.percent}%`;body=`<p>Hi ${esc(username)},</p><p>You scored ${data.percent}% and passed. Your certificate is ready: <a href="${base}/automatex/course/certificate">view your certificate</a>.</p><p>Topics worth another look: ${esc(topicText)}. Shaddie can go through them with you anytime.</p>`;}
    else {subject=`Your exam result, ${username}`;body=`<p>Hi ${esc(username)},</p><p>You scored ${data.percent}%. That is not a pass this time, but you learned a lot. Topics to focus on: ${esc(topicText)}.</p><p>Everything in the course is still yours to review, and Shaddie is here to help. Your dashboard has a plan.</p><p><a href="${base}/automatex/course">Open your dashboard</a></p>`;}
   }
   body+=`<p style="font-size:12px;color:#777"><a href="${unsub}">Unsubscribe from course reminders</a></p>`;
   await sendBrevoEmail({to:authUser.email,subject,htmlContent:emailShell(body),textContent:`${subject}. Your result: ${data.percent}%. Visit ${base}/automatex/course. Unsubscribe: ${unsub}`});
  }catch{await admin.from('ax_exam_attempts').update({result_email_sent_at:null}).eq('id',id);}}
 }
 return Response.json(data,{headers:{'Cache-Control':'no-store'}});
}
