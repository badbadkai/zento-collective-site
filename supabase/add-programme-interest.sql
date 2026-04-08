-- Add programme_interest column to bootcamp_waitlist
-- Tracks whether the applicant is interested in the Accelerator or Bootcamp
ALTER TABLE bootcamp_waitlist
ADD COLUMN IF NOT EXISTS programme_interest TEXT DEFAULT NULL;
