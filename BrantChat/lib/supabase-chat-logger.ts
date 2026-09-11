import { supabaseAdmin } from './supabase'

export interface ChatLogEntry {
  id?: string
  timestamp: string
  company: string
  job_role?: {
    position: string
    company: string
    requirements?: string
    responsibilities?: string
    keySkills?: string
  }
  user_message: string
  response_length: number
  token_usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
  device_info?: {
    type: 'Mobile' | 'Desktop'
    browser: string
    os: string
    userAgent: string
  }
  created_at?: string
}

export async function logChatInteraction(
  company: string,
  userMessage: string,
  responseLength: number,
  jobRole?: any,
  tokenUsage?: any,
  deviceInfo?: any
): Promise<void> {
  try {
    console.log(`🔄 Attempting to log chat interaction for ${company}...`)
    
    const logEntry: Omit<ChatLogEntry, 'id' | 'created_at'> = {
      timestamp: new Date().toISOString(),
      company,
      user_message: userMessage,
      response_length: responseLength,
      token_usage: tokenUsage,
      device_info: deviceInfo,
      ...(jobRole && {
        job_role: {
          position: jobRole.position || 'Not specified',
          company: jobRole.company || company,
          requirements: jobRole.requirements,
          responsibilities: jobRole.responsibilities,
          keySkills: jobRole.keySkills
        }
      })
    }

    console.log('📝 Log entry prepared:', {
      company: logEntry.company,
      messageLength: logEntry.user_message.length,
      responseLength: logEntry.response_length,
      hasJobRole: !!logEntry.job_role
    })

    const { data, error } = await supabaseAdmin
      .from('chat_logs')
      .insert([logEntry])
      .select()

    if (error) {
      console.error('❌ Supabase insert error:', error)
      throw error
    }

    console.log(`✅ Successfully logged chat interaction to Supabase: ${company} - "${userMessage.substring(0, 50)}..."`)
    console.log('📊 Inserted record ID:', data?.[0]?.id)
  } catch (error) {
    console.error('❌ Error logging chat interaction:', error)
    // Don't throw - logging failure shouldn't break the chat
  }
}

export async function getChatLogs(): Promise<ChatLogEntry[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('chat_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1000) // Limit to last 1000 entries

    if (error) {
      console.error('Error fetching chat logs from Supabase:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching chat logs:', error)
    return []
  }
}

export async function getChatAnalytics() {
  try {
    const logs = await getChatLogs()
    
    // Most common questions
    const questionCounts: { [key: string]: number } = {}
    logs.forEach(log => {
      const question = log.user_message.toLowerCase().trim()
      questionCounts[question] = (questionCounts[question] || 0) + 1
    })
    
    const topQuestions = Object.entries(questionCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([question, count]) => ({ question, count }))

    // Company breakdown
    const companyCounts: { [key: string]: number } = {}
    logs.forEach(log => {
      companyCounts[log.company] = (companyCounts[log.company] || 0) + 1
    })

    // Job role breakdown
    const jobRoleCounts: { [key: string]: number } = {}
    logs.forEach(log => {
      if (log.job_role?.position) {
        const role = `${log.job_role.position} at ${log.job_role.company}`
        jobRoleCounts[role] = (jobRoleCounts[role] || 0) + 1
      }
    })

    return {
      totalInteractions: logs.length,
      topQuestions,
      companyBreakdown: companyCounts,
      jobRoleBreakdown: jobRoleCounts,
      recentLogs: logs.slice(0, 20) // First 20 (most recent due to ordering)
    }
  } catch (error) {
    console.error('Error generating chat analytics:', error)
    return {
      totalInteractions: 0,
      topQuestions: [],
      companyBreakdown: {},
      jobRoleBreakdown: {},
      recentLogs: []
    }
  }
}

// Function to create the chat_logs table (run this once to set up the database)
export async function createChatLogsTable() {
  try {
    const { error } = await supabaseAdmin.rpc('create_chat_logs_table')
    if (error) {
      console.error('Error creating chat_logs table:', error)
      return false
    }
    console.log('Chat logs table created successfully')
    return true
  } catch (error) {
    console.error('Error creating chat_logs table:', error)
    return false
  }
}
