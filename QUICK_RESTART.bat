@echo off
echo.
echo ====================================
echo 🔄 QUICK RESTART - FRA Dashboard Fix
echo ====================================
echo.

echo 🛑 Stopping existing servers...
taskkill /F /IM node.exe >nul 2>&1

echo 📦 Checking frontend dependencies...
cd client
if not exist "build" (
    echo 📦 Installing frontend dependencies...
    npm install
)

echo.
echo 🚀 Starting servers with dashboard fixes...
echo.

start "FRA Backend" cmd /k "cd .. && echo Backend starting on port 5000... && node server.js"

timeout /t 3 /nobreak >nul

start "FRA Frontend" cmd /k "echo Frontend starting on port 3000... && npm start"

cd ..

echo.
echo ✅ Dashboard fixes applied! Servers restarting...
echo.
echo 🌐 Frontend: http://localhost:3000
echo 🔌 Backend: http://localhost:5000
echo.
echo 📋 Dashboard should now be visible with:
echo   ✓ Light background instead of black
echo   ✓ Visible cards with white backgrounds  
echo   ✓ Dark text for readability
echo   ✓ Working charts and statistics
echo.
echo Press any key to exit...
pause >nul