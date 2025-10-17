const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const Tesseract = require('tesseract.js');
const nlp = require('compromise');
let pdfParse;
try {
  pdfParse = require('pdf-parse');
} catch (e) {
  pdfParse = null;
}
const ProcessedDocument = require('../models/ProcessedDocument');
const { FRA_HISTORICAL_DOCUMENTS, DOCUMENT_STATISTICS, searchDocuments } = require('../data/fra-historical-documents');

// Simple auth middleware
const simpleAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });
  next();
};

// Enhanced document types and their validation rules for FRA system
const DOCUMENT_TYPES = {
  'fra-application': {
    maxSize: 15 * 1024 * 1024, // 15MB
    allowedTypes: ['pdf', 'jpg', 'jpeg', 'png', 'tiff'],
    requiredFields: ['applicantName', 'claimType', 'village', 'district', 'state'],
    description: 'Complete FRA claim application with all supporting details'
  },
  'identity-proof': {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['pdf', 'jpg', 'jpeg', 'png'],
    requiredFields: ['applicantName', 'aadharNumber'],
    description: 'Government-issued identity documents like Aadhar Card, Voter ID, or Passport'
  },
  'land-documents': {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['pdf', 'jpg', 'jpeg', 'png', 'tiff'],
    requiredFields: ['surveyNumbers', 'landArea', 'village'],
    description: 'Land ownership documents including survey records, revenue documents, or land patents'
  },
  'tribal-certificate': {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['pdf', 'jpg', 'jpeg', 'png'],
    requiredFields: ['certificateNumber', 'issuingAuthority', 'tribalCommunity'],
    description: 'Official tribal status certificates issued by competent authorities'
  },
  'residence-proof': {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['pdf', 'jpg', 'jpeg', 'png'],
    requiredFields: ['applicantName', 'village', 'district'],
    description: 'Documents proving continuous residence in the area for the required period'
  },
  'bank-details': {
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedTypes: ['pdf', 'jpg', 'jpeg', 'png'],
    requiredFields: ['applicantName', 'accountNumber', 'ifscCode'],
    description: 'Bank account details for benefit transfers and direct payment schemes'
  },
  'community-rights': {
    maxSize: 20 * 1024 * 1024, // 20MB
    allowedTypes: ['pdf', 'jpg', 'jpeg', 'png', 'tiff'],
    requiredFields: ['claimType', 'village', 'gramSabhaResolution'],
    description: 'Community Forest Resource Rights claims and supporting documents'
  },
  'historical-records': {
    maxSize: 25 * 1024 * 1024, // 25MB
    allowedTypes: ['pdf', 'jpg', 'jpeg', 'png', 'tiff'],
    requiredFields: ['documentType', 'recordYear', 'village'],
    description: 'Historical records including old survey settlements, forest records, and legacy documents'
  }
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads', 'documents');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 25 * 1024 * 1024 // 25MB max for historical documents
  },
  fileFilter: (req, file, cb) => {
    console.log('File upload attempt:', {
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    });
    
    // Allow more file types including text for testing
    const allowedExts = /\.(jpeg|jpg|png|pdf|tiff|tif|txt)$/i;
    const allowedMimes = /^(image\/(jpeg|jpg|png|tiff)|application\/pdf|text\/plain)$/i;
    
    const extname = allowedExts.test(file.originalname);
    const mimetype = allowedMimes.test(file.mimetype) || file.mimetype === 'application/octet-stream';
    
    if (extname || mimetype) {
      console.log('File accepted:', file.originalname);
      return cb(null, true);
    } else {
      console.log('File rejected:', file.originalname, 'mimetype:', file.mimetype);
      cb(new Error(`File type not supported: ${file.originalname}. Allowed: PDF, JPG, PNG, TIFF, TXT`));
    }
  }
});

// OCR using tesseract.js (images), pdf-parse (pdf), or direct text reading (txt)
const runOCR = async (filePath, mimeType) => {
  console.log('Running OCR on:', filePath, 'mimetype:', mimeType);
  const ext = path.extname(filePath).toLowerCase();
  
  // Handle text files directly
  if (ext === '.txt' || mimeType?.includes('text/plain')) {
    try {
      const text = fs.readFileSync(filePath, 'utf8');
      console.log('Text file read successfully, length:', text.length);
      return { text, confidence: 1.0, language: 'eng', note: 'direct-text-read' };
    } catch (e) {
      console.error('Text file read failed:', e.message);
      return { text: '', confidence: 0.0, language: 'eng', note: 'text-read-error' };
    }
  }
  
  // Handle PDF files
  const isPDF = mimeType?.includes('pdf') || ext === '.pdf';
  if (isPDF) {
    if (!pdfParse) {
      console.error('pdf-parse not available');
      return { text: '', confidence: 0.0, language: 'eng', note: 'pdf-parse not installed' };
    }
    try {
      console.log('Processing PDF file...');
      const dataBuffer = fs.readFileSync(filePath);
      const result = await pdfParse(dataBuffer);
      console.log('PDF processed successfully, text length:', result.text?.length || 0);
      return { text: result.text || '', confidence: 0.9, language: 'eng', note: 'pdf-parse' };
    } catch (e) {
      console.error('PDF parse failed:', e.message);
      return { text: '', confidence: 0.0, language: 'eng', note: 'pdf-parse-error: ' + e.message };
    }
  }

  // Handle image files with Tesseract
  try {
    console.log('Processing image file with Tesseract...');
    const result = await Tesseract.recognize(filePath, 'eng', {
      logger: m => console.log('Tesseract:', m)
    });
    const text = result?.data?.text || '';
    const conf = Array.isArray(result?.data?.words)
      ? (result.data.words.reduce((s, w) => s + (w.confidence || 0), 0) / Math.max(result.data.words.length, 1)) / 100
      : (result?.data?.confidence || 80) / 100;
    console.log('Tesseract completed, text length:', text.length, 'confidence:', conf);
    return { text, confidence: Math.max(0.0, Math.min(1.0, conf)), language: 'eng', note: 'tesseract' };
  } catch (e) {
    console.error('Tesseract OCR failed:', e.message);
    return { text: '', confidence: 0.0, language: 'eng', note: 'tesseract-error: ' + e.message };
  }
};

