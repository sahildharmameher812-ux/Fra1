# 🗺️ Vercel Deployment Fix Guide for FRA Atlas WebGIS

## ⚠️ Critical Issue Identified

Your app is a **Create React App (CRA)** project, NOT Next.js. The current `vercel.json` configuration is incorrect for CRA.

## 🔍 Root Causes of Map Not Showing

### 1. **Incorrect Build Configuration**
- Vercel is trying to build as a hybrid Node.js + static app
- Should be pure static build for React

### 2. **Routing Issues**
- Static files not being served correctly
- SPA routing not configured

### 3. **CSP Headers**
- Need to allow external tile sources in production

## ✅ Complete Fix

### Step 1: Update `vercel.json`

Replace your entire `vercel.json` with this optimized configuration:

```json
{
  "version": 2,
  "buildCommand": "cd client && npm install && npm run build",
  "outputDirectory": "client/build",
  "devCommand": "cd client && npm start",
  "installCommand": "npm install",
  "framework": null,
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.js"
    },
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/manifest.json",
      "dest": "/manifest.json"
    },
    {
      "src": "/(.*\\.(js|css|png|jpg|jpeg|gif|svg|ico|json|woff|woff2|ttf|eot))",
      "dest": "/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; img-src 'self' data: https: blob: http: *.tile.openstreetmap.org *.arcgisonline.com *.tile.opentopomap.org *.google.com *.gstatic.com cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com; font-src 'self' https://fonts.gstatic.com data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https: http: wss: ws:;"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

### Step 2: Create `.env.production` in `client/` folder

```env
# Production Environment Variables
REACT_APP_API_URL=https://fra16677t.vercel.app/api
GENERATE_SOURCEMAP=false
```

### Step 3: Update `client/package.json` scripts

Ensure these scripts are present:

```json
"scripts": {
  "start": "react-scripts start",
  "build": "cross-env CI=false GENERATE_SOURCEMAP=false react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

### Step 4: Vercel Dashboard Configuration

1. Go to https://vercel.com/dashboard
2. Select your project `fra16677t`
3. Go to **Settings** → **General**
4. Set **Framework Preset**: `Create React App`
5. Set **Build Command**: `cd client && npm run build`
6. Set **Output Directory**: `client/build`
7. Set **Install Command**: `npm install`

### Step 5: Add Environment Variables in Vercel

Go to **Settings** → **Environment Variables** and add:

```
REACT_APP_API_URL = https://fra16677t.vercel.app/api
NODE_ENV = production
GENERATE_SOURCEMAP = false
```

### Step 6: Ensure Leaflet CSS is Loaded

Your `WebGISMaps.js` should have:

```javascript
import 'leaflet/dist/leaflet.css';
```

✅ **Already present** in your code (line 48)

### Step 7: Fix Leaflet Marker Icons

Your code already has the fix (lines 50-56):

```javascript
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png',
});
```

✅ **Good to go!**

## 🐛 Debugging Steps

### Check Browser Console

1. Open https://fra16677t.vercel.app/maps
2. Press F12 to open DevTools
3. Check Console tab for errors
4. Check Network tab for failed requests

### Common Errors & Fixes

#### Error: "Failed to load resource"
**Fix**: Ensure CSP headers allow tile sources (Step 1)

#### Error: "Unexpected token '<'"
**Fix**: Check `vercel.json` routing - SPA fallback to index.html

#### Error: "Cannot read property 'addLayer'"
**Fix**: Map not initializing - check MapContainer ref

#### Blank map with no errors
**Fix**: CSS issue - verify Leaflet CSS loaded

## 📊 Testing Locally

```bash
# Build production version
cd client
npm run build

# Serve build folder
npx serve -s build -p 3000

# Open browser
http://localhost:3000/maps
```

## 🚀 Deploy to Vercel

After making changes:

```bash
git add .
git commit -m "Fix: Correct Vercel configuration for CRA WebGIS deployment"
git push origin main
```

Vercel will auto-deploy in 2-3 minutes.

## ✅ Verification Checklist

- [ ] Map tiles loading (OpenStreetMap, Esri, etc.)
- [ ] Markers appearing on map
- [ ] State/district selection working
- [ ] Map controls (zoom, pan) functional
- [ ] No console errors
- [ ] No 404 errors in Network tab

## 📧 Support

If issues persist, check:
1. Vercel build logs for errors
2. Browser console for runtime errors
3. Network tab for failed tile requests
4. CSP violations in console

---

**Last Updated**: 2025-10-17
**Project**: FRA Atlas WebGIS
**Framework**: Create React App (NOT Next.js)
**Deploy URL**: https://fra16677t.vercel.app/
