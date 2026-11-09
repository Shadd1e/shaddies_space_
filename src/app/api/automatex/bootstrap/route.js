import { requireAutomateXUser, jsonError, voidStaleExam } from '@/lib/automatex/server';
export const dynamic='force-dynamic';
export async function GET(){
  const ctx=await requireAutomateXUser(); if(ctx.error)return jsonError(ctx.error,ctx.status);
  const {admin,user}=ctx;
  const [mods,enrol,progress,tests,cert,exam]=await Promise.all([
    admin.from('ax_modules').select('id,position,title,summary,est_hours').order('position'),
    admin.from('ax_enrollments').select('*').eq('user_id',user.id).maybeSingle(),
    admin.from('ax_lesson_progress').select('lesson_id,completed_at,check_correct').eq('user_id',user.id),
    admin.from('ax_test_attempts').select('module_id,score,total,passed,submitted_at').eq('user_id',user.id).eq('status','submitted'),
    admin.from('ax_certificates').select('certificate_code,score,issued_at').eq('user_id',user.id).is('revoked_at',null).maybeSingle(),
    voidStaleExam(admin,user.id),
  ]);
  for(const r of [mods,enrol,progress,tests,cert]) if(r?.error)return jsonError('Course data could not be loaded.',500);
  const latestTests={}; for(const t of (tests.data||[])){ if(!latestTests[t.module_id] || new Date(t.submitted_at)>new Date(latestTests[t.module_id].submitted_at)) latestTests[t.module_id]=t; }
  return Response.json({modules:mods.data||[],enrollment:enrol.data,progress:progress.data||[],moduleTests:latestTests,certificate:cert.data,exam:exam?.status==='in_progress'?{id:exam.id,expires_at:exam.expires_at}:exam?{status:exam.status,void_reason:exam.void_reason}:null},{headers:{'Cache-Control':'no-store'}});
}
