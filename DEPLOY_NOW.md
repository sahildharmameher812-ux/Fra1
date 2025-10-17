# 🚀 DEPLOY YOUR FRA ATLAS PROJECT NOW!

## ✅ What I've Done For You:

1. ✅ Created `.gitignore` file
2. ✅ Created deployment configuration files
3. ✅ Initialized Git repository
4. ✅ Committed all your code
5. ✅ Set up remote GitHub repository link
6. ✅ Created comprehensive deployment guide

## 📍 YOUR NEXT STEPS:

### STEP 1: Create GitHub Repository
1. **Go to:** https://github.com/new
2. **Repository name:** `fra-atlas`
3. **Visibility:** Public (or Private if you prefer)
4. ⚠️ **IMPORTANT:** Do NOT initialize with README, .gitignore, or license
5. Click **"Create repository"**

### STEP 2: Push Code to GitHub
Run this command in your terminal (already configured for you):

```powershell
git push -u origin main
```

That's it! Your code will be pushed to:
**https://github.com/sahildharmameher812-ux/fra-atlas**

---

### STEP 3: Set Up MongoDB Atlas (REQUIRED!)

1. **Go to:** https://www.mongodb.com/cloud/atlas
2. Sign up or log in
3. Click **"Build a Database"**
4. Choose **FREE** tier (M0 Sandbox)
5. Select a cloud provider and region (any is fine)
6. Click **"Create"**
7. Create a database user:
   - Username: `fraadmin`
   - Password: Generate a secure password (SAVE IT!)
8. Add IP Address:
   - Click **"Add IP Address"**
   - Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Click **"Confirm"**
9. Get your connection string:
   - Click **"Connect"**
   - Click **"Connect your application"**
   - Copy the connection string (looks like this):
     ```
     mongodb+srv://fraadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with the password you created
   - **SAVE THIS CONNECTION STRING!** You'll need it for Render

---

### STEP 4: Deploy Backend to Render

1. **Go to:** https://dashboard.render.com/
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect GitHub"** (if not connected)
4. Find and select your repository: **fra-atlas**
5. Click **"Connect"**

#### Configure Your Backend:
- **Name:** `fra-atlas-backend`
- **Root Directory:** (leave empty)
- **Environment:** `Node`
- **Region:** Choose closest to you
- **Branch:** `main`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Instance Type:** `Free`

#### Add Environment Variables (Click "Advanced" → "Add Environment Variable"):

Add these variables one by one:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | `<paste_your_mongodb_connection_string_here>` |
| `JWT_SECRET` | `fra_atlas_jwt_secret_2024_production_key` |
| `CLIENT_URL` | `https://fra-atlas.vercel.app` (update later) |
| `MAX_FILE_SIZE` | `50mb` |
| `TENSORFLOW_BACKEND` | `cpu` |
| `OCR_CONFIDENCE_THRESHOLD` | `0.8` |

6. Click **"Create Web Service"**
7. Wait 5-10 minutes for deployment
8. **SAVE YOUR BACKEND URL!** (e.g., `https://fra-atlas-backend.onrender.com`)

---

### STEP 5: Deploy Frontend to Vercel

1. **Go to:** https://vercel.com/dashboard
2. Click **"Add New"** → **"Project"**
3. Find and import your repository: **fra-atlas**
4. Click **"Import"**

#### Configure Your Frontend:
- **Framework Preset:** Create React App
- **Root Directory:** `client` ⚠️ IMPORTANT!
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `build` (auto-detected)
- **Install Command:** `npm install` (auto-detected)

#### Add Environment Variables:
Click **"Environment Variables"** and add:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `<paste_your_render_backend_url_here>` |

Example: `REACT_APP_API_URL=https://fra-atlas-backend.onrender.com`

5. Click **"Deploy"**
6. Wait 3-5 minutes
7. **SAVE YOUR FRONTEND URL!** (e.g., `https://fra-atlas.vercel.app`)

---

### STEP 6: Update Backend CLIENT_URL

After your frontend is deployed:

1. Go back to **Render Dashboard**
2. Click on your **fra-atlas-backend** service
3. Go to **"Environment"** tab
4. Find `CLIENT_URL` variable
5. Click **"Edit"**
6. Update value to your Vercel URL: `https://fra-atlas.vercel.app`
7. Click **"Save Changes"**
8. Service will automatically restart

---

## 🎉 YOU'RE DONE!

Visit your deployed app at your Vercel URL!

### 📱 Your Deployed URLs:
- **Frontend:** https://fra-atlas.vercel.app (or your custom Vercel URL)
- **Backend:** https://fra-atlas-backend.onrender.com (or your custom Render URL)
- **GitHub:** https://github.com/sahildharmameher812-ux/fra-atlas

---

## 🔄 Future Updates

To deploy updates to your code:

```powershell
git add .
git commit -m "Your update message"
git push origin main
```

Both Vercel and Render will automatically redeploy! 🚀

---

## ⚠️ Important Notes:

1. **Render Free Tier:** The backend sleeps after 15 minutes of inactivity. First request after sleep takes ~30 seconds.

2. **MongoDB Free Tier:** 512MB storage limit. Perfect for development/demo.

3. **Keep Your Secrets Safe:** Never commit your `.env` file to GitHub!

---

## 🆘 Troubleshooting:

### Frontend shows blank page:
- Check browser console for errors
- Verify `REACT_APP_API_URL` is correct in Vercel
- Make sure backend is running on Render

### Backend won't start:
- Check Render logs for errors
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

### CORS errors:
- Make sure backend `CLIENT_URL` matches your Vercel URL exactly
- No trailing slashes!

---

## 📞 Need Help?

Refer to `DEPLOYMENT_GUIDE.md` for detailed troubleshooting and advanced configurations.

**Good luck with your deployment! 🎊**
