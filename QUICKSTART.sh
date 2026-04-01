#!/bin/bash

# StoryTide Quick Start Guide
# Run this script to see deployment instructions

cat << 'EOF'
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║           🚀 StoryTide Quick Start Guide                 ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝

📋 DEPLOYMENT IN 3 SIMPLE STEPS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 1: Prepare Your Credentials
─────────────────────────────────
You need:
  ✓ Cloudflare account (free) → https://dash.cloudflare.com/
  ✓ Vercel account (free) → https://vercel.com/
  ✓ DATABASE_URL (Prisma Accelerate)
  ✓ JWT_SECRET (random string, min 32 chars)

Generate JWT_SECRET:
  $ openssl rand -base64 32

Get DATABASE_URL:
  1. Go to https://www.prisma.io/data-cloud
  2. Create free PostgreSQL database
  3. Enable Accelerate
  4. Copy connection string

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 2: Deploy Backend to Cloudflare
─────────────────────────────────────
Run these commands:

  cd backend
  npx wrangler login
  npx wrangler secret put DATABASE_URL
  npx wrangler secret put JWT_SECRET
  npm run deploy

📝 IMPORTANT: Copy your Worker URL from the output!
   Example: https://storytide.your-subdomain.workers.dev

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 3: Deploy Frontend to Vercel
──────────────────────────────────
Option A - Using Vercel Dashboard (Recommended):

  1. Go to https://vercel.com/dashboard
  2. Click "Add New Project"
  3. Import your GitHub repo OR drag frontend/dist folder
  4. Add environment variable:
     Name: VITE_BACKEND_URL
     Value: YOUR_WORKER_URL_FROM_STEP_2
  5. Click "Deploy"

Option B - Using Vercel CLI:

  cd frontend
  echo "VITE_BACKEND_URL=https://your-worker-url.workers.dev" > .env.production.local
  vercel --prod

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ TESTING YOUR DEPLOYMENT
───────────────────────────
After deployment, visit your Vercel URL and test:

  □ Homepage loads
  □ Sign up works
  □ Sign in works
  □ Can create blog post
  □ Can view blog posts
  □ No console errors (F12)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 ALTERNATIVE: USE AUTOMATED SCRIPT
────────────────────────────────────
For guided deployment, run:

  $ ./deploy.sh

This script will walk you through each step!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 MORE DOCUMENTATION
─────────────────────
• DEPLOYMENT_SUMMARY.md - Complete overview
• DEPLOYMENT_CHECKLIST.md - Step-by-step checklist
• DEPLOYMENT.md - Detailed documentation
• README.md - Project information

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🆘 TROUBLESHOOTING
──────────────────
Common issues:

❌ CORS errors
  → Check VITE_BACKEND_URL matches your Worker URL exactly

❌ Authentication fails
  → Verify JWT_SECRET is set in Cloudflare

❌ Database errors
  → Verify DATABASE_URL is correct and active

See DEPLOYMENT_SUMMARY.md for detailed troubleshooting.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ SUCCESS CRITERIA
───────────────────
Your deployment is successful when:
  ✓ Frontend loads from Vercel instantly
  ✓ Backend responds from Cloudflare Workers
  ✓ User signup/signin works
  ✓ Blog creation works
  ✓ No browser console errors

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 Ready to deploy? Run: ./deploy.sh

Good luck! 🚀

EOF
