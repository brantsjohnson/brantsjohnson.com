#!/bin/bash

echo "🚀 Setting up BrantChat..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cp config.example.env .env.local
    echo "✅ Created .env.local - Please edit it with your actual values!"
else
    echo "✅ .env.local already exists"
fi

# Generate a secure JWT secret
echo "🔐 Generating secure JWT secret..."
JWT_SECRET=$(openssl rand -base64 32)
echo "Generated JWT_SECRET: $JWT_SECRET"
echo "Add this to your .env.local file: JWT_SECRET=$JWT_SECRET"

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your OpenAI API key and JWT secret"
echo "2. Update data/brant-knowledge.json with your information"
echo "3. Run 'npm run dev' to start the development server"
echo "4. Visit brantchat.brantsjohnson.com to test your chat"
echo "5. Visit brantchat.brantsjohnson.com/admin to manage your knowledge base"
echo ""
echo "Default password is 'password' - change it immediately!"
