export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Incoming body:", body);

    const response = await fetch(
      "https://signl.shaddies.space/webhook/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    console.log("n8n status:", response.status);

    const text = await response.text();
    console.log("n8n response:", text);

    return new Response(
      JSON.stringify({ success: response.ok }),
      { status: response.ok ? 200 : 500 }
    );
  } catch (error) {
    console.error("API route error:", error);
    return new Response(
      JSON.stringify({ success: false }),
      { status: 500 }
    );
  }
}