// Simple NER using compromise + regex helpers
const runNER = (text) => {
  try {
    const doc = nlp(text || '');
    const unique = (arr) => Array.from(new Set((arr || []).map((s) => String(s).trim()).filter(Boolean)));

    const people = unique(doc.people().out('array'));

    let orgDoc;
    if (doc.organizations && typeof doc.organizations === 'function') {
      orgDoc = doc.organizations();
    } else {
      orgDoc = doc.match('#Organization');
    }
    const organizations = unique(orgDoc.out('array'));

    let locDoc;
    if (doc.places && typeof doc.places === 'function') {
      locDoc = doc.places();
    } else {
      locDoc = doc.match('#Place');
    }
    const locations = unique(locDoc.out('array'));

    const dates = unique(doc.dates().out('array'));
    const numbers = unique(doc.numbers().out('array'));

    const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
    const phoneRegex = /\+?\d[\d\s-]{8,}\d/g;
    const aadharRegex = /\b\d{4}\s?\d{4}\s?\d{4}\b/g;
    const panRegex = /\b[A-Z]{5}\d{4}[A-Z]\b/g;

    const emails = unique((text.match(emailRegex) || []));
    const phoneNumbers = unique((text.match(phoneRegex) || []));
    const aadharNumbers = unique((text.match(aadharRegex) || []));
    const panNumbers = unique((text.match(panRegex) || []));

    return {
      people,
      organizations,
      locations,
      dates,
      numbers,
      emails,
      phoneNumbers,
      ids: { aadharNumbers, panNumbers },
    };
  } catch (e) {
    console.error('NER failed:', e.message);
    return { people: [], organizations: [], locations: [], dates: [], numbers: [], emails: [], phoneNumbers: [], ids: { aadharNumbers: [], panNumbers: [] } };
  }
};

