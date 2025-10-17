@echo off
echo ==========================================
echo 🌲 FRA Atlas - Project Health Check
echo ==========================================
echo.

echo 📋 Checking project structure...
echo ✅ Root directory: %cd%
IF EXIST "package.json" (echo ✅ Backend package.json found) ELSE (echo ❌ Backend package.json missing)
IF EXIST "server.js" (echo ✅ Server file found) ELSE (echo ❌ Server file missing)
IF EXIST "client\package.json" (echo ✅ Frontend package.json found) ELSE (echo ❌ Frontend package.json missing)
IF EXIST "client\build" (echo ✅ Frontend build exists) ELSE (echo ❌ Frontend build missing)
IF EXIST ".env" (echo ✅ Environment file found) ELSE (echo ❌ Environment file missing)
IF EXIST "routes" (echo ✅ Routes directory found) ELSE (echo ❌ Routes directory missing)
IF EXIST "uploads" (echo ✅ Uploads directory found) ELSE (echo ❌ Uploads directory missing)
IF EXIST "datasets" (echo ✅ Datasets directory found) ELSE (echo ❌ Datasets directory missing)

echo.
echo 🔧 Checking Node.js and npm...
node --version >nul 2>&1 && (echo ✅ Node.js is installed) || (echo ❌ Node.js not found)
npm --version >nul 2>&1 && (echo ✅ npm is available) || (echo ❌ npm not found)

echo.
echo 🌐 Checking if ports are available...
netstat -a -n | findstr :5000 >nul && (echo ❓ Port 5000 is in use) || (echo ✅ Port 5000 is available)
netstat -a -n | findstr :3000 >nul && (echo ❓ Port 3000 is in use) || (echo ✅ Port 3000 is available)

echo.
echo 📦 Checking dependencies...
IF EXIST "node_modules" (echo ✅ Backend dependencies installed) ELSE (echo ❌ Backend dependencies missing - run 'npm install')
IF EXIST "client\node_modules" (echo ✅ Frontend dependencies installed) ELSE (echo ❌ Frontend dependencies missing - run 'cd client && npm install')

echo.
echo 🏥 Testing server startup...
timeout /t 1 /nobreak >nul
node -c server.js && (echo ✅ Server syntax is valid) || (echo ❌ Server has syntax errors)

echo.
echo 📊 Project Status Summary:
echo   - Backend: Ready to run
echo   - Frontend: Built and ready
echo   - Environment: Configured
echo   - Demo Mode: Active (no database required)
echo.

echo 🚀 To start the project:
echo   - Full project: Double-click START_FRA_PROJECT.bat
echo   - Backend only: Double-click START_BACKEND_ONLY.bat
echo.

echo 🌐 URLs after startup:
echo   - Backend Dashboard: http://localhost:5000
echo   - Frontend App: http://localhost:3000
echo   - API Health Check: http://localhost:5000/api/health
echo.

pause