-- Custom Shaddies.Space email verification challenge storage.
create table if not exists public.email_verification_challenges (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  code_hash text not null,
  request_ip_hash text,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  attempts integer not null default 0 check (attempts between 0 and 5),
  consumed_at timestamptz
);
create index if not exists email_verification_email_created_idx
  on public.email_verification_challenges (email, created_at desc);
create index if not exists email_verification_ip_created_idx
  on public.email_verification_challenges (request_ip_hash, created_at desc);

alter table public.email_verification_challenges enable row level security;
revoke all on public.email_verification_challenges from public, anon, authenticated;
grant select, insert, update, delete on public.email_verification_challenges to service_role;

create or replace function public.consume_email_verification_challenge(
  p_email text,
  p_code_hash text
) returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_id uuid;
begin
  update public.email_verification_challenges
  set consumed_at = now()
  where id = (
    select id
    from public.email_verification_challenges
    where email = p_email
      and code_hash = p_code_hash
      and consumed_at is null
      and expires_at > now()
      and attempts < 5
    order by created_at desc
    limit 1
    for update
  )
  returning id into v_id;

  if v_id is not null then
    return true;
  end if;

  update public.email_verification_challenges
  set attempts = least(attempts + 1, 5)
  where id = (
    select id
    from public.email_verification_challenges
    where email = p_email
      and consumed_at is null
      and expires_at > now()
      and attempts < 5
    order by created_at desc
    limit 1
  );
  return false;
end;
$$;
revoke all on function public.consume_email_verification_challenge(text, text) from public, anon, authenticated;
grant execute on function public.consume_email_verification_challenge(text, text) to service_role;
