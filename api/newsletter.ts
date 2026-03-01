import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-side Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, source } = req.body as {
      email?: string;
      source?: string;
    };

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const { error } = await supabase.from('newsletter_signups').insert({
      email,
      source: source || 'website',
    });

    if (error) {
      // PostgreSQL unique violation — duplicate email
      if (error.code === '23505') {
        return res.status(409).json({ error: 'This email is already subscribed' });
      }

      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: 'Failed to save signup' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Newsletter handler error:', err);
    return res.status(400).json({ error: 'Invalid request' });
  }
}
