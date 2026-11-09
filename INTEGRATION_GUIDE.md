# Shaddies.Space — main-site foundations and course handoff

This project remains on Next.js 14.2.35, App Router, JavaScript and Tailwind CSS. The existing homepage and its visual identity are retained.

## Reserved for the separate Automate-X course build

- `/automatex/*` — reserved; no main-site pages are created here.
- `/verify/*` — reserved; no main-site pages are created here.
- `/api/automatex/*` — reserved; no main-site API routes are created here.
- `ax_*` database namespace — reserved; this project does not create course tables.

The previous cohort/marketing page formerly at `/automatex` has been moved to `/courses/automatex` so the course namespace is available for the course app.

## Main-site routes added

- `/learn` — public learning-space introduction and course integration landing page. It deliberately contains no duplicate course bank/content.
- `/build-with-me` — collaboration process, project enquiry form, project idea explorer, and configurable Calendly/WhatsApp links.
- `/sign-in` — password sign-in and custom six-digit email verification during registration. Brevo sends the code; the Shaddies.Space API verifies it before creating a confirmed Supabase Auth account.
- `/privacy`, `/contact`, `/courses` — shared destinations required by the course handoff.
- `/api/project-planner` — server-only DeepSeek-powered preliminary project exploration.
- `/api/project-inquiries` — saves project enquiries to Supabase `project_inquiries`.

## Environment variables

Copy `.env.example` to `.env.local` and fill the values. Never commit `.env.local`. Run `npm install` once after receiving this update to synchronize `package-lock.json` with the Supabase dependencies already declared in `package.json`; the build environment used to prepare this archive could not reach the npm registry.

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (use the modern publishable key value)
- `DEEPSEEK_API_KEY` (server only)
- `DEEPSEEK_MODEL` (optional; defaults to `deepseek-chat`)
- `NEXT_PUBLIC_CALENDLY_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER` (international digits only, e.g. country code + number, no plus sign)
- `BREVO_API_KEY` (server only)
- `BREVO_SENDER_EMAIL` and optional `BREVO_SENDER_NAME`
- `PROJECT_ENQUIRY_TO` (optional; defaults to `support@shaddies.space`)
- `SUPABASE_SERVICE_ROLE_KEY` (server only; required for creating confirmed accounts and managing verification challenges)
- `EMAIL_VERIFICATION_SECRET` (server only; random secret with at least 32 characters)
- `NEXT_PUBLIC_SITE_URL` (e.g. `https://shaddies.space`)

Do not add a service-role key to browser code. The current public project-enquiry insert uses the anon key and database RLS. No service-role key is needed for this flow.

## Supabase setup

The Supabase project has been connected and the database foundation has been applied and verified. The linked project is active in the EU Central region.

1. Set `NEXT_PUBLIC_SUPABASE_URL` to `https://sgimgcpmijutzlgbbwkp.supabase.co`.
2. Set `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the project's **publishable key** from Supabase API Keys (the app variable name is retained for compatibility). Do not use a service-role/secret key.
3. Add both values to `.env.local` and the production hosting environment.
4. Use Supabase Auth with email/password sign-in. The custom registration API creates users as email-confirmed only after its own code verification succeeds. Supabase OTP email templates are not used by this flow.
5. Configure the allowed site URLs for the production domain and local development.
6. Do not re-run previously applied migrations. The main-site foundation, custom verification challenge/rate-limit migrations and explicit deny policy have been applied; the security audit also resulted in revoking public API execution of a pre-existing `public.rls_auto_enable()` SECURITY DEFINER function.

The applied migrations create these main-site tables:

- `public.profiles` — linked to `auth.users`, with optional `official_name`, `country`, and `username` fields.
- `public.project_inquiries` — private project enquiry submissions. Anonymous visitors can insert only; there is no public read policy.
- `public.email_verification_challenges` — HMAC-hashed, expiring, single-use registration challenges. Direct access is denied to `anon` and `authenticated`; trusted server code uses the Supabase service role.

It does not create any `ax_*` tables. The course builder can create its own schema independently.

## Custom registration and Brevo email

- Registration requests a six-digit code through `/api/auth/register/send-code`; the code is delivered with Brevo.
- Codes are HMAC-SHA256 hashed before storage, expire after 10 minutes, and are single-use. The database enforces up to 3 sends per email and 10 sends per source IP per hour.
- `/api/auth/register/verify-code` verifies the code server-side, creates the Supabase Auth user as email-confirmed, and establishes a password session. Passwords are never stored in the verification challenge table.
- Existing users sign in with email and password directly through Supabase Auth.
- Project enquiry submissions trigger an internal notification and customer acknowledgement when Brevo is configured. Registration triggers a welcome email.
- The Brevo account is not connected from this workspace. Add the API key and verified sender address to the server environment before attempting live email delivery. Never put the Brevo key or Supabase service-role key in a `NEXT_PUBLIC_` variable.

## Theme and shared layout

The global theme follows `prefers-color-scheme` by default. The existing theme button cycles through system, dark and light preferences. CSS design tokens remain in `src/app/globals.css`.

The course app can reuse the existing `Navbar`, `Footer`, CSS variables (`--bg`, `--bg2`, `--surface`, `--border`, `--neon`, `--text`, `--muted`) and the Supabase SSR helpers in `src/lib/supabase`.

## Project planner behavior

The idea explorer sends its answers to `/api/project-planner`. The route calls DeepSeek only on the server. Until `DEEPSEEK_API_KEY` is configured, the UI explains that the assistant is not connected and offers the enquiry/email route; it does not fake a generated report.

## Before launch

- Replace the draft privacy page with a reviewed policy containing the operator's legal identity, applicable jurisdiction, retention periods and complete provider disclosures.
- Set and test Calendly and WhatsApp environment variables.
- Configure Brevo with an API key and a verified sender email/domain.
- Add `SUPABASE_SERVICE_ROLE_KEY` and a strong random `EMAIL_VERIFICATION_SECRET` to server-side environment variables only.
- Test registration, expired codes, incorrect codes, rate limits, duplicate account handling, password sign-in and enquiry email delivery.
- Add rate limiting and bot protection to public forms before production exposure.
- Confirm the final contact email, support process, business name and certificate branding with the course owner.
- Run `npm install` once to install the Supabase packages and refresh `package-lock.json` (the preparation environment could not reach npm).
- Run `npm run build` after installing dependencies and configuring environment variables. A production build has not yet been run.
- Add rate limiting and bot protection to the public enquiry and project-planner endpoints before production exposure.
