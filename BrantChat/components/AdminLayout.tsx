'use client'

import { useState } from 'react'
import { Lock } from 'lucide-react'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import AdminNav from './AdminNav'

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

export default function AdminLayout({ children, title, description }: AdminLayoutProps) {
  const { isAuthenticated, isLoading, login } = useAdminAuth()
  const [password, setPassword] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [error, setError] = useState('')

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setError('')
    
    const success = await login(password)
    
    if (!success) {
      setError('Invalid access code')
    }
    
    setIsLoggingIn(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-chat-bg flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-chat-bg flex items-center justify-center">
        <div className="bg-chat-sidebar p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <Lock className="w-12 h-12 text-white mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
            <p className="text-gray-300">{description || 'Enter admin access code to continue'}</p>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin Access Code"
              className="w-full px-4 py-3 bg-chat-input border border-chat-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              {isLoggingIn ? 'Logging in...' : 'Access Admin'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-chat-bg">
      <AdminNav />
      <div className="p-4">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
