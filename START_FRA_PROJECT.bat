@echo off
echo ==========================================
echo 🌲 FRA Atlas - Starting Full Project
echo ==========================================
echo.

:: Kill any existing Node processes on port 5000 and 3000
echo 🔄 Cleaning up existing processes...
FOR /F "tokens=5" %%T IN ('netstat -a -n -o ^| findstr :5000') DO (
    IF NOT "%%T"=="" (
        echo Terminating process on port 5000 (PID: %%T)
        taskkill /F /PID %%T >nul 2>&1
    )
)

FOR /F "tokens=5" %%T IN ('netstat -a -n -o ^| findstr :3000') DO (
    IF NOT "%%T"=="" (
        echo Terminating process on port 3000 (PID: %%T)
        taskkill /F /PID %%T >nul 2>&1
    )
)

echo.
echo 🚀 Starting Backend Server...
start "FRA Backend" cmd /k "echo 📊 FRA Atlas Backend Server && echo ========================== && node server.js"

:: Wait for backend to start
timeout /t 3 /nobreak >nul

echo.
echo 🌐 Starting Frontend Development Server...
start "FRA Frontend" cmd /k "echo ⚛️ FRA Atlas Frontend Server && echo =========================== && cd client && npm start"

echo.
echo ✅ Project Started Successfully!
echo.
echo 📊 Backend Dashboard: http://localhost:5000
echo ⚛️ Frontend App: http://localhost:3000  (will open automatically)
echo 🏥 Health Check: http://localhost:5000/api/health
echo.
echo 📋 Demo Login Credentials:
echo   - Admin: admin@fra.gov.in / demo123
echo   - Officer: officer@fra.gov.in / demo123
echo   - Beneficiary: beneficiary@fra.gov.in / demo123
echo.
echo Press any key to exit...
pause >nul