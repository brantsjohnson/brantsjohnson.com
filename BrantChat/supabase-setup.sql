-- Create the chat_logs table
CREATE TABLE IF NOT EXISTS chat_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  timestamp TIMESTAMPTZ NOT NULL,
  company TEXT NOT NULL,
  job_role JSONB,
  user_message TEXT NOT NULL,
  response_length INTEGER NOT NULL,
  token_usage JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on timestamp for better query performance
CREATE INDEX IF NOT EXISTS idx_chat_logs_timestamp ON chat_logs(timestamp DESC);

-- Create an index on company for filtering
CREATE INDEX IF NOT EXISTS idx_chat_logs_company ON chat_logs(company);

-- Create an index on created_at for ordering
CREATE INDEX IF NOT EXISTS idx_chat_logs_created_at ON chat_logs(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows service role to do everything
CREATE POLICY "Service role can do everything" ON chat_logs
  FOR ALL USING (auth.role() = 'service_role');

-- Create a policy for authenticated users to read data (for admin access)
CREATE POLICY "Authenticated users can read chat logs" ON chat_logs
  FOR SELECT USING (auth.role() = 'authenticated');
