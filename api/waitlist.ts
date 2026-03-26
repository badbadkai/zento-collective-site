import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-side Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      email,
      fullName,
      socialHandle,
      peakPerformance,
      tradingApproach,
      tradingDuration,
      trackingMethod,
      reviewFrequency,
      mainLimit,
      improvementArea,
      decisionStyle,
      learningStyle,
      trackingValue,
      upgradeIntent,
      source,
      // Legacy field — some older form versions send "name" instead of "fullName"
      name,
    } = req.body as Record<string, string | undefined>;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const { error } = await supabase.from('waitlist_signups').insert({
      email,
      name: fullName || name || null,
      source: source || 'landing_page',
      social_handle: socialHandle || null,
      peak_performance: peakPerformance || null,
      trading_approach: tradingApproach || null,
      trading_duration: tradingDuration || null,
      tracking_method: trackingMethod || null,
      review_frequency: reviewFrequency || null,
      main_limit: mainLimit || null,
      improvement_area: improvementArea || null,
      decision_style: decisionStyle || null,
      learning_style: learningStyle || null,
      tracking_value: trackingValue || null,
      upgrade_intent: upgradeIntent || null,
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
