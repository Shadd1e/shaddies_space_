-- Automate-X hardening patch: sequential module tests, atomic grading/rate limits,
-- and public verification that can distinguish revoked certificates.
create unique index if not exists ax_one_live_test_per_user_module_cycle
  on public.ax_test_attempts(user_id,module_id,course_cycle) where status='in_progress';

create or replace view public.ax_public_certificate_verification
with (security_barrier=true) as
select certificate_code, learner_name, course_name, issued_at,
       case when revoked_at is null then 'Valid certificate' else 'This certificate is no longer valid' end::text as status
from public.ax_certificates;
revoke all on public.ax_public_certificate_verification from anon, authenticated;
grant select on public.ax_public_certificate_verification to anon, authenticated;

-- Serializes per-learner Shaddie rate-limit checks so parallel requests cannot bypass the limit.
create or replace function public.ax_consume_chat_event(p_user_id uuid, p_limit int default 12, p_window_seconds int default 60)
returns boolean language plpgsql security definer set search_path=public,pg_temp as $$
declare v_count int;
begin
  if p_limit < 1 or p_limit > 30 or p_window_seconds < 1 or p_window_seconds > 3600 then
    raise exception 'Invalid rate-limit configuration';
  end if;
  perform pg_advisory_xact_lock(hashtextextended(p_user_id::text,0));
  select count(*) into v_count from public.ax_chat_events
   where user_id=p_user_id and created_at > now() - make_interval(secs => p_window_seconds);
  if v_count >= p_limit then return false; end if;
  insert into public.ax_chat_events(user_id) values(p_user_id);
  return true;
end; $$;
revoke all on function public.ax_consume_chat_event(uuid,int,int) from public,anon,authenticated;
grant execute on function public.ax_consume_chat_event(uuid,int,int) to service_role;

-- Locks the attempt row while grading. The browser never supplies a score or answer key.
create or replace function public.ax_finalize_test(p_attempt_id uuid,p_user_id uuid)
returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare a public.ax_test_attempts%rowtype; v_score int; v_total int; v_rows int;
begin
  select * into a from public.ax_test_attempts where id=p_attempt_id and user_id=p_user_id for update;
  if not found then raise exception 'Test attempt not found'; end if;
  if a.status='submitted' then
    return jsonb_build_object('score',a.score,'total',a.total,'passed',a.passed);
  end if;
  if a.status <> 'in_progress' then raise exception 'Test attempt is not active'; end if;
  select count(*),count(*) filter (where selected_option is not null) into v_rows,v_total
   from public.ax_test_attempt_questions where attempt_id=p_attempt_id;
  if v_rows <> 8 or v_total <> 8 then raise exception 'Answer all eight questions before submitting'; end if;
  update public.ax_test_attempt_questions aq set is_correct=(aq.selected_option=q.correct_option)
   from public.ax_questions q where aq.attempt_id=p_attempt_id and q.id=aq.question_id;
  select count(*) into v_score from public.ax_test_attempt_questions where attempt_id=p_attempt_id and is_correct=true;
  update public.ax_test_attempts set status='submitted',score=v_score,total=8,passed=(v_score::numeric/8 >= 0.6),submitted_at=now()
   where id=p_attempt_id;
  return jsonb_build_object('score',v_score,'total',8,'passed',(v_score::numeric/8 >= 0.6));
end; $$;
revoke all on function public.ax_finalize_test(uuid,uuid) from public,anon,authenticated;
grant execute on function public.ax_finalize_test(uuid,uuid) to service_role;


-- Atomically rate-limit and store support requests to prevent parallel-submit bypasses.
create or replace function public.ax_create_support_request(p_user_id uuid,p_issue_type text,p_message text)
returns boolean language plpgsql security definer set search_path=public,pg_temp as $$
declare v_count int;
begin
  if p_issue_type not in ('cannot sign in','test problem','exam problem','payment','something else')
     or length(trim(p_message)) < 10 or length(p_message) > 4000 then
    raise exception 'Invalid support request';
  end if;
  perform pg_advisory_xact_lock(hashtextextended(p_user_id::text || ':support',0));
  select count(*) into v_count from public.ax_support_requests
   where user_id=p_user_id and created_at > now() - interval '1 hour';
  if v_count >= 5 then return false; end if;
  insert into public.ax_support_requests(user_id,issue_type,message)
  values(p_user_id,p_issue_type,trim(p_message));
  return true;
end; $$;
revoke all on function public.ax_create_support_request(uuid,text,text) from public,anon,authenticated;
grant execute on function public.ax_create_support_request(uuid,text,text) to service_role;

alter table public.ax_enrollments add column if not exists course_welcome_sent_at timestamptz;
alter table public.ax_exam_attempts add column if not exists result_email_sent_at timestamptz;
alter table public.ax_enrollments add column if not exists privacy_accepted_at timestamptz;


