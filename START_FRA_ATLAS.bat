@echo off
echo =======================================================
echo        FRA ATLAS - AI-Powered WebGIS System
echo     Ministry of Tribal Affairs, Government of India
echo =======================================================
echo.
echo Starting FRA Atlas servers...
echo.

echo [1/3] Starting Backend Server...
start "FRA Backend" cmd /k "echo FRA Atlas Backend Server && node server.js"
timeout /t 3 >nul

echo [2/3] Starting Frontend Server...
start "FRA Frontend" cmd /k "cd client && echo FRA Atlas Frontend Server && npm start"
timeout /t 5 >nul

echo [3/3] Opening FRA Atlas in Browser...
timeout /t 10 >nul
start http://localhost:3000

echo.
echo =======================================================
echo FRA Atlas is now running!
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo LOGIN CREDENTIALS:
echo Admin:    admin@fra.gov.in    / demo123
echo Officer:  officer@fra.gov.in  / demo123  
echo User:     beneficiary@fra.gov.in / demo123
echo =======================================================
pause
