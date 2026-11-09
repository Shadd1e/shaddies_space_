import { createClient as createSupabaseServer } from '@/lib/supabase/server';
import { randomInt } from 'node:crypto';
import {sendBrevoEmail,emailShell} from '@/lib/email/brevo';
import { createAdminClient } from '@/lib/supabase/admin';

export async function requireAutomateXUser() {
  const supabase = await createSupabaseServer();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return { error: 'Sign in to continue.', status: 401 };
  return { user, admin: createAdminClient() };
}

export function jsonError(message, status=400) {
  return Response.json({ error: message }, { status, headers: { 'Cache-Control':'no-store' } });
}

export function shuffle(values) {
  const a=[...values];
  for(let i=a.length-1;i>0;i--){const j=cryptoRandomInt(i+1);[a[i],a[j]]=[a[j],a[i]];}
  return a;
}
function cryptoRandomInt(max) {
  // Uniform enough for ordering only; cryptographic selection uses Node's crypto API in routes.
  return randomInt(max);
}


export async function voidExamAndNotify(admin, attempt, reason) {
  const { data:changed, error } = await admin.from('ax_exam_attempts').update({status:'voided',void_reason:reason,reconnect_deadline:null}).eq('id',attempt.id).eq('status','in_progress').select('id').maybeSingle();
  if (error || !changed) return false;
  try {
    const {data:{user}} = await admin.auth.admin.getUserById(attempt.user_id);
    const {data:enrol} = await admin.from('ax_enrollments').select('unsubscribe_token').eq('user_id',attempt.user_id).maybeSingle();
    const base=(process.env.NEXT_PUBLIC_SITE_URL||'https://shaddies.space').replace(/\/$/,'');
    const unsubscribe=enrol?.unsubscribe_token?`<p style=\"font-size:12px;color:#777\"><a href=\"${base}/api/automatex/unsubscribe?token=${enrol.unsubscribe_token}\">Unsubscribe from course reminders</a></p>`:'';
    if (user?.email) {
      const reasonText=reason==='time_expired'?'The 45-minute exam time limit ended.':reason==='reconnect_grace_expired'?'We did not receive a reconnect within the three-minute grace window.':'We could not keep this attempt active.';
      const message=`<h1 style="font-size:24px">Your exam attempt was cancelled</h1><p>${reasonText}</p><p>Your module results and course progress are safe. When you are ready, you can take the final exam again with a fresh set of questions. If this happened because of a genuine problem, such as a power cut or a crashed phone, contact support and we will review it.</p><p><a href="${(process.env.NEXT_PUBLIC_SITE_URL||'https://shaddies.space').replace(/\/$/,'')}/automatex/course/exam">Return to your course</a></p>${unsubscribe}`;
      await sendBrevoEmail({to:user.email,subject:'About your Automate X exam attempt',htmlContent:emailShell(message),textContent:`Your Automate X exam attempt was cancelled. ${reasonText} Your module results are safe. You can take the exam again with a fresh set of questions. If this was a genuine problem, contact support.`});
      await admin.from('ax_exam_attempts').update({void_notice_sent_at:new Date().toISOString()}).eq('id',attempt.id);
    }
  } catch (_) { /* Exam cancellation must not depend on email delivery. */ }
  return true;
}

export async function voidStaleExam(admin, userId) {
  const { data: attempt } = await admin.from('ax_exam_attempts').select('*').eq('user_id',userId).eq('status','in_progress').maybeSingle();
  if (!attempt) return null;
  const now=Date.now();
  const last=Date.parse(attempt.last_seen_at);
  if (now-last > 3*60*1000) {
    await voidExamAndNotify(admin,attempt,'reconnect_grace_expired');
    return { ...attempt, status:'voided' };
  }
  if (now > Date.parse(attempt.expires_at)) {
    await voidExamAndNotify(admin,attempt,'time_expired');
    return { ...attempt, status:'voided' };
  }
  return attempt;
}
