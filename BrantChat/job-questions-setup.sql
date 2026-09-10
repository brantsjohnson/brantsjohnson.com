-- Create job_questions table for storing AI-generated questions
CREATE TABLE IF NOT EXISTS job_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id TEXT NOT NULL,
  text TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_job_questions_job_id ON job_questions(job_id);
CREATE INDEX IF NOT EXISTS idx_job_questions_approved ON job_questions(approved);

-- Enable RLS (Row Level Security)
ALTER TABLE job_questions ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access (you'll need to adjust this based on your auth setup)
CREATE POLICY "Admin can manage job questions" ON job_questions
  FOR ALL USING (true); -- For now, allow all access - you can restrict this later

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_job_questions_updated_at 
  BEFORE UPDATE ON job_questions 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
