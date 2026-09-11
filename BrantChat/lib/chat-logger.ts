export interface ChatLogEntry {
  timestamp: string
  company: string
  jobRole?: {
    position: string
    company: string
    requirements?: string
    responsibilities?: string
    keySkills?: string
  }
  userMessage: string
  responseLength: number
  tokenUsage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

// In-memory storage for production (when KV is not available)
let memoryChatLogs: ChatLogEntry[] = []

async function readFromKV(): Promise<ChatLogEntry[] | null> {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) return null
  
  try {
    const res = await fetch(`${url}/get/chat-logs`, { 
      headers: { Authorization: `Bearer ${token}` } 
    })
    if (!res.ok) return null
    const data = await res.json()
    return (data?.result as ChatLogEntry[]) || []
  } catch (error) {
    console.error('Error reading chat logs from KV:', error)
    return null
  }
}

async function writeToKV(logs: ChatLogEntry[]): Promise<boolean> {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) return false
  
  try {
    const res = await fetch(`${url}/set/chat-logs`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ value: logs })
    })
    return res.ok
  } catch (error) {
    console.error('Error writing chat logs to KV:', error)
    return false
  }
}

export async function logChatInteraction(
  company: string,
  userMessage: string,
  responseLength: number,
  jobRole?: any,
  tokenUsage?: any
) {
  try {
    const logEntry: ChatLogEntry = {
      timestamp: new Date().toISOString(),
      company,
      userMessage,
      responseLength,
      tokenUsage,
      ...(jobRole && {
        jobRole: {
          position: jobRole.position || 'Not specified',
          company: jobRole.company || company,
          requirements: jobRole.requirements,
          responsibilities: jobRole.responsibilities,
          keySkills: jobRole.keySkills
        }
      })
    }

    // Get existing logs
    const existingLogs = await getChatLogs()
    
    // Add new log entry
    const updatedLogs = [...existingLogs, logEntry]

    // Keep only last 1000 entries to prevent storage from growing too large
    const trimmedLogs = updatedLogs.length > 1000 
      ? updatedLogs.slice(-1000) 
      : updatedLogs

    // Try to save to KV first
    const kvSuccess = await writeToKV(trimmedLogs)
    if (kvSuccess) {
      console.log(`Logged chat interaction to KV: ${company} - "${userMessage.substring(0, 50)}..."`)
      return
    }

    // Fallback to memory storage
    memoryChatLogs = trimmedLogs
    console.log(`Logged chat interaction to memory: ${company} - "${userMessage.substring(0, 50)}..."`)
  } catch (error) {
    console.error('Error logging chat interaction:', error)
    // Don't throw - logging failure shouldn't break the chat
  }
}

export async function getChatLogs(): Promise<ChatLogEntry[]> {
  // Try KV first
  const kv = await readFromKV()
  if (kv) return kv
  
  // If we have logs in memory, return them
  if (memoryChatLogs.length > 0) return memoryChatLogs
  
  // Return empty array if no storage available
  return []
}

export async function getChatAnalytics() {
  const logs = await getChatLogs()
  
  // Most common questions
  const questionCounts: { [key: string]: number } = {}
  logs.forEach(log => {
    const question = log.userMessage.toLowerCase().trim()
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
    if (log.jobRole?.position) {
      const role = `${log.jobRole.position} at ${log.jobRole.company}`
      jobRoleCounts[role] = (jobRoleCounts[role] || 0) + 1
    }
  })

  return {
    totalInteractions: logs.length,
    topQuestions,
    companyBreakdown: companyCounts,
    jobRoleBreakdown: jobRoleCounts,
    recentLogs: logs.slice(-20) // Last 20 interactions
  }
}
