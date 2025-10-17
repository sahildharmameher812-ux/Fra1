# FRA Atlas Deployment Guide

## 🚀 Deployment Overview
- **Frontend**: Vercel (React App)
- **Backend**: Render (Node.js/Express API)
- **Database**: MongoDB Atlas (Cloud Database)

---

## 📋 Prerequisites Checklist
- ✅ GitHub account (logged in)
- ✅ Vercel account (logged in)
- ✅ Render account (logged in)
- ✅ MongoDB Atlas account (required for database)

---

## Step 1: Set Up MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (FREE tier available)
3. Create a database user with password
4. Whitelist all IP addresses (0.0.0.0/0) for now
5. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/fra_atlas`)
6. **Save this connection string** - you'll need it later!

---

## Step 2: Push Code to GitHub

Run these commands in your terminal:

```powershell
# Initialize Git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - FRA Atlas project ready for deployment"

# Create a new repository on GitHub
# Go to: https://github.com/new
# Name it: fra-atlas
# Don't initialize with README (we already have code)

# Link to GitHub (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/fra-atlas.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → Select **"Web Service"**
3. Connect your GitHub repository (`fra-atlas`)
4. Configure the service:
   - **Name**: `fra-atlas-backend`
   - **Root Directory**: Leave empty (root of repo)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. **Add Environment Variables** (click "Advanced"):
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=<your_mongodb_atlas_connection_string>
   JWT_SECRET=<generate_a_random_secure_string>
   CLIENT_URL=https://your-app.vercel.app
   MAX_FILE_SIZE=50mb
   TENSORFLOW_BACKEND=cpu
   OCR_CONFIDENCE_THRESHOLD=0.8
   ```

6. Click **"Create Web Service"**
7. Wait for deployment (5-10 minutes)
8. **Save your backend URL** (e.g., `https://fra-atlas-backend.onrender.com`)

---

## Step 4: Deploy Frontend to Vercel

### Option A: Using Vercel Dashboard (Easiest)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository (`fra-atlas`)
4. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   ```
   REACT_APP_API_URL=<your_render_backend_url>
   ```
   Example: `REACT_APP_API_URL=https://fra-atlas-backend.onrender.com`

6. Click **"Deploy"**
7. Wait for deployment (3-5 minutes)
8. **Save your frontend URL** (e.g., `https://fra-atlas.vercel.app`)

### Option B: Using Vercel CLI

```powershell
# Install Vercel CLI globally
npm install -g vercel

# Navigate to client folder
cd client

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? fra-atlas-frontend
# - Directory? ./
# - Override settings? No

# For production deployment
vercel --prod
```

---

## Step 5: Update Environment Variables

### Update Backend CLIENT_URL on Render:
1. Go to Render dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Update `CLIENT_URL` with your Vercel frontend URL
5. Save changes (service will restart)

### Update Frontend API URL on Vercel (if needed):
1. Go to Vercel dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Update `REACT_APP_API_URL` if needed
5. Redeploy from "Deployments" tab

---

## Step 6: Test Your Deployment

1. Visit your frontend URL: `https://your-app.vercel.app`
2. Try logging in or accessing features
3. Check browser console for any errors
4. Check backend logs on Render dashboard if issues occur

---

## 🔧 Troubleshooting

### Frontend can't connect to backend:
- Check CORS settings in backend
- Verify `REACT_APP_API_URL` is correct
- Verify backend `CLIENT_URL` includes your Vercel URL

### Backend database connection fails:
- Check MongoDB Atlas IP whitelist (should include 0.0.0.0/0)
- Verify `MONGODB_URI` connection string is correct
- Check database user credentials

### Build fails:
- Check build logs in Vercel/Render
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

---

## 📱 Important URLs to Save

- **Frontend (Vercel)**: `https://your-app.vercel.app`
- **Backend (Render)**: `https://fra-atlas-backend.onrender.com`
- **GitHub Repo**: `https://github.com/YOUR_USERNAME/fra-atlas`
- **MongoDB Atlas**: Connection string (keep secure!)

---

## 🔄 Future Updates

To deploy updates:

```powershell
# Make your code changes
git add .
git commit -m "Description of changes"
git push origin main
```

- **Vercel**: Auto-deploys on push to main branch
- **Render**: Auto-deploys on push to main branch

---

## 💡 Tips

1. **Free Tier Limitations**:
   - Render free tier sleeps after inactivity (30 mins)
   - First request after sleep takes ~30 seconds
   - Consider upgrading for production use

2. **Security**:
   - Never commit `.env` files
   - Use strong JWT secrets
   - Regularly rotate credentials

3. **Monitoring**:
   - Check Vercel Analytics for frontend performance
   - Monitor Render logs for backend issues
   - Set up error tracking (Sentry, LogRocket)

---

## 🆘 Need Help?

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/

---

**Good Luck with Your Deployment! 🎉**
