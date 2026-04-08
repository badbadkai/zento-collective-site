import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body as Record<string, string | undefined>;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Save to Supabase
    const { error } = await supabase.from('contact_submissions').insert({
      name,
      email: normalizedEmail,
      subject,
      message,
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: 'Failed to save message' });
    }

    // Send notification to admin + auto-reply to user (non-blocking)
    const { sendEmail, sendNotification } = await import('./_lib/email.js');
    const { contactNotification, contactAutoReply } = await import('./_lib/templates.js');

    sendNotification({
      subject: `Contact: ${subject}`,
      html: contactNotification({ name, email: normalizedEmail, subject, message }),
    });

    sendEmail({
      to: normalizedEmail,
      subject: "Message received — Zentō Collective",
      html: contactAutoReply(name),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(400).json({ error: 'Invalid request' });
  }
}
