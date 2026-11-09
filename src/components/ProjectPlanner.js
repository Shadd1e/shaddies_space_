"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, LoaderCircle, Sparkles, RotateCcw } from "lucide-react";

const steps = [
  { key: "idea", title: "Start with the idea", prompt: "What are you thinking of building?", placeholder: "Describe the idea in your own words. It does not need to be fully formed.", type: "textarea" },
  { key: "problem", title: "The problem behind it", prompt: "What problem should this solve?", placeholder: "What is frustrating, slow, expensive or currently difficult?", type: "textarea" },
  { key: "audience", title: "Who is it for?", prompt: "Who would use or benefit from it?", placeholder: "Customers, staff, a community, your own team…", type: "text" },
  { key: "outcome", title: "The outcome you want", prompt: "What would success look like?", placeholder: "What should become easier, faster or possible?", type: "textarea" },
  { key: "constraints", title: "Anything else to consider?", prompt: "Share any tools, budget, timing or constraints you already know.", placeholder: "Optional — existing tools, integrations, deadline, budget, or what you are unsure about.", type: "textarea", optional: true },
];

export default function ProjectPlanner() {
  const [answers, setAnswers] = useState({ idea: "", problem: "", audience: "", outcome: "", constraints: "" });
  const [step, setStep] = useState(0);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const current = steps[step];
  const update = (value) => setAnswers((prev) => ({ ...prev, [current.key]: value }));

  async function generate() {
    setLoading(true); setError(""); setResult("");
    try {
      const response = await fetch("/api/project-planner", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(answers) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The project outline could not be generated. Please try again.");
      setResult(data.result);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  const canContinue = current.optional || answers[current.key].trim().length >= 8;
  return <div className="surface-card p-5 sm:p-7">
    {!result ? <>
      <div className="flex items-center justify-between gap-4 mb-6"><div><p className="eyebrow mb-2">Project idea explorer</p><h3 className="text-xl font-semibold" style={{ color: "var(--text)" }}>{current.title}</h3></div><span className="mono text-xs shrink-0" style={{ color: "var(--muted)" }}>{String(step + 1).padStart(2, "0")} / 05</span></div>
      <div className="h-1.5 rounded-full overflow-hidden mb-8" style={{ background: "var(--bg2)" }}><div className="h-full rounded-full transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%`, background: "var(--neon)" }} /></div>
      <label className="field-label" htmlFor={`planner-${current.key}`}>{current.prompt}</label>
      {current.type === "textarea" ? <textarea id={`planner-${current.key}`} className="field-control min-h-36 resize-y" value={answers[current.key]} onChange={(e) => update(e.target.value)} placeholder={current.placeholder} /> : <input id={`planner-${current.key}`} className="field-control" value={answers[current.key]} onChange={(e) => update(e.target.value)} placeholder={current.placeholder} />}
      <p className="text-xs mt-3" style={{ color: "var(--muted)" }}>{current.optional ? "You can leave this blank." : "A few honest sentences are enough. You can refine the idea later."}</p>
      {error && <p role="alert" className="text-sm mt-4" style={{ color: "#d65b5b" }}>{error}</p>}
      <div className="flex items-center justify-between gap-3 mt-8">
        <button type="button" className="btn btn-secondary !w-auto !px-5 !py-3" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}><ArrowLeft size={16} className="mr-2" />Back</button>
        {step < steps.length - 1 ? <button type="button" className="btn btn-primary !w-auto !px-5 !py-3" disabled={!canContinue} onClick={() => setStep(s => s + 1)}>Continue <ArrowRight size={16} className="ml-2" /></button> : <button type="button" className="btn btn-primary !w-auto !px-5 !py-3" disabled={!canContinue || loading} onClick={generate}>{loading ? <><LoaderCircle size={16} className="mr-2 animate-spin" />Thinking…</> : <><Sparkles size={16} className="mr-2" />Explore my idea</>}</button>}
      </div>
    </> : <>
      <div className="flex items-center gap-3 mb-5"><span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "color-mix(in srgb, var(--neon) 12%, transparent)", color: "var(--neon)" }}><Sparkles size={19} /></span><div><p className="eyebrow">Your first-pass project brief</p><h3 className="font-semibold" style={{ color: "var(--text)" }}>A place to start.</h3></div></div>
      <div className="planner-result text-sm leading-7 whitespace-pre-wrap" style={{ color: "var(--text)" }}>{result}</div>
      <div className="mt-7 p-4 rounded-xl" style={{ background: "var(--bg2)" }}><p className="font-semibold mb-1" style={{ color: "var(--text)" }}>Want to take this further?</p><p className="text-sm" style={{ color: "var(--muted)" }}>This is an early exploration, not a final specification or estimate. Let's discuss the details and work out what it would take to build properly.</p><a className="inline-flex mt-4 font-semibold" style={{ color: "var(--neon)" }} href="/build-with-me#project-enquiry">Talk through this project →</a></div>
      <button type="button" onClick={() => { setResult(""); setError(""); setStep(0); }} className="mt-6 text-sm inline-flex items-center gap-2" style={{ color: "var(--muted)" }}><RotateCcw size={14} /> Start another idea</button>
    </>}
  </div>;
}
