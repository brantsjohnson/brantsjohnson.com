'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '../../../components/AdminLayout'
import AdminNav from '../../../components/AdminNav'
import { Check, RefreshCw, Plus, Trash2, Edit2, Save, X } from 'lucide-react'

interface JobRole {
  id: string
  company: string
  position: string
  slug: string
  requirements?: string
  responsibilities?: string
  keySkills?: string
  jobPostingUrl?: string
  lastUpdated: string
}

interface Question {
  id: string
  text: string
  approved: boolean
  jobId: string
}

export default function AdminQuestionsPage() {
  const [jobs, setJobs] = useState<JobRole[]>([])
  const [selectedJob, setSelectedJob] = useState<JobRole | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  // Load jobs on component mount
  useEffect(() => {
    loadJobs()
  }, [])

  // Load questions when job is selected
  useEffect(() => {
    if (selectedJob) {
      loadQuestions(selectedJob.id)
    }
  }, [selectedJob])

  const loadJobs = async () => {
    try {
      const response = await fetch('/api/jobs')
      if (response.ok) {
        const data = await response.json()
        setJobs(data.jobs || [])
      }
    } catch (error) {
      console.error('Error loading jobs:', error)
      setMessage('Error loading jobs')
    }
  }

  const loadQuestions = async (jobId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/questions?jobId=${jobId}`)
      if (response.ok) {
        const data = await response.json()
        setQuestions(data.questions || [])
      }
    } catch (error) {
      console.error('Error loading questions:', error)
      setMessage('Error loading questions')
    } finally {
      setLoading(false)
    }
  }

  const generateQuestions = async (jobId: string) => {
    try {
      setLoading(true)
      const job = jobs.find(j => j.id === jobId)
      if (!job) return

      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobRole: job })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.questions) {
          // Save questions to database first
          const saveResponse = await fetch('/api/admin/questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              questions: data.questions,
              jobId
            })
          })

          if (saveResponse.ok) {
            const saveData = await saveResponse.json()
            if (saveData.success && saveData.questions) {
              // Add the saved questions to the list
              setQuestions(prev => [...prev, ...saveData.questions])
              setMessage(`Generated and saved ${data.questions.length} new questions`)
            } else {
              console.error('Save response not successful:', saveData)
              setMessage(`Generated questions but save failed: ${saveData.error || 'Unknown error'}`)
            }
          } else {
            const errorData = await saveResponse.json()
            console.error('Save request failed:', errorData)
            setMessage(`Generated questions but failed to save them: ${errorData.error || 'Database error'}`)
          }
        }
      }
    } catch (error) {
      console.error('Error generating questions:', error)
      setMessage('Error generating questions')
    } finally {
      setLoading(false)
    }
  }

  const toggleQuestionApproval = async (questionId: string) => {
    try {
      const question = questions.find(q => q.id === questionId)
      if (!question) {
        console.error('Question not found:', questionId)
        setMessage('Question not found')
        return
      }

      console.log('Toggling approval for question:', questionId, 'Current approved:', question.approved)

      const response = await fetch('/api/admin/questions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId,
          approved: !question.approved
        })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Approval toggle response:', data)
        setQuestions(prev => 
          prev.map(q => 
            q.id === questionId 
              ? { ...q, approved: !q.approved }
              : q
          )
        )
        setMessage(`Question ${!question.approved ? 'approved' : 'unapproved'}`)
      } else {
        const errorData = await response.json()
        console.error('Failed to update question approval:', errorData)
        setMessage(`Failed to update question: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error updating question:', error)
      setMessage('Error updating question')
    }
  }

  const deleteQuestion = async (questionId: string) => {
    try {
      const response = await fetch('/api/admin/questions', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId })
      })

      if (response.ok) {
        setQuestions(prev => prev.filter(q => q.id !== questionId))
        setMessage('Question deleted')
      }
    } catch (error) {
      console.error('Error deleting question:', error)
      setMessage('Error deleting question')
    }
  }

  const regenerateUnapproved = async () => {
    if (!selectedJob) return
    
    // Delete all unapproved questions
    const unapprovedQuestions = questions.filter(q => !q.approved)
    for (const question of unapprovedQuestions) {
      await deleteQuestion(question.id)
    }
    
    // Generate new questions
    await generateQuestions(selectedJob.id)
  }

  const startEditing = (question: Question) => {
    setEditingQuestion(question.id)
    setEditText(question.text)
  }

  const cancelEditing = () => {
    setEditingQuestion(null)
    setEditText('')
  }

  const saveQuestion = async (questionId: string) => {
    try {
      console.log('Saving question:', questionId, 'with text:', editText)

      const response = await fetch('/api/admin/questions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId,
          text: editText
        })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Save response:', data)
        setQuestions(prev => 
          prev.map(q => 
            q.id === questionId 
              ? { ...q, text: editText }
              : q
          )
        )
        setEditingQuestion(null)
        setEditText('')
        setMessage('Question updated successfully')
      } else {
        const errorData = await response.json()
        console.error('Failed to save question:', errorData)
        setMessage(`Failed to save question: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error updating question:', error)
      setMessage('Error updating question')
    }
  }

  const approvedQuestions = questions.filter(q => q.approved)
  const unapprovedQuestions = questions.filter(q => !q.approved)

  return (
    <AdminLayout 
      title="Question Manager" 
      description="Manage AI-generated questions for each job role"
    >
      <AdminNav />
      
      <div className="bg-chat-sidebar rounded-lg p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2 flex items-center">
              <Plus className="w-6 h-6 mr-2" />
              Question Manager
            </h1>
            <p className="text-gray-300">
              Review and approve AI-generated questions for each job role
            </p>
          </div>
        </div>
        
        {message && (
          <div className={`p-3 rounded-lg ${message.includes('Error') ? 'bg-red-600' : 'bg-green-600'} text-white mb-4`}>
            {message}
          </div>
        )}

        {/* Job Selection */}
        <div className="mb-6">
          <label className="block text-white font-semibold mb-2">Select Job Role:</label>
          <select
            value={selectedJob?.id || ''}
            onChange={(e) => {
              const job = jobs.find(j => j.id === e.target.value)
              setSelectedJob(job || null)
            }}
            className="w-full p-3 rounded-lg bg-white text-gray-800 border border-gray-300"
          >
            <option value="">Choose a job role...</option>
            {jobs.map(job => (
              <option key={job.id} value={job.id}>
                {job.position} at {job.company}
              </option>
            ))}
          </select>
        </div>

        {selectedJob && (
          <div className="bg-white rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {selectedJob.position} at {selectedJob.company}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Slug: /{selectedJob.slug}
            </p>
            
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => generateQuestions(selectedJob.id)}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Generate New Questions</span>
              </button>
              
              {unapprovedQuestions.length > 0 && (
                <button
                  onClick={regenerateUnapproved}
                  disabled={loading}
                  className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Regenerate Unapproved ({unapprovedQuestions.length})</span>
                </button>
              )}
            </div>

            {/* Questions List */}
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-2">Loading questions...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Approved Questions */}
                {approvedQuestions.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-green-600 mb-3 flex items-center">
                      <Check className="w-5 h-5 mr-2" />
                      Approved Questions ({approvedQuestions.length})
                    </h4>
                    <div className="space-y-2">
                      {approvedQuestions.map(question => (
                        <div key={question.id} className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <button
                            onClick={() => toggleQuestionApproval(question.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          
                          {editingQuestion === question.id ? (
                            <div className="flex-1 flex items-center space-x-2">
                              <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="flex-1 p-2 border border-gray-300 rounded text-gray-800"
                                autoFocus
                              />
                              <button
                                onClick={() => saveQuestion(question.id)}
                                className="text-green-600 hover:text-green-700"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                              <button
                                onClick={cancelEditing}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <span className="flex-1 text-gray-800">{question.text}</span>
                              <button
                                onClick={() => startEditing(question)}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          
                          <button
                            onClick={() => deleteQuestion(question.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Unapproved Questions */}
                {unapprovedQuestions.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-orange-600 mb-3 flex items-center">
                      <RefreshCw className="w-5 h-5 mr-2" />
                      Pending Review ({unapprovedQuestions.length})
                    </h4>
                    <div className="space-y-2">
                      {unapprovedQuestions.map(question => (
                        <div key={question.id} className="flex items-center space-x-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                          <button
                            onClick={() => toggleQuestionApproval(question.id)}
                            className="text-gray-400 hover:text-green-600 border border-gray-300 rounded p-1"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          
                          {editingQuestion === question.id ? (
                            <div className="flex-1 flex items-center space-x-2">
                              <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="flex-1 p-2 border border-gray-300 rounded text-gray-800"
                                autoFocus
                              />
                              <button
                                onClick={() => saveQuestion(question.id)}
                                className="text-green-600 hover:text-green-700"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                              <button
                                onClick={cancelEditing}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <span className="flex-1 text-gray-800">{question.text}</span>
                              <button
                                onClick={() => startEditing(question)}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          
                          <button
                            onClick={() => deleteQuestion(question.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {questions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No questions generated yet. Click "Generate New Questions" to get started.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
