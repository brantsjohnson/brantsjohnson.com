#!/usr/bin/env node

/**
 * Supabase Setup Script for BrantChat
 * 
 * This script helps you set up Supabase for chat analytics.
 * 
 * Steps to complete:
 * 1. Create a Supabase project at https://supabase.com
 * 2. Get your project URL and API keys from the project settings
 * 3. Run the SQL script in your Supabase SQL editor
 * 4. Update your .env.local file with the Supabase credentials
 * 5. Run this script to test the connection
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function setupSupabase() {
  console.log('🚀 Setting up Supabase for BrantChat...\n')
  console.log('📋 Your Supabase Project: https://trutmlhciqhggumamalg.supabase.co\n')

  // Check if environment variables are set
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
    console.error('❌ Missing Supabase environment variables!')
    console.log('\nPlease add the following to your .env.local file:')
    console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url')
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key')
    console.log('SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key')
    console.log('\nYou can find these values in your Supabase project settings.')
    return
  }

  // Test connection with service role
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  try {
    // Test the connection by trying to read from chat_logs table
    const { data, error } = await supabase
      .from('chat_logs')
      .select('count')
      .limit(1)

    if (error) {
      if (error.code === 'PGRST116') {
        console.log('⚠️  chat_logs table not found. Please run the SQL script in your Supabase SQL editor.')
        console.log('📄 SQL script location: supabase-setup.sql')
        return
      }
      throw error
    }

    console.log('✅ Supabase connection successful!')
    console.log(`📊 Found ${data?.length || 0} chat log entries`)
    
    // Test inserting a sample log entry
    const testLog = {
      timestamp: new Date().toISOString(),
      company: 'test-company',
      user_message: 'Test message from setup script',
      response_length: 100,
      token_usage: { prompt_tokens: 50, completion_tokens: 50, total_tokens: 100 }
    }

    const { error: insertError } = await supabase
      .from('chat_logs')
      .insert([testLog])

    if (insertError) {
      console.error('❌ Error inserting test log:', insertError.message)
      return
    }

    console.log('✅ Test log entry inserted successfully!')
    console.log('\n🎉 Supabase setup complete! Your chat analytics should now work.')
    console.log('💡 You can view your data in the Supabase dashboard or through the admin panel.')

  } catch (error) {
    console.error('❌ Error connecting to Supabase:', error.message)
    console.log('\nPlease check your Supabase credentials and try again.')
  }
}

setupSupabase()