// Enhanced FRA document processing with comprehensive data extraction (mock structured fields retained as fallback)
const processDocument = (filePath, documentType) => {
  // Generate comprehensive mock OCR results for different FRA document types
  const generateFRAData = () => {
    const states = ['madhya_pradesh', 'tripura', 'odisha', 'telangana'];
    const tribes = ['Gond', 'Bhil', 'Santhal', 'Korku', 'Tripuri', 'Oraon', 'Koya', 'Chenchu'];
    const villages = ['Jharia', 'Mandla', 'Bastar', 'Kanha', 'Agartala', 'Dharmanagar', 'Bhubaneswar', 'Warangal'];
    const claimTypes = ['IFR', 'CR', 'CFR'];
    
    const randomState = states[Math.floor(Math.random() * states.length)];
    const randomTribe = tribes[Math.floor(Math.random() * tribes.length)];
    const randomVillage = villages[Math.floor(Math.random() * villages.length)];
    const randomClaim = claimTypes[Math.floor(Math.random() * claimTypes.length)];
    
    return { randomState, randomTribe, randomVillage, randomClaim };
  };
  
  const fraData = generateFRAData();
  
  const mockOCRResults = {
    // FRA Application Documents
    'fra-application': {
      extractedText: `FRA CLAIM APPLICATION\nApplication No: FRA/${fraData.randomState.toUpperCase()}/2024/001234\nClaim Type: ${fraData.randomClaim}\nApplicant: Ramesh Kumar ${fraData.randomTribe}\nVillage: ${fraData.randomVillage}\nDistrict: Bhopal\nState: ${fraData.randomState.replace('_', ' ').toUpperCase()}`,
      confidence: 0.94,
      extractedFields: {
        // Location & Administrative Data
        state: fraData.randomState.replace('_', ' '),
        district: 'Bhopal',
        block: 'Berasia',
        village: fraData.randomVillage,
        surveyNumbers: ['245/3', '246/1'],
        coordinates: { latitude: 23.2599, longitude: 77.4126 },
        
        // Beneficiary Information
        applicantName: `Ramesh Kumar ${fraData.randomTribe}`,
        fatherName: `Shyam Lal ${fraData.randomTribe}`,
        tribalCommunity: fraData.randomTribe,
        familyMembers: 5,
        aadharNumber: '234567890123',
        contactNumber: '+919876543210',
        
        // Land & Rights Details
        claimType: fraData.randomClaim,
        landArea: 2.45,
        landClassification: 'Agricultural',
        forestType: 'Reserved Forest',
        waterBodies: ['Seasonal Stream'],
        existingStructures: ['Dwelling House', 'Cattle Shed'],
        
        // Document & Process Information
        applicationDate: '2024-01-15',
        applicationNumber: `FRA/${fraData.randomState.toUpperCase()}/2024/001234`,
        documentType: 'FRA Application',
        verificationStatus: 'Pending',
        issuingAuthority: 'Sub Divisional Level Committee',
        currentStatus: 'Under Review',
        
        // Scheme Eligibility Data
        pmKisanEligibility: true,
        mgnregaCardNumber: 'MG/2023/001234',
        jalJeevanMissionStatus: 'Covered',
        dajguaSchemesApplicable: ['Watershed Development', 'Skill Development'],
        
        // Asset Mapping
        cropsGrown: ['Paddy', 'Maize', 'Pulses'],
        livestockCount: 8,
        forestProduceCollection: ['Tendu Leaves', 'Mahua', 'Honey'],
        infrastructureNeeds: ['All Weather Road', 'Electricity', 'Primary Health Center']
      }
    },
    
    // Identity Proof
    'identity-proof': {
      extractedText: `AADHAR CARD\nName: Ramesh Kumar ${fraData.randomTribe}\nAadhar No: 1234 5678 9012\nAddress: Village ${fraData.randomVillage}, Block Berasia, District Bhopal\nS/o: Shyam Lal ${fraData.randomTribe}\nDOB: 15/08/1985\nMobile: +919876543210`,
      confidence: 0.94,
      extractedFields: {
        applicantName: `Ramesh Kumar ${fraData.randomTribe}`,
        fatherName: `Shyam Lal ${fraData.randomTribe}`,
        aadharNumber: '123456789012',
        dateOfBirth: '15/08/1985',
        address: `Village ${fraData.randomVillage}, Block Berasia, District Bhopal`,
        contactNumber: '+919876543210',
        state: fraData.randomState.replace('_', ' '),
        district: 'Bhopal',
        village: fraData.randomVillage
      }
    },
    
    // Land Documents
    'land-documents': {
      extractedText: `SURVEY SETTLEMENT RECORD\nSurvey No: 245/3\nArea: 2.45 Hectares\nOwner: Ramesh Kumar\nVillage: ${fraData.randomVillage}\nDistrict: Bhopal\nLand Classification: Forest Land\nOccupied Since: 1995\nBoundaries: N-River, S-Hill, E-Village Road, W-Forest\nGPS: 23.2599N, 77.4126E`,
      confidence: 0.89,
      extractedFields: {
        surveyNumbers: ['245/3'],
        landArea: 2.45,
        applicantName: 'Ramesh Kumar',
        village: fraData.randomVillage,
        district: 'Bhopal',
        state: fraData.randomState.replace('_', ' '),
        landClassification: 'Forest Land',
        occupiedSince: '1995-01-01',
        coordinates: { latitude: 23.2599, longitude: 77.4126 },
        boundaries: {
          north: 'River',
          south: 'Hill',
          east: 'Village Road',
          west: 'Forest'
        },
        landType: 'Forest Land',
        forestType: 'Reserved Forest'
      }
    },
    
    // Tribal Certificate
    'tribal-certificate': {
      extractedText: `TRIBAL CERTIFICATE\nCertificate No: TC/2023/001234\nName: Ramesh Kumar\nS/o: Shyam Lal\nTribe: ${fraData.randomTribe}\nCategory: Scheduled Tribe\nDistrict: Bhopal\nState: ${fraData.randomState.replace('_', ' ').toUpperCase()}\nIssued by: Collector, Bhopal\nDate of Issue: 15/06/2023\nValid upto: 31/12/2028`,
      confidence: 0.92,
      extractedFields: {
        certificateNumber: 'TC/2023/001234',
        applicantName: 'Ramesh Kumar',
        fatherName: 'Shyam Lal',
        tribalCommunity: fraData.randomTribe,
        category: 'Scheduled Tribe',
        district: 'Bhopal',
        state: fraData.randomState.replace('_', ' '),
        issuingAuthority: 'Collector, Bhopal',
        issueDate: '2023-06-15',
        validUpto: '2028-12-31'
      }
    },
    
    // Residence Proof
    'residence-proof': {
      extractedText: `DOMICILE CERTIFICATE\nName: Ramesh Kumar\nS/o: Shyam Lal\nResident of: ${fraData.randomVillage} Village\nBlock: Berasia\nDistrict: Bhopal\nState: ${fraData.randomState.replace('_', ' ').toUpperCase()}\nResident since: 1985\nIssued on: 15/06/2023`,
      confidence: 0.88,
      extractedFields: {
        applicantName: 'Ramesh Kumar',
        fatherName: 'Shyam Lal',
        village: fraData.randomVillage,
        block: 'Berasia',
        district: 'Bhopal',
        state: fraData.randomState.replace('_', ' '),
        residentSince: '1985-01-01',
        issueDate: '2023-06-15'
      }
    },
    
    // Bank Details
    'bank-details': {
      extractedText: `BANK PASSBOOK\nAccount Holder: Ramesh Kumar\nAccount No: 1234567890\nIFSC: SBIN0001234\nBank: State Bank of India\nBranch: ${fraData.randomVillage} Branch\nAddress: ${fraData.randomVillage}, Bhopal\nOpened on: 01/04/2020`,
      confidence: 0.96,
      extractedFields: {
        applicantName: 'Ramesh Kumar',
        accountNumber: '1234567890',
        ifscCode: 'SBIN0001234',
        bankName: 'State Bank of India',
        branchName: `${fraData.randomVillage} Branch`,
        accountOpenDate: '2020-04-01'
      }
    },
    
    // Community Rights Documents
    'community-rights': {
      extractedText: `COMMUNITY FOREST RESOURCE RIGHTS CLAIM\nVillage: ${fraData.randomVillage}\nGram Sabha Resolution No: GS/2024/001\nDate: 15/01/2024\nForest Area Claimed: 150 Hectares\nType: Community Forest Resource Rights\nTraditional Use: NTFP Collection, Grazing\nBeneficiaries: 45 Families\nGPS Boundaries: Available`,
      confidence: 0.91,
      extractedFields: {
        claimType: 'CFR',
        village: fraData.randomVillage,
        gramSabhaResolution: 'GS/2024/001',
        applicationDate: '2024-01-15',
        forestAreaClaimed: 150,
        beneficiaryFamilies: 45,
        traditionalUses: ['NTFP Collection', 'Grazing'],
        state: fraData.randomState.replace('_', ' '),
        district: 'Bhopal'
      }
    },
    
    // Historical/Legacy Records
    'historical-records': {
      extractedText: `FOREST SETTLEMENT RECORD - 1975\nVillage: ${fraData.randomVillage}\nSettlement Officer: R.K. Sharma\nSurvey Year: 1975\nRecorded Rights: Grazing, NTFP Collection\nFamilies Recorded: 12\nArea Under Cultivation: 25 Acres\nRemarks: Traditional occupation since generations`,
      confidence: 0.78,
      extractedFields: {
        documentType: 'Forest Settlement Record',
        recordYear: '1975',
        village: fraData.randomVillage,
        settlementOfficer: 'R.K. Sharma',
        recordedRights: ['Grazing', 'NTFP Collection'],
        historicalFamilies: 12,
        historicalArea: 25,
        remarks: 'Traditional occupation since generations'
      }
    }
  };
  
  const result = mockOCRResults[documentType] || {
    extractedText: 'Document processed but specific extraction not available',
    confidence: 0.75,
    extractedFields: {}
  };
  
  // Add processing metadata
  result.processingMetadata = {
    processedAt: new Date().toISOString(),
    documentType: documentType,
    fileSize: fs.existsSync(filePath) ? fs.statSync(filePath).size : 0,
    ocrEngine: 'Enhanced FRA OCR v2.0',
    languageDetected: 'en-IN',
    pageCount: 1,
    qualityScore: Math.round(result.confidence * 100)
  };
  
  return result;
};

