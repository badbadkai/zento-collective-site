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
    const { full_name, email, discord, programme_interest, trading_experience, prop_firm_history, biggest_challenge } = req.body;

    if (!full_name || !email || !discord || !biggest_challenge) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const { error } = await supabase.from('bootcamp_waitlist').insert({
      full_name,
      email: normalizedEmail,
      discord,
      programme_interest: programme_interest || null,
      trading_experience: trading_experience || null,
      prop_firm_history: prop_firm_history || null,
      biggest_challenge,
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: 'Failed to save application' });
    }

    // Send confirmation email (non-blocking)
    const { sendEmail } = await import('./_lib/email');
    const { bootcampWaitlistConfirmation } = await import('./_lib/templates');
    sendEmail({
      to: normalizedEmail,
      subject: "Bootcamp application received — Zentō Collective",
      html: bootcampWaitlistConfirmation(full_name),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Bootcamp waitlist handler error:', err);
    return res.status(400).json({ error: 'Invalid request' });
  }
}
