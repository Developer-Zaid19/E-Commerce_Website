const UPSTREAM_EMBED_ENDPOINT = "http://localhost:8000/api/embed/";

export async function POST(request) {
  try {
    const body = await request.json();
    const text = typeof body?.text === "string" ? body.text.trim() : "";

    if (!text) {
      return Response.json({ error: "Search text is required" }, { status: 400 });
    }

    const upstream = await fetch(UPSTREAM_EMBED_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const payload = await upstream.json();

    return Response.json(payload, {
      status: upstream.status,
    });
  } catch (error) {
    return Response.json(
      {
        error: "Unable to fetch embedding",
        detail: error.message,
      },
      { status: 502 },
    );
  }
}
