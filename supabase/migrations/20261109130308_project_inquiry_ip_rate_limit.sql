alter table public.project_inquiries
  add column if not exists request_ip_hash text;

create index if not exists project_inquiries_request_ip_created_at_idx
  on public.project_inquiries (request_ip_hash, created_at desc);

create or replace function public.allow_project_inquiry(p_ip_hash text)
returns boolean
language plpgsql
set search_path = ''
as $function$
declare
  v_count integer;
begin
  perform pg_advisory_xact_lock(hashtextextended('project-inquiry:' || p_ip_hash, 0));
  select count(*) into v_count
  from public.project_inquiries
  where request_ip_hash = p_ip_hash
    and created_at > now() - interval '1 hour';
  return v_count < 5;
end;
$function$;

revoke all on function public.allow_project_inquiry(text) from public, anon, authenticated;
grant execute on function public.allow_project_inquiry(text) to service_role;
