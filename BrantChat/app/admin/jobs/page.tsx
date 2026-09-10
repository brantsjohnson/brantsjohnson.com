'use client'

import { useState, useEffect } from 'react'
import { Plus, Save, Briefcase, Trash2, Edit } from 'lucide-react'
import AdminLayout from '@/components/AdminLayout'

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

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobRole[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingJob, setEditingJob] = useState<JobRole | null>(null)

  const [newJob, setNewJob] = useState({
    company: '',
    position: '',
    slug: '',
    requirements: '',
    responsibilities: '',
    keySkills: '',
    jobPostingUrl: ''
  })

  const fetchJobs = async () => {
    const res = await fetch('/api/jobs')
    const data = await res.json()
    setJobs(data.jobs || [])
  }

  useEffect(() => { fetchJobs() }, [])

  const generateSlug = (company: string, position: string) => {
    const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    const base = `${clean(company)}-${clean(position)}`
    return base || `job-${Date.now()}`
  }

  const persist = async (updated: JobRole[]) => {
    setIsLoading(true)
    const token = localStorage.getItem('brantchat_token')
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token || ''}` },
      body: JSON.stringify({ jobs: updated })
    })
    setIsLoading(false)
    if (!res.ok) {
      setMessage('Failed to save jobs (are you logged in as admin?)')
      setTimeout(() => setMessage(''), 3000)
      return
    }
    setJobs(updated)
    setMessage('Jobs saved successfully!')
    setTimeout(() => setMessage(''), 2000)
  }

  const handleAddJob = () => {
    if (!newJob.company || !newJob.position) {
      alert('Please fill in company and position')
      return
    }

    // Clean the slug to remove any leading/trailing slashes and ensure it's valid
    const cleanSlug = (newJob.slug || generateSlug(newJob.company, newJob.position))
      .replace(/^\/+|\/+$/g, '') // Remove leading and trailing slashes
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-') // Replace invalid characters with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    
    const slug = cleanSlug || generateSlug(newJob.company, newJob.position)
    const job: JobRole = {
      id: Date.now().toString(),
      company: newJob.company,
      position: newJob.position,
      slug,
      requirements: newJob.requirements,
      responsibilities: newJob.responsibilities,
      keySkills: newJob.keySkills,
      jobPostingUrl: newJob.jobPostingUrl || undefined,
      lastUpdated: new Date().toISOString().split('T')[0]
    }

    const updatedJobs = [...jobs, job]
    persist(updatedJobs)

    setNewJob({ company: '', position: '', slug: '', requirements: '', responsibilities: '', keySkills: '', jobPostingUrl: '' })
    setShowAddForm(false)
  }

  const handleEditJob = (job: JobRole) => {
    setEditingJob(job)
    setNewJob({
      company: job.company,
      position: job.position,
      slug: job.slug,
      requirements: job.requirements,
      responsibilities: job.responsibilities,
      keySkills: job.keySkills,
      jobPostingUrl: job.jobPostingUrl || ''
    })
    setShowAddForm(true)
  }

  const handleUpdateJob = () => {
    if (!editingJob) return

    // Clean the slug to remove any leading/trailing slashes and ensure it's valid
    const cleanSlug = (newJob.slug || generateSlug(newJob.company, newJob.position))
      .replace(/^\/+|\/+$/g, '') // Remove leading and trailing slashes
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-') // Replace invalid characters with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    
    const slug = cleanSlug || generateSlug(newJob.company, newJob.position)

    const updatedJobs = jobs.map(job => 
      job.id === editingJob.id 
        ? { ...newJob, slug, id: editingJob.id, lastUpdated: new Date().toISOString().split('T')[0] } as JobRole
        : job
    )
    persist(updatedJobs)

    setEditingJob(null)
    setNewJob({ company: '', position: '', slug: '', requirements: '', responsibilities: '', keySkills: '', jobPostingUrl: '' })
    setShowAddForm(false)
  }

  const handleDeleteJob = (jobId: string) => {
    if (confirm('Delete this job role?')) {
      const updatedJobs = jobs.filter(job => job.id !== jobId)
      persist(updatedJobs)
    }
  }

  return (
    <AdminLayout 
      title="Job Roles Manager" 
      description="Manage job roles. The AI will tailor responses based on each specific role's requirements"
    >
        <div className="bg-chat-sidebar rounded-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2 flex items-center">
                <Briefcase className="w-6 h-6 mr-2" />
                Job Roles Manager
              </h1>
              <p className="text-gray-300">
                Add roles here. Share the URL code (slug) with employers, e.g. /schoolai.
              </p>
            </div>
            <button 
              onClick={() => setShowAddForm(true)} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Job Role</span>
            </button>
          </div>
          {message && (
            <div className={`p-3 rounded-lg ${message.includes('success') ? 'bg-green-600' : 'bg-red-600'} text-white`}>
              {message}
            </div>
          )}
        </div>

        {showAddForm && (
          <div className="bg-chat-sidebar rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              {editingJob ? 'Edit Job Role' : 'Add New Job Role'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Company</label>
                <input type="text" value={newJob.company} onChange={(e) => setNewJob({...newJob, company: e.target.value})} className="w-full px-3 py-2 bg-chat-input border border-chat-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., SchoolAI" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Position</label>
                <input type="text" value={newJob.position} onChange={(e) => setNewJob({...newJob, position: e.target.value})} className="w-full px-3 py-2 bg-chat-input border border-chat-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Product Manager" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">URL Code (slug)</label>
                <input type="text" value={newJob.slug} onChange={(e) => setNewJob({...newJob, slug: e.target.value})} className="w-full px-3 py-2 bg-chat-input border border-chat-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., schoolai" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Job Posting URL (optional)</label>
                <input type="url" value={newJob.jobPostingUrl} onChange={(e) => setNewJob({...newJob, jobPostingUrl: e.target.value})} className="w-full px-3 py-2 bg-chat-input border border-chat-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://company.com/careers/job-posting" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-gray-300 text-sm mb-2">Job Requirements</label>
              <textarea value={newJob.requirements} onChange={(e) => setNewJob({...newJob, requirements: e.target.value})} rows={3} className="w-full px-3 py-2 bg-chat-input border border-chat-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 5+ years product management experience..." />
            </div>
            <div className="mt-4">
              <label className="block text-gray-300 text-sm mb-2">Key Responsibilities</label>
              <textarea value={newJob.responsibilities} onChange={(e) => setNewJob({...newJob, responsibilities: e.target.value})} rows={3} className="w-full px-3 py-2 bg-chat-input border border-chat-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Lead product strategy..." />
            </div>
            <div className="mt-4">
              <label className="block text-gray-300 text-sm mb-2">Key Skills Needed</label>
              <textarea value={newJob.keySkills} onChange={(e) => setNewJob({...newJob, keySkills: e.target.value})} rows={2} className="w-full px-3 py-2 bg-chat-input border border-chat-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Product Strategy, User Research..." />
            </div>
            <div className="mt-4 flex space-x-4">
              <button onClick={editingJob ? handleUpdateJob : handleAddJob} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2" disabled={isLoading}>
                <Save className="w-4 h-4" />
                <span>{editingJob ? 'Update Job' : 'Add Job'}</span>
              </button>
              <button onClick={() => { setShowAddForm(false); setEditingJob(null); setNewJob({ company: '', position: '', slug: '', requirements: '', responsibilities: '', keySkills: '', jobPostingUrl: '' }) }} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-chat-sidebar rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{job.position} at {job.company}</h3>
                  <p className="text-gray-300 text-sm">URL Code: <span className="font-mono bg-chat-input px-2 py-1 rounded">/{job.slug}</span></p>
                  <p className="text-gray-400 text-xs">Last updated: {job.lastUpdated}</p>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => navigator.clipboard.writeText(`${window.location.origin}/${job.slug}`)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">Copy Link</button>
                  <button onClick={() => handleEditJob(job)} className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteJob(job.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {job.requirements && (
                <div className="mb-3">
                  <h4 className="text-gray-300 font-semibold text-sm mb-1">Requirements:</h4>
                  <p className="text-gray-400 text-sm">{job.requirements}</p>
                </div>
              )}
              {job.responsibilities && (
                <div className="mb-3">
                  <h4 className="text-gray-300 font-semibold text-sm mb-1">Responsibilities:</h4>
                  <p className="text-gray-400 text-sm">{job.responsibilities}</p>
                </div>
              )}
              {job.keySkills && (
                <div>
                  <h4 className="text-gray-300 font-semibold text-sm mb-1">Key Skills:</h4>
                  <p className="text-gray-400 text-sm">{job.keySkills}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="bg-chat-sidebar rounded-lg p-8 text-center">
            <Briefcase className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Job Roles Yet</h3>
            <p className="text-gray-400 mb-4">Add your first job role to get started.</p>
            <button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">Add Your First Job Role</button>
          </div>
        )}
    </AdminLayout>
  )
}
