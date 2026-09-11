'use client'

import { useState, useEffect } from 'react'
import { useAdminAuth } from '../../../hooks/useAdminAuth'
import AdminLayout from '../../../components/AdminLayout'

interface ChatLogEntry {
  timestamp: string
  company: string
  user_message: string
  response_length: number
  job_role?: {
    position: string
    company: string
    requirements?: string
    responsibilities?: string
    keySkills?: string
  }
  token_usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

interface ChatAnalytics {
  totalInteractions: number
  topQuestions: Array<{ question: string; count: number }>
  companyBreakdown: { [key: string]: number }
  jobRoleBreakdown: { [key: string]: number }
  recentLogs: ChatLogEntry[]
}

export default function AnalyticsPage() {
  const { isAuthenticated, isLoading } = useAdminAuth()
  const [analytics, setAnalytics] = useState<ChatAnalytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics()
    }
  }, [isAuthenticated])

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('brantchat_token')
      if (!token) {
        console.error('No authentication token found')
        setLoading(false)
        return
      }

      const response = await fetch('/api/admin/analytics', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      } else {
        console.error('Failed to fetch analytics:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (isLoading || loading) {
    return (
      <AdminLayout title="Chat Analytics" description="Loading analytics data...">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
              <div className="w-8 h-8 bg-white rounded"></div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Loading Analytics...</h1>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (!isAuthenticated) {
    return (
      <AdminLayout title="Chat Analytics" description="Access denied - please log in">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
            <p className="text-gray-600">Please log in to view analytics.</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Chat Analytics" description="Track what employers are asking about Brant">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Chat Analytics</h1>
          <p className="text-gray-600">Track what employers are asking about Brant</p>
        </div>

        {analytics && (
          <div className="space-y-8">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Interactions</h3>
                <p className="text-3xl font-bold text-purple-600">{analytics.totalInteractions}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Unique Companies</h3>
                <p className="text-3xl font-bold text-pink-600">{Object.keys(analytics.companyBreakdown).length}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Job Roles Tracked</h3>
                <p className="text-3xl font-bold text-indigo-600">{Object.keys(analytics.jobRoleBreakdown).length}</p>
              </div>
            </div>

            {/* Top Questions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Most Asked Questions</h3>
              <div className="space-y-3">
                {analytics.topQuestions.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-800 flex-1 mr-4">{item.question}</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      {item.count} times
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Breakdown */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Company Activity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(analytics.companyBreakdown).map(([company, count]) => (
                  <div key={company} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-800 font-medium">{company}</span>
                    <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
                      {count} questions
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Role Breakdown */}
            {Object.keys(analytics.jobRoleBreakdown).length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Job Role Activity</h3>
                <div className="space-y-3">
                  {Object.entries(analytics.jobRoleBreakdown).map(([role, count]) => (
                    <div key={role} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-800 font-medium">{role}</span>
                      <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                        {count} questions
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Interactions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Interactions</h3>
              <div className="space-y-4">
                {analytics.recentLogs.map((log, index) => (
                  <div key={index} className="border-l-4 border-purple-500 pl-4 py-2">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-gray-800">{log.company}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">"{log.user_message}"</p>
                    {log.job_role && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Role:</span> {log.job_role.position} at {log.job_role.company}
                      </div>
                    )}
                    {log.token_usage && (
                      <div className="text-xs text-gray-500 mt-1">
                        Tokens: {log.token_usage.total_tokens} (prompt: {log.token_usage.prompt_tokens}, completion: {log.token_usage.completion_tokens})
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
