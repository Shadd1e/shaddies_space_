# Change manifest

This archive is the complete updated project. The main implementation changes are:

- Updated `src/app/layout.js`, `src/app/globals.css`, `src/components/Navbar.js`, `src/components/Footer.js`, `src/components/Hero.js`, and `src/components/Bridge.js` for the shared theme, navigation and homepage entry points.
- Added `/learn`, `/build-with-me`, `/sign-in`, `/privacy`, `/contact`, and `/courses` pages.
- Added the project idea explorer, project enquiry form and their API routes.
- Added Supabase browser/server helpers and `middleware.js` for shared authentication/session handling.
- Added the Supabase migration for `profiles` and `project_inquiries`.
- Added `.env.example` and `INTEGRATION_GUIDE.md`.
- Moved the old cohort marketing page source to `src/legacy/automatex-cohort-page.js` so `/automatex/*` remains free for the separate course app. The old `src/app/automatex/page.js` route has been removed intentionally.

After copying this update, run `npm install` once to install `@supabase/ssr` and `@supabase/supabase-js` and regenerate the lockfile. The preparation environment could not reach the npm registry, so a production Next.js build has not been run here.


## Supabase connection and deployment update

- Connected to the active Supabase project `sgimgcpmijutzlgbbwkp` (EU Central).
- Applied `shaddies_space_main_site_foundation`; verified `public.profiles` and `public.project_inquiries` exist with RLS enabled.
- Confirmed profile ownership policies and anonymous/authenticated insert-only enquiry policy are in place.
- Supabase security advisor also identified a pre-existing public SECURITY DEFINER RPC, `public.rls_auto_enable()`. Revoked execution for `PUBLIC`, `anon`, and `authenticated` without dropping the function.
- The only remaining integration step for the app is adding the project URL and publishable key to local/hosting environment variables, then configuring Auth email OTP and allowed URLs.


## Custom verification and Brevo workflows

- Replaced the Supabase-managed OTP sign-in screen with email/password sign-in and custom registration-code verification.
- Added Brevo transactional email client and branded HTML email shell.
- Added server-only Supabase admin client and HMAC verification utilities.
- Added `/api/auth/register/send-code` and `/api/auth/register/verify-code`; codes expire after 10 minutes, are single-use, are stored only as HMAC hashes, and are rate-limited in Postgres.
- Added a welcome email after successful registration.
- Added project enquiry notification to the site inbox and acknowledgement to the sender when Brevo is configured.
- Added database migrations for private verification challenges, serialized email/IP rate limiting, and an explicit deny policy for direct browser access.
- Added required Brevo, Supabase server credential, site URL and verification-secret variables to `.env.example`.
- Live Brevo delivery is not yet enabled: the account API key and verified sender address must be supplied in the hosting environment.
