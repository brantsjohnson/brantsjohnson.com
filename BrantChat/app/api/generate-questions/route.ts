import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { jobRole } = await request.json()

    if (!jobRole) {
      return NextResponse.json({ error: 'Job role required' }, { status: 400 })
    }

    // Create a prompt to generate job-specific questions
    const prompt = `You are an expert recruiter creating interview questions for a Product Manager role.

Job Details:
- Company: ${jobRole.company}
- Position: ${jobRole.position}

Generate 10 clear, specific interview questions that a hiring manager would ask about Brant Johnson's experience. Each question should:
- Be about 10-15 words long
- Focus on one specific topic
- Be easy to understand
- Test relevant skills for this role
- Be phrased as "How has Brant..." or "What's Brant's experience with..." or "Can you tell me about Brant's..."

Examples of good questions:
- "How has Brant prioritized features when resources were limited?"
- "What's Brant's approach to working with engineering teams?"
- "How has Brant measured product success in his projects?"

Return ONLY a JSON array of 10 questions, like this:
["Question 1?", "Question 2?", "Question 3?", "Question 4?", "Question 5?", "Question 6?", "Question 7?", "Question 8?", "Question 9?", "Question 10?"]

Do not include any other text, just the JSON array.`

    const completion = await openai.chat.completions.create({
      model: "ft:gpt-4o-mini-2024-07-18:personal:brantchat-trained:CdRL5IwO",
      messages: [
        { role: "system", content: "You are an expert recruiter who creates clear, concise interview questions. You MUST respond with ONLY a valid JSON array of exactly 10 questions. Each question should be 10-15 words long and end with a question mark. Do not include any other text or explanation." },
        { role: "user", content: prompt }
      ],
      max_tokens: 600,
      temperature: 0.6,
    })

    const response = completion.choices[0]?.message?.content

    if (!response) {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 })
    }

    // Parse the JSON response
    let questions: string[]
    try {
      questions = JSON.parse(response)
    } catch (parseError) {
      console.error('Failed to parse AI response:', response)
      return NextResponse.json({ error: 'Invalid response format' }, { status: 500 })
    }

    // Validate that we got an array of strings
    if (!Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json({ error: 'Invalid questions format' }, { status: 500 })
    }

    // Clean and validate questions
    const validQuestions = questions
      .filter(q => typeof q === 'string' && q.trim().length > 0)
      .slice(0, 10)
      .map(q => {
        let cleaned = q.trim()
        // Remove any malformed text that might have been generated
        cleaned = cleaned.replace(/^[^A-Za-z]*/, '') // Remove leading non-letters
        cleaned = cleaned.replace(/[^A-Za-z0-9\s\?\!\.\,\:\-]*$/, '') // Remove trailing junk
        // Ensure it ends with a question mark
        if (!cleaned.endsWith('?')) {
          cleaned += '?'
        }
        return cleaned
      })
      .filter(q => q.length > 10 && q.length < 100) // Reasonable length

    // If we don't have enough valid questions, use fallback questions
    if (validQuestions.length < 5) {
      const fallbackQuestions = [
        `How has Brant's experience aligned with the ${jobRole.position} role at ${jobRole.company}?`,
        `What's Brant's approach to product strategy and roadmapping?`,
        `How has Brant handled cross-functional collaboration?`,
        `What's Brant's experience with data-driven decision making?`,
        `How has Brant prioritized features and managed product backlogs?`,
        `What's Brant's approach to user research and customer feedback?`,
        `How has Brant measured product success and key metrics?`,
        `What's Brant's experience with agile development processes?`,
        `How has Brant worked with engineering and design teams?`,
        `What's Brant's approach to stakeholder management and communication?`
      ]
      return NextResponse.json({ 
        success: true, 
        questions: fallbackQuestions 
      })
    }

    return NextResponse.json({ 
      success: true, 
      questions: validQuestions 
    })

  } catch (error) {
    console.error('Question generation error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate questions' 
    }, { status: 500 })
  }
}
