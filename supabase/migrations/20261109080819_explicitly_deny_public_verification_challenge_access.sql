drop policy if exists "No direct access to verification challenges" on public.email_verification_challenges;
create policy "No direct access to verification challenges"
on public.email_verification_challenges
for all to anon, authenticated
using (false)
with check (false);
