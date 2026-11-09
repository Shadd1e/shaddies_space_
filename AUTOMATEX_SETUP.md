# Automate-X course build and integration

This is the course implementation integrated into the existing Shaddies.Space Next.js 14 App Router project. It reuses the site's Supabase Auth session, server-side Supabase helpers, theme tokens, Navbar/Footer, Brevo mail helper and DeepSeek provider configuration. It does not create a second sign-in system.

## Included course routes

- `/automatex` — public course introduction.
- `/automatex/course` — authenticated learner dashboard.
- `/automatex/course/placement` — ten-question placement quiz and study plan.
- `/automatex/course/M1` … `/automatex/course/M8` — module overview pages.
- `/automatex/course/M1/M1-L1` … — lesson cards and quick checks.
- `/automatex/course/M1/test` … — module tests.
- `/automatex/course/exam` — final exam.
- `/automatex/course/certificate` — learner certificate and print-to-PDF.
- `/verify/AX-YYYY-XXXXXX` — public certificate verification.
- `/automatex/course/help` and `/automatex/privacy` — help and draft privacy notice.

## Guardrails implemented

- Existing Supabase Auth is required for the learner dashboard and all course APIs.
- The course's `ax_*` tables use RLS. Learners cannot directly read question banks, correct options, exam attempt rows, answer keys, chat history or private support records. Trusted server routes use the service-role client.
- Placement scoring, module-test grading, final-exam grading, certificate creation and discount creation happen on the server. The browser never submits a score or receives correct answers before submission.
- Module tests draw five standard questions and three scenarios, randomise option order and allow retakes. Learners progress through module tests in order. Confident learners may skip lesson cards by attempting the module test first.
- The final exam requires all eight module tests passed and the certificate name saved. It draws 30 of 60 questions with at least three from each module, randomises question and option order, and prefers questions not seen in a cancelled attempt. It uses a server expiry timestamp of 45 minutes.
- Exam answers save server-side. Heartbeats update the server's last-seen time. If the learner does not reconnect within three minutes, the attempt is voided; module results and profile remain. A new attempt is drawn. A completed attempt cannot be retaken in the same course cycle.
- The final-exam finalizer is a restricted, transactional database function. It calculates the score itself and issues the certificate and eligible discount in the same transaction. A score below 60% offers a fresh course cycle or a link to other courses.
- Certificate verification exposes only certificate ID, learner name, course name, issue date and status. Revoked certificates remain findable and are marked invalid.
- Shaddie uses the course-bank persona, is server-side only, has a narrow course scope, refuses live-exam answers, is paused during an active final exam, has an atomic per-learner rate limit and stores a bounded conversation history.
- Support requests and Shaddie calls are rate-limited. Course mutation requests reject cross-site browser requests.
- Course emails include the placement-plan welcome, final-exam result, voided-exam notice, personalised 3-day and 10-day inactivity reminders, and a separate discount-expiry notice. Inactivity reminders are capped at two. Each course email includes an unsubscribe link and privacy-note link; the unsubscribe action requires confirmation.
- Only the username is requested at enrolment. The learner supplies one additional field near the end: the full name to print on the certificate. Enrolment requires age-16+ confirmation and acknowledgment of the privacy note; no date of birth or country is collected.

## Install and load the course bank

Run these commands from the project root. The source Word bank is included under `scripts/` and is excluded from Git commits by `.gitignore`; the generated JSON containing answer keys is also excluded.

```bash
npm ci
py -m pip install -r requirements-course.txt
```

Create `.env.local` from `.env.example`. Set the existing Supabase project URL and publishable/anon key, and add the server-only values below. Never prefix secret keys with `NEXT_PUBLIC_` and never paste them into chat or commit them.

Required for course operation:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only; used by trusted course routes and the loader)
- `NEXT_PUBLIC_SITE_URL`

Required for optional integrations:

