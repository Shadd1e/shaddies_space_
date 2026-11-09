-- Automate-X course schema. Apply once after reviewing the project ID and backups.
-- All grading, answer-key access, exam timing and certificate issuance are server-controlled.
create extension if not exists pgcrypto;

create table if not exists public.ax_modules (
  id text primary key check (id ~ '^M[1-8]$'), position int not null unique,
  title text not null, summary text, est_hours numeric(5,2) not null default 0,
  outcomes text, pass_message text, fail_message text, updated_at timestamptz not null default now()
);
create table if not exists public.ax_lessons (
  id text primary key check (id ~ '^M[1-8]-L[1-5]$'), module_id text not null references public.ax_modules(id) on delete cascade,
  position int not null, title text not null, reading_minutes int not null default 5,
  body_md text not null, story_title text, story_md text, story_lesson text, paid_course_note text,
  check_prompt text, check_options jsonb, check_answer text, check_explanation text,
  unique(module_id, position), updated_at timestamptz not null default now()
);
create table if not exists public.ax_questions (
  id text primary key, module_id text references public.ax_modules(id) on delete cascade,
  kind text not null check (kind in ('placement','check','test','scenario','exam')),
  topic text, difficulty int not null default 1 check (difficulty between 1 and 3),
  min_level int not null default 0 check (min_level between 0 and 3),
  prompt text not null, options jsonb not null check (jsonb_typeof(options)='object'),
  correct_option text check (correct_option in ('A','B','C','D')),
  points jsonb, explanation text, source_module int, updated_at timestamptz not null default now()
);
create index if not exists ax_questions_module_kind_idx on public.ax_questions(module_id,kind);
create table if not exists public.ax_enrollments (
  user_id uuid primary key references auth.users(id) on delete cascade,
  username text not null, level text, placement_score int, daily_hours numeric(5,2), weekly_hours numeric(5,2),
  profile_complete boolean not null default false, official_name text, country text,
  current_module text references public.ax_modules(id),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.ax_lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null references public.ax_lessons(id) on delete cascade,
  completed_at timestamptz, check_answer text, check_correct boolean,
  updated_at timestamptz not null default now(), primary key(user_id,lesson_id)
);
create table if not exists public.ax_test_attempts (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  module_id text not null references public.ax_modules(id), status text not null default 'in_progress' check(status in ('in_progress','submitted')),
  score int, total int not null default 8, passed boolean, started_at timestamptz not null default now(), submitted_at timestamptz
);
create table if not exists public.ax_test_attempt_questions (
  attempt_id uuid not null references public.ax_test_attempts(id) on delete cascade,
  question_id text not null references public.ax_questions(id), position int not null,
  option_order text[] not null, selected_option text, is_correct boolean,
  primary key(attempt_id,position), unique(attempt_id,question_id)
);
create table if not exists public.ax_exam_attempts (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'in_progress' check(status in ('in_progress','submitted','voided')),
  started_at timestamptz not null default now(), expires_at timestamptz not null,
  last_seen_at timestamptz not null default now(), reconnect_deadline timestamptz,
  score int, total int not null default 30, void_reason text, submitted_at timestamptz
);
create unique index if not exists ax_one_live_exam_per_user on public.ax_exam_attempts(user_id) where status='in_progress';
create table if not exists public.ax_exam_attempt_questions (
  attempt_id uuid not null references public.ax_exam_attempts(id) on delete cascade,
  question_id text not null references public.ax_questions(id), position int not null,
  option_order text[] not null, selected_option text, answered_at timestamptz,
  primary key(attempt_id,position), unique(attempt_id,question_id)
);
create table if not exists public.ax_certificates (
  id uuid primary key default gen_random_uuid(), certificate_code text not null unique,
  user_id uuid not null unique references auth.users(id) on delete cascade,
  learner_name text not null, course_name text not null default 'Automate X: Introduction to Automation and AI Agents',
  score int not null check(score between 60 and 100), issued_at timestamptz not null default now(), revoked_at timestamptz
);
create table if not exists public.ax_discount_codes (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  code text not null unique, percent_off int not null check(percent_off in (30,50)),
  expires_at timestamptz not null, redeemed_at timestamptz, created_at timestamptz not null default now()
);
create table if not exists public.ax_support_requests (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  issue_type text not null, message text not null check(length(message) between 10 and 4000),
  created_at timestamptz not null default now()
);

-- Content tables are never directly readable by learners. The server uses service-role access.
alter table public.ax_modules enable row level security;
alter table public.ax_lessons enable row level security;
alter table public.ax_questions enable row level security;
revoke all on public.ax_modules, public.ax_lessons, public.ax_questions from anon, authenticated;

