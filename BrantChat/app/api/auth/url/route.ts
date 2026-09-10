import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { loadJobs } from '../../../../lib/jobs-store'

// Company/Job mappings for URL-based access
const COMPANY_MAPPINGS = {
  'schoolai': {
    company: 'SchoolAI',
    position: 'Product Manager',
    type: 'job',
    jobPostingUrl: 'https://example.com/schoolai-job'
  },
  'google': {
    company: 'Google',
    type: 'company'
  },
  'microsoft': {
    company: 'Microsoft', 
    type: 'company'
  },
  'apple': {
    company: 'Apple',
    type: 'company'
  },
  'admin': {
    company: 'Admin',
    type: 'admin'
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function POST(request: NextRequest) {
  try {
    const { companyKey } = await request.json()

    if (!companyKey) {
      return NextResponse.json({ error: 'Company key required' }, { status: 400 })
    }

    // First check hardcoded mappings
    let companyInfo = COMPANY_MAPPINGS[companyKey.toLowerCase() as keyof typeof COMPANY_MAPPINGS]

    // If not found in hardcoded mappings, check jobs database
    if (!companyInfo) {
      try {
        const jobs = await loadJobs()
        const job = jobs.find(j => j.slug.toLowerCase() === companyKey.toLowerCase())
        
        if (job) {
          // console.log(`🔍 DEBUG: Found job in database for slug "${companyKey}":`, job)
          companyInfo = {
            company: job.company,
            position: job.position,
            type: 'job',
            jobPostingUrl: job.jobPostingUrl
          }
          // console.log(`🔍 DEBUG: Setting companyInfo:`, companyInfo)
        }
      } catch (error) {
        console.error('Error loading jobs for auth:', error)
      }
    }

    if (!companyInfo) {
      return NextResponse.json({ error: 'Invalid company' }, { status: 404 })
    }

    // Generate JWT token with company info
    const token = jwt.sign({ 
      authenticated: true, 
      company: companyInfo.company,
      companyKey: companyKey.toLowerCase(),
      type: companyInfo.type,
      timestamp: Date.now()
    }, JWT_SECRET, { expiresIn: '24h' })

    return NextResponse.json({ 
      success: true, 
      token,
      company: companyInfo.company,
      companyInfo
    })
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}
