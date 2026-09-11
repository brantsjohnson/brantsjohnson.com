import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { BrantKnowledge } from '@/lib/knowledge-base'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }
  
  const token = authHeader.substring(7)
  try {
    jwt.verify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    if (!verifyToken(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { knowledge } = await request.json()

    if (!knowledge) {
      return NextResponse.json({ error: 'Knowledge data required' }, { status: 400 })
    }

    // Update the last updated timestamp
    const updatedKnowledge: BrantKnowledge = {
      ...knowledge,
      lastUpdated: new Date().toISOString().split('T')[0]
    }

    // Write to the knowledge base file
    const filePath = path.join(process.cwd(), 'data', 'brant-knowledge.json')
    fs.writeFileSync(filePath, JSON.stringify(updatedKnowledge, null, 2))

    return NextResponse.json({ 
      success: true, 
      message: 'Knowledge base updated successfully' 
    })

  } catch (error) {
    console.error('Update knowledge error:', error)
    return NextResponse.json({ 
      error: 'Failed to update knowledge base' 
    }, { status: 500 })
  }
}
