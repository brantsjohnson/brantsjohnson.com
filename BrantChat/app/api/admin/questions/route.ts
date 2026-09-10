import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase'

export interface Question {
  id: string
  text: string
  approved: boolean
  jobId: string
  created_at?: string
  updated_at?: string
}

// GET - Load questions for a specific job
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const jobId = searchParams.get('jobId')

    if (!jobId) {
      return NextResponse.json({ error: 'Job ID required' }, { status: 400 })
    }

    // console.log('Fetching questions for jobId:', jobId)
    
    const { data, error } = await supabaseAdmin
      .from('job_questions')
      .select('*')
      .eq('job_id', jobId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching questions:', error)
      return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
    }

    // console.log('Found questions:', data?.length || 0, 'for jobId:', jobId)
    // console.log('Questions data:', data)

    return NextResponse.json({ 
      success: true, 
      questions: data || [] 
    })

  } catch (error) {
    console.error('Error in GET /api/admin/questions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create new questions
export async function POST(request: NextRequest) {
  try {
    const { questions, jobId } = await request.json()

    if (!questions || !Array.isArray(questions) || !jobId) {
      return NextResponse.json({ error: 'Questions array and jobId required' }, { status: 400 })
    }

    const questionData = questions.map((text: string) => ({
      text,
      approved: false,
      job_id: jobId
    }))

    const { data, error } = await supabaseAdmin
      .from('job_questions')
      .insert(questionData)
      .select()

    if (error) {
      console.error('Error creating questions:', error)
      console.error('Question data:', questionData)
      return NextResponse.json({ 
        error: 'Failed to create questions', 
        details: error.message,
        code: error.code 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      questions: data || [] 
    })

  } catch (error) {
    console.error('Error in POST /api/admin/questions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - Update question approval status or text
export async function PUT(request: NextRequest) {
  try {
    const { questionId, approved, text } = await request.json()

    if (!questionId) {
      return NextResponse.json({ error: 'Question ID required' }, { status: 400 })
    }

    // Build update object based on what's provided
    const updateData: any = {
      updated_at: new Date().toISOString()
    }
    
    if (typeof approved === 'boolean') {
      updateData.approved = approved
    }
    
    if (typeof text === 'string') {
      updateData.text = text
    }

    const { data, error } = await supabaseAdmin
      .from('job_questions')
      .update(updateData)
      .eq('id', questionId)
      .select()

    if (error) {
      console.error('Error updating question:', error)
      return NextResponse.json({ error: 'Failed to update question' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      question: data?.[0] 
    })

  } catch (error) {
    console.error('Error in PUT /api/admin/questions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Delete a question
export async function DELETE(request: NextRequest) {
  try {
    const { questionId } = await request.json()

    if (!questionId) {
      return NextResponse.json({ error: 'Question ID required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('job_questions')
      .delete()
      .eq('id', questionId)

    if (error) {
      console.error('Error deleting question:', error)
      return NextResponse.json({ error: 'Failed to delete question' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true 
    })

  } catch (error) {
    console.error('Error in DELETE /api/admin/questions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
