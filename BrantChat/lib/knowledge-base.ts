import brantKnowledge from '../data/brant-knowledge.json'

export interface BrantKnowledge {
  personalInfo: {
    name: string
    title: string
    location: string
    email: string
    linkedin: string
    portfolio: string
  }
  professionalBackground: string[]
  skills: {
    technical: string[];
    productManagement: string[];
    businessStrategy: string[];
    marketing: string[];
    leadership: string[];
    analytics: string[];
    design: string[];
    systems: string[];
  }
  experience: Array<{
    company: string
    position: string
    duration: string
    description: string
  }>
  education: Array<{
    institution: string
    location: string
    degree: string
    graduationDate: string
    description: string
    gpa?: string
    scholarships?: string
  }>
  achievements: string[]
  careerStories: string[]
  leadership: string[]
  interests: string[]
  certifications: string[]
  favorites?: {
    foods?: string[]
    holiday?: { name?: string; why?: string }
    movies?: string[]
    moviesReason?: string
    artist?: {
      names?: string[]
      notes?: string
      favoriteSongs?: Array<{ title: string; artist: string }>
    } | string
  }
  funFacts?: {
    nicknames?: string[]
  }
  areasOfImprovement?: {
    delegation?: string
    scopeManagement?: string
  }
  weaknesses?: {
    [key: string]: string
  }
  growthAreas?: {
    [key: string]: string
  }
  lastUpdated: string
}

export function getBrantKnowledge(): BrantKnowledge {
  return brantKnowledge as BrantKnowledge
}

