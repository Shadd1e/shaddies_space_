import { requireAutomateXUser, jsonError } from '@/lib/automatex/server';
export async function POST(req){
 const ctx=await requireAutomateXUser(); if(ctx.error)return jsonError(ctx.error,ctx.status);
 let body;try{body=await req.json()}catch{return jsonError('Invalid request.')}
 const lessonId=String(body?.lessonId||''); const answer=String(body?.answer||'').toUpperCase();
 if(!/^M[1-8]-L[1-5]$/.test(lessonId)||!['A','B','C','D'].includes(answer))return jsonError('Invalid lesson progress.');
 const {admin,user}=ctx;
 const {data:lesson}=await admin.from('ax_lessons').select('id,module_id,position,check_answer,check_explanation').eq('id',lessonId).maybeSingle();
 if(!lesson)return jsonError('Lesson not found.',404);
 const {data:enrol}=await admin.from('ax_enrollments').select('level,course_cycle').eq('user_id',user.id).maybeSingle();
 const moduleNo=Number(lesson.module_id.slice(1));
 if(!enrol?.level&&lessonId!=='M1-L1')return jsonError('Complete the placement quiz first.',403);
 if(moduleNo>1){const {data:prev}=await admin.from('ax_test_attempts').select('id').eq('user_id',user.id).eq('course_cycle',enrol?.course_cycle||1).eq('module_id',`M${moduleNo-1}`).eq('status','submitted').eq('passed',true).limit(1);if(!prev?.length)return jsonError('Pass the previous module test first.',403);}
 if(lesson.position>1){const previous=`${lesson.module_id}-L${lesson.position-1}`;const {data:done}=await admin.from('ax_lesson_progress').select('completed_at').eq('user_id',user.id).eq('lesson_id',previous).maybeSingle();if(!done?.completed_at)return jsonError('Complete the previous lesson first.',409);}
 const correct=answer===lesson.check_answer;
 const {error}=await admin.from('ax_lesson_progress').upsert({user_id:user.id,lesson_id:lessonId,completed_at:new Date().toISOString(),check_answer:answer,check_correct:correct,updated_at:new Date().toISOString()},{onConflict:'user_id,lesson_id'});
 if(error)return jsonError('Progress could not be saved.',500);
 await admin.from('ax_enrollments').update({current_module:lesson.module_id,last_activity_at:new Date().toISOString()}).eq('user_id',user.id);
 return Response.json({ok:true,correct,explanation:lesson.check_explanation|| (correct?'That is right.':'Not quite. Review the lesson and try again.')},{headers:{'Cache-Control':'no-store'}});
}
