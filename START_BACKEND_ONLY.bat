@echo off
echo ========================================
echo 🌲 FRA Atlas - Backend Server Only
echo ========================================
echo.

:: Kill any existing Node processes on port 5000
echo 🔄 Cleaning up existing backend processes...
FOR /F "tokens=5" %%T IN ('netstat -a -n -o ^| findstr :5000') DO (
    IF NOT "%%T"=="" (
        echo Terminating process on port 5000 (PID: %%T)
        taskkill /F /PID %%T >nul 2>&1
    )
)

echo.
echo 🚀 Starting FRA Atlas Backend Server...
echo.
echo 📊 Dashboard will be available at: http://localhost:5000
echo 🏥 Health Check: http://localhost:5000/api/health
echo.
echo 📋 Demo Login Credentials:
echo   - Admin: admin@fra.gov.in / demo123
echo   - Officer: officer@fra.gov.in / demo123
echo   - Beneficiary: beneficiary@fra.gov.in / demo123
echo.

node server.js