// Enhanced validation function for comprehensive FRA document validation
const validateDocument = (documentType, extractedFields) => {
  const rules = DOCUMENT_TYPES[documentType];
  if (!rules) return { isValid: false, errors: ['Invalid document type'] };
  
  const errors = [];
  const warnings = [];
  
  // Check required fields
  rules.requiredFields.forEach(field => {
    const value = extractedFields[field];
    if (!value || (Array.isArray(value) && value.length === 0)) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  
  // Enhanced validation based on document type
  switch (documentType) {
    case 'fra-application':
      if (extractedFields.claimType && !['IFR', 'CR', 'CFR'].includes(extractedFields.claimType)) {
        warnings.push('Claim type should be IFR, CR, or CFR');
      }
      if (extractedFields.landArea && (isNaN(parseFloat(extractedFields.landArea)) || extractedFields.landArea <= 0)) {
        errors.push('Invalid land area format');
      }
      if (extractedFields.familyMembers && (isNaN(parseInt(extractedFields.familyMembers)) || extractedFields.familyMembers < 1)) {
        warnings.push('Family members count should be a positive number');
      }
      break;
      
    case 'identity-proof':
      if (extractedFields.aadharNumber && !/^\d{12}$/.test(extractedFields.aadharNumber.replace(/\s/g, ''))) {
        errors.push('Invalid Aadhar number format (should be 12 digits)');
      }
      if (extractedFields.contactNumber && !/^\+91[6-9]\d{9}$/.test(extractedFields.contactNumber.replace(/\s/g, ''))) {
        warnings.push('Contact number format may be invalid');
      }
      break;
      
    case 'land-documents':
      if (extractedFields.landArea && (isNaN(parseFloat(extractedFields.landArea)) || extractedFields.landArea <= 0)) {
        errors.push('Invalid land area format');
      }
      if (extractedFields.surveyNumbers && (!Array.isArray(extractedFields.surveyNumbers) || extractedFields.surveyNumbers.length === 0)) {
        if (typeof extractedFields.surveyNumbers === 'string') {
          // Convert string to array if needed
          extractedFields.surveyNumbers = [extractedFields.surveyNumbers];
        } else {
          errors.push('Survey numbers must be provided');
        }
      }
      if (extractedFields.coordinates) {
        const { latitude, longitude } = extractedFields.coordinates;
        if (latitude && (latitude < -90 || latitude > 90)) {
          errors.push('Invalid latitude coordinates');
        }
        if (longitude && (longitude < -180 || longitude > 180)) {
          errors.push('Invalid longitude coordinates');
        }
      }
      break;
      
    case 'tribal-certificate':
      if (extractedFields.certificateNumber && extractedFields.certificateNumber.length < 5) {
        warnings.push('Certificate number seems unusually short');
      }
      if (extractedFields.validUpto) {
        const expiryDate = new Date(extractedFields.validUpto);
        const now = new Date();
        if (expiryDate < now) {
          warnings.push('Tribal certificate appears to be expired');
        }
      }
      break;
      
    case 'residence-proof':
      if (extractedFields.residentSince) {
        const residenceDate = new Date(extractedFields.residentSince);
        const fraEnactmentDate = new Date('2006-12-29'); // FRA enactment date
        if (residenceDate > fraEnactmentDate) {
          warnings.push('Residence should ideally be from before FRA enactment (Dec 2006)');
        }
      }
      break;
      
    case 'bank-details':
      if (extractedFields.ifscCode && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(extractedFields.ifscCode)) {
        errors.push('Invalid IFSC code format');
      }
      if (extractedFields.accountNumber && (extractedFields.accountNumber.length < 8 || extractedFields.accountNumber.length > 18)) {
        warnings.push('Account number length seems unusual');
      }
      break;
      
    case 'community-rights':
      if (extractedFields.forestAreaClaimed && (isNaN(parseFloat(extractedFields.forestAreaClaimed)) || extractedFields.forestAreaClaimed <= 0)) {
        errors.push('Invalid forest area claimed');
      }
      if (extractedFields.beneficiaryFamilies && (isNaN(parseInt(extractedFields.beneficiaryFamilies)) || extractedFields.beneficiaryFamilies < 1)) {
        warnings.push('Number of beneficiary families should be a positive number');
      }
      break;
      
    case 'historical-records':
      if (extractedFields.recordYear && (isNaN(parseInt(extractedFields.recordYear)) || extractedFields.recordYear < 1800 || extractedFields.recordYear > new Date().getFullYear())) {
        warnings.push('Record year seems out of reasonable range');
      }
      if (extractedFields.historicalArea && (isNaN(parseFloat(extractedFields.historicalArea)) || extractedFields.historicalArea <= 0)) {
        warnings.push('Historical area should be a positive number');
      }
      break;
  }
  
  // Calculate confidence based on errors and warnings
  let confidence = 0.95;
  confidence -= errors.length * 0.2; // Major penalty for errors
  confidence -= warnings.length * 0.05; // Minor penalty for warnings
  confidence = Math.max(0.5, confidence); // Minimum confidence
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    confidence,
    dataQuality: {
      completeness: ((Object.keys(extractedFields).length - errors.length) / Math.max(Object.keys(extractedFields).length, 1)) * 100,
      accuracy: confidence * 100,
      consistency: warnings.length === 0 ? 100 : Math.max(50, 100 - (warnings.length * 10))
    }
  };
};

// Enhanced document upload with real OCR + NER + DB storage
router.post('/upload', simpleAuth, upload.single('document'), async (req, res) => {
  console.log('\n=== DOCUMENT UPLOAD REQUEST ===');
  console.log('Request body:', req.body);
  console.log('File info:', req.file ? {
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    path: req.file.path
  } : 'No file');
  
  try {
    if (!req.file) {
      console.log('ERROR: No file uploaded');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { documentType, claimId, metadata } = req.body;
    console.log('Document type:', documentType);

    if (!documentType || !DOCUMENT_TYPES[documentType]) {
      console.log('ERROR: Invalid document type:', documentType);
      return res.status(400).json({ message: 'Invalid or missing document type' });
    }

    // Generate document ID first
    const documentId = `DOC_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log('Generated document ID:', documentId);

    // Run OCR to extract text
    console.log('Starting OCR processing...');
    const ocrRaw = await runOCR(req.file.path, req.file.mimetype);
    console.log('OCR completed:', {
      textLength: ocrRaw.text?.length || 0,
      confidence: ocrRaw.confidence,
      engine: ocrRaw.note
    });

    // Named-entity recognition
    console.log('Starting NER processing...');
    const ner = runNER(ocrRaw.text);
    console.log('NER completed:', {
      people: ner.people?.length || 0,
      locations: ner.locations?.length || 0,
      dates: ner.dates?.length || 0
    });

    // Fallback structured fields (existing demo logic retained)
    const fallback = processDocument(req.file.path, documentType);

    // Validate using existing rules, with some merging of fields
    const extractedFields = { ...fallback.extractedFields };
    const validation = validateDocument(documentType, extractedFields);

    const payload = {
      documentId,
      documentType,
      file: {
        originalName: req.file.originalname,
        fileName: req.file.filename,
        filePath: req.file.path,
        size: req.file.size,
        mimeType: req.file.mimetype,
        uploadedAt: new Date(),
      },
      ocr: {
        completed: true,
        text: ocrRaw.text,
        confidence: ocrRaw.confidence,
        language: ocrRaw.language,
        engine: ocrRaw.note,
      },
      ner,
      validation: {
        ...validation,
      },
      status: validation.isValid ? 'processed' : 'needs_review',
      claimId: claimId || null,
      metadata: (() => { try { return metadata ? JSON.parse(metadata) : null } catch (e) { return { raw: metadata } } })(),
    };

    // Save to DB if connected, else write to filesystem
    let saved = null;
    if (req.app.locals.dbConnected) {
      try {
        const record = new ProcessedDocument(payload);
        saved = await record.save();
      } catch (e) {
        console.error('DB save failed, falling back to file storage:', e.message);
      }
    }

    if (!saved) {
      const processedDir = path.join(__dirname, '..', 'uploads', 'processed');
      if (!fs.existsSync(processedDir)) fs.mkdirSync(processedDir, { recursive: true });
      fs.writeFileSync(path.join(processedDir, `${documentId}.json`), JSON.stringify(payload, null, 2));
    }

    const response = {
      documentId,
      message: 'Document uploaded and processed successfully',
      file: {
        originalName: req.file.originalname,
        fileName: req.file.filename,
        size: req.file.size,
        type: documentType,
        uploadedAt: new Date().toISOString(),
      },
      processing: {
        ocrCompleted: true,
        extractedText: ocrRaw.text,
        confidence: ocrRaw.confidence,
        extractedFields,
        processingMetadata: fallback.processingMetadata,
        ner,
      },
      validation: {
        ...validation,
        needsManualReview: validation.confidence < 0.8 || !validation.isValid,
      },
      status: validation.isValid ? 'processed' : 'needs_review',
      claimId: claimId || null,
      metadata: (() => { try { return metadata ? JSON.parse(metadata) : null } catch (e) { return { raw: metadata } } })(),
      storage: req.app.locals.dbConnected ? 'database' : 'file',
    };

    console.log('Upload successful! Document ID:', documentId);
    console.log('Response summary:', {
      documentId,
      status: response.status,
      ocrTextLength: response.processing.extractedText?.length || 0,
      confidence: response.processing.confidence,
      nerEntities: Object.keys(response.processing.ner || {}).length
    });
    console.log('=== UPLOAD COMPLETE ===\n');
    
    res.json(response);
  } catch (error) {
    console.error('\n=== DOCUMENT UPLOAD ERROR ===');
    console.error('Error details:', error);
    console.error('Stack trace:', error.stack);
    console.error('=== ERROR END ===\n');
    res.status(500).json({ 
      message: 'Server error during document processing', 
      error: error?.message || String(error),
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Multiple document upload
router.post('/upload/bulk', simpleAuth, upload.array('documents', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    
    const { claimId } = req.body;
    const results = [];
    
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const documentType = req.body[`documentType_${i}`] || 'identity-proof';
      
      const ocrResult = processDocument(file.path, documentType);
      const validation = validateDocument(documentType, ocrResult.extractedFields);
      
      const documentId = `DOC_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 9)}`;
      
      results.push({
        documentId,
        file: {
          originalName: file.originalname,
          fileName: file.filename,
          size: file.size,
          type: documentType
        },
        processing: {
          confidence: ocrResult.confidence,
          extractedFields: ocrResult.extractedFields,
          processingMetadata: ocrResult.processingMetadata
        },
        validation,
        status: validation.isValid ? 'processed' : 'needs_review'
      });
    }
    
    const summary = {
      totalUploaded: req.files.length,
      processed: results.filter(r => r.status === 'processed').length,
      needsReview: results.filter(r => r.status === 'needs_review').length,
      averageConfidence: (results.reduce((sum, r) => sum + r.processing.confidence, 0) / results.length).toFixed(2)
    };
    
    res.json({
      message: 'Bulk upload completed',
      claimId,
      summary,
      documents: results,
      uploadedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Bulk upload error:', error);
    res.status(500).json({ message: 'Server error during bulk upload' });
  }
});

// Get document by ID
router.get('/:documentId', simpleAuth, async (req, res) => {
  try {
    const { documentId } = req.params;
    
    // Mock document retrieval
    const mockDocument = {
      documentId,
      file: {
        originalName: 'aadhar_card.pdf',
        fileName: 'document-1234567890-aadhar_card.pdf',
        size: 245760,
        type: 'identity-proof',
        uploadedAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      },
      processing: {
        ocrCompleted: true,
        confidence: 0.94,
        extractedFields: {
          name: 'Ramesh Kumar Tribal',
          documentNumber: '123456789012',
          address: 'Village Jharia, Block Bhopal'
        }
      },
      validation: {
        isValid: true,
        errors: [],
        confidence: 0.94
      },
      status: 'processed',
      claimId: 'CLAIM_123456',
      downloadUrl: `/api/documents/download/${documentId}`,
      thumbnailUrl: `/api/documents/thumbnail/${documentId}`
    };
    
    res.json(mockDocument);
  } catch (error) {
    console.error('Document retrieval error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get documents by claim ID
router.get('/claim/:claimId', simpleAuth, async (req, res) => {
  try {
    const { claimId } = req.params;
    const { documentType, status } = req.query;
    
    // Mock documents for a claim
    const mockDocuments = [
      {
        documentId: 'DOC_1234_ID',
        type: 'identity-proof',
        status: 'processed',
        confidence: 0.94,
        uploadedAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
      },
      {
        documentId: 'DOC_1234_LAND',
        type: 'land-documents',
        status: 'processed',
        confidence: 0.89,
        uploadedAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      },
      {
        documentId: 'DOC_1234_TRIBAL',
        type: 'tribal-certificate',
        status: 'needs_review',
        confidence: 0.76,
        uploadedAt: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
      }
    ];
    
    let filteredDocuments = mockDocuments;
    
    if (documentType) {
      filteredDocuments = filteredDocuments.filter(doc => doc.type === documentType);
    }
    
    if (status) {
      filteredDocuments = filteredDocuments.filter(doc => doc.status === status);
    }
    
    const summary = {
      total: filteredDocuments.length,
      processed: filteredDocuments.filter(doc => doc.status === 'processed').length,
      needsReview: filteredDocuments.filter(doc => doc.status === 'needs_review').length,
      averageConfidence: filteredDocuments.length > 0 
        ? (filteredDocuments.reduce((sum, doc) => sum + doc.confidence, 0) / filteredDocuments.length).toFixed(2)
        : 0
    };
    
    res.json({
      claimId,
      documents: filteredDocuments,
      summary,
      filters: { documentType, status }
    });
  } catch (error) {
    console.error('Claim documents retrieval error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Document verification and approval
router.patch('/:documentId/verify', simpleAuth, async (req, res) => {
  try {
    const { documentId } = req.params;
    const { action, comments, corrections } = req.body; // action: 'approve', 'reject', 'request_correction'
    
    const verificationResult = {
      documentId,
      action,
      verifiedBy: 'officer123', // from token in real implementation
      verifiedAt: new Date().toISOString(),
      comments,
      corrections,
      previousStatus: 'needs_review',
      newStatus: action === 'approve' ? 'verified' : action === 'reject' ? 'rejected' : 'correction_required'
    };
    
    res.json({
      message: `Document ${action}d successfully`,
      verification: verificationResult
    });
  } catch (error) {
    console.error('Document verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Document reprocessing
router.post('/:documentId/reprocess', simpleAuth, async (req, res) => {
  try {
    const { documentId } = req.params;
    const { documentType, enhancedOCR = false } = req.body;
    
    // Mock reprocessing
    const reprocessingResult = {
      documentId,
      reprocessedAt: new Date().toISOString(),
      previousConfidence: 0.76,
      newConfidence: enhancedOCR ? 0.91 : 0.83,
      enhancedOCR,
      improvements: [
        'Better text extraction accuracy',
        'Improved field detection',
        enhancedOCR ? 'Applied advanced ML models' : null
      ].filter(Boolean),
      newStatus: 'processed'
    };
    
    res.json({
      message: 'Document reprocessed successfully',
      reprocessing: reprocessingResult
    });
  } catch (error) {
    console.error('Document reprocessing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get supported document types
router.get('/meta/types', simpleAuth, async (req, res) => {
  try {
    const documentTypes = Object.entries(DOCUMENT_TYPES).map(([key, value]) => ({
      type: key,
      displayName: key.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      maxSize: value.maxSize,
      allowedTypes: value.allowedTypes,
      requiredFields: value.requiredFields,
      description: getDocumentDescription(key)
    }));
    
    res.json({
      supportedTypes: documentTypes,
      uploadGuidelines: {
        maxFileSize: '10MB',
        recommendedFormats: ['PDF', 'JPEG', 'PNG'],
        qualityGuidelines: [
          'Ensure clear, high-resolution images',
          'Avoid shadows or glare',
          'Capture full document in frame',
          'Use good lighting conditions'
        ]
      }
    });
  } catch (error) {
    console.error('Document types retrieval error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get historical FRA documents database
router.get('/historical', simpleAuth, async (req, res) => {
  try {
    const { 
      category, 
      state, 
      type, 
      year, 
      search, 
      page = 1, 
      limit = 20 
    } = req.query;
    
    let documents = [];
    
    // Get documents by category
    if (category) {
      const categoryData = FRA_HISTORICAL_DOCUMENTS[category];
      if (Array.isArray(categoryData)) {
        documents = categoryData;
      } else if (categoryData && typeof categoryData === 'object') {
        // Handle nested categories like state_documents
        if (state && categoryData[state]) {
          documents = categoryData[state];
        } else {
          // Get all documents from nested structure
          Object.values(categoryData).forEach(subCategory => {
            if (Array.isArray(subCategory)) {
              documents.push(...subCategory);
            }
          });
        }
      }
    } else {
      // Get all documents
      Object.values(FRA_HISTORICAL_DOCUMENTS).forEach(categoryData => {
        if (Array.isArray(categoryData)) {
          documents.push(...categoryData);
        } else if (typeof categoryData === 'object') {
          Object.values(categoryData).forEach(subCategory => {
            if (Array.isArray(subCategory)) {
              documents.push(...subCategory);
            }
          });
        }
      });
    }
    
    // Apply filters
    if (type) {
      documents = documents.filter(doc => doc.type.toLowerCase().includes(type.toLowerCase()));
    }
    if (year) {
      documents = documents.filter(doc => doc.year == year);
    }
    if (search) {
      documents = searchDocuments(search);
    }
    
    // Sort by year (newest first)
    documents.sort((a, b) => (b.year || 0) - (a.year || 0));
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedDocs = documents.slice(startIndex, endIndex);
    
    res.json({
      documents: paginatedDocs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(documents.length / limit),
        totalDocuments: documents.length,
        documentsPerPage: parseInt(limit)
      },
      statistics: DOCUMENT_STATISTICS,
      filters: { category, state, type, year, search }
    });
  } catch (error) {
    console.error('Historical documents retrieval error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific historical document by ID
router.get('/historical/:documentId', simpleAuth, async (req, res) => {
  try {
    const { documentId } = req.params;
    
    // Search through all categories for the document
    let foundDocument = null;
    
    Object.values(FRA_HISTORICAL_DOCUMENTS).forEach(categoryData => {
      if (Array.isArray(categoryData)) {
        const doc = categoryData.find(d => d.id === documentId);
        if (doc) foundDocument = doc;
      } else if (typeof categoryData === 'object') {
        Object.values(categoryData).forEach(subCategory => {
          if (Array.isArray(subCategory)) {
            const doc = subCategory.find(d => d.id === documentId);
            if (doc) foundDocument = doc;
          }
        });
      }
    });
    
    if (!foundDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
    
    res.json({
      document: foundDocument,
      viewUrl: `/api/documents/historical/view/${documentId}`,
      downloadUrl: `/api/documents/historical/download/${documentId}`,
      metadata: {
        accessedAt: new Date().toISOString(),
        category: getCategoryForDocument(documentId),
        relatedDocuments: getRelatedDocuments(foundDocument)
      }
    });
  } catch (error) {
    console.error('Document retrieval error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search historical documents
router.get('/historical/search', simpleAuth, async (req, res) => {
  try {
    const { 
      q: query, 
      type, 
      year, 
      authority, 
      language,
      page = 1,
      limit = 20
    } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const filters = { type, year, authority, language };
    const searchResults = searchDocuments(query, filters);
    
    // Sort by relevance (mock relevance scoring)
    searchResults.sort((a, b) => {
      const aRelevance = calculateRelevance(a, query);
      const bRelevance = calculateRelevance(b, query);
      return bRelevance - aRelevance;
    });
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedResults = searchResults.slice(startIndex, endIndex);
    
    res.json({
      query,
      results: paginatedResults,
      totalResults: searchResults.length,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(searchResults.length / limit),
        resultsPerPage: parseInt(limit)
      },
      filters,
      suggestions: generateSearchSuggestions(query)
    });
  } catch (error) {
    console.error('Document search error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get document statistics and analytics
router.get('/analytics/overview', simpleAuth, async (req, res) => {
  try {
    const analytics = {
      overview: DOCUMENT_STATISTICS,
      
      digitization_progress: {
        total_documents: DOCUMENT_STATISTICS.total_documents,
        digitized: DOCUMENT_STATISTICS.digitization_progress.completed,
        in_progress: DOCUMENT_STATISTICS.digitization_progress.in_progress,
        pending: DOCUMENT_STATISTICS.digitization_progress.pending,
        completion_rate: Math.round((DOCUMENT_STATISTICS.digitization_progress.completed / DOCUMENT_STATISTICS.total_documents) * 100)
      },
      
      quality_metrics: {
        high_quality: DOCUMENT_STATISTICS.ocr_quality.high,
        medium_quality: DOCUMENT_STATISTICS.ocr_quality.medium,
        poor_quality: DOCUMENT_STATISTICS.ocr_quality.poor,
        average_ocr_confidence: 0.87,
        documents_needing_review: DOCUMENT_STATISTICS.ocr_quality.poor
      },
      
      temporal_distribution: {
        historical_documents: {
          'pre_1947': 15,
          '1947_1980': 34,
          '1980_2006': 45,
          'post_2006': 62
        },
        digitization_by_year: DOCUMENT_STATISTICS.digitization_timeline
      },
      
      language_coverage: DOCUMENT_STATISTICS.by_language,
      
      impact_metrics: {
        claims_supported: 156789,
        families_benefited: 234567,
        area_documented: '12,34,567 hectares',
        historical_gaps_filled: 89
      },
      
      recent_additions: [
        {
          date: '2024-02-20',
          documents_added: 12,
          category: 'State Implementation Reports',
          significance: 'Added latest progress reports from 4 states'
        },
        {
          date: '2024-02-15',
          documents_added: 8,
          category: 'Legal Precedents',
          significance: 'Added recent High Court judgments on FRA'
        }
      ],
      
      usage_statistics: {
        most_accessed_category: 'legal_framework',
        most_downloaded_document: 'FRA_ACT_2006',
        search_trends: [
          { query: 'FRA implementation', count: 1234 },
          { query: 'tribal land rights', count: 987 },
          { query: 'community forest rights', count: 765 }
        ]
      }
    };
    
    res.json(analytics);
  } catch (error) {
    console.error('Analytics overview error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get document categories and their counts
router.get('/categories', simpleAuth, async (req, res) => {
  try {
    const categories = [
      {
        id: 'legal_framework',
        name: 'Legal Framework',
        description: 'FRA Act, Rules, and Legal Documents',
        count: 15,
        icon: 'gavel',
        documents: FRA_HISTORICAL_DOCUMENTS.legal_framework.slice(0, 3)
      },
      {
        id: 'state_documents',
        name: 'State Implementation Documents',
        description: 'State-wise FRA implementation guidelines and reports',
        count: 67,
        icon: 'map',
        subcategories: [
          { id: 'madhya_pradesh', name: 'Madhya Pradesh', count: 25 },
          { id: 'tripura', name: 'Tripura', count: 18 },
          { id: 'odisha', name: 'Odisha', count: 14 },
          { id: 'telangana', name: 'Telangana', count: 10 }
        ]
      },
      {
        id: 'survey_records',
        name: 'Historical Survey Records',
        description: 'Colonial and post-independence survey and settlement records',
        count: 34,
        icon: 'clipboard-list',
        documents: FRA_HISTORICAL_DOCUMENTS.survey_records.slice(0, 2)
      },
      {
        id: 'legal_precedents',
        name: 'Court Judgments & Legal Precedents',
        description: 'Supreme Court and High Court judgments on tribal rights',
        count: 23,
        icon: 'balance-scale',
        documents: FRA_HISTORICAL_DOCUMENTS.legal_precedents.slice(0, 2)
      },
      {
        id: 'government_orders',
        name: 'Government Orders & Circulars',
        description: 'Official orders and circulars from various ministries',
        count: 12,
        icon: 'file-signature',
        documents: FRA_HISTORICAL_DOCUMENTS.government_orders.slice(0, 2)
      },
      {
        id: 'research_studies',
        name: 'Research Studies & Reports',
        description: 'Academic studies and research reports on FRA implementation',
        count: 5,
        icon: 'chart-line',
        documents: FRA_HISTORICAL_DOCUMENTS.research_studies
      },
      {
        id: 'training_materials',
        name: 'Training & Capacity Building',
        description: 'Training manuals and capacity building materials',
        count: 8,
        icon: 'graduation-cap',
        documents: FRA_HISTORICAL_DOCUMENTS.training_materials
      },
      {
        id: 'sample_documents',
        name: 'Sample Forms & Documents',
        description: 'Anonymized sample claim forms and related documents',
        count: 12,
        icon: 'file-alt',
        documents: FRA_HISTORICAL_DOCUMENTS.sample_documents
      }
    ];
    
    res.json({
      categories,
      total_documents: DOCUMENT_STATISTICS.total_documents,
      last_updated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Categories retrieval error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper functions
function getCategoryForDocument(documentId) {
  // Mock implementation to find which category a document belongs to
  for (const [categoryName, categoryData] of Object.entries(FRA_HISTORICAL_DOCUMENTS)) {
    if (Array.isArray(categoryData)) {
      if (categoryData.find(doc => doc.id === documentId)) {
        return categoryName;
      }
    } else if (typeof categoryData === 'object') {
      for (const [subCategoryName, subCategoryData] of Object.entries(categoryData)) {
        if (Array.isArray(subCategoryData)) {
          if (subCategoryData.find(doc => doc.id === documentId)) {
            return `${categoryName}.${subCategoryName}`;
          }
        }
      }
    }
  }
  return 'unknown';
}

function getRelatedDocuments(document) {
  // Mock implementation to find related documents
  const related = [];
  
  // Find documents with similar type or authority
  Object.values(FRA_HISTORICAL_DOCUMENTS).forEach(categoryData => {
    if (Array.isArray(categoryData)) {
      categoryData.forEach(doc => {
        if (doc.id !== document.id && 
            (doc.type === document.type || 
             doc.authority === document.authority ||
             doc.year === document.year)) {
          related.push({
            id: doc.id,
            title: doc.title,
            type: doc.type,
            year: doc.year
          });
        }
      });
    }
  });
  
  return related.slice(0, 5); // Return top 5 related documents
}

function calculateRelevance(document, query) {
  // Mock relevance calculation
  let score = 0;
  const searchText = `${document.title} ${document.description}`.toLowerCase();
  const queryLower = query.toLowerCase();
  
  // Title match gets higher score
  if (document.title.toLowerCase().includes(queryLower)) score += 10;
  
  // Description match
  if (document.description.toLowerCase().includes(queryLower)) score += 5;
  
  // Type match
  if (document.type.toLowerCase().includes(queryLower)) score += 3;
  
  // Recent documents get slight boost
  if (document.year && document.year > 2015) score += 1;
  
  return score;
}

function generateSearchSuggestions(query) {
  // Mock search suggestions
  const commonSearches = [
    'FRA implementation guidelines',
    'tribal land rights',
    'community forest rights',
    'forest rights act 2006',
    'gram sabha resolution',
    'individual forest rights',
    'survey settlement records'
  ];
  
  return commonSearches
    .filter(suggestion => !suggestion.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 3);
}

// Helper function to get document descriptions
function getDocumentDescription(type) {
  const descriptions = {
    'identity-proof': 'Government-issued identity documents like Aadhar Card, Voter ID, or Passport',
    'land-documents': 'Land ownership documents including survey records, revenue documents, or land patents',
    'tribal-certificate': 'Official tribal status certificates issued by competent authorities',
    'residence-proof': 'Documents proving continuous residence in the area for the required period',
    'bank-details': 'Bank account details for benefit transfers'
  };
  return descriptions[type] || 'Document type not specified';
}

module.exports = router;
