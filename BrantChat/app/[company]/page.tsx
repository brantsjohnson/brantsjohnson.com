'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, User, Bot } from 'lucide-react'
import { sendMessage, setAuthToken } from '../../lib/api'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface JobRole {
  id: string
  company: string
  position: string
  slug: string
  requirements: string
  responsibilities: string
  keySkills: string
  jobPostingUrl?: string
  lastUpdated: string
}

interface CompanyPageProps {
  params: { company: string }
}

// Simple in-memory cache for AI questions
const questionCache = new Map<string, string[]>()

// Fetch approved questions for a job role
async function fetchApprovedQuestions(jobRole: JobRole | null): Promise<string[]> {
  if (!jobRole) {
    // Fallback to generic questions if no job role
    return [
      "What is Brant's greatest accomplishment?",
      "How does Brant approach product development?",
      "What's Brant's experience with cross-functional collaboration?",
      "How does Brant measure success in his projects?",
      "What's Brant's approach to user research and feedback?"
    ]
  }

  // Check cache first
  const cacheKey = `${jobRole.id}-approved-questions`
  if (questionCache.has(cacheKey)) {
    return questionCache.get(cacheKey)!
  }

  try {
    // console.log('Fetching approved questions for job:', jobRole.id)
    const response = await fetch(`/api/admin/questions?jobId=${jobRole.id}`)
    
    if (response.ok) {
      const data = await response.json()
      // console.log('API response for questions:', data)
      if (data.success && data.questions && data.questions.length > 0) {
        // Filter for approved questions and extract text
        const approvedQuestions = data.questions
          .filter((q: any) => q.approved)
          .map((q: any) => q.text)
        
        // console.log('Approved questions found:', approvedQuestions.length, approvedQuestions)
        
        if (approvedQuestions.length > 0) {
          // Cache the approved questions
          questionCache.set(cacheKey, approvedQuestions)
          return approvedQuestions
        }
      }
    } else {
      console.error('Failed to fetch questions, response not ok:', response.status, response.statusText)
    }
  } catch (error) {
    console.error('Failed to fetch approved questions:', error)
  }

  // Helper to grab a primary skill from the keySkills blob
  const extractPrimarySkill = (skills?: string): string => {
    if (!skills) return 'product management'
    const lines = skills
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
    
    for (const line of lines) {
      const cleaned = line
        .replace(/^Key Skills?[^:]*:\s*/i, '')
        .replace(/^[•*\-]+\s*/, '')
        .trim()
      
      if (cleaned) {
        return cleaned
      }
    }

    return 'product management'
  }

  const primarySkill = extractPrimarySkill(jobRole.keySkills)
  const companyLabel = jobRole.company && jobRole.company !== 'Various Companies'
    ? ` at ${jobRole.company}`
    : ''

  // Fallback questions if no approved questions found
  const fallbackQuestions = [
    `How does Brant's experience align with the ${jobRole.position} role${companyLabel}?`,
    `What's Brant's approach to ${primarySkill}?`,
    "What is Brant's greatest accomplishment?",
    "How does Brant handle cross-functional collaboration?",
    "What's Brant's experience with data-driven decision making?"
  ]
  
  // Cache fallback questions
  questionCache.set(cacheKey, fallbackQuestions)
  return fallbackQuestions
}

// Generate two suggested questions (one job-focused, one fun/personal)
function generateNewSuggestions(jobQuestions: string[], allUsed: Set<string> = new Set()): [string, string] {
  const funQuestions = [
    "What musicals has Brant been in?",
    "Tell me about Brant's Christmas sweater competition streak",
    "What's the story behind Brant's space bees video game?",
    "What is Brant's greatest accomplishment?",
    "What are some of Brant's nicknames?",
    "Tell me about Brant's cross country experience",
    "Tell me about Brant's spell-casting attempts for chores",
    "What's the story behind Brant's 25+ all-nighters?",
    "What is Brant's leadership experience?",
    "What type of environment does Brant thrive in?",
    "What is Brant passionate about?",
    "What's Brant's approach to building team culture?",
    "What is a challenging thing Brant has experienced?",
    "Tell me about Brant's creative problem-solving methods",
    "What are Brant's favorite foods?",
    "What is Brant's favorite holiday, and why?",
    "What's Brant's favorite movie?",
    "Who's Brant's favorite artist?"
  ]

  const pickUnique = (arr: string[]): string => {
    const options = arr.filter(q => !allUsed.has(q))
    const pool = options.length > 0 ? options : arr
    return pool[Math.floor(Math.random() * pool.length)]
  }

  // Pick one job-specific question and one fun question
  const jobQuestion = pickUnique(jobQuestions)
  allUsed.add(jobQuestion)
  
  let funQuestion = pickUnique(funQuestions)
  if (funQuestion === jobQuestion) {
    funQuestion = pickUnique(funQuestions)
  }
  allUsed.add(funQuestion)
  
  return [jobQuestion, funQuestion]
}

