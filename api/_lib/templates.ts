const BRAND_COLOR = "#d4a033";

function wrap(body: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#0f1115;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <span style="font-size:12px;font-weight:600;letter-spacing:3px;color:${BRAND_COLOR};text-transform:uppercase;">Zent&#333; Collective</span>
    </div>
    ${body}
    <div style="margin-top:40px;padding-top:20px;border-top:1px solid #222;text-align:center;">
      <p style="font-size:12px;color:#666;margin:0;">Zent&#333; Collective &mdash; Trading Accelerator Programme</p>
    </div>
  </div>
</body>
</html>`;
}

export function waitlistConfirmation(name: string): string {
  return wrap(`
    <h1 style="font-size:24px;color:#fff;margin:0 0 16px;">You're on the list, ${name || "trader"}.</h1>
    <p style="font-size:15px;color:#aaa;line-height:1.6;margin:0 0 16px;">
      We've received your application. When the next cohort opens, you'll be among the first to know.
    </p>
    <p style="font-size:15px;color:#aaa;line-height:1.6;margin:0 0 24px;">
      In the meantime, join the community on Discord to connect with other traders.
    </p>
    <div style="text-align:center;">
      <a href="https://discord.gg/PeNwXwknz2" style="display:inline-block;background:${BRAND_COLOR};color:#0f1115;font-weight:600;font-size:14px;padding:12px 28px;border-radius:8px;text-decoration:none;">Join Discord</a>
    </div>
  `);
}

export function bootcampWaitlistConfirmation(name: string): string {
  return wrap(`
    <h1 style="font-size:24px;color:#fff;margin:0 0 16px;">Application received, ${name}.</h1>
    <p style="font-size:15px;color:#aaa;line-height:1.6;margin:0 0 16px;">
      Your bootcamp application is in. We review applications in batches and will reach out when the next cohort is confirmed.
    </p>
    <p style="font-size:15px;color:#aaa;line-height:1.6;margin:0 0 24px;">
      While you wait, join the Discord community. It's where enrolled students and applicants connect.
    </p>
    <div style="text-align:center;">
      <a href="https://discord.gg/PeNwXwknz2" style="display:inline-block;background:${BRAND_COLOR};color:#0f1115;font-weight:600;font-size:14px;padding:12px 28px;border-radius:8px;text-decoration:none;">Join Discord</a>
    </div>
  `);
}

export function newsletterConfirmation(): string {
  return wrap(`
    <h1 style="font-size:24px;color:#fff;margin:0 0 16px;">You're subscribed.</h1>
    <p style="font-size:15px;color:#aaa;line-height:1.6;margin:0;">
      You'll receive trading insights, frameworks, and updates from Zent&#333; Collective. No spam, no fluff.
    </p>
  `);
}

export function contactNotification(opts: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return wrap(`
    <h1 style="font-size:24px;color:#fff;margin:0 0 16px;">New Contact Submission</h1>
    <div style="background:#1a1a1f;border-radius:8px;padding:20px;margin:0 0 16px;">
      <p style="font-size:13px;color:#888;margin:0 0 4px;">From</p>
      <p style="font-size:15px;color:#fff;margin:0 0 16px;">${opts.name} &lt;${opts.email}&gt;</p>
      <p style="font-size:13px;color:#888;margin:0 0 4px;">Subject</p>
      <p style="font-size:15px;color:#fff;margin:0 0 16px;">${opts.subject}</p>
      <p style="font-size:13px;color:#888;margin:0 0 4px;">Message</p>
      <p style="font-size:15px;color:#ddd;line-height:1.6;margin:0;white-space:pre-wrap;">${opts.message}</p>
    </div>
    <p style="font-size:13px;color:#666;margin:0;">Reply directly to ${opts.email}</p>
  `);
}

export function contactAutoReply(name: string): string {
  return wrap(`
    <h1 style="font-size:24px;color:#fff;margin:0 0 16px;">Message received, ${name}.</h1>
    <p style="font-size:15px;color:#aaa;line-height:1.6;margin:0;">
      We've received your message and will get back to you as soon as possible. For urgent questions, reach out on <a href="https://discord.gg/PeNwXwknz2" style="color:${BRAND_COLOR};">Discord</a>.
    </p>
  `);
}
