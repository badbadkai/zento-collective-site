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
    const { email } = req.body;

    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: 'Valid email required' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if email exists in enrollments
    const { data: enrollments, error: enrollErr } = await supabase
      .from('enrollments')
      .select('id')
      .eq('email', normalizedEmail)
      .limit(1);

    if (enrollErr) {
      console.error('Whitelist check error:', enrollErr);
      return res.status(500).json({ error: 'Failed to check registration' });
    }

    if (enrollments && enrollments.length > 0) {
      return res.status(200).json({ allowed: true });
    }

    // Also check if this email belongs to an existing admin
    const { data: users } = await supabase.auth.admin.listUsers();
    const existingUser = users?.users?.find(u => u.email?.toLowerCase() === normalizedEmail);

    if (existingUser) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', existingUser.id)
        .single();

      if (profile?.role === 'admin') {
        return res.status(200).json({ allowed: true });
      }
    }

    return res.status(200).json({ allowed: false });
  } catch (err) {
    console.error('Whitelist handler error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
