import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const fields = ["idea", "problem", "audience", "outcome", "constraints"];
    const input = Object.fromEntries(fields.map(key => [key, typeof body[key] === "string" ? body[key].trim().slice(0, 5000) : ""]));
    if (input.idea.length < 8 || input.problem.length < 8 || input.audience.length < 3 || input.outcome.length < 8) {
      return NextResponse.json({ error: "Please complete the required idea, problem, audience and outcome fields." }, { status: 400 });
    }
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "The project-planning assistant is not connected yet. Please use the project enquiry form or email us while it is being configured." }, { status: 503 });

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
        temperature: 0.55,
        max_tokens: 1400,
        messages: [
          { role: "system", content: "You are the preliminary project discovery assistant for Shaddies.Space. Help a person shape an early idea into a practical first-pass exploration. Be thoughtful and specific, not salesy. Do not invent prices, timelines, capabilities, facts or guarantees. Do not claim this is a full specification or technical estimate. Explain uncertainty and assumptions. Recommend a human discovery conversation with Shaddies.Space at the end. Use these concise headings: THE IDEA, THE PROBLEM TO SOLVE, A POSSIBLE DIRECTION, FIRST VERSION (MVP), QUESTIONS TO RESOLVE, RISKS AND DEPENDENCIES, A GOOD NEXT STEP. Keep it around 500-700 words maximum. Use plain language." },
          { role: "user", content: `Explore this project idea:\n\nIdea: ${input.idea}\nProblem: ${input.problem}\nAudience: ${input.audience}\nDesired outcome: ${input.outcome}\nKnown tools, budget, timing or constraints: ${input.constraints || "Not specified"}` },
        ],
      }),
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: "The planning assistant could not complete that request. Please try again or contact us." }, { status: 502 });
    const result = data.choices?.[0]?.message?.content;
    if (!result) return NextResponse.json({ error: "The planning assistant returned an empty response. Please try again." }, { status: 502 });
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: "We could not process that idea. Please try again." }, { status: 500 });
  }
}
