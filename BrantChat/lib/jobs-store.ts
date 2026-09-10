import fs from 'fs'
import path from 'path'

export interface JobRole {
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

// In-memory storage for production (when KV is not available)
let memoryJobs: JobRole[] = []

function jobsFilePath(): string {
	return path.join(process.cwd(), 'data', 'jobs.json')
}

async function readFromKV(): Promise<JobRole[] | null> {
	const url = process.env.KV_REST_API_URL
	const token = process.env.KV_REST_API_TOKEN
	if (!url || !token) {
		console.log('KV not configured; skipping readFromKV')
		return null
	}
	const res = await fetch(`${url}/get/jobs`, { headers: { Authorization: `Bearer ${token}` } })
	if (!res.ok) {
		console.log('KV read failed with status', res.status)
		return []
	}
	const data = await res.json()
	return (data?.result as JobRole[]) || []
}

async function writeToKV(jobs: JobRole[]): Promise<boolean> {
	const url = process.env.KV_REST_API_URL
	const token = process.env.KV_REST_API_TOKEN
	if (!url || !token) {
		console.log('KV not configured; skipping writeToKV')
		return false
	}
	const res = await fetch(`${url}/set/jobs`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
		body: JSON.stringify({ value: jobs })
	})
	if (!res.ok) {
		console.log('KV write failed with status', res.status)
		return false
	}
	return true
}

export async function loadJobs(): Promise<JobRole[]> {
	// Try KV first
	const kv = await readFromKV()
	if (kv) return kv
	
	// Always try to load from file first (this persists through deployments)
	try {
		const file = jobsFilePath()
		if (fs.existsSync(file)) {
			const fileJobs = JSON.parse(fs.readFileSync(file, 'utf-8')) as JobRole[]
			if (fileJobs.length > 0) {
				// Update memory with file data
				memoryJobs = fileJobs
				return fileJobs
			}
		}
	} catch (error) {
		console.log('Error reading jobs file:', error)
	}
	
	// If we have jobs in memory, return them
	if (memoryJobs.length > 0) return memoryJobs
	
	// Return empty array if nothing found
	return []
}

export async function saveJobs(jobs: JobRole[]): Promise<void> {
	// Try KV if available
	const ok = await writeToKV(jobs)
	if (ok) {
		// Also update memory and file for consistency
		memoryJobs = jobs
		try {
			fs.writeFileSync(jobsFilePath(), JSON.stringify(jobs, null, 2))
		} catch (error) {
			console.log('Could not write to file after KV save:', error)
		}
		return
	}
	
	// Store in memory and always try to write to file
	memoryJobs = jobs
	console.log('Saving jobs to memory and file (no KV available):', jobs.length, 'jobs')
	
	// Always try to write to file (this will work in most environments)
	try {
		fs.writeFileSync(jobsFilePath(), JSON.stringify(jobs, null, 2))
		console.log('Successfully wrote jobs to file')
	} catch (error) {
		console.log('Could not write to file:', error)
	}
}
