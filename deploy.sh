#!/bin/bash

# StoryTide Quick Deployment Script
# This script helps you deploy both backend and frontend

set -e

echo "🚀 StoryTide Deployment Script"
echo "==============================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if required tools are installed
check_requirements() {
    echo -e "${YELLOW}Checking requirements...${NC}"
    
    if ! command -v wrangler &> /dev/null; then
        echo -e "${RED}❌ Wrangler CLI not found. Installing...${NC}"
        npm install -g wrangler
    else
        echo -e "${GREEN}✅ Wrangler CLI installed${NC}"
    fi
    
    if ! command -v vercel &> /dev/null; then
        echo -e "${YELLOW}⚠️  Vercel CLI not found. You can install it with: npm install -g vercel${NC}"
    else
        echo -e "${GREEN}✅ Vercel CLI installed${NC}"
    fi
    
    echo ""
}

# Deploy backend
deploy_backend() {
    echo -e "${YELLOW}📦 Deploying Backend to Cloudflare Workers...${NC}"
    cd backend
    
    # Check if .dev.vars exists
    if [ ! -f .dev.vars ]; then
        echo -e "${RED}❌ .dev.vars file not found!${NC}"
        echo "Please create .dev.vars with your DATABASE_URL and JWT_SECRET"
        echo "Copy .env.example and fill in your values"
        exit 1
    fi
    
    # Build and deploy
    echo "Building and deploying..."
    npm run deploy
    
    echo -e "${GREEN}✅ Backend deployed!${NC}"
    echo ""
    echo -e "${YELLOW}📝 Important: Copy your Worker URL from the output above${NC}"
    echo "It will look like: https://storytide.<subdomain>.workers.dev"
    echo ""
    read -p "Enter your Worker URL: " BACKEND_URL
    
    cd ..
    
    # Store the URL for later
    echo "$BACKEND_URL" > /tmp/storytide_backend_url.txt
}

# Deploy frontend
deploy_frontend() {
    echo -e "${YELLOW}🎨 Deploying Frontend to Vercel...${NC}"
    cd frontend
    
    # Create .env.production.local
    BACKEND_URL=$(cat /tmp/storytide_backend_url.txt)
    
    echo "VITE_BACKEND_URL=$BACKEND_URL" > .env.production.local
    echo -e "${GREEN}✅ Created .env.production.local with backend URL${NC}"
    
    echo ""
    echo -e "${YELLOW}Deployment options:${NC}"
    echo "1. Deploy using Vercel CLI (requires vercel login)"
    echo "2. Deploy manually via Vercel Dashboard"
    echo ""
    read -p "Choose option (1 or 2): " DEPLOY_OPTION
    
    if [ "$DEPLOY_OPTION" = "1" ]; then
        if command -v vercel &> /dev/null; then
            echo "Deploying to Vercel..."
            vercel --prod
        else
            echo -e "${RED}Vercel CLI not installed. Please use option 2.${NC}"
            exit 1
        fi
    else
        echo -e "${YELLOW}Manual deployment instructions:${NC}"
        echo "1. Go to https://vercel.com/dashboard"
        echo "2. Click 'Add New Project'"
        echo "3. Import your repository or drag the 'dist' folder"
        echo "4. Add environment variable:"
        echo "   Name: VITE_BACKEND_URL"
        echo "   Value: $BACKEND_URL"
        echo "5. Click 'Deploy'"
        echo ""
        echo "Build output is in: $(pwd)/dist"
    fi
    
    cd ..
}

# Main deployment flow
main() {
    check_requirements
    
    echo "This script will deploy:"
    echo "  - Backend to Cloudflare Workers"
    echo "  - Frontend to Vercel"
    echo ""
    read -p "Continue? (y/n): " CONFIRM
    
    if [ "$CONFIRM" != "y" ]; then
        echo "Deployment cancelled."
        exit 0
    fi
    
    echo ""
    deploy_backend
    deploy_frontend
    
    echo ""
    echo -e "${GREEN}=================================${NC}"
    echo -e "${GREEN}🎉 Deployment Complete!${NC}"
    echo -e "${GREEN}=================================${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Visit your Vercel deployment URL"
    echo "2. Test signup and login functionality"
    echo "3. Create a test blog post"
    echo "4. Verify everything works correctly"
    echo ""
    echo -e "${YELLOW}For detailed troubleshooting, see DEPLOYMENT.md${NC}"
}

# Run main function
main
