'use client'

import { useState, useEffect } from 'react'
import { Upload, Save, FileText } from 'lucide-react'
import { getBrantKnowledge, BrantKnowledge } from '@/lib/knowledge-base'
import AdminLayout from '@/components/AdminLayout'

export default function UploadPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [cvText, setCvText] = useState('')
  const [funFacts, setFunFacts] = useState('')

  useEffect(() => {
    // Load current knowledge base
    const knowledge = getBrantKnowledge()
    setCvText(knowledge.professionalBackground.join('\n\n'))
    setFunFacts(knowledge.interests.join('\n\n'))
  }, [])

  const handleSave = async () => {
    if (!cvText.trim()) {
      alert('Please paste your CV content')
      return
    }
    
    setIsLoading(true)
    try {
      // Get the auth token from localStorage
      const token = localStorage.getItem('brantchat_token')
      
      // Create a comprehensive knowledge base from the uploaded text
      const knowledge: BrantKnowledge = {
        personalInfo: {
          name: "Brant Johnson",
          title: "Customer Focused Product Manager",
          location: "American Fork, Utah -- Willing to Relocate",
          email: "Brantshanonjohnson@gmail.com",
          linkedin: "https://www.linkedin.com/in/brantshanonjohnson/",
          portfolio: ""
        },
        professionalBackground: [cvText],
        skills: {
          technical: [],
          productManagement: [],
          businessStrategy: [],
          marketing: [],
          leadership: [],
          analytics: [],
          design: [],
          systems: []
        },
        experience: [],
        education: [],
        achievements: [],
        careerStories: [],
        leadership: [],
        interests: funFacts ? [funFacts] : [],
        certifications: [],
        lastUpdated: new Date().toISOString().split('T')[0]
      }
      
      const response = await fetch('/api/admin/update-knowledge', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ knowledge }),
      })
      
      if (response.ok) {
        setMessage('CV uploaded successfully! The AI now knows everything about you.')
        setTimeout(() => setMessage(''), 5000)
      } else {
        setMessage('Failed to upload CV')
      }
    } catch (error) {
      setMessage('Error uploading CV')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AdminLayout 
      title="CV Upload" 
      description="Upload your CV and professional information to the AI"
    >
        <div className="bg-chat-sidebar rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-white mb-4">📄 CV Upload - BrantChat</h1>
          {message && (
            <div className={`p-3 rounded-lg mb-4 ${
              message.includes('success') ? 'bg-green-600' : 'bg-red-600'
            } text-white`}>
              {message}
            </div>
          )}
          <p className="text-gray-300 mb-4">
            Paste your entire CV, resume, and professional documents here. The AI will learn everything about you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CV Upload */}
          <div className="bg-chat-sidebar rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Your CV & Professional Background
            </h2>
            <p className="text-gray-300 text-sm mb-4">
              Paste your entire CV, resume, cover letters, project descriptions, achievements, work experience, education, skills, etc.
            </p>
            <textarea
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              rows={20}
              className="w-full px-3 py-2 bg-chat-input border border-chat-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Paste your entire CV here...

Example:
- Work Experience: Product Manager at XYZ Company (2020-2023)
- Education: MBA from University of ABC
- Skills: Product Strategy, User Research, Data Analysis
- Projects: Led development of mobile app that increased user engagement by 40%
- Achievements: Won Product Innovation Award 2022
- Any other professional information you want the AI to know about you..."
            />
          </div>

          {/* Fun Facts */}
          <div className="bg-chat-sidebar rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Fun Facts & Personal Touch
            </h2>
            <p className="text-gray-300 text-sm mb-4">
              Add personal interests, hobbies, fun projects, volunteer work, or anything that makes you unique and interesting to employers.
            </p>
            <textarea
              value={funFacts}
              onChange={(e) => setFunFacts(e.target.value)}
              rows={20}
              className="w-full px-3 py-2 bg-chat-input border border-chat-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Add fun facts and personal information here...

Example:
- I built a custom home automation system using Raspberry Pi
- I volunteer at the local animal shelter every weekend
- I'm learning to play the guitar and have performed at open mic nights
- I love hiking and have completed 15+ mountain trails
- I'm passionate about sustainable technology and green energy
- I started a book club at my previous company that grew to 50+ members
- Any other personal interests or achievements that show your personality..."
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleSave}
            disabled={isLoading || !cvText.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>{isLoading ? 'Uploading...' : 'Upload CV to AI'}</span>
          </button>
          <p className="text-gray-400 text-sm mt-2">
            Once uploaded, the AI will know everything about you and can answer any questions!
          </p>
        </div>
    </AdminLayout>
  )
}
