# Supabase Setup for BrantChat Analytics

This guide will help you set up Supabase to track and analyze chat interactions in BrantChat.

## Prerequisites

- A Supabase account (free tier is sufficient)
- Node.js and npm installed
- Your BrantChat project set up

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `brantchat-analytics` (or any name you prefer)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the region closest to you
6. Click "Create new project"
7. Wait for the project to be created (this takes a few minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://` and ends with `.supabase.co`)
   - **anon public** (long JWT token starting with `eyJ`)
   - **service_role** (long JWT token starting with `eyJ`)

## Step 3: Set Up the Database

1. In your Supabase project, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `supabase-setup.sql` (included in this project)
4. Click "Run" to execute the SQL script
5. You should see "Success. No rows returned" if everything worked

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Replace the placeholder values with your actual Supabase credentials.

## Step 5: Test the Setup

Run the setup script to verify everything is working:

```bash
npm run setup-supabase
```

This script will:
- Check if your environment variables are set correctly
- Test the connection to Supabase
- Try to insert a test log entry
- Verify the setup is working

## Step 6: Deploy to Vercel

1. Add the same environment variables to your Vercel project:
   - Go to your Vercel dashboard
   - Select your BrantChat project
   - Go to **Settings** → **Environment Variables**
   - Add the three Supabase variables

2. Redeploy your project:
   ```bash
   vercel --prod
   ```

## What This Setup Provides

Once configured, your BrantChat will automatically:

- **Log every chat interaction** to Supabase
- **Track user questions** and company information
- **Record token usage** for cost monitoring
- **Store job role context** when available
- **Provide real-time analytics** in the admin panel

## Viewing Your Data

You can view your chat analytics in several ways:

1. **Admin Panel**: Visit `/admin/analytics` in your BrantChat app
2. **Supabase Dashboard**: Go to your Supabase project → **Table Editor** → `chat_logs`
3. **Supabase SQL Editor**: Run custom queries to analyze your data

## Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Make sure your `.env.local` file exists and has the correct variables
   - Check that the variable names match exactly (case-sensitive)

2. **"chat_logs table not found"**
   - Make sure you ran the SQL script in the Supabase SQL Editor
   - Check that the script executed without errors

3. **"Error connecting to Supabase"**
   - Verify your Project URL and API keys are correct
   - Make sure your Supabase project is active (not paused)

4. **"Error inserting test log"**
   - Check that the `chat_logs` table was created properly
   - Verify your service role key has the correct permissions

### Getting Help

If you encounter issues:

1. Check the Supabase logs in your project dashboard
2. Run `npm run setup-supabase` again to test the connection
3. Verify your environment variables are set correctly
4. Make sure your Supabase project is not paused

## Database Schema

The `chat_logs` table includes:

- `id`: Unique identifier (UUID)
- `timestamp`: When the interaction occurred
- `company`: Company name from the access code
- `job_role`: JSON object with job details (if applicable)
- `user_message`: The user's question
- `response_length`: Length of the AI response
- `token_usage`: OpenAI token usage statistics
- `created_at`: Database insertion timestamp

## Security

- Row Level Security (RLS) is enabled
- Only the service role can insert data
- Authenticated users can read data (for admin access)
- All API keys should be kept secure and not committed to version control
