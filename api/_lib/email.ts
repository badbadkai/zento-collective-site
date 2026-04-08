import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_ADDRESS = "Zentō Collective <noreply@zentocollective.com>";

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping email send");
    return;
  }

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  } catch (err) {
    // Log but don't fail the request — email is best-effort
    console.error("Email send error:", err);
  }
}

export async function sendNotification(options: {
  subject: string;
  html: string;
}) {
  // Notify admin of new signups
  await sendEmail({
    to: "support@zentocollective.com",
    subject: options.subject,
    html: options.html,
  });
}
