interface Env {
  RESEND_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const { name, email, project } = (await context.request.json()) as {
      name: string;
      email: string;
      project: string;
    };

    if (!name || !email || !project) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const isGmail = email.toLowerCase().endsWith("@gmail.com");
    const tag = isGmail ? "[Gmail]" : "[Non-Gmail]";

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <noreply@richparrish.dev>",
        to: "richparrishx@gmail.com",
        subject: `${tag} Beta Access Request: ${project} — ${name}`,
        html: `
          <h2>Beta Access Request</h2>
          <p><strong>Project:</strong> ${project}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Type:</strong> ${isGmail ? "Gmail (can add as test user directly)" : "Non-Gmail (may need Google Account linking)"}</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        `,
      }),
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};
