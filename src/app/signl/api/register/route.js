export async function POST(req) {
  try {
    const body = await req.json();   // Postman sends JSON

    const response = await fetch(
      "https://signl.shaddies.space/webhook/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const text = await response.text();

    if (!response.ok) {
      console.error("n8n returned:", response.status, text);
      return new Response(
        JSON.stringify({ error: text }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (err) {
    console.error("API error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}