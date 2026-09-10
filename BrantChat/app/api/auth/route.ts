import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Admin password only
const ADMIN_HASH = '$2a$10$lt6US5jpI6tzk2y8Y8PyPe2k.cFTBDz5fjsTpjCNzmE3px1NOA7R.' // "password"

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 })
    }

    const isValid = await bcrypt.compare(password, ADMIN_HASH)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = jwt.sign({ authenticated: true, company: 'admin', timestamp: Date.now() }, JWT_SECRET, { expiresIn: '24h' })

    return NextResponse.json({ success: true, token, company: 'admin' })
  } catch (error) {
    return NextResponse.json({ error: 'Access denied' }, { status: 500 })
  }
}
