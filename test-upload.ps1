# Test OCR Upload Functionality
Write-Host "Testing FRA Atlas OCR Upload..." -ForegroundColor Green

# Create test document content
$testContent = @"
FRA CLAIM APPLICATION
Application No: FRA/TEST/2024/001234
Claim Type: IFR
Applicant: Test Kumar
Village: Test Village
District: Test District
State: Test State
Aadhar Number: 1234 5678 9012
Area Claimed: 2.5 acres
Survey Number: 123/4
Date of Application: 07/10/2024

This is a test document for the FRA Atlas OCR system.
"@

# Write test file
$testFile = "test-document.txt"
$testContent | Out-File -FilePath $testFile -Encoding UTF8

try {
    Write-Host "Created test file: $testFile" -ForegroundColor Yellow
    
    # Prepare multipart form data
    $boundary = [System.Guid]::NewGuid().ToString()
    $fileBytes = [System.IO.File]::ReadAllBytes($testFile)
    
    $bodyLines = @(
        "--$boundary",
        'Content-Disposition: form-data; name="document"; filename="test-document.txt"',
        'Content-Type: text/plain',
        '',
        [System.Text.Encoding]::UTF8.GetString($fileBytes),
        "--$boundary",
        'Content-Disposition: form-data; name="documentType"',
        '',
        'identity-proof',
        "--$boundary",
        'Content-Disposition: form-data; name="claimId"',
        '',
        'TEST_CLAIM_001',
        "--$boundary",
        'Content-Disposition: form-data; name="metadata"',
        '',
        '{"uploadedBy": "test-user", "source": "powershell-test"}',
        "--$boundary--"
    )
    
    $body = $bodyLines -join "`r`n"
    
    Write-Host "Sending upload request..." -ForegroundColor Yellow
    
    # Make the request
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/documents/upload" -Method POST -Headers @{
        "Authorization" = "Bearer demo"
        "Content-Type" = "multipart/form-data; boundary=$boundary"
    } -Body $body -UseBasicParsing
    
    Write-Host "Response Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response Content:" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10 | Write-Host
    
} catch {
    Write-Host "Error occurred:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    if ($_.Exception.Response) {
        $errorResponse = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorResponse)
        $errorContent = $reader.ReadToEnd()
        Write-Host "Error Response: $errorContent" -ForegroundColor Red
    }
} finally {
    # Cleanup
    if (Test-Path $testFile) {
        Remove-Item $testFile -Force
        Write-Host "Cleaned up test file" -ForegroundColor Yellow
    }
}

Write-Host "Test completed!" -ForegroundColor Green