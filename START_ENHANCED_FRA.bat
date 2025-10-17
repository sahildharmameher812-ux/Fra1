@echo off
echo.
echo ====================================================
echo 🌲 FRA Atlas - Enhanced AI-Powered System
echo ====================================================
echo.
echo 🚀 Starting Enhanced FRA Atlas with ALL NEW FEATURES:
echo.
echo ✨ Analytics System with AI-powered insights
echo 📄 Advanced Document Processing with OCR
echo 🗂️ Comprehensive Claim Management
echo 🛰️ Satellite Analysis with Multi-sensor Data
echo 🧠 Decision Support System with Predictive Analytics
echo.
echo ====================================================
echo.

echo 📦 Checking dependencies...
if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
)

if not exist "client\node_modules" (
    echo Installing frontend dependencies...
    cd client
    call npm install
    cd ..
)

echo.
echo 🔥 Starting Enhanced FRA Atlas Server...
echo.
echo Access Points:
echo 🌐 Frontend: http://localhost:3000
echo 🔌 Backend API: http://localhost:5000
echo 💊 Health Check: http://localhost:5000/api/health
echo.
echo ⚡ Enhanced API Endpoints Available:
echo 📊 Analytics: /api/analytics/*
echo 📄 Documents: /api/documents/*
echo 🗂️ Claims: /api/claims/*
echo 🛰️ Satellite: /api/satellite/*
echo 🧠 Decision Support: /api/decision-support/*
echo.
echo ====================================================
echo 🎯 Ready for SIH 2024 Demonstration!
echo ====================================================
echo.

start "FRA Backend" cmd /k "node server.js"

timeout /t 3 /nobreak >nul

echo Opening frontend in 5 seconds...
timeout /t 5 /nobreak >nul

cd client
start "FRA Frontend" cmd /k "npm start"
cd ..

echo.
echo ✅ Enhanced FRA Atlas is now running!
echo.
echo Press any key to view system status...
pause >nul

node test-enhanced-features.js

echo.
echo Press any key to exit...
pause >nul
