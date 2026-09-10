# BrantChat

A personalized AI chatbot that showcases Brant Johnson's professional information to potential employers. Built with Next.js, TypeScript, and OpenAI's GPT API.

## Features

- 🔐 **Access Code Protected**: Secure access to prevent unauthorized usage
- 💬 **ChatGPT-like Interface**: Modern, responsive chat UI
- 🧠 **Custom Knowledge Base**: Easily updateable information about Brant
- 🎯 **Strict AI Responses**: Only answers using provided information
- 💰 **Cost Controlled**: Token limits to manage API costs
- 🚀 **Vercel Ready**: Easy deployment to Vercel

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file and fill in your values:

```bash
cp config.example.env .env.local
```

Edit `.env.local` with your actual values:

```env
OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET=your_super_secure_jwt_secret_here
ADMIN_PASSWORD=your_secure_password_here
```

### 3. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add it to your `.env.local` file

### 4. Update Your Information

1. Edit `data/brant-knowledge.json` with your personal and professional information
2. Or use the admin interface at `/admin` after setting up authentication

### 5. Deploy (Production-First)

This project is intended to run in production on Vercel. Deploy directly:

```bash
vercel --prod
```

After deploy, use your production domain (e.g., `https://brantchat.brantsjohnson.com`).

Important for persistence in production:
- Set `JWT_SECRET` and `OPENAI_API_KEY` in Vercel Environment Variables
- To persist Job Roles edited in the Admin UI, configure a KV store and set:
  - `KV_REST_API_URL`
  - `KV_REST_API_TOKEN`

Without KV configured, job roles will not persist across deployments.

## Default Access Codes

- **Admin**: `enter` (CHANGE THESE IMMEDIATELY!)

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-github-repo-url
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com)

### Optional: Local Development

Local development is not required. If you do choose to run locally:

```bash
npm run dev
```

Then open `http://localhost:1234`. Do not use local for production content; changes in local storage will not persist to production unless deployed.
2. Import your GitHub repository
3. Add environment variables in Vercel dashboard:
   - `OPENAI_API_KEY`
   - `JWT_SECRET`
4. Deploy!

### 3. Custom Domain (Optional)

To use your `brantsjohnson.com` domain:

1. In Vercel dashboard, go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed by Vercel

## Usage

### For Potential Employers

1. Visit your deployed BrantChat URL
2. Enter the access code for your company
3. Ask questions about Brant's background, skills, experience, etc.

### For You (Admin)

1. Visit `/admin` on your deployed site
2. Enter the admin access code
3. Update your information as needed
4. Changes take effect immediately

## Cost Management

The app includes several cost controls:

- **Token Limits**: Responses limited to 500 tokens
- **Model**: Uses GPT-3.5-turbo (cheaper than GPT-4)
- **Strict Prompts**: AI only uses provided information, reducing token usage

## Security Features

- Access code protection for access
- JWT token authentication
- Secure API routes
- Input validation and sanitization

## File Structure

```
BrantChat/
├── app/
│   ├── api/
│   │   ├── auth/          # Authentication endpoints
│   │   ├── chat/          # Chat API with OpenAI
│   │   └── admin/         # Admin endpoints
│   ├── admin/             # Admin interface
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main chat interface
├── data/
│   └── brant-knowledge.json # Your information database
├── lib/
│   ├── api.ts             # API utilities
│   ├── knowledge-base.ts  # Knowledge base management
└── hooks/
    └── useAuth.ts         # Authentication hook
```

## Customization

### Styling
- Edit `tailwind.config.js` for color schemes
- Modify `app/globals.css` for custom styles

### AI Behavior
- Update system prompts in `app/api/chat/route.ts`
- Adjust token limits and model settings

### Knowledge Base
- Edit `data/brant-knowledge.json` directly
- Use the admin interface at `/admin`

## Support

This is a custom-built solution. For issues or modifications, you'll need to update the code directly or get help from a developer.

## License

Private project for Brant Johnson's professional use.
