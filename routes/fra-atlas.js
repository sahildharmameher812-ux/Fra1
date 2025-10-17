const express = require('express');
const router = express.Router();

// In-memory database for demo purposes
const fraDatabase = [];

// Government schemes database
const governmentSchemes = {
  pmay: {
    name: 'Pradhan Mantri Awas Yojana (PMAY)',
    ministry: 'Ministry of Housing and Urban Affairs',
    description: 'Housing for all scheme providing financial assistance for construction/enhancement of houses',
    benefit: '₹1.2-2.67 Lakh subsidy',
    eligibility: ['FRA title holders', 'Income < ₹18,000/month'],
    eligible: true,
    reason: 'Applicant is an FRA title holder and eligible for housing benefits'
  },
  mgnrega: {
    name: 'Mahatma Gandhi National Rural Employment Guarantee Act',
    ministry: 'Ministry of Rural Development',
    description: 'Employment guarantee scheme providing 100 days of wage employment',
    benefit: '100 days guaranteed employment',
    eligibility: ['Rural households', 'Adult members willing to do unskilled manual work'],
    eligible: true,
    reason: 'Forest rights holders can avail employment for forest-related work'
  },
  pmmvy: {
    name: 'Pradhan Mantri Matru Vandana Yojana',
    ministry: 'Ministry of Women and Child Development',
    description: 'Maternity benefit programme providing cash incentives to pregnant women',
    benefit: '₹5,000 cash incentive',
    eligibility: ['Pregnant women', 'Lactating mothers'],
    eligible: false,
    reason: 'Requires verification of pregnancy/lactation status'
  },
  pmkisan: {
    name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    description: 'Income support scheme for farmer families',
    benefit: '₹6,000/year in 3 installments',
    eligibility: ['Landholding farmers', 'FRA title holders with agricultural land'],
    eligible: true,
    reason: 'FRA land can be used for cultivation, making applicant eligible'
  },
  pmfby: {
    name: 'Pradhan Mantri Fasal Bima Yojana',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    description: 'Crop insurance scheme providing protection against crop loss',
    benefit: 'Crop insurance coverage',
    eligibility: ['Farmers with agricultural land'],
    eligible: true,
    reason: 'Applicable for FRA holders cultivating crops'
  },
  pmjjby: {
    name: 'Pradhan Mantri Jeevan Jyoti Bima Yojana',
    ministry: 'Ministry of Finance',
    description: 'Life insurance scheme offering coverage against death',
    benefit: '₹2 Lakh life cover at ₹330/year',
    eligibility: ['Age 18-50 years', 'Having bank account'],
    eligible: true,
    reason: 'Universal life insurance scheme for all citizens'
  },
  pmsby: {
    name: 'Pradhan Mantri Suraksha Bima Yojana',
    ministry: 'Ministry of Finance',
    description: 'Accident insurance scheme providing coverage against accidental death/disability',
    benefit: '₹2 Lakh cover at ₹12/year',
    eligibility: ['Age 18-70 years', 'Having bank account'],
    eligible: true,
    reason: 'Universal accident insurance for all citizens'
  },
  nsap: {
    name: 'National Social Assistance Programme',
    ministry: 'Ministry of Rural Development',
    description: 'Social security for elderly, widows and persons with disabilities',
    benefit: '₹200-500/month pension',
    eligibility: ['Age 60+ years', 'Below poverty line'],
    eligible: false,
    reason: 'Requires age verification (60+ years) and BPL certificate'
  }
};

// Helper function to determine record type from NER data
function determineRecordType(nerData) {
  const { persons = [], locations = [], dates = [], numbers = [] } = nerData;
  
  if (persons.length > 0 && locations.length > 0) {
    return 'Individual Forest Rights (IFR)';
  } else if (locations.length > 2) {
    return 'Community Forest Rights (CFR)';
  } else {
    return 'Forest Rights Claim';
  }
}

// Helper function to determine eligible schemes based on data
function determineEligibleSchemes(ocrData, recordType) {
  const schemes = { ...governmentSchemes };
  
  // Basic eligibility: All FRA holders get these
  schemes.mgnrega.eligible = true;
  schemes.pmkisan.eligible = true;
  schemes.pmfby.eligible = true;
  schemes.pmjjby.eligible = true;
  schemes.pmsby.eligible = true;
  schemes.pmay.eligible = true;
  
  // Age-based schemes
  const ageMatch = ocrData.extractedText?.match(/(\d+)\s*(years|yrs)/i);
  if (ageMatch) {
    const age = parseInt(ageMatch[1]);
    if (age >= 60) {
      schemes.nsap.eligible = true;
      schemes.nsap.reason = `Applicant is ${age} years old, eligible for elderly pension`;
    }
  }
  
  // Gender-based schemes (for women)
  const text = ocrData.extractedText?.toLowerCase() || '';
  if (text.includes('female') || text.includes('wife') || text.includes('mother')) {
    schemes.pmmvy.eligible = true;
    schemes.pmmvy.reason = 'Female applicant may be eligible for maternity benefits';
  }
  
  return schemes;
}

/**
 * POST /api/fra-atlas/submit
 * Submit processed OCR/NER data to FRA Atlas database
 */
router.post('/submit', async (req, res) => {
  try {
    const { ocrData, metadata } = req.body;
    
    if (!ocrData) {
      return res.status(400).json({
        success: false,
        error: 'OCR data is required'
      });
    }
    
    // Generate unique record ID
    const recordId = `FRA_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Determine record type from NER data
    const recordType = determineRecordType(ocrData.ner || {});
    
    // Create record
    const record = {
      _id: recordId,
      recordType,
      ocrData,
      metadata: {
        ...metadata,
        submittedAt: new Date().toISOString(),
        status: 'pending_verification'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Save to in-memory database
    fraDatabase.push(record);
    
    // Determine eligible schemes
    const eligibleSchemes = determineEligibleSchemes(ocrData, recordType);
    
    console.log(`✅ FRA record saved: ${recordId} (${recordType})`);
    console.log(`📊 Total records in database: ${fraDatabase.length}`);
    
    // Return success response
    res.json({
      success: true,
      message: 'FRA data submitted successfully',
      recordId,
      recordType,
      data: record,
      eligibleSchemes,
      stats: {
        totalRecords: fraDatabase.length,
        eligibleSchemesCount: Object.values(eligibleSchemes).filter(s => s.eligible).length
      }
    });
    
  } catch (error) {
    console.error('❌ Error submitting FRA data:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to submit FRA data'
    });
  }
});

/**
 * GET /api/fra-atlas/records
 * Get all FRA records from the database
 */
router.get('/records', (req, res) => {
  try {
    res.json({
      success: true,
      count: fraDatabase.length,
      records: fraDatabase
    });
  } catch (error) {
    console.error('❌ Error fetching records:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/fra-atlas/records/:id
 * Get a specific FRA record by ID
 */
router.get('/records/:id', (req, res) => {
  try {
    const { id } = req.params;
    const record = fraDatabase.find(r => r._id === id);
    
    if (!record) {
      return res.status(404).json({
        success: false,
        error: 'Record not found'
      });
    }
    
    res.json({
      success: true,
      record
    });
  } catch (error) {
    console.error('❌ Error fetching record:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/fra-atlas/schemes
 * Get all available government schemes
 */
router.get('/schemes', (req, res) => {
  try {
    res.json({
      success: true,
      schemes: governmentSchemes
    });
  } catch (error) {
    console.error('❌ Error fetching schemes:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
