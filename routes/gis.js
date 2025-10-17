const express = require('express');
const router = express.Router();

// Simple auth middleware for demo
const simpleAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }
  next();
};

// Mock data for demonstration
const mockFRAData = {
  district_wise_data: [
    {
      district: 'Bhopal',
      land_classification: {
        tribal_suitable_land: {
          fra_claims: {
            total_submitted: 1243,
            approved: 867,
            pending: 298
          }
        }
      }
    }
  ]
};

// Get GIS data for map visualization
router.get('/fra-claims', simpleAuth, async (req, res) => {
  try {
    const { state, district, status, dateRange } = req.query;
    
    // Mock response - in real app, this would query spatial database
    res.json({
      type: 'FeatureCollection',
      features: mockFRAData.district_wise_data.map(district => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [78.9629, 22.5937] // Mock coordinates
        },
        properties: {
          district: district.district,
          totalClaims: district.land_classification.tribal_suitable_land.fra_claims.total_submitted,
          approved: district.land_classification.tribal_suitable_land.fra_claims.approved,
          pending: district.land_classification.tribal_suitable_land.fra_claims.pending
        }
      }))
    });
  } catch (error) {
    console.error('GIS data fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get satellite analysis data
router.get('/satellite-data', simpleAuth, async (req, res) => {
  try {
    const { coordinates, dateRange } = req.query;
    
    // Mock satellite analysis response
    res.json({
      landCover: 'Dense Forest',
      vegetationIndex: 0.78,
      changeDetection: {
        hasChanged: false,
        changeType: 'Stable',
        confidence: 0.94
      },
      suitableForTribal: true,
      analysisDate: new Date().toISOString()
    });
  } catch (error) {
    console.error('Satellite data fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
