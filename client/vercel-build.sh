#!/bin/bash
# Vercel build script for React app

echo "🔨 Starting Vercel build for FRA Atlas..."

# Install dependencies
npm install

# Build the React app
npm run build

echo "✅ Build completed successfully!"
