Write-Host "Testing OCR with Sample FRA Documents" -ForegroundColor Green

$testFile = "sample-documents\FRA_IFR_Application_Sample.txt"
if (Test-Path $testFile) {
    Write-Host "Testing with: $testFile" -ForegroundColor Yellow
    
    $content = Get-Content $testFile -Raw
    $boundary = [System.Guid]::NewGuid().ToString()
    
    $bodyLines = @(
        "--$boundary",
        'Content-Disposition: form-data; name="document"; filename="FRA_IFR_Application_Sample.txt"',
        'Content-Type: text/plain',
        "",
        $content,
        "--$boundary",
        'Content-Disposition: form-data; name="documentType"',
        "",
        "fra-application",
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
            Write-Host "SUCCESS: Document processed successfully!" -ForegroundColor Green
            Write-Host "Document ID: $($result.documentId)" -ForegroundColor Cyan
            Write-Host "Status: $($result.status)" -ForegroundColor Cyan
            Write-Host "Text Length: $($result.processing.extractedText.Length) characters" -ForegroundColor Cyan
            Write-Host "Entities Found: $($result.processing.ner | Get-Member -MemberType Properties | Measure-Object | Select-Object -ExpandProperty Count)" -ForegroundColor Cyan
        } else {
            Write-Host "FAILED - HTTP $($response.StatusCode)" -ForegroundColor Red
        }
    } catch {
        Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "Sample document not found: $testFile" -ForegroundColor Red
}

Write-Host ""
Write-Host "FRA Atlas OCR System Ready!" -ForegroundColor Green
Write-Host "Sample documents available in: sample-documents/" -ForegroundColor Cyan