# Test OCR with NER functionality
Write-Host "Testing FRA Atlas OCR with rich NER content..." -ForegroundColor Green

# Create test document with rich entity content
$testContent = @"
FOREST RIGHTS ACT - 2006
INDIVIDUAL FOREST RIGHTS (IFR) CLAIM

Applicant Name: Ramesh Kumar Meena
Father's Name: Suresh Kumar Meena
Village: Shivpuri
Tehsil: Karhal
District: Shivpuri  
State: Madhya Pradesh
Pin Code: 473551

Contact Details:
Mobile: +91-9876543210
Email: ramesh.meena@gmail.com
Aadhar Number: 1234 5678 9012
PAN Number: ABCDE1234F

Land Details:
Survey Number: 123/4, 125/2
Area Claimed: 2.5 acres
Khasra Number: 456
Revenue Village: Shivpuri

Date of Application: 15th March 2024
Date of Occupation: Since 1995

Bank Details:
Account Number: 1234567890123456
IFSC Code: SBIN0001234
Bank Name: State Bank of India
Branch: Shivpuri Main Branch

I hereby claim individual forest rights under the Forest Rights Act, 2006 for the above mentioned land which has been occupied by my family for three generations.

Signature: Ramesh Kumar Meena
Date: 15/03/2024
Place: Shivpuri, Madhya Pradesh
"@

$testFile = "test-ner-document.txt"
$testContent | Out-File -FilePath $testFile -Encoding UTF8

try {
    Write-Host "Created NER test file: $testFile" -ForegroundColor Yellow
    
    $boundary = [System.Guid]::NewGuid().ToString()
    $fileBytes = [System.IO.File]::ReadAllBytes($testFile)
    
    $bodyLines = @(
        "--$boundary",
        'Content-Disposition: form-data; name="document"; filename="test-ner-document.txt"',
        'Content-Type: text/plain',
        '',
        [System.Text.Encoding]::UTF8.GetString($fileBytes),
        "--$boundary",
        'Content-Disposition: form-data; name="documentType"',
        '',
        'fra-application',
        "--$boundary",
        'Content-Disposition: form-data; name="claimId"',
        '',
        'NER_TEST_001',
        "--$boundary--"
    )
    
    $body = $bodyLines -join "`r`n"
    
    Write-Host "Sending NER test upload request..." -ForegroundColor Yellow
    
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/documents/upload" -Method POST -Headers @{
        "Authorization" = "Bearer demo"
        "Content-Type" = "multipart/form-data; boundary=$boundary"
    } -Body $body -UseBasicParsing
    
    Write-Host "Response Status: $($response.StatusCode)" -ForegroundColor Green
    $result = $response.Content | ConvertFrom-Json
    
    Write-Host "✅ OCR Results:" -ForegroundColor Green
    Write-Host "  - Text Length: $($result.processing.extractedText.Length) characters" -ForegroundColor Cyan
    Write-Host "  - Confidence: $($result.processing.confidence * 100)%" -ForegroundColor Cyan
    
    Write-Host "✅ NER Results:" -ForegroundColor Green
    Write-Host "  - People: $($result.processing.ner.people.Count)" -ForegroundColor Cyan
    Write-Host "  - Locations: $($result.processing.ner.locations.Count)" -ForegroundColor Cyan
    Write-Host "  - Dates: $($result.processing.ner.dates.Count)" -ForegroundColor Cyan
    Write-Host "  - Phone Numbers: $($result.processing.ner.phoneNumbers.Count)" -ForegroundColor Cyan
    Write-Host "  - Emails: $($result.processing.ner.emails.Count)" -ForegroundColor Cyan
    Write-Host "  - Aadhar Numbers: $($result.processing.ner.ids.aadharNumbers.Count)" -ForegroundColor Cyan
    Write-Host "  - PAN Numbers: $($result.processing.ner.ids.panNumbers.Count)" -ForegroundColor Cyan
    
    Write-Host "✅ Validation:" -ForegroundColor Green
    Write-Host "  - Status: $($result.status)" -ForegroundColor Cyan
    Write-Host "  - Valid: $($result.validation.isValid)" -ForegroundColor Cyan
    Write-Host "  - Confidence: $($result.validation.confidence * 100)%" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Error occurred:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
} finally {
    if (Test-Path $testFile) {
        Remove-Item $testFile -Force
        Write-Host "🧹 Cleaned up test file" -ForegroundColor Yellow
    }
}

Write-Host "🎉 NER Test completed!" -ForegroundColor Green