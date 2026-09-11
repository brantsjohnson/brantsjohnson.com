interface ChatResponse {
  message: string
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export async function sendMessage(message: string, jobRole?: any): Promise<ChatResponse> {
  const token = localStorage.getItem('brantchat_token')
  
  if (!token) {
    throw new Error('Not authenticated')
  }

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ message, jobRole })
  })

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('brantchat_token')
      throw new Error('Authentication expired')
    }
    throw new Error('Failed to send message')
  }

  return response.json()
}

export function setAuthToken(token: string) {
  localStorage.setItem('brantchat_token', token)
}

export function getAuthToken(): string | null {
  return localStorage.getItem('brantchat_token')
}

export function clearAuthToken() {
  localStorage.removeItem('brantchat_token')
}
