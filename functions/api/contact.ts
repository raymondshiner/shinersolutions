interface Env {
  RESEND_API_KEY: string;
}

const MAX = { name: 200, business: 200, contact: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = await context.request.json();
  } catch {
    return json({ ok: false, error: "bad request" }, 400);
  }

  const field = (key: keyof typeof MAX) =>
    typeof body[key] === "string" ? (body[key] as string).trim().slice(0, MAX[key]) : "";

  // Honeypot: bots fill the hidden field — pretend success, send nothing.
  if (typeof body.website === "string" && body.website !== "") {
    return json({ ok: true });
  }

  const name = field("name");
  const business = field("business");
  const contact = field("contact");
  const message = field("message");

  if (!name || !contact || !message) {
    return json({ ok: false, error: "missing fields" }, 400);
  }

  const text = [
    `Name:     ${name}`,
    `Business: ${business || "—"}`,
    `Contact:  ${contact}`,
    "",
    message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Shiner Solutions <hello@shinersolutions.com>",
      to: ["hello@shinersolutions.com"],
      ...(EMAIL_RE.test(contact) ? { reply_to: contact } : {}),
      subject: `New inquiry — ${name}${business ? ` (${business})` : ""}`,
      text,
    }),
  });

  if (!res.ok) {
    return json({ ok: false, error: "delivery failed" }, 502);
  }
  return json({ ok: true });
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
