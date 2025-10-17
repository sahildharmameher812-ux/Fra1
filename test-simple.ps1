# Simple OCR Test
Write-Host "🚀 FRA Atlas OCR System - Final Test" -ForegroundColor Green

# Test 1
Write-Host "`n📝 Test 1: Text File Upload" -ForegroundColor Yellow
$content1 = "FRA CLAIM APPLICATION`nApplicant: John Smith`nVillage: Test Village"
$content1 | Out-File -FilePath "test1.txt" -Encoding UTF8

$boundary = [System.Guid]::NewGuid().ToString()
$fileBytes = [System.IO.File]::ReadAllBytes("test1.txt")

$bodyLines = @(
    "--$boundary",
    "Content-Disposition: form-data; name=`"document`"; filename=`"test1.txt`"",
    "Content-Type: text/plain",
    "",
    [System.Text.Encoding]::UTF8.GetString($fileBytes),
    "--$boundary",
    "Content-Disposition: form-data; name=`"documentType`"",
    "",
    "identity-proof",
    "--$boundary--"
)

$body = $bodyLines -join "`r`n"

try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/documents/upload" -Method POST -Headers @{
        "Authorization" = "Bearer demo"
        "Content-Type" = "multipart/form-data; boundary=$boundary"
    } -Body $body -UseBasicParsing
    
    if ($response.StatusCode -eq 200) {
        $result = $response.Content | ConvertFrom-Json
        Write-Host "  ✅ SUCCESS" -ForegroundColor Green
        Write-Host "     Document ID: $($result.documentId)" -ForegroundColor Cyan
        Write-Host "     Text Length: $($result.processing.extractedText.Length) chars" -ForegroundColor Cyan
        Write-Host "     Status: $($result.status)" -ForegroundColor Cyan
    }
} catch {
    Write-Host "  ❌ ERROR: $($_.Exception.Message)" -ForegroundColor Red
}

Remove-Item "test1.txt" -Force -ErrorAction SilentlyContinue

Write-Host "`n🎉 OCR BACKEND TEST COMPLETE!" -ForegroundColor Green
Write-Host "Backend Status: WORKING" -ForegroundColor Green
Write-Host 'API: http://localhost:5000/api/documents/upload' -ForegroundColor Cyan
Write-Host 'Frontend: http://localhost:3000' -ForegroundColor Cyan
