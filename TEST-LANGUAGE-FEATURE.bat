@echo off
echo ========================================
echo FRA Atlas - Language Feature Test
echo ========================================
echo.
echo This will start the application to test the new multi-language feature.
echo.
echo Languages supported:
echo   1. English (Default)
echo   2. Hindi - हिन्दी
echo   3. Odia - ଓଡ଼ିଆ
echo   4. Telugu - తెలుగు
echo   5. Bengali - বাংলা
echo.
echo ========================================
echo.
echo Starting backend server...
start cmd /k "cd /d %~dp0 && npm start"
timeout /t 5 /nobreak >nul

echo Starting frontend client...
start cmd /k "cd /d %~dp0\client && npm start"

echo.
echo ========================================
echo TESTING INSTRUCTIONS:
echo ========================================
echo 1. Wait for the browser to open
echo 2. Login to the portal
echo 3. Look for the Language icon (globe) in the header
echo 4. Click it to see the language menu
echo 5. Try switching between different languages
echo 6. Notice how the text changes throughout the interface
echo.
echo The language preference will be saved!
echo ========================================
pause
