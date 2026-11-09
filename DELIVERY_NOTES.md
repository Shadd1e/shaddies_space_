# Shaddies.Space delivery notes — 9 November 2026

## Implemented in this source

- Custom six-digit registration verification through Brevo, with HMAC-hashed codes, ten-minute expiry, single use, five failed-attempt lockout, and database-backed issuance limits (three per email/hour and ten per source IP/hour).
- Account creation only after the custom verification succeeds; the Supabase Auth user is created as email-confirmed and signed in with the chosen password.
- Welcome email after account creation.
- Project enquiry storage through a server-only Supabase admin client, with an atomic five-submissions-per-source-IP/hour limit and hashed IP storage (no raw IP address stored).
- Brevo notification to the site operator and acknowledgement to the enquiry sender. The UI distinguishes successful storage from unavailable/failed email delivery.
- Resend-code control and cleanup of a pending challenge if the verification email cannot be sent.
- No Brevo or Supabase secret key is exposed to browser code.

## Supabase status

The foundation, verification and project-enquiry migrations are applied to project `sgimgcpmijutzlgbbwkp`. The new atomic project-enquiry submission function was smoke-tested: five submissions were accepted, the sixth was rejected, and all temporary test rows were deleted. The Supabase security advisor returned zero findings after the changes.

## Required owner configuration

Set these in `.env.local` for local development and in the hosting provider's server environment for production:

- `NEXT_PUBLIC_SUPABASE_URL=https://sgimgcpmijutzlgbbwkp.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — the project's publishable key (this variable name is retained for compatibility)
- `SUPABASE_SERVICE_ROLE_KEY` — server only
- `EMAIL_VERIFICATION_SECRET` — server only, at least 32 random characters
- `BREVO_API_KEY` — server only
- `BREVO_SENDER_EMAIL` — an address/domain verified in Brevo
- `BREVO_SENDER_NAME=Shaddies.Space`
- `PROJECT_ENQUIRY_TO=support@shaddies.space`
- `NEXT_PUBLIC_SITE_URL=https://shaddies.space`

Brevo sending cannot be live-tested until the owner supplies the API key and configures a verified sender/domain (including the DNS records Brevo requests). Do not paste secrets into chat.

## Verification and build status

- Server-side JavaScript syntax checks passed.
- Supabase database migration status and table/RLS state were checked.
- Supabase security advisor returned zero findings.
- The atomic project enquiry rate-limit function passed its smoke test.
- A full Next.js production build was **not** run: npm registry access timed out in the preparation environment. The supplied `package-lock.json` predates the Supabase packages now declared in `package.json`; run `npm install` once to regenerate it, then run `npm run build`. Do not run `npm ci` until the lockfile has been regenerated.
- End-to-end Brevo delivery, real mailbox receipt, and full browser session testing remain pending owner credentials and a configured sender.
