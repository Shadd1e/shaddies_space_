drop function if exists public.allow_project_inquiry(text);

create or replace function public.create_project_inquiry(
  p_contact_name text,
  p_contact_email text,
  p_contact_phone text,
  p_project_name text,
  p_project_description text,
  p_contact_method text,
  p_request_ip_hash text
)
returns boolean
language plpgsql
set search_path = ''
as $function$
declare
  v_count integer;
begin
  perform pg_advisory_xact_lock(hashtextextended('project-inquiry:' || p_request_ip_hash, 0));
  select count(*) into v_count
  from public.project_inquiries
  where request_ip_hash = p_request_ip_hash
    and created_at > now() - interval '1 hour';
  if v_count >= 5 then
    return false;
  end if;
  insert into public.project_inquiries (
    contact_name, contact_email, contact_phone, project_name,
    project_description, contact_method, request_ip_hash
  ) values (
    p_contact_name, p_contact_email, p_contact_phone, p_project_name,
    p_project_description, p_contact_method, p_request_ip_hash
  );
  return true;
end;
$function$;

revoke all on function public.create_project_inquiry(text,text,text,text,text,text,text) from public, anon, authenticated;
grant execute on function public.create_project_inquiry(text,text,text,text,text,text,text) to service_role;
