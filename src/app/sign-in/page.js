"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";

export default function SignInPage() {
  const [mode, setMode] = useState("signin");
  const [stage, setStage] = useState("details");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  function resetFeedback() { setMessage(""); setError(false); }

  async function signIn(event) {
    event.preventDefault(); setLoading(true); resetFeedback();
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (authError) throw authError;
      window.location.assign("/learn");
    } catch (err) {
      setError(true); setMessage(err.message || "We could not sign you in. Check your email and password.");
    } finally { setLoading(false); }
  }

  async function sendRegistrationCode(event) {
    event.preventDefault(); setLoading(true); resetFeedback();
    try {
      const response = await fetch("/api/auth/register/send-code", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "We could not send your code.");
      setStage("code"); setMessage("Your verification code has been sent. It expires in 10 minutes.");
    } catch (err) { setError(true); setMessage(err.message || "We could not send your code. Try again."); }
    finally { setLoading(false); }
  }

  async function resendRegistrationCode() {
    setLoading(true); resetFeedback();
    try {
      const response = await fetch("/api/auth/register/send-code", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "We could not resend your code.");
      setMessage("A new verification code has been sent. The previous code is no longer valid.");
    } catch (err) { setError(true); setMessage(err.message || "We could not resend your code. Try again shortly."); }
    finally { setLoading(false); }
  }

  async function verifyRegistrationCode(event) {
    event.preventDefault(); setLoading(true); resetFeedback();
    try {
      const response = await fetch("/api/auth/register/verify-code", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), code, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "We could not verify that code.");
      if (response.status === 201) {
        setMode("signin"); setStage("details"); setPassword(""); setCode("");
        setMessage(data.error || "Your account was created. Sign in with your new password.");
        return;
      }
      window.location.assign(data.redirectTo || "/learn");
    } catch (err) { setError(true); setMessage(err.message || "That code could not be verified. Request a new one and try again."); }
    finally { setLoading(false); }
  }

  function changeMode(nextMode) {
    setMode(nextMode); setStage("details"); setCode(""); setPassword(""); resetFeedback();
  }

  return <><Navbar /><main className="page-shell px-5 sm:px-6 py-20"><div className="max-w-md mx-auto"><div className="surface-card p-6 sm:p-8">
    <p className="eyebrow mb-4">Your learning account</p>
    <h1 className="text-3xl font-semibold mb-3" style={{ color: "var(--text)" }}>{mode === "signup" ? "Create your account." : "Welcome back."}</h1>
    <p className="text-sm leading-relaxed mb-7" style={{ color: "var(--muted)" }}>{mode === "signup" ? "Create one account for Shaddies.Space. We'll email you a six-digit code, then you can set up your password and continue." : "Sign in with the email address and password you registered with."}</p>

    <div className="grid grid-cols-2 gap-2 p-1 rounded-xl mb-7" style={{ background: "var(--surface, rgba(127,127,127,.10))" }}>
      <button type="button" onClick={() => changeMode("signin")} className="rounded-lg py-2.5 text-sm font-medium" style={{ background: mode === "signin" ? "var(--card, rgba(255,255,255,.10))" : "transparent", color: "var(--text)" }}>Sign in</button>
      <button type="button" onClick={() => changeMode("signup")} className="rounded-lg py-2.5 text-sm font-medium" style={{ background: mode === "signup" ? "var(--card, rgba(255,255,255,.10))" : "transparent", color: "var(--text)" }}>Create account</button>
    </div>

    {mode === "signin" ? <form onSubmit={signIn} className="space-y-5">
      <div><label className="field-label" htmlFor="signin-email">Email address</label><input id="signin-email" className="field-control" type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></div>
      <div><label className="field-label" htmlFor="signin-password">Password</label><input id="signin-password" className="field-control" type="password" required autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" /></div>
      <button className="btn btn-primary" disabled={loading}>{loading ? "SIGNING IN…" : "SIGN IN"}</button>
    </form> : stage === "details" ? <form onSubmit={sendRegistrationCode} className="space-y-5">
      <div><label className="field-label" htmlFor="signup-email">Email address</label><input id="signup-email" className="field-control" type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></div>
      <div><label className="field-label" htmlFor="signup-password">Choose a password</label><input id="signup-password" className="field-control" type="password" required minLength={10} autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 10 characters" /><p className="text-xs mt-2" style={{ color: "var(--muted)" }}>Use at least 10 characters. Your password is not emailed or stored in the verification challenge.</p></div>
      <button className="btn btn-primary" disabled={loading}>{loading ? "SENDING CODE…" : "EMAIL ME A VERIFICATION CODE"}</button>
    </form> : <form onSubmit={verifyRegistrationCode} className="space-y-5">
      <div><p className="text-sm mb-3" style={{ color: "var(--muted)" }}>Enter the six-digit code sent to <strong style={{ color: "var(--text)" }}>{email}</strong>.</p><label className="field-label" htmlFor="signup-code">Verification code</label><input id="signup-code" className="field-control text-center tracking-[.35em] text-xl" inputMode="numeric" autoComplete="one-time-code" maxLength={6} minLength={6} required value={code} onChange={e => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="000000" /></div>
      <button className="btn btn-primary" disabled={loading || code.length !== 6}>{loading ? "VERIFYING…" : "VERIFY EMAIL & CREATE ACCOUNT"}</button>
      <button type="button" onClick={resendRegistrationCode} disabled={loading} className="w-full text-sm disabled:opacity-50" style={{ color: "var(--neon)" }}>{loading ? "SENDING…" : "Resend verification code"}</button>
      <button type="button" onClick={() => { setStage("details"); setCode(""); resetFeedback(); }} className="w-full text-sm" style={{ color: "var(--muted)" }}>Back to account details</button>
    </form>}

    {message && <p role="status" className="text-sm mt-5" style={{ color: error ? "#d65b5b" : "var(--neon)" }}>{message}</p>}
    <p className="text-xs leading-relaxed mt-8" style={{ color: "var(--muted)" }}>By continuing, you agree to our <Link href="/privacy" className="underline" style={{ color: "var(--neon)" }}>privacy notice</Link>. Your account works across Shaddies.Space and its learning experience.</p>
  </div></div></main><Footer /></>;
}
