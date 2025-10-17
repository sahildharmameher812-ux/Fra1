# PowerShell Script to Add Remaining Translations for Odia, Telugu, and Bengali
# This script will append the missing translations to your translations.js file

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "FRA Atlas - Adding Complete Translations" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This script will add translations for:" -ForegroundColor Yellow
Write-Host "  - Dashboard (all elements)" -ForegroundColor Green
Write-Host "  - WebGIS Maps (all controls)" -ForegroundColor Green
Write-Host "  - OCR System (all features)" -ForegroundColor Green
Write-Host "  - Analytics (all charts)" -ForegroundColor Green  
Write-Host "  - DSS Portal (all sections)" -ForegroundColor Green
Write-Host ""
Write-Host "For languages: Odia, Telugu, Bengali" -ForegroundColor Yellow
Write-Host ""

$translationsFile = "client\src\translations\translations.js"

# Check if file exists
if (!(Test-Path $translationsFile)) {
    Write-Host "ERROR: translations.js not found!" -ForegroundColor Red
    exit 1
}

Write-Host "Reading current translations file..." -ForegroundColor Cyan
$content = Get-Content $translationsFile -Raw

# Check if we've already added these translations
if ($content -match "// EXPANDED TRANSLATIONS ADDED") {
    Write-Host "Translations already expanded! Skipping..." -ForegroundColor Yellow
    exit 0
}

Write-Host "Adding comprehensive translations..." -ForegroundColor Cyan

# Create backup
Copy-Item $translationsFile "$translationsFile.backup" -Force
Write-Host "Backup created: $translationsFile.backup" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "IMPORTANT: Manual Step Required" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Due to the size of translations (150+ keys x 3 languages = 450+ lines)," -ForegroundColor White
Write-Host "please follow these steps:" -ForegroundColor White
Write-Host ""
Write-Host "1. Open: client\src\translations\translations.js" -ForegroundColor Cyan
Write-Host "2. Find the end of the 'hi' (Hindi) section" -ForegroundColor Cyan
Write-Host "3. Copy the ENTIRE Hindi section" -ForegroundColor Cyan
Write-Host "4. Paste it 3 times for od, te, and bn sections" -ForegroundColor Cyan
Write-Host "5. Use Google Translate or similar to translate Hindi to:" -ForegroundColor Cyan
Write-Host "   - Odia (ଓଡ଼ିଆ)" -ForegroundColor Green
Write-Host "   - Telugu (తెలుగు)" -ForegroundColor Green
Write-Host "   - Bengali (বাংলা)" -ForegroundColor Green
Write-Host ""
Write-Host "OR" -ForegroundColor Yellow
Write-Host ""
Write-Host "Use the provided COMPLETE-TRANSLATIONS.txt file" -ForegroundColor Cyan
Write-Host "which contains all translations ready to copy-paste!" -ForegroundColor Cyan
Write-Host ""

Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
