const express = require('express');
const router = express.Router();
const fakeDB = require('../database/fakeDB');
const fraDataProcessor = require('../services/fraDataProcessor');

/**
 * Submit FRA data to database
 * POST /api/fra-atlas/submit
 */
router.post('/submit', async (req, res) => {
  try {
    const { ocrData, metadata } = req.body;
    
    console.log('📝 Submitting FRA data to database...');
    
    // Process OCR data into structured format
    const processed = await fraDataProcessor.processDocument(ocrData, metadata);
    
    // Calculate eligible schemes
    const eligibleSchemes = calculateEligibleSchemes(processed.data);
    
    // Add schemes to record
    processed.data.eligibleSchemes = eligibleSchemes;
    
    // Save to fake database
    const savedRecord = fakeDB.saveFRARecord(processed.data);
    
    console.log(`✅ FRA record saved: ${savedRecord._id}`);
    
    res.json({
      success: true,
      message: 'FRA data submitted successfully',
      recordId: savedRecord._id,
      recordType: processed.recordType,
      data: savedRecord,
      eligibleSchemes: eligibleSchemes,
      mapCoordinates: {
        latitude: savedRecord.coordinates?.latitude,
        longitude: savedRecord.coordinates?.longitude
      }
    });
    
  } catch (error) {
    console.error('❌ Error submitting FRA data:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Get all FRA records
 * GET /api/fra-atlas/records
 */
router.get('/records', (req, res) => {
  try {
    const { state, district } = req.query;
    
    let records;
    if (state) {
      records = fakeDB.getRecordsByState(state);
    } else if (district) {
      records = fakeDB.getRecordsByDistrict(district);
    } else {
      records = fakeDB.getAllRecords();
    }
    
    res.json({
      success: true,
      count: records.length,
      records: records
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Get GeoJSON data for mapping
 * GET /api/fra-atlas/geojson
 */
router.get('/geojson', (req, res) => {
  try {
    const { state, district, type } = req.query;
    
    const filters = {};
    if (state) filters.state = state;
    if (district) filters.district = district;
    if (type) filters.entryType = type;
    
    const geojson = fakeDB.getGeoJSON(filters);
    
    res.json(geojson);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Get FRA Atlas statistics
 * GET /api/fra-atlas/statistics
 */
router.get('/statistics', (req, res) => {
  try {
    const stats = fakeDB.getStatistics();
    res.json({
      success: true,
      statistics: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Calculate eligible CSS schemes based on FRA data
 */
function calculateEligibleSchemes(fraData) {
  const schemes = {
    pmKisan: {
      eligible: false,
      name: 'PM-KISAN',
      description: 'Pradhan Mantri Kisan Samman Nidhi',
      benefit: '₹6,000 per year',
      ministry: 'Ministry of Agriculture',
      reason: ''
    },
    jalJeevanMission: {
      eligible: false,
      name: 'Jal Jeevan Mission',
      description: 'Har Ghar Jal - Piped Water Supply',
      benefit: 'Clean drinking water connection',
      ministry: 'Ministry of Jal Shakti',
      reason: ''
    },
    mgnrega: {
      eligible: false,
      name: 'MGNREGA',
      description: 'Mahatma Gandhi National Rural Employment Guarantee Act',
      benefit: '100 days employment at ₹220/day',
      ministry: 'Ministry of Rural Development',
      reason: ''
    },
    dajgua: {
      eligible: false,
      name: 'DAJGUA',
      description: 'Development Action for Jharkhand, Gujarat, Andhra Pradesh',
      benefit: 'Integrated tribal development',
      ministry: 'Multiple Ministries',
      reason: ''
    },
    pmay: {
      eligible: false,
      name: 'PM-AY (Grameen)',
      description: 'Pradhan Mantri Awas Yojana - Rural',
      benefit: '₹1.2 lakh for house construction',
      ministry: 'Ministry of Rural Development',
      reason: ''
    },
    forestConservation: {
      eligible: false,
      name: 'Forest Conservation Fund',
      description: 'Support for forest conservation activities',
      benefit: 'Financial assistance for afforestation',
      ministry: 'Ministry of Environment',
      reason: ''
    }
  };

  // PM-KISAN: Agricultural land holders with approved IFR
  if (fraData.recordType === 'IFR' && fraData.landArea > 0) {
    schemes.pmKisan.eligible = true;
    schemes.pmKisan.reason = `Eligible as IFR patta holder with ${fraData.landArea} acres of agricultural land`;
  }

  // Jal Jeevan Mission: All approved FRA holders
  if (fraData.claimStatus === 'approved' || fraData.claimStatus === 'under-review') {
    schemes.jalJeevanMission.eligible = true;
    schemes.jalJeevanMission.reason = 'Eligible for piped water connection in village';
  }

  // MGNREGA: All FRA applicants
  schemes.mgnrega.eligible = true;
  schemes.mgnrega.reason = 'Guaranteed 100 days employment per household';

  // DAJGUA: Tribal certificate holders
  if (fraData.tribe || fraData.stCertificateNumber) {
    schemes.dajgua.eligible = true;
    schemes.dajgua.reason = `Eligible as ${fraData.tribe || 'ST'} tribal community member`;
  }

  // PM-AY: Based on claim status
  if (fraData.claimStatus === 'approved') {
    schemes.pmay.eligible = true;
    schemes.pmay.reason = 'Eligible for housing assistance as approved FRA patta holder';
  }

  // Forest Conservation: CFR holders
  if (fraData.recordType === 'CFR') {
    schemes.forestConservation.eligible = true;
    schemes.forestConservation.reason = `Eligible for conservation fund for ${fraData.forestArea} hectares CFR area`;
  }

  return schemes;
}

module.exports = router;