export default function CompanyPage({ params }: CompanyPageProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentJobRole, setCurrentJobRole] = useState<JobRole | null>(null)
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false)
  const [welcomeMessage, setWelcomeMessage] = useState('')
  const [jobSpecificQuestions, setJobSpecificQuestions] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<[string, string]>(['Loading...', 'Loading...'])
  const usedSuggestionsRef = useRef<Set<string>>(new Set())
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const slug = params.company.toLowerCase().trim()

  const scrollToQuestion = (questionId: string) => {
    const el = document.getElementById(`message-${questionId}`)
    if (!el) return
    const rect = el.getBoundingClientRect()
    const currentScroll = window.scrollY || document.documentElement.scrollTop
    // Target position: place the submitted bubble at the very top area
    const offsetFromTop = 12
    const desiredTop = Math.max(0, currentScroll + rect.top - offsetFromTop)
    window.scrollTo({ top: desiredTop, behavior: 'smooth' })
  }

  // Refresh suggestions when job-specific questions are loaded
  useEffect(() => { 
    if (jobSpecificQuestions.length > 0) {
      setSuggestions(generateNewSuggestions(jobSpecificQuestions, usedSuggestionsRef.current))
    }
  }, [jobSpecificQuestions])

  // Handle scroll to hide/show header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fetch job by slug and auto-auth
  useEffect(() => {
    const load = async () => {
      try {
        // Check if this is the special generic product manager slug
        if (slug === 'pm') {
          const genericPMJob: JobRole = {
            id: 'seed-pm-0001',
            company: 'Various Companies',
            position: 'Senior Product Manager',
            slug: 'pm',
            requirements: `Senior Product Manager Requirements:
• 6+ years of product management experience with a track record of building and shipping successful products
• Strong analytical and data-driven decision making skills
• Experience leading cross-functional teams including engineering, design, and marketing
• Proven ability to define product strategy, roadmap, and vision
• Excellent communication and stakeholder management skills
• Experience with user research, A/B testing, and product analytics
• Strong business acumen and ability to tie product decisions to business outcomes
• Experience with agile development methodologies
• Technical background or ability to work closely with engineering teams
• Passion for understanding user needs and solving complex problems`,
            responsibilities: `Senior Product Manager Responsibilities:
• Define and execute product strategy and roadmap
• Lead cross-functional teams to deliver high-impact products
• Conduct user research and analyze data to inform product decisions
• Collaborate with engineering, design, and business teams
• Manage stakeholder expectations and communicate product vision
• Drive product growth through experimentation and optimization
• Make data-driven decisions using analytics and user feedback
• Balance user needs with business objectives
• Lead product launches and go-to-market strategies
• Mentor junior product managers and contribute to team culture`,
            keySkills: `Key Skills for Senior Product Manager:
• Product Strategy & Roadmapping
• Data Analysis & Decision Making
• Cross-functional Leadership
• User Research & UX
• Business Acumen & Stakeholder Management
• Technical Communication
• Agile Development
• A/B Testing & Experimentation
• Product Analytics & Metrics
• Team Building & Mentoring`,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
          setCurrentJobRole(genericPMJob)
          setWelcomeMessage(`Brant is passionate about product management. What questions do you have about his experience or interests?`)
          setShowWelcomeScreen(true)
          
          // Load fallback questions immediately for fast UI
          const fallbackQuestions = [
            "How does Brant's experience align with the Senior Product Manager role?",
            "What's Brant's approach to product strategy and roadmapping?",
            "What is Brant's greatest accomplishment?",
            "How does Brant handle cross-functional collaboration?",
            "What's Brant's experience with data-driven decision making?"
          ]
          setJobSpecificQuestions(fallbackQuestions)
          setSuggestions(generateNewSuggestions(fallbackQuestions, usedSuggestionsRef.current))
          
          // Fetch approved questions in background (non-blocking)
          fetchApprovedQuestions(genericPMJob).then(questions => {
            if (questions.length > 0) {
              setJobSpecificQuestions(questions)
              setSuggestions(generateNewSuggestions(questions, usedSuggestionsRef.current))
            }
          }).catch(error => {
            console.error('Failed to fetch approved questions:', error)
            // Keep fallback questions
          })
          
          // Obtain a real JWT via URL-based auth for this company slug
          try {
            const authRes = await fetch('/api/auth/url', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ companyKey: slug })
            })
            if (authRes.ok) {
              const authData = await authRes.json()
              if (authData?.token) {
                setAuthToken(authData.token)
              }
            }
          } catch {
            // If auth fails we leave token unset; chat API will 401 and UI shows error
          }
          return
        }

        // For all other slugs, check the jobs database
        // console.log('Loading job for slug:', slug)
        const res = await fetch(`/api/jobs?slug=${encodeURIComponent(slug)}`)
        let job: JobRole | null = null
        if (res.ok) {
          const data = await res.json()
          job = data.job as JobRole
          // console.log('Job loaded from API:', job)
        } else if (res.status === 404) {
          // Job not found - redirect to homepage for access code input
          // console.log('Job not found for slug:', slug)
          window.location.href = '/'
          return
        } else {
          // console.log('Error loading job for slug:', slug, res.status)
          window.location.href = '/'
          return
        }
        if (!job) {
          // console.log('No job found for slug:', slug)
          return
        }
        // console.log('Found job for slug:', slug, job)
        setCurrentJobRole(job)
        setWelcomeMessage(`Hello there! Brant is excited about working at ${job.company}. What questions can I help you answer about Brant?`)
        setShowWelcomeScreen(true)
        
        // Load fallback questions immediately for fast UI
        const fallbackQuestions = [
          `How does Brant's experience align with the ${job.position} role at ${job.company}?`,
          `What's Brant's approach to ${job.keySkills?.split(',')[0] || 'product management'}?`,
          "What is Brant's greatest accomplishment?",
          "How does Brant handle cross-functional collaboration?",
          "What's Brant's experience with data-driven decision making?"
        ]
        setJobSpecificQuestions(fallbackQuestions)
        setSuggestions(generateNewSuggestions(fallbackQuestions, usedSuggestionsRef.current))
        
        // Fetch approved questions in background (non-blocking)
        fetchApprovedQuestions(job).then(questions => {
          if (questions.length > 0) {
            setJobSpecificQuestions(questions)
            setSuggestions(generateNewSuggestions(questions, usedSuggestionsRef.current))
          }
        }).catch(error => {
          console.error('Failed to fetch approved questions:', error)
          // Keep fallback questions
        })
        
        // Obtain a real JWT via URL-based auth for this company slug
        try {
          const authRes = await fetch('/api/auth/url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ companyKey: slug })
          })
          if (authRes.ok) {
            const authData = await authRes.json()
            if (authData?.token) {
              setAuthToken(authData.token)
            }
          }
        } catch {
          // If auth fails we leave token unset; chat API will 401 and UI shows error
        }
      } catch (e) {
        window.location.href = '/'
      }
    }
    load()
  }, [slug])

  

  const handleSuggestedQuestion = async (question: string) => {
    if (showWelcomeScreen) setShowWelcomeScreen(false)
    const userMessage: Message = { id: Date.now().toString(), content: question, role: 'user', timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    usedSuggestionsRef.current.add(question)
    // Immediately refresh suggestions on submission
    setSuggestions(generateNewSuggestions(jobSpecificQuestions, usedSuggestionsRef.current))
    setInput('')
    setIsLoading(true)
    setTimeout(() => { scrollToQuestion(userMessage.id) }, 100)
    try {
      const response = await sendMessage(question, currentJobRole)
      const assistantMessage: Message = { id: (Date.now() + 1).toString(), content: response.message, role: 'assistant', timestamp: new Date() }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = { id: (Date.now() + 1).toString(), content: 'Sorry, I encountered an error. Please try again.', role: 'assistant', timestamp: new Date() }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    if (showWelcomeScreen) setShowWelcomeScreen(false)
    const userMessage: Message = { id: Date.now().toString(), content: input, role: 'user', timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    usedSuggestionsRef.current.add(input)
    // Immediately refresh suggestions on submission
    setSuggestions(generateNewSuggestions(jobSpecificQuestions, usedSuggestionsRef.current))
    setInput('')
    setIsLoading(true)
    setTimeout(() => { scrollToQuestion(userMessage.id) }, 100)
    try {
      const response = await sendMessage(input, currentJobRole)
      const assistantMessage: Message = { id: (Date.now() + 1).toString(), content: response.message, role: 'assistant', timestamp: new Date() }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = { id: (Date.now() + 1).toString(), content: 'Sorry, I encountered an error. Please try again.', role: 'assistant', timestamp: new Date() }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  if (!currentJobRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Loading BrantChat...</h1>
          <p className="text-gray-600">Setting up your personalized chat experience</p>
          <div className="mt-4 flex justify-center">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showWelcomeScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-pink-100">
        <div className="fixed top-0 left-0 right-0 z-50 p-6">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">BrantChat</h1>
            </div>
          </div>
        </div>

        <div className="pt-24 pb-80 h-screen flex items-center justify-center overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              BrantChat:
              <br />
              <span className="text-2xl">It's like a mini-interview</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {welcomeMessage}
            </p>
            {/* Suggestions are rendered below the input in the footer */}
          </div>
        </div>

        <div className="floating-container">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl px-6 py-4 shadow-lg shadow-black/10">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about Brant"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-base text-gray-800 placeholder-gray-500 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-lg min-h-[44px]"
                  disabled={false}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            <div className="mt-4 text-center">
              <div className="text-xs font-semibold text-gray-500 mb-2">Suggestions to ask BrantChat</div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSuggestedQuestion(suggestions[0])}
                  disabled={isLoading}
                  className="px-3 py-2 rounded-lg bg-white text-gray-800 border border-gray-200 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent focus:bg-gradient-to-r focus:from-purple-500 focus:to-pink-500 focus:text-white focus:border-transparent hover:shadow transition-all text-xs"
                >
                  {suggestions[0]}
                </button>
                <button
                  type="button"
                  onClick={() => handleSuggestedQuestion(suggestions[1])}
                  disabled={isLoading}
                  className="px-3 py-2 rounded-lg bg-white text-gray-800 border border-gray-200 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent focus:bg-gradient-to-r focus:from-purple-500 focus:to-pink-500 focus:text-white focus:border-transparent hover:shadow transition-all text-xs"
                >
                  {suggestions[1]}
                </button>
              </div>
            </div>
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">
                {currentJobRole ? (
                  <>Role: {(() => {
                  const roleText = currentJobRole.slug === 'pm' 
                    ? currentJobRole.position 
                    : `${currentJobRole.position ? currentJobRole.position + ' at ' : ''}${currentJobRole.company}`
                    const jobUrl = currentJobRole.jobPostingUrl
                    return jobUrl ? (
                      <a href={jobUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 font-medium hover:text-purple-700 hover:underline transition-colors">
                        {roleText}
                      </a>
                    ) : (
                      <span className="text-purple-600 font-medium">{roleText}</span>
                    )
                  })()}</>
                ) : (
                  'Ask me anything about Brant Johnson'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-pink-100">
      <div className={`fixed top-0 left-0 right-0 z-50 p-6 transition-transform duration-300 ${isScrolled ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">BrantChat</h1>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-80 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} id={`message-${message.id}`} className={`flex items-start space-x-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.role === 'assistant' && (
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-6 py-4 ${message.role === 'user' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' : 'bg-white/90 backdrop-blur-sm text-gray-800 shadow-lg border border-white/20'}`}>
                <div className="text-sm leading-relaxed">
                  {(() => {
                    // Check once per message if we should show media
                    const shouldShowArchwayVideo = message.role === 'assistant' && 
                      message.content.toLowerCase().includes('archway')
                    
                    const shouldShowCrewGIFs = message.role === 'assistant' && 
                      message.content.toLowerCase().includes('crew') && 
                      (message.content.toLowerCase().includes('illustration') || 
                       message.content.toLowerCase().includes('artwork') || 
                       message.content.toLowerCase().includes('design') || 
                       message.content.toLowerCase().includes('brand') || 
                       message.content.toLowerCase().includes('saved') || 
                       message.content.toLowerCase().includes('110k') || 
                       message.content.toLowerCase().includes('$110'))
                    
                    let archwayVideoShown = false
                    let crewGIFsShown = false
                    
                    // Process the content to group consecutive bullet points into lists
                    const lines = message.content.split('\n')
                    const processedContent = []
                    let i = 0
                    
                    while (i < lines.length) {
                      const line = lines[i]
                      const trimmedLine = line.trim()
                      
                      if (trimmedLine === '') {
                        processedContent.push({ type: 'empty', content: '', index: i })
                        i++
                        continue
                      }
                      
                      // Check if this line starts a bullet point list
                      if (trimmedLine.match(/^[\-\•]\s*/)) {
                        const listItems = []
                        let listIndex = i
                        
                        // Collect consecutive bullet points (including nested ones)
                        while (i < lines.length && lines[i].trim().match(/^[\-\•]\s*/)) {
                          const bulletLine = lines[i].trim()
                          const text = bulletLine.replace(/^[\-\•]\s*/, '')
                          
                          // Check for indentation level (2 spaces = sub-bullet)
                          const originalLine = lines[i]
                          const leadingSpaces = originalLine.length - originalLine.trimStart().length
                          const isSubBullet = leadingSpaces >= 2
                          
                          listItems.push({ 
                            text, 
                            index: i, 
                            isSubBullet,
                            leadingSpaces 
                          })
                          i++
                        }
                        
                        processedContent.push({ 
                          type: 'bullet-list', 
                          items: listItems, 
                          index: listIndex 
                        })
                        continue
                      }
                      
                      // Check if this line starts a numbered list
                      if (trimmedLine.match(/^\d+\.\s/)) {
                        const listItems = []
                        let listIndex = i
                        
                        // Collect consecutive numbered items
                        while (i < lines.length && lines[i].trim().match(/^\d+\.\s/)) {
                          const numberedLine = lines[i].trim()
                          const match = numberedLine.match(/^(\d+)\.\s(.*)/)
                          if (match) {
                            listItems.push({ 
                              number: match[1], 
                              text: match[2], 
                              index: i 
                            })
                          }
                          i++
                        }
                        
                        processedContent.push({ 
                          type: 'numbered-list', 
                          items: listItems, 
                          index: listIndex 
                        })
                        continue
                      }
                      
                      // Regular line
                      processedContent.push({ 
                        type: 'line', 
                        content: trimmedLine, 
                        index: i 
                      })
                      i++
                    }
                    
                    return processedContent.map((item, index) => {
                      if (item.type === 'empty') {
                        return <div key={item.index} className="h-3"></div>
                      }
                      
                      const elements = []
                      
                      if (item.type === 'bullet-list' && item.items) {
                        const listItems = item.items.map((listItem, itemIndex) => {
                          // Process formatting in bullet point text
                          let processedText = listItem.text
                          processedText = processedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          processedText = processedText.replace(/\*(.*?)\*/g, '<em>$1</em>')
                          processedText = processedText.replace(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-purple-600 underline">$1</a>')
                          
                          // Apply different styling for sub-bullets
                          const listItemClass = ('isSubBullet' in listItem && listItem.isSubBullet) 
                            ? "mb-0.5 leading-relaxed text-gray-600 ml-4" 
                            : "mb-1 leading-relaxed text-gray-700"
                          
                          return (
                            <li key={`${item.index}-${itemIndex}`} className={listItemClass}>
                              <span dangerouslySetInnerHTML={{ __html: processedText }}></span>
                            </li>
                          )
                        })
                        
                        elements.push(
                          <ul key={`list-${item.index}`} className="list-disc ml-6 my-2 space-y-0.5">
                            {listItems}
                          </ul>
                        )
                      } else if (item.type === 'numbered-list' && item.items) {
                        const listItems = item.items.map((listItem, itemIndex) => {
                          // Process formatting in numbered list text
                          let processedText = listItem.text
                          processedText = processedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          processedText = processedText.replace(/\*(.*?)\*/g, '<em>$1</em>')
                          processedText = processedText.replace(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-purple-600 underline">$1</a>')
                          
                          return (
                            <li key={`${item.index}-${itemIndex}`} className="mb-1 leading-relaxed text-gray-700">
                              <span dangerouslySetInnerHTML={{ __html: processedText }}></span>
                            </li>
                          )
                        })
                        
                        elements.push(
                          <ol key={`list-${item.index}`} className="ml-6 my-2 space-y-0.5" style={{ listStyleType: 'decimal', paddingLeft: '1.5rem' }}>
                            {listItems}
                          </ol>
                        )
                      } else if (item.type === 'line') {
                        const trimmedLine = item.content
                        
                        // Render the text line
                        if (trimmedLine && trimmedLine.match(/^#{1,6} /)) {
                          const match = trimmedLine.match(/^#+/)
                          const level = match ? match[0].length : 1
                          let text = trimmedLine.replace(/^#+\s*/, '')
                          text = text.replace(/\*\*/g, '')
                          const className = level === 1 ? 'text-xl font-bold mb-4 mt-6 text-gray-900 border-b border-gray-200 pb-2' : 
                                          level === 2 ? 'text-lg font-semibold mb-3 mt-5 text-gray-800' : 
                                          level === 3 ? 'text-base font-semibold mb-2 mt-4 text-gray-800' :
                                          level === 4 ? 'text-sm font-semibold mb-2 mt-3 text-gray-800' :
                                          level === 5 ? 'text-xs font-semibold mb-1 mt-2 text-gray-700' :
                                          'text-xs font-semibold mb-1 mt-2 text-gray-700'
                          elements.push(<div key={`text-${item.index}`} className={className}>{text}</div>)
                        } else if (trimmedLine && trimmedLine.match(/\*\*.*\*\*/) && !trimmedLine.match(/^#{1,6} /)) {
                          let formattedText = trimmedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>')
                          // hyperlink [text](url)
                          formattedText = formattedText.replace(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-purple-600 underline">$1<\/a>')
                          elements.push(<div key={`text-${item.index}`} className="mb-2" dangerouslySetInnerHTML={{ __html: formattedText }}></div>)
                        } else if (trimmedLine && trimmedLine.match(/\*.*\*/) && !trimmedLine.match(/^#{1,6} /) && !trimmedLine.match(/\*\*.*\*\*/)) {
                          let formattedText = trimmedLine.replace(/\*(.*?)\*/g, '<em>$1</em>')
                          formattedText = formattedText.replace(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-purple-600 underline">$1<\/a>')
                          elements.push(<div key={`text-${item.index}`} className="mb-2" dangerouslySetInnerHTML={{ __html: formattedText }}></div>)
                        } else if (trimmedLine && trimmedLine.match(/^\s{2,}/)) {
                          // Process hyperlinks in indented text
                          const processedText = trimmedLine.replace(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-purple-600 underline">$1</a>')
                          elements.push(
                            <div key={`text-${item.index}`} className="ml-8 mb-2 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: processedText }}></div>
                          )
                        } else if (trimmedLine && trimmedLine.match(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/)) {
                          // Process hyperlinks in regular text lines
                          const processedText = trimmedLine.replace(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-purple-600 underline">$1</a>')
                          elements.push(<p key={`text-${item.index}`} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: processedText }}></p>)
                        } else if (trimmedLine) {
                          elements.push(<p key={`text-${item.index}`} className="leading-relaxed">{trimmedLine}</p>)
                        }
                      }
                      
                      // Add archway video right after first archway text
                      if (shouldShowArchwayVideo && !archwayVideoShown && item.content && item.content.toLowerCase().includes('archway')) {
                        archwayVideoShown = true
                        elements.push(
                          <div key={`video-${item.index}`} className="mt-4 mb-4 flex justify-center">
                            <video 
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full max-w-sm rounded-lg shadow-md"
                            >
                              <source src="/archway-video-all.mp4" type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        )
                      }
                      
                      // Add Crew GIFs right after first crew design text
                      if (shouldShowCrewGIFs && !crewGIFsShown && item.content && item.content.toLowerCase().includes('crew') && 
                          (item.content.toLowerCase().includes('illustration') || 
                           item.content.toLowerCase().includes('artwork') || 
                           item.content.toLowerCase().includes('design') || 
                           item.content.toLowerCase().includes('brand') || 
                           item.content.toLowerCase().includes('saved') || 
                           item.content.toLowerCase().includes('110k') || 
                           item.content.toLowerCase().includes('$110'))) {
                        crewGIFsShown = true
                        elements.push(
                          <div key={`gifs-${item.index}`} className="mt-4 mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                              <div className="text-center">
                                <img 
                                  src="/gifs/Bathtub-Crew.GIF" 
                                  alt="Crew Bathtub Design" 
                                  className="w-full max-w-xs rounded-lg shadow-md mx-auto"
                                />
                              </div>
                              <div className="text-center">
                                <img 
                                  src="/gifs/Van-Crew.GIF" 
                                  alt="Crew Van Design" 
                                  className="w-full max-w-xs rounded-lg shadow-md mx-auto"
                                />
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-3 text-center italic">Examples of Brant's design work that saved Crew $110K+ in design costs</p>
                          </div>
                        )
                      }
                    
                      return elements
                    }).flat()
                  })()}
                    </div>
              </div>
              {message.role === 'user' && (
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="bg-white/90 backdrop-blur-sm text-gray-800 rounded-2xl px-6 py-4 shadow-lg border border-white/20">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating input container with gradient */}
      <div className="fixed bottom-0 left-0 right-0 z-40 h-24 bg-gradient-to-t from-white via-white to-transparent pointer-events-none"></div>
      <div className="floating-container">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl px-6 py-4 shadow-lg shadow-black/10 min-h-[200px] sm:min-h-0">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything about Brant"
                className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-3 text-base text-gray-800 placeholder-gray-500 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-lg min-h-[44px]"
                disabled={false}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="mt-3 text-center">
            <div className="text-xs font-semibold text-gray-500 mb-2">Suggestions to ask BrantChat</div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleSuggestedQuestion(suggestions[0])}
                disabled={isLoading}
                className="px-3 py-2 rounded-lg bg-white text-gray-800 border border-gray-200 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent focus:bg-gradient-to-r focus:from-purple-500 focus:to-pink-500 focus:text-white focus:border-transparent hover:shadow transition-all text-xs"
              >
                {suggestions[0]}
              </button>
              <button
                type="button"
                onClick={() => handleSuggestedQuestion(suggestions[1])}
                disabled={isLoading}
                className="px-3 py-2 rounded-lg bg-white text-gray-800 border border-gray-200 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent focus:bg-gradient-to-r focus:from-purple-500 focus:to-pink-500 focus:text-white focus:border-transparent hover:shadow transition-all text-xs"
              >
                {suggestions[1]}
              </button>
            </div>
          </div>
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500">
              {currentJobRole ? (
                <>Role: {(() => {
                  const roleText = currentJobRole.slug === 'pm' 
                    ? currentJobRole.position 
                    : `${currentJobRole.position} at ${currentJobRole.company}`
                  const jobUrl = currentJobRole.jobPostingUrl
                  return jobUrl ? (
                    <a href={jobUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 font-medium hover:text-purple-700 hover:underline transition-colors">
                      {roleText}
                    </a>
                  ) : (
                    <span className="text-purple-600 font-medium">{roleText}</span>
                  )
                })()}</>
              ) : (
                'Ask me anything about Brant Johnson'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
