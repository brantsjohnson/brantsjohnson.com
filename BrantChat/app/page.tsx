'use client'

import { useState } from 'react'
import { Bot, ArrowRight } from 'lucide-react'

export default function Home() {
  const [slug, setSlug] = useState('')

  const go = () => {
    const s = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '')
    if (!s) return
    window.location.href = `/${s}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-pink-100">
      {/* Header with logo and title */}
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">BrantChat</h1>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="max-w-xl w-full text-center">
          {/* Main heading */}
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            BrantChat:
            <br />
            <span className="text-2xl">It's like a mini-interview</span>
          </h2>
          
          {/* Description */}
          <p className="text-xl text-gray-600 mb-8">
            Resumes are old school, use BrantChat to learn more about his experience.
          </p>
          
          {/* Access code instruction */}
          <div className="mb-6 text-sm text-gray-500">
            You need an access code to use BrantChat.
          </div>
          
          {/* Input form */}
          <div className="flex gap-3 justify-center">
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && go()}
              placeholder="Enter code"
              className="w-full max-w-sm px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg text-gray-800"
            />
            <button 
              onClick={go} 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 rounded-xl transition-all duration-200 shadow-lg"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}