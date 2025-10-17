const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch').default || require('node-fetch');

async function testUpload() {
    try {
        console.log('Testing OCR upload endpoint...');
        
        // Create a simple test text file
        const testContent = `FRA CLAIM APPLICATION
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

This is a test document for the FRA Atlas OCR system.`;

        // Write test file
        fs.writeFileSync('./test-doc.txt', testContent);
        
        // Create form data
        const form = new FormData();
        form.append('document', fs.createReadStream('./test-doc.txt'), {
            filename: 'test-doc.txt',
            contentType: 'text/plain'
        });
        form.append('documentType', 'identity-proof');
        form.append('claimId', '');
        form.append('metadata', JSON.stringify({ 
            uploadedBy: 'test-user', 
            source: 'test-script' 
        }));

        // Make request
        const response = await fetch('http://localhost:5000/api/documents/upload', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer demo',
                ...form.getHeaders()
            },
            body: form
        });

        const result = await response.json();
        
        console.log('Response Status:', response.status);
        console.log('Response:', JSON.stringify(result, null, 2));
        
        // Cleanup
        fs.unlinkSync('./test-doc.txt');
        
    } catch (error) {
        console.error('Test failed:', error);
    }
}

// Check if fetch is available
if (typeof fetch === 'undefined') {
    console.log('Installing node-fetch...');
    require('child_process').execSync('npm install node-fetch@2', { stdio: 'inherit' });
    console.log('Please run the test again.');
} else {
    testUpload();
}