-- Learner records: owner-only reads. No browser writes; trusted APIs write using service role.
do $$ declare t text; begin
  foreach t in array array['ax_enrollments','ax_lesson_progress','ax_test_attempts','ax_exam_attempts','ax_certificates','ax_discount_codes','ax_support_requests'] loop
    execute format('alter table public.%I enable row level security',t);
    execute format('revoke all on public.%I from anon, authenticated',t);
    execute format('grant select on public.%I to authenticated',t);
    execute format('drop policy if exists %I on public.%I',t||'_owner_select',t);
    execute format('create policy %I on public.%I for select to authenticated using (user_id = auth.uid())',t||'_owner_select',t);
  end loop;
end $$;

-- Public verification reveals only the minimum certificate fields through a tightly scoped view.
create or replace view public.ax_public_certificate_verification
with (security_barrier=true) as
select certificate_code, learner_name, course_name, issued_at, 'Valid certificate'::text as status
from public.ax_certificates where revoked_at is null;
revoke all on public.ax_public_certificate_verification from anon, authenticated;
grant select on public.ax_public_certificate_verification to anon, authenticated;

comment on table public.ax_questions is 'Answer keys are private; never expose this table through client-side Supabase queries.';
comment on table public.ax_exam_attempt_questions is 'Exam option ordering and responses are private to server-side grading.';