export function generateKnowledgeBaseText(): string {
  const knowledge = getBrantKnowledge()
  
  return `Brant Johnson - Product Manager with 6+ years experience in fintech and govtech.

PERSONAL INFO:
- Name: ${knowledge.personalInfo.name}
- Title: ${knowledge.personalInfo.title}
- Location: ${knowledge.personalInfo.location}
- Email: ${knowledge.personalInfo.email}
- LinkedIn: ${knowledge.personalInfo.linkedin}

KEY EXPERIENCE:
- Principal Product Manager at Crew Finance (Dec 2022–Mar 2024): Sole product person with full ownership of all product decisions, saved $110K+ by internalizing design work, increased user engagement 20%
- Product Management Analyst at Divvy Pay/Bill.com (May-Sept 2022): Implemented Pendo analytics, improved data accuracy to 93%
- Founder & Product Manager at BackLocal (Sept 2021–Sept 2022): Full ownership of product direction as founding team member, led product strategy from concept to revenue-generating launch
- Marketing Analyst at FranklinCovey (Jan 2021–Dec 2022): Generated 85K+ leads, 4x more than peers
- Account Executive at Utah Business (Oct 2024-Present): Full-time sales role, consults on marketing strategy

ADDITIONAL EXPERIENCE:
${knowledge.experience.map(exp => `- ${exp.position} at ${exp.company} (${exp.duration}): ${exp.description}`).join('\n')}

AI EXPERIENCE & EXPERTISE:
- Built this AI chatbot (BrantChat) to showcase AI skills and make getting to know him easier for hiring teams
- Developed Intro: business event matchmaking software with AI-powered features including an in-app messaging platform and AI SMS texting tool
- Created AI-powered SMS system that proactively sends personalized conference networking recommendations to opted-in attendees
- Built successful in-app messaging platform for Intro that enables seamless communication between matched conference attendees
- Trains team at Utah Business weekly on AI tools, practical applications, and integration strategies
- Uses Cursor and Loveable for development
- Deep understanding of AI fundamentals, works extensively with Gemini and OpenAI APIs
- Experience with multi-channel AI communication design (in-app + SMS), personalization at scale, and engagement optimization

AI-POWERED MESSAGING SYSTEMS EXPERIENCE:
${(knowledge as any).aiPoweredMessagingExperience ? (knowledge as any).aiPoweredMessagingExperience.map((exp: string) => `- ${exp}`).join('\n') : 'Not specified'}

DETAILED CAREER STORIES:
${knowledge.careerStories.map(story => `- ${story}`).join('\n')}

CREW COMPLIANCE & FINANCIAL TECH EXPERIENCE:
${(knowledge as any).crewComplianceExperience ? (knowledge as any).crewComplianceExperience.map((exp: string) => `- ${exp}`).join('\n') : 'Not specified'}

EXTENSIVE LEADERSHIP & SERVICE EXPERIENCE:
${knowledge.leadership.map(role => `- ${role}`).join('\n')}

DETAILED PERSONAL INTERESTS & ACHIEVEMENTS:
${knowledge.interests.map(interest => `- ${interest}`).join('\n')}

TECHNICAL SKILLS & EXPERTISE:
Technical: ${knowledge.skills?.technical?.join(', ') || 'Not specified'}
Product Management: ${knowledge.skills?.productManagement?.join(', ') || 'Not specified'}
Business Strategy: ${knowledge.skills?.businessStrategy?.join(', ') || 'Not specified'}
Marketing: ${knowledge.skills?.marketing?.join(', ') || 'Not specified'}
Leadership: ${knowledge.skills?.leadership?.join(', ') || 'Not specified'}
Analytics: ${knowledge.skills?.analytics?.join(', ') || 'Not specified'}
Design: ${knowledge.skills?.design?.join(', ') || 'Not specified'}
Systems: ${knowledge.skills?.systems?.join(', ') || 'Not specified'}

FAVORITES:
${(() => {
  const fav = knowledge.favorites
  if (!fav) return 'Not specified'
  const foods = fav.foods && fav.foods.length ? `Foods: ${fav.foods.join(', ')}` : undefined
  const holiday = fav.holiday?.name ? `Holiday: ${fav.holiday.name}${fav.holiday.why ? ` — ${fav.holiday.why}` : ''}` : undefined
  const movies = fav.movies && fav.movies.length ? `Movies: ${fav.movies.join(', ')}` : undefined
  const moviesReason = fav.moviesReason ? `Why those movies: ${fav.moviesReason}` : undefined
  let artistLine: string | undefined
  if (typeof fav.artist === 'string') {
    artistLine = `Artists: ${fav.artist}`
  } else if (fav.artist) {
    const names = fav.artist.names?.join(', ')
    const notes = fav.artist.notes ? ` (${fav.artist.notes})` : ''
    const songs = fav.artist.favoriteSongs && fav.artist.favoriteSongs.length
      ? ` Favorite songs: ${fav.artist.favoriteSongs.map(s => `${s.title} by ${s.artist}`).join('; ')}`
      : ''
    artistLine = names ? `Artists: ${names}${notes}${songs}` : undefined
  }
  return [foods, holiday, movies, moviesReason, artistLine].filter(Boolean).join('\n') || 'Not specified'
})()}

FUN FACTS:
${(() => {
  const ff = knowledge.funFacts
  if (!ff) return 'Not specified'
  const nicks = ff.nicknames && ff.nicknames.length ? `Nicknames: ${ff.nicknames.join(', ')}` : undefined
  return [nicks].filter(Boolean).join('\n') || 'Not specified'
})()}

WEAKNESSES & AREAS FOR IMPROVEMENT:
${(() => {
  const weaknesses = (knowledge as any).weaknesses
  if (!weaknesses) return 'Not specified'
  return Object.entries(weaknesses).map(([key, value]) => `${key}: ${value}`).join('\n')
})()}

GROWTH AREAS & DEVELOPMENT GOALS:
${(() => {
  const growthAreas = (knowledge as any).growthAreas
  if (!growthAreas) return 'Not specified'
  return Object.entries(growthAreas).map(([key, value]) => `${key}: ${value}`).join('\n')
})()}

EDUCATION:
${knowledge.education.map(edu => `- ${edu.institution} (${edu.location}): ${edu.degree} - ${edu.graduationDate}${edu.gpa ? `, GPA: ${edu.gpa}` : ''}${edu.scholarships ? `, ${edu.scholarships}` : ''}. ${edu.description}`).join('\n')}

CERTIFICATIONS:
${knowledge.certifications.map(cert => `- ${cert}`).join('\n')}

IMPORTANT: Only answer questions using the information provided above about Brant Johnson. If asked about something not covered in this knowledge base, politely say "I don't have information about that in my knowledge base about Brant. Please ask me something else about his professional background, skills, or experience."
`
}
