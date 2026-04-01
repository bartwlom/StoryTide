# StoryTide Deployment Guide

This guide will help you deploy the StoryTide application with Vercel (frontend) and Cloudflare Workers (backend).

## Prerequisites

- Node.js 18+ installed
- npm package manager
- Cloudflare account (free tier is sufficient)
- Vercel account (free tier is sufficient)
- Wrangler CLI installed globally: `npm install -g wrangler`

## Project Structure

```
StoryTide/
├── common/          # Shared types and validation schemas
├── backend/         # Cloudflare Workers backend
└── frontend/        # Vite + React frontend
```

---

## Part 1: Deploy Backend to Cloudflare Workers

### Step 1: Setup Cloudflare Account

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Sign in or create a free account
3. Navigate to Workers & Pages section

### Step 2: Authenticate Wrangler

```bash
cd backend
npx wrangler login
```

This will open a browser window. Log in with your Cloudflare account.

### Step 3: Configure Environment Variables

The backend requires two environment variables:

**Option A: Using Cloudflare Dashboard**
1. Go to your Worker in Cloudflare Dashboard
2. Navigate to "Settings" → "Variables"
3. Add the following variables:
   - `DATABASE_URL`: Your Prisma Accelerate URL
   - `JWT_SECRET`: A secure random string (at least 32 characters)

**Option B: Using Wrangler CLI**
```bash
npx wrangler secret put DATABASE_URL
npx wrangler secret put JWT_SECRET
```

### Step 4: Update wrangler.toml (if needed)

The current `wrangler.toml` is configured for production deployment. If you need to add bindings or other configurations, update it accordingly.

### Step 5: Deploy Backend

```bash
cd /home/brtwl/Pictures/StoryTide
npm run deploy:backend
```

This will:
- Build the common package
- Generate Prisma client
- Deploy to Cloudflare Workers

After deployment, you'll see a URL like: `https://storytide.<your-subdomain>.workers.dev`

**Save this URL** - you'll need it for the frontend configuration.

### Step 6: Verify Backend Deployment

Visit your deployed backend URL in a browser:
```
https://storytide.<your-subdomain>.workers.dev/
```

You should see: "StoryTide API is running!"

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Update Backend URL in Frontend Config

Create a `.env.production.local` file in the frontend directory:

```bash
cd frontend
echo "VITE_BACKEND_URL=https://storytide.<your-cloudflare-subdomain>.workers.dev" > .env.production.local
```

Replace `<your-cloudflare-subdomain>` with your actual Cloudflare Worker subdomain.

### Step 2: Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### Step 3: Deploy to Vercel

**Option A: Using Vercel Dashboard (Recommended)**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository OR drag and drop the `frontend/dist` folder
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variable:
   - Name: `VITE_BACKEND_URL`
   - Value: `https://storytide.<your-cloudflare-subdomain>.workers.dev`

6. Click "Deploy"

**Option B: Using Vercel CLI**

```bash
cd frontend
vercel --prod
```

Follow the prompts to configure your project.

### Step 4: Test Your Deployment

After deployment, Vercel will provide a URL like:
```
https://storytide-<random>.vercel.app
```

Visit this URL to test your application!

---

## Part 3: Testing the Application

### Test User Flow

1. **Sign Up**: Navigate to `/signup` and create an account
2. **Sign In**: Navigate to `/signin` with your credentials
3. **Create Blog**: Click "Write" or navigate to `/publish`
4. **Write Post**: Fill in title and content, then click "^O WriteOut (Publish)"
5. **View Blog**: You'll be redirected to your published blog post
6. **Browse Blogs**: Navigate to `/blogs` to see all posts

### Expected Behavior

✅ Users can sign up and sign in without errors  
✅ Authenticated users can create new blog posts  
✅ Blog posts are saved and displayed correctly  
✅ Users can browse and view individual blog posts  
✅ No CORS errors in the browser console  
✅ Smooth navigation between pages  

---

## Troubleshooting

### CORS Issues

If you encounter CORS errors:

1. **Check Backend CORS Configuration**
   - The backend is configured to allow all origins
   - Verify the CORS middleware is properly configured in `backend/src/index.ts`

2. **Verify Backend URL**
   - Ensure `VITE_BACKEND_URL` in frontend matches your Cloudflare Worker URL
   - Check for typos or missing `https://` prefix

3. **Browser Console**
   - Open browser DevTools (F12)
   - Check the Network tab for failed requests
   - Look for CORS-related errors

### Authentication Issues

If users can't sign in or posts fail to publish:

1. **Check JWT_SECRET**
   - Ensure it's the same value in both development and production
   - Regenerate if compromised: `openssl rand -base64 32`

2. **Verify Database Connection**
   - Check that `DATABASE_URL` is correct
   - Ensure Prisma Accelerate is active

3. **Token Storage**
   - Tokens are stored in localStorage
   - Clear browser cache and try again if needed

### Build Errors

If the build fails:

```bash
# Clean and rebuild
rm -rf node_modules common/dist frontend/dist backend/dist
npm install
npm run build
```

---

## Updating Your Deployment

### Update Backend

```bash
cd backend
npm run deploy
```

### Update Frontend

**Using Vercel Dashboard:**
- Push changes to your Git repository (if connected)
- Or redeploy from the dashboard

**Using Vercel CLI:**
```bash
cd frontend
vercel --prod
```

---

## Production Checklist

- [ ] Backend deployed to Cloudflare Workers
- [ ] Environment variables set in Cloudflare (DATABASE_URL, JWT_SECRET)
- [ ] Frontend deployed to Vercel
- [ ] VITE_BACKEND_URL configured in Vercel
- [ ] Test user signup flow
- [ ] Test blog creation flow
- [ ] Test blog viewing
- [ ] No console errors in browser
- [ ] Mobile responsiveness tested
- [ ] Performance acceptable

---

## Additional Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Accelerate](https://www.prisma.io/data-platform/accelerate)
- [Hono Framework](https://hono.dev/)

---

## Support

If you encounter any issues during deployment:

1. Check the troubleshooting section above
2. Review Cloudflare and Vercel documentation
3. Check browser console for specific errors
4. Verify all environment variables are correctly set

Good luck with your StoryTide deployment! 🚀
