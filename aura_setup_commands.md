# 🚀 Aura Development Setup Commands

## Step-by-Step Setup (Copy & Paste These Commands)

### 1. Initialize Aura Project
```bash
# Create Next.js app with all the good stuff
npx create-next-app@latest aura --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Navigate to project
cd aura

# Install Aura-specific dependencies
npm install @supabase/supabase-js openai zustand framer-motion lucide-react @radix-ui/react-dialog @radix-ui/react-button
```

### 2. Set Up Environment Variables
```bash
# Create .env.local file
touch .env.local

# Add this content to .env.local:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Create Aura's Core Structure
```bash
# Create core directories
mkdir -p src/components/aura
mkdir -p src/lib/aura
mkdir -p src/hooks
mkdir -p src/types
mkdir -p src/utils

# Create core files (we'll populate these next)
touch src/components/aura/AuraChat.tsx
touch src/components/aura/ProactivePanel.tsx
touch src/lib/aura/core.ts
touch src/lib/aura/emotions.ts
touch src/lib/aura/patterns.ts
touch src/hooks/useAura.ts
touch src/types/aura.ts
```

### 4. Start Development Server
```bash
# Run Aura in development mode
npm run dev

# Your app will be available at http://localhost:3000
# And if using Codespaces, it'll give you a public URL too!
```

### 5. Deploy to Vercel (Instant Live Demo)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy Aura to the world!
vercel --prod

# You'll get a live URL like: https://aura-ai-yourname.vercel.app
```

## 🎯 Commands Summary (Copy This Block)
```bash
npx create-next-app@latest aura --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd aura
npm install @supabase/supabase-js openai zustand framer-motion lucide-react @radix-ui/react-dialog @radix-ui/react-button
mkdir -p src/components/aura src/lib/aura src/hooks src/types src/utils
npm run dev
```

## 🚀 Next Steps After Setup
1. Configure Supabase (database)
2. Set up OpenAI API 
3. Build Aura's core intelligence
4. Create mobile-optimized UI
5. Deploy and test!

Ready to build the future? Let's go! 🌟