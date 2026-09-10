'use client'

import { useState, useEffect } from 'react'
import { Save, User, Bot } from 'lucide-react'
import { getBrantKnowledge, BrantKnowledge } from '@/lib/knowledge-base'
import AdminLayout from '@/components/AdminLayout'

export default function AdminPage() {
  const [knowledge, setKnowledge] = useState<BrantKnowledge | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Load current knowledge base
    setKnowledge(getBrantKnowledge())
  }, [])

  const handleSave = async () => {
    if (!knowledge) return
    
    setIsLoading(true)
    try {
      // Get the auth token from localStorage
      const token = localStorage.getItem('brantchat_token')
      
      const response = await fetch('/api/admin/update-knowledge', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ knowledge }),
      })
      
      if (response.ok) {
        setMessage('Knowledge base updated successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Failed to update knowledge base')
      }
    } catch (error) {
      setMessage('Error updating knowledge base')
    } finally {
      setIsLoading(false)
    }
  }

  const updateField = (section: keyof BrantKnowledge, field: string, value: any) => {
    if (!knowledge) return
    
    setKnowledge(prev => {
      if (!prev) return null
      
      if (section === 'personalInfo') {
        return {
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            [field]: value
          }
        }
      } else if (Array.isArray(prev[section])) {
        return {
          ...prev,
          [section]: value
        }
      }
      
      return prev
    })
  }

  if (!knowledge) {
    return (
      <AdminLayout title="Admin Settings" description="Manage your knowledge base">
        <div className="text-white text-center">Loading...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Admin Settings" description="Manage your knowledge base and system settings">
        <div className="bg-chat-sidebar rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-white mb-4">BrantChat Knowledge Base Admin</h1>
          {message && (
            <div className={`p-3 rounded-lg mb-4 ${
              message.includes('success') ? 'bg-green-600' : 'bg-red-600'
            } text-white`}>
              {message}
            </div>
          )}
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>

        <div className="space-y-6">
          {/* Personal Information */}
          <div className="bg-chat-sidebar rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(knowledge.personalInfo)
                .filter(([key]) => key !== 'jobPostingUrl') // Remove jobPostingUrl from personal info
                .map(([key, value]) => (
                <div key={key}>
                  <label className="block text-gray-300 text-sm mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => updateField('personalInfo', key, e.target.value)}
                    className="w-full px-3 py-2 bg-chat-input border border-chat-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Professional Background */}
          <div className="bg-chat-sidebar rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Professional Background</h2>
            <textarea
              value={knowledge.professionalBackground.join('\n')}
              onChange={(e) => updateField('professionalBackground', '', e.target.value.split('\n'))}
              rows={4}
              className="w-full px-3 py-2 bg-chat-input border border-chat-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="One item per line"
            />
          </div>

          {/* Skills */}
          <div className="bg-chat-sidebar rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Skills</h2>
            <div className="space-y-4">
              {Object.entries(knowledge.skills).map(([category, skills]) => (
                <div key={category}>
                  <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <textarea
                    value={skills.join(', ')}
                    onChange={(e) => {
                      const newSkills = e.target.value.split(',').map(s => s.trim()).filter(s => s)
                      updateField('skills', category, newSkills)
                    }}
                    rows={2}
                    className="w-full px-3 py-2 bg-chat-input border border-chat-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`${category} skills (comma separated)`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-chat-sidebar rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Achievements</h2>
            <textarea
              value={knowledge.achievements.join('\n')}
              onChange={(e) => updateField('achievements', '', e.target.value.split('\n'))}
              rows={4}
              className="w-full px-3 py-2 bg-chat-input border border-chat-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="One achievement per line"
            />
          </div>

          {/* Interests */}
          <div className="bg-chat-sidebar rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Interests</h2>
            <textarea
              value={knowledge.interests.join('\n')}
              onChange={(e) => updateField('interests', '', e.target.value.split('\n'))}
              rows={4}
              className="w-full px-3 py-2 bg-chat-input border border-chat-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="One interest per line"
            />
          </div>
        </div>
    </AdminLayout>
  )
}
