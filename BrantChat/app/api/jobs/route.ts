import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { loadJobs, saveJobs, JobRole } from '@/lib/jobs-store'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

function verifyAdmin(request: NextRequest) {
	const authHeader = request.headers.get('authorization')
	if (!authHeader || !authHeader.startsWith('Bearer ')) return false
	try { 
		jwt.verify(authHeader.substring(7), JWT_SECRET)
		return true 
	} catch { 
		return false 
	}
}

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url)
		const slug = searchParams.get('slug')
		const jobs = await loadJobs()
		if (slug) {
			const job = jobs.find(j => j.slug.toLowerCase() === slug.toLowerCase())
			if (!job) return NextResponse.json({ error: 'Not found' }, { status: 404 })
			return NextResponse.json({ success: true, job })
		}
		return NextResponse.json({ success: true, jobs })
	} catch (error) {
		return NextResponse.json({ error: 'Failed to get jobs' }, { status: 500 })
	}
}

export async function POST(request: NextRequest) {
	try {
		if (!verifyAdmin(request)) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}
		const body = await request.json()
		const jobs = (body?.jobs || []) as JobRole[]
		if (!Array.isArray(jobs)) {
			return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
		}
		await saveJobs(jobs)
		return NextResponse.json({ success: true })
	} catch (error) {
		return NextResponse.json({ error: 'Failed to save jobs' }, { status: 500 })
	}
}