- `DEEPSEEK_API_KEY` and optional `DEEPSEEK_MODEL` — Shaddie
- `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, optional `BREVO_SENDER_NAME` and `PROJECT_ENQUIRY_TO` — course emails and support notifications
- `CRON_SECRET` — protects the Vercel inactivity-reminder cron route

The loader reads `.env.local` itself. Then run:

```bash
npm run automatex:extract
npm run automatex:load
```

The extractor validates the bank before writing the JSON. Expected counts: 8 modules, 40 lesson cards, 184 module/scenario questions, 60 final-exam questions and 10 placement questions. The loader calls `ax_import_course_bank` as one transaction. Do not commit `scripts/automatex-course-bank.json`; it contains correct answers.

## Apply the course database migrations

The main-site migrations listed in the existing integration guide are already part of the site foundation. Do not rerun them.

Apply these two course-specific SQL files in order in the Supabase SQL Editor (or your normal migration workflow), after checking the selected project and taking the usual database backup:

1. `supabase/migrations/20261109150000_automatex_course.sql`
2. `supabase/migrations/20261109151000_automatex_guardrails_patch.sql`

The first creates the isolated course schema, restrictive RLS, private question/answer storage, certificate verification view, bank-import function and atomic final-exam finalizer. The second adds transactional module-test grading, sequential test enforcement support, atomic rate limits and revoked-certificate status. Run the course-bank loader only after both migrations succeed.

## Run locally and deploy

```bash
npm run build
npm run dev
```

The preparation environment used to assemble this handoff did not have `node_modules` installed and could not run a full Next.js build or live Supabase/DeepSeek/Brevo end-to-end tests. Run `npm ci` and `npm run build` locally before deploying. Resolve any build output before publishing.

For Vercel, add the same environment variables in Project Settings. `vercel.json` schedules `/api/automatex/cron/reminders` daily at 09:00 UTC (10:00 in Nigeria). Set `CRON_SECRET` in Vercel so the cron request is authenticated. Confirm the cron is enabled for the deployment you use.

## Not yet connected / owner actions

- Paystack and discount-code redemption are not integrated in this build. Discount codes are generated, displayed and expiry-reminded, but must be validated by the future paid-course checkout before any charge is taken.
- The WhatsApp support number and formal legal business name have not been supplied; the UI therefore uses `support@shaddies.space` and leaves the legal identity called out in the privacy draft.
- The certificate is currently a clean text-based Shaddies.Space design without a personal signature. The logo/signature decision is still open.
- The privacy notice is a plain-language draft, not a final legal policy. A Nigerian privacy lawyer must review the real provider agreements, international transfers, retention schedule, deletion process and legal operator details before launch.
- Brevo delivery and Shaddie remain inactive until the relevant server keys and verified sender are configured.

## Minimum release test checklist

- Register a new user, sign in, and verify an existing user can reach the course without a second account.
- Confirm a learner under 16 cannot enrol and that only username is collected at enrolment.
- Complete placement; verify the level thresholds and chosen pace.
- Try to jump directly to a later module/test; confirm the server rejects it until the previous module test is passed. Confirm Confident learners can skip lesson cards but not module tests.
- Inspect browser network responses: no correct option, answer key or exam pool is returned before submission.
- Retake a module test; verify each attempt draws a new random selection and option order, and only a server-calculated pass unlocks the next module.
- Complete the final exam with all eight module tests passed. Test answer saving, page refresh/resume, a reconnect inside three minutes, a reconnect after three minutes, a tab left for longer than three minutes, and the 45-minute expiry.
- Verify a voided exam can be restarted with a newly drawn set while module results remain. Verify a completed exam cannot be retaken in that course cycle.
- Test 59%, 60%, 75%, 89% and 90% score boundaries with a staging bank/test account; verify certificate and discount rules.
- Revoke a staging certificate and confirm its public verification page says it is no longer valid.
- Test Shaddie scope refusal, exam-answer refusal, rate limits and behavior while an exam is active.
- Test Brevo welcome/support/reminder delivery, both inactivity reminders, discount expiry reminder, unsubscribe confirmation and cron authentication.
- Review privacy copy with counsel and complete the outstanding owner details before public launch.
