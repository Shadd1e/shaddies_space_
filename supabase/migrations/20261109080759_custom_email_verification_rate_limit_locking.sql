-- Serialize challenge issuance per email and source IP so concurrent requests
-- cannot race past the per-hour limits.
create or replace function public.issue_email_verification_challenge(
  p_email text,
  p_code_hash text,
  p_ip_hash text,
  p_expires_at timestamptz
) returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_email_count integer;
  v_ip_count integer;
begin
  perform pg_advisory_xact_lock(hashtextextended('email:' || p_email, 0));
  perform pg_advisory_xact_lock(hashtextextended('ip:' || p_ip_hash, 0));

  select count(*) into v_email_count
  from public.email_verification_challenges
  where email = p_email and created_at > now() - interval '1 hour';

  select count(*) into v_ip_count
  from public.email_verification_challenges
  where request_ip_hash = p_ip_hash and created_at > now() - interval '1 hour';

  if v_email_count >= 3 or v_ip_count >= 10 then
    return false;
  end if;

  update public.email_verification_challenges
  set consumed_at = coalesce(consumed_at, now())
  where email = p_email and consumed_at is null;

  delete from public.email_verification_challenges
  where created_at < now() - interval '7 days';

  insert into public.email_verification_challenges (email, code_hash, request_ip_hash, expires_at)
  values (p_email, p_code_hash, p_ip_hash, p_expires_at);

  return true;
end;
$$;
revoke all on function public.issue_email_verification_challenge(text, text, text, timestamptz) from public, anon, authenticated;
grant execute on function public.issue_email_verification_challenge(text, text, text, timestamptz) to service_role;
