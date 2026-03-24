import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const { name, email, project } = await request.json();

  if (!name || !email || !project) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });
  }

  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "Portfolio <noreply@richparrish.dev>",
    to: "lacunadev@googlegroups.com",
    subject: `Beta Access Request: ${project}`,
    text: `Name: ${name}\nEmail: ${email}\nProject: ${project}`,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
