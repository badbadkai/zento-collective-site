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
    const { email, name, source } = req.body as {
      email?: string;
      name?: string;
      source?: string;
    };

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const { error } = await supabase.from('waitlist_signups').insert({
      email,
      name: name || null,
      source: source || 'landing_page',
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: 'Failed to save signup' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Waitlist handler error:', err);
    return res.status(400).json({ error: 'Invalid request' });
  }
}
