# 🚀 Quick Deployment Checklist

## Before You Start

- [ ] Cloudflare account created (https://dash.cloudflare.com/)
- [ ] Vercel account created (https://vercel.com/)
- [ ] Wrangler CLI installed: `npm install -g wrangler`
- [ ] Backend environment variables ready:
  - [ ] DATABASE_URL (Prisma Accelerate URL)
  - [ ] JWT_SECRET (secure random string)

---

## Step-by-Step Deployment

### Option A: Using the Deployment Script (Recommended)

```bash
./deploy.sh
```

Follow the prompts and you're done! ✨

---

### Option B: Manual Deployment

#### 1. Deploy Backend to Cloudflare Workers

```bash
# Navigate to backend
cd backend

# Login to Cloudflare
npx wrangler login

# Set environment variables (secrets)
npx wrangler secret put DATABASE_URL
npx wrangler secret put JWT_SECRET

# Deploy
npm run deploy
```

📝 **Copy your Worker URL** (e.g., `https://storytide.your-subdomain.workers.dev`)

#### 2. Deploy Frontend to Vercel

**Method 1: Using Vercel Dashboard**

1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import your GitHub repo OR drag `frontend/dist` folder
4. Add environment variable:
   - **Name**: `VITE_BACKEND_URL`
   - **Value**: Your Worker URL from step 1
5. Click "Deploy"

**Method 2: Using Vercel CLI**

```bash
# Navigate to frontend
cd frontend

# Create production env file
echo "VITE_BACKEND_URL=https://your-worker-url.workers.dev" > .env.production.local

# Deploy
vercel --prod
```

---

## ✅ Test Your Application

After deployment, verify everything works:

### Test Scenarios

- [ ] **Visit homepage** - Should load without errors
- [ ] **Sign up a new user** - Navigate to `/signup`, create account
- [ ] **Sign in** - Navigate to `/signin`, login with credentials
- [ ] **Create a blog post** - Click "Write", fill title & content, publish
- [ ] **View blog post** - Should redirect to the published post
- [ ] **Browse all blogs** - Navigate to `/blogs`, see your posts
- [ ] **Check browser console** - No CORS or network errors

### Expected URLs

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://storytide.your-subdomain.workers.dev`

---

## 🔧 Common Issues & Solutions

### CORS Errors

**Problem**: Requests fail with CORS errors

**Solution**:
- Verify `VITE_BACKEND_URL` matches your actual Worker URL
- Check that backend CORS is properly configured (already done ✅)
- Ensure no typos in the URL (must include `https://`)

### Authentication Failures

**Problem**: Can't sign in or publish posts

**Solution**:
- Verify `JWT_SECRET` is set correctly in Cloudflare
- Clear browser localStorage and try again
- Check that tokens are being stored in browser

### Database Connection Errors

**Problem**: Backend can't connect to database

**Solution**:
- Verify `DATABASE_URL` is correct
- Ensure Prisma Accelerate is active
- Check that the API key hasn't expired

---

## 📊 Post-Deployment Monitoring

### Cloudflare Workers Dashboard

Monitor your backend:
- Visit: https://dash.cloudflare.com/?to=/:account/workers
- Check analytics and error logs
- Monitor request counts

### Vercel Dashboard

Monitor your frontend:
- Visit: https://vercel.com/dashboard
- Check deployment logs
- View analytics

---

## 🎉 Success Criteria

Your deployment is successful when:

✅ Homepage loads instantly  
✅ No console errors in browser DevTools  
✅ User signup works without errors  
✅ User signin returns valid token  
✅ Blog creation succeeds  
✅ Blog listing displays all posts  
✅ Individual blog posts load correctly  
✅ Navigation between pages is smooth  

---

## 📞 Need Help?

If you encounter issues:

1. Check browser console for specific errors
2. Review `DEPLOYMENT.md` for detailed troubleshooting
3. Verify all environment variables are set correctly
4. Check Cloudflare and Vercel deployment logs

---

**Good luck! Happy deploying! 🚀**
