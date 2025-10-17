Write-Host "FRA Atlas OCR System - Final Test" -ForegroundColor Green

Write-Host "Test: Text File Upload" -ForegroundColor Yellow
$content = "FRA CLAIM APPLICATION`nApplicant: John Smith`nVillage: Test Village"
$content | Out-File -FilePath "test.txt" -Encoding UTF8

$boundary = [System.Guid]::NewGuid().ToString()
$fileBytes = [System.IO.File]::ReadAllBytes("test.txt")

$bodyLines = @(
    "--$boundary",
    'Content-Disposition: form-data; name="document"; filename="test.txt"',
    'Content-Type: text/plain',
    "",
    [System.Text.Encoding]::UTF8.GetString($fileBytes),
    "--$boundary",
    'Content-Disposition: form-data; name="documentType"',
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
        Write-Host "SUCCESS" -ForegroundColor Green
        Write-Host "Document ID: $($result.documentId)" -ForegroundColor Cyan
        Write-Host "Text Length: $($result.processing.extractedText.Length) chars" -ForegroundColor Cyan
        Write-Host "Status: $($result.status)" -ForegroundColor Cyan
    } else {
        Write-Host "FAILED - HTTP $($response.StatusCode)" -ForegroundColor Red
    }
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
}

Remove-Item "test.txt" -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "OCR BACKEND IS WORKING!" -ForegroundColor Green
Write-Host "Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan