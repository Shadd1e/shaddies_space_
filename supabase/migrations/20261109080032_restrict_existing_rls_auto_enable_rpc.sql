-- A pre-existing public SECURITY DEFINER RPC was detected during project audit.
-- It is not part of Shaddies.Space; revoke API execution without removing its owner
-- functionality or any database triggers that may rely on it.
revoke all on function public.rls_auto_enable() from public, anon, authenticated;