-- Serialize answer saves with final submission so a last click cannot race the grader.
create or replace function public.ax_save_exam_answer(p_attempt_id uuid,p_user_id uuid,p_question_id text,p_option_index int)
returns boolean language plpgsql security definer set search_path=public,pg_temp as $$
declare a public.ax_exam_attempts%rowtype; v_order text[];
begin
  if p_option_index < 0 or p_option_index > 3 then raise exception 'Invalid answer option'; end if;
  select * into a from public.ax_exam_attempts
   where id=p_attempt_id and user_id=p_user_id for update;
  if not found or a.status <> 'in_progress' then raise exception 'Exam is not active'; end if;
  if a.last_seen_at < now() - interval '3 minutes' then raise exception 'Reconnect grace period expired'; end if;
  if a.expires_at <= now() then raise exception 'Exam time expired'; end if;
  select option_order into v_order from public.ax_exam_attempt_questions
   where attempt_id=p_attempt_id and question_id=p_question_id;
  if not found then raise exception 'Question does not belong to this exam'; end if;
  update public.ax_exam_attempt_questions
   set selected_option=v_order[p_option_index+1],answered_at=now()
   where attempt_id=p_attempt_id and question_id=p_question_id;
  update public.ax_exam_attempts set last_seen_at=now() where id=p_attempt_id;
  return true;
end; $$;
revoke all on function public.ax_save_exam_answer(uuid,uuid,text,int) from public,anon,authenticated;
grant execute on function public.ax_save_exam_answer(uuid,uuid,text,int) to service_role;


-- Serializes module-test answer saves with the grading finalizer.
create or replace function public.ax_save_test_answer(p_attempt_id uuid,p_user_id uuid,p_question_id text,p_option_index int)
returns boolean language plpgsql security definer set search_path=public,pg_temp as $$
declare a public.ax_test_attempts%rowtype; v_order text[];
begin
  if p_option_index < 0 or p_option_index > 3 then raise exception 'Invalid answer option'; end if;
  select * into a from public.ax_test_attempts
   where id=p_attempt_id and user_id=p_user_id for update;
  if not found or a.status <> 'in_progress' then raise exception 'Test is not active'; end if;
  select option_order into v_order from public.ax_test_attempt_questions
   where attempt_id=p_attempt_id and question_id=p_question_id;
  if not found then raise exception 'Question does not belong to this test'; end if;
  update public.ax_test_attempt_questions set selected_option=v_order[p_option_index+1]
   where attempt_id=p_attempt_id and question_id=p_question_id;
  return true;
end; $$;
revoke all on function public.ax_save_test_answer(uuid,uuid,text,int) from public,anon,authenticated;
grant execute on function public.ax_save_test_answer(uuid,uuid,text,int) to service_role;

-- Minimal server-only progress summary for personalised inactivity reminder copy.
create or replace function public.ax_reminder_context(p_user_id uuid)
returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare
  e public.ax_enrollments%rowtype;
  v_passed text[] := array[]::text[];
  v_module public.ax_modules%rowtype;
  v_steps int := 0;
  v_minutes int := 0;
  v_hours numeric := 0;
  v_exam_done boolean := false;
begin
  select * into e from public.ax_enrollments where user_id=p_user_id;
  if not found or e.level is null then return jsonb_build_object('finished',true); end if;
  select coalesce(array_agg(distinct module_id),array[]::text[]) into v_passed
    from public.ax_test_attempts where user_id=p_user_id and course_cycle=e.course_cycle and status='submitted' and passed=true;
  select exists(select 1 from public.ax_exam_attempts where user_id=p_user_id and course_cycle=e.course_cycle and status='submitted') into v_exam_done;
  if v_exam_done then return jsonb_build_object('finished',true); end if;
  v_steps := cardinality(v_passed) + case when e.profile_complete then 1 else 0 end;
  select * into v_module from public.ax_modules m where not (m.id=any(v_passed)) order by m.position limit 1;
  if not found then select * into v_module from public.ax_modules where id='M8'; end if;
  if e.level='Confident' then
    v_minutes := ceil(coalesce(v_module.est_hours,0)*60)::int;
  else
    select coalesce(sum(l.reading_minutes),0)::int + 10 into v_minutes
      from public.ax_lessons l
      where l.module_id=v_module.id and not exists(
        select 1 from public.ax_lesson_progress lp where lp.user_id=p_user_id and lp.lesson_id=l.id
      );
  end if;
  select coalesce(sum(m.est_hours),0) into v_hours from public.ax_modules m where not (m.id=any(v_passed));
  v_hours := v_hours + case when e.profile_complete then 0 else 0.1 end + 0.75;
  return jsonb_build_object('finished',false,'steps_done',v_steps,'steps_left',greatest(0,10-v_steps),
    'module_position',v_module.position,'module_title',v_module.title,'minutes_remaining',greatest(10,v_minutes),
    'hours_remaining',round(v_hours,1));
end; $$;
revoke all on function public.ax_reminder_context(uuid) from public,anon,authenticated;
grant execute on function public.ax_reminder_context(uuid) to service_role;