-- One-call, transactional and idempotent bank import. Only service_role may execute it.
create or replace function public.ax_import_course_bank(p_bank jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  n_modules int; n_lessons int; n_module_questions int; n_exam int; n_placement int;
begin
  if jsonb_typeof(p_bank) <> 'object' then raise exception 'Invalid bank payload'; end if;
  n_modules := jsonb_array_length(coalesce(p_bank->'modules','[]'::jsonb));
  n_lessons := jsonb_array_length(coalesce(p_bank->'lessons','[]'::jsonb));
  n_module_questions := jsonb_array_length(coalesce(p_bank->'questions','[]'::jsonb));
  n_exam := jsonb_array_length(coalesce(p_bank->'exam_questions','[]'::jsonb));
  n_placement := jsonb_array_length(coalesce(p_bank->'placement_questions','[]'::jsonb));
  if n_modules <> 8 or n_lessons <> 40 or n_module_questions <> 184 or n_exam <> 60 or n_placement <> 10 then
    raise exception 'Bank count validation failed (modules %, lessons %, module questions %, exam %, placement %)', n_modules,n_lessons,n_module_questions,n_exam,n_placement;
  end if;

  insert into public.ax_modules(id,position,title,summary,est_hours,outcomes,pass_message,fail_message,updated_at)
  select x.id,x.position,x.title,x.summary,x.est_hours,x.outcomes,x.pass_message,x.fail_message,now()
  from jsonb_to_recordset(p_bank->'modules') as x(id text,position int,title text,summary text,est_hours numeric,outcomes text,pass_message text,fail_message text)
  on conflict(id) do update set position=excluded.position,title=excluded.title,summary=excluded.summary,est_hours=excluded.est_hours,outcomes=excluded.outcomes,pass_message=excluded.pass_message,fail_message=excluded.fail_message,updated_at=now();

  insert into public.ax_lessons(id,module_id,position,title,reading_minutes,body_md,story_title,story_md,story_lesson,paid_course_note,check_prompt,check_options,check_answer,check_explanation,updated_at)
  select x.id,x.module_id,x.position,x.title,x.reading_minutes,x.body_md,x.story_title,x.story_md,x.story_lesson,x.paid_course_note,x.check_prompt,x.check_options,x.check_answer,x.check_explanation,now()
  from jsonb_to_recordset(p_bank->'lessons') as x(id text,module_id text,position int,title text,reading_minutes int,body_md text,story_title text,story_md text,story_lesson text,paid_course_note text,check_prompt text,check_options jsonb,check_answer text,check_explanation text)
  on conflict(id) do update set module_id=excluded.module_id,position=excluded.position,title=excluded.title,reading_minutes=excluded.reading_minutes,body_md=excluded.body_md,story_title=excluded.story_title,story_md=excluded.story_md,story_lesson=excluded.story_lesson,paid_course_note=excluded.paid_course_note,check_prompt=excluded.check_prompt,check_options=excluded.check_options,check_answer=excluded.check_answer,check_explanation=excluded.check_explanation,updated_at=now();

  insert into public.ax_questions(id,module_id,kind,topic,difficulty,min_level,prompt,options,correct_option,points,explanation,source_module,updated_at)
  select x.id,x.module_id,x.kind,x.topic,x.difficulty,x.min_level,x.prompt,x.options,x.correct_option,null,x.explanation,null,now()
  from jsonb_to_recordset(p_bank->'questions') as x(id text,module_id text,kind text,topic text,difficulty int,min_level int,prompt text,options jsonb,correct_option text,explanation text)
  on conflict(id) do update set module_id=excluded.module_id,kind=excluded.kind,topic=excluded.topic,difficulty=excluded.difficulty,min_level=excluded.min_level,prompt=excluded.prompt,options=excluded.options,correct_option=excluded.correct_option,points=null,explanation=excluded.explanation,updated_at=now();

  insert into public.ax_questions(id,module_id,kind,topic,difficulty,min_level,prompt,options,correct_option,points,explanation,source_module,updated_at)
  select x.id,null,'exam',x.topic,x.difficulty,x.min_level,x.prompt,x.options,x.correct_option,null,x.explanation,x.source_module,now()
  from jsonb_to_recordset(p_bank->'exam_questions') as x(id text,topic text,difficulty int,min_level int,prompt text,options jsonb,correct_option text,explanation text,source_module int)
  on conflict(id) do update set module_id=null,kind='exam',topic=excluded.topic,difficulty=excluded.difficulty,min_level=excluded.min_level,prompt=excluded.prompt,options=excluded.options,correct_option=excluded.correct_option,points=null,explanation=excluded.explanation,source_module=excluded.source_module,updated_at=now();

  insert into public.ax_questions(id,module_id,kind,topic,difficulty,min_level,prompt,options,correct_option,points,explanation,updated_at)
  select x.id,null,'placement',null,1,0,x.prompt,x.options,null,x.points,null,now()
  from jsonb_to_recordset(p_bank->'placement_questions') as x(id text,prompt text,options jsonb,points jsonb)
  on conflict(id) do update set kind='placement',prompt=excluded.prompt,options=excluded.options,correct_option=null,points=excluded.points,updated_at=now();

  return jsonb_build_object('ok',true,'modules',n_modules,'lessons',n_lessons,'module_questions',n_module_questions,'exam_questions',n_exam,'placement_questions',n_placement);
end;
$$;
revoke all on function public.ax_import_course_bank(jsonb) from public, anon, authenticated;
grant execute on function public.ax_import_course_bank(jsonb) to service_role;

create table if not exists public.ax_chat_events (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.ax_chat_events enable row level security;
revoke all on public.ax_chat_events from anon, authenticated;
alter table public.ax_test_attempt_questions enable row level security;
alter table public.ax_exam_attempt_questions enable row level security;
revoke all on public.ax_test_attempt_questions, public.ax_exam_attempt_questions from anon, authenticated;
create unique index if not exists ax_enrollments_username_lower_uq on public.ax_enrollments(lower(username));
grant all on public.ax_modules,public.ax_lessons,public.ax_questions,public.ax_enrollments,public.ax_lesson_progress,public.ax_test_attempts,public.ax_test_attempt_questions,public.ax_exam_attempts,public.ax_exam_attempt_questions,public.ax_certificates,public.ax_discount_codes,public.ax_support_requests,public.ax_chat_events to service_role;
alter table public.ax_enrollments add column if not exists last_activity_at timestamptz not null default now();
alter table public.ax_enrollments add column if not exists reminder_3_sent_at timestamptz;
alter table public.ax_enrollments add column if not exists reminder_10_sent_at timestamptz;
alter table public.ax_enrollments add column if not exists unsubscribe_token uuid not null default gen_random_uuid();
alter table public.ax_enrollments add column if not exists unsubscribed_at timestamptz;
create unique index if not exists ax_enrollments_unsubscribe_token_uq on public.ax_enrollments(unsubscribe_token);
alter table public.ax_enrollments add column if not exists course_cycle int not null default 1;
alter table public.ax_test_attempts add column if not exists course_cycle int not null default 1;
alter table public.ax_exam_attempts add column if not exists course_cycle int not null default 1;
alter table public.ax_enrollments add column if not exists age_confirmed boolean not null default false;
create table if not exists public.ax_chat_messages (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check(role in ('user','assistant')), content text not null check(length(content) between 1 and 4000),
  created_at timestamptz not null default now()
);
alter table public.ax_chat_messages enable row level security;
revoke all on public.ax_chat_messages from anon, authenticated;
grant all on public.ax_chat_messages to service_role;
alter table public.ax_exam_attempts add column if not exists void_notice_sent_at timestamptz;

-- Atomic exam grading, submission and reward issuance. The API cannot supply a score.
create or replace function public.ax_finalize_exam(p_attempt_id uuid, p_user_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  a public.ax_exam_attempts%rowtype;
  v_score int;
  v_pct int;
  v_name text;
  v_cert_code text;
  v_discount_code text;
  v_discount_pct int;
  v_cert jsonb := null;
  v_discount jsonb := null;
begin
  select * into a from public.ax_exam_attempts
   where id=p_attempt_id and user_id=p_user_id for update;
  if not found then raise exception 'Exam attempt not found'; end if;

  if a.status='submitted' then
    select jsonb_build_object('certificate_code',certificate_code,'issued_at',issued_at)
      into v_cert from public.ax_certificates where user_id=p_user_id and revoked_at is null;
    select jsonb_build_object('code',code,'percent_off',percent_off,'expires_at',expires_at)
      into v_discount from public.ax_discount_codes where user_id=p_user_id and created_at >= a.started_at and created_at <= a.submitted_at order by created_at desc limit 1;
    v_pct := round((a.score::numeric / 30) * 100)::int;
    return jsonb_build_object('score',a.score,'total',30,'percent',v_pct,'passed',v_pct>=60,'certificate',v_cert,'discount',v_discount,'under60',v_pct<60);
  end if;
  if a.status <> 'in_progress' then raise exception 'Exam attempt is not active'; end if;
  if a.last_seen_at < now() - interval '3 minutes' then raise exception 'Reconnect grace period expired'; end if;
  if a.expires_at <= now() then raise exception 'Exam time expired'; end if;
  if (select count(*) from public.ax_exam_attempt_questions where attempt_id=p_attempt_id) <> 30
     or exists(select 1 from public.ax_exam_attempt_questions where attempt_id=p_attempt_id and selected_option is null) then
    raise exception 'All 30 answers must be saved before submission';
  end if;

  select count(*) into v_score
  from public.ax_exam_attempt_questions aq
  join public.ax_questions q on q.id=aq.question_id
  where aq.attempt_id=p_attempt_id and aq.selected_option=q.correct_option;
  v_pct := round((v_score::numeric / 30) * 100)::int;

  if v_pct >= 60 then
    select official_name into v_name from public.ax_enrollments where user_id=p_user_id;
    if coalesce(trim(v_name),'') = '' then raise exception 'Certificate name is missing'; end if;
    v_cert_code := 'AX-' || to_char(now(),'YYYY') || '-' || upper(substr(encode(gen_random_bytes(4),'hex'),1,6));
    insert into public.ax_certificates(certificate_code,user_id,learner_name,score)
    values(v_cert_code,p_user_id,trim(v_name),v_pct);
    select jsonb_build_object('certificate_code',certificate_code,'issued_at',issued_at)
      into v_cert from public.ax_certificates where certificate_code=v_cert_code;

    if v_pct >= 90 then
      if (select count(distinct module_id) from public.ax_test_attempts where user_id=p_user_id and course_cycle=a.course_cycle and status='submitted' and passed=true) = 8 then
        v_discount_pct := 50;
      end if;
    elsif v_pct >= 75 then
      v_discount_pct := 30;
    end if;
    if v_discount_pct is not null then
      v_discount_code := case when v_discount_pct=50 then 'AX50-' else 'AX30-' end || upper(substr(encode(gen_random_bytes(8),'hex'),1,10));
      insert into public.ax_discount_codes(user_id,code,percent_off,expires_at)
      values(p_user_id,v_discount_code,v_discount_pct,now()+interval '14 days');
      select jsonb_build_object('code',code,'percent_off',percent_off,'expires_at',expires_at)
        into v_discount from public.ax_discount_codes where code=v_discount_code;
    end if;
  end if;

  update public.ax_exam_attempts set status='submitted',score=v_score,total=30,submitted_at=now()
   where id=p_attempt_id;
  update public.ax_enrollments set last_activity_at=now() where user_id=p_user_id;
  return jsonb_build_object('score',v_score,'total',30,'percent',v_pct,'passed',v_pct>=60,'certificate',v_cert,'discount',v_discount,'under60',v_pct<60);
end;
$$;
revoke all on function public.ax_finalize_exam(uuid,uuid) from public, anon, authenticated;
grant execute on function public.ax_finalize_exam(uuid,uuid) to service_role;
create index if not exists ax_lesson_progress_user_idx on public.ax_lesson_progress(user_id);
create index if not exists ax_test_attempts_user_cycle_module_idx on public.ax_test_attempts(user_id,course_cycle,module_id,status);
create index if not exists ax_exam_attempts_user_cycle_status_idx on public.ax_exam_attempts(user_id,course_cycle,status);
create index if not exists ax_chat_messages_user_created_idx on public.ax_chat_messages(user_id,created_at desc);
create index if not exists ax_support_requests_user_created_idx on public.ax_support_requests(user_id,created_at desc);
create index if not exists ax_discount_codes_user_created_idx on public.ax_discount_codes(user_id,created_at desc);
alter table public.ax_discount_codes add column if not exists reminder_sent_at timestamptz;
