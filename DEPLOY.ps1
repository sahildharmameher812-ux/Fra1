# FRA Atlas Quick Deployment Script
# Run this script to complete the deployment process

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  FRA ATLAS DEPLOYMENT HELPER  " -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (Test-Path .git) {
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✗ Git not initialized. Please run: git init" -ForegroundColor Red
    exit
}

# Check git status
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "⚠ Uncommitted changes detected" -ForegroundColor Yellow
} else {
    Write-Host "✓ All changes committed" -ForegroundColor Green
}

Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host ""

Write-Host "1. CREATE GITHUB REPOSITORY" -ForegroundColor Cyan
Write-Host "   → Go to: https://github.com/new" -ForegroundColor White
Write-Host "   → Name: fra-atlas" -ForegroundColor White
Write-Host "   → Visibility: Public or Private" -ForegroundColor White
Write-Host "   → DON'T initialize with README" -ForegroundColor White
Write-Host ""

Write-Host "2. PUSH TO GITHUB" -ForegroundColor Cyan
$githubUsername = Read-Host "   Enter your GitHub username"
Write-Host ""
Write-Host "   Run these commands:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/$githubUsername/fra-atlas.git" -ForegroundColor Gray
Write-Host "   git branch -M main" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host ""

Write-Host "3. DEPLOY BACKEND TO RENDER" -ForegroundColor Cyan
Write-Host "   → Go to: https://dashboard.render.com/" -ForegroundColor White
Write-Host "   → Click 'New +' → 'Web Service'" -ForegroundColor White
Write-Host "   → Connect your GitHub repo" -ForegroundColor White
Write-Host "   → Name: fra-atlas-backend" -ForegroundColor White
Write-Host "   → Build Command: npm install" -ForegroundColor White
Write-Host "   → Start Command: npm start" -ForegroundColor White
Write-Host "   → Add environment variables (see DEPLOYMENT_GUIDE.md)" -ForegroundColor White
Write-Host ""

Write-Host "4. DEPLOY FRONTEND TO VERCEL" -ForegroundColor Cyan
Write-Host "   → Go to: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "   → Click 'Add New' → 'Project'" -ForegroundColor White
Write-Host "   → Import your GitHub repo" -ForegroundColor White
Write-Host "   → Root Directory: client" -ForegroundColor White
Write-Host "   → Framework: Create React App" -ForegroundColor White
Write-Host "   → Add environment variable:" -ForegroundColor White
Write-Host "     REACT_APP_API_URL=<your-render-backend-url>" -ForegroundColor Gray
Write-Host ""

Write-Host "5. SET UP MONGODB ATLAS" -ForegroundColor Cyan
Write-Host "   → Go to: https://www.mongodb.com/cloud/atlas" -ForegroundColor White
Write-Host "   → Create free cluster" -ForegroundColor White
Write-Host "   → Get connection string" -ForegroundColor White
Write-Host "   → Add to Render environment variables" -ForegroundColor White
Write-Host ""

Write-Host "================================" -ForegroundColor Cyan
Write-Host "For detailed instructions, see:" -ForegroundColor Yellow
Write-Host "DEPLOYMENT_GUIDE.md" -ForegroundColor White
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Ask if user wants to open GitHub
$openGitHub = Read-Host "Open GitHub to create repository? (y/n)"
if ($openGitHub -eq 'y' -or $openGitHub -eq 'Y') {
    Start-Process "https://github.com/new"
}

Write-Host ""
Write-Host "Good luck with your deployment! 🚀" -ForegroundColor Green
