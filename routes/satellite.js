const express = require('express');
const router = express.Router();

const simpleAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });
  next();
};

// Satellite data sources configuration
const SATELLITE_SOURCES = {
  'sentinel-2': {
    name: 'Sentinel-2',
    resolution: '10m',
    bands: ['B02', 'B03', 'B04', 'B08', 'B11', 'B12'],
    revisitTime: '5 days',
    provider: 'ESA'
  },
  'landsat-8': {
    name: 'Landsat 8',
    resolution: '30m',
    bands: ['B2', 'B3', 'B4', 'B5', 'B6', 'B7'],
    revisitTime: '16 days',
    provider: 'NASA/USGS'
  },
  'modis': {
    name: 'MODIS',
    resolution: '250m',
    bands: ['RED', 'NIR', 'BLUE', 'GREEN'],
    revisitTime: '1 day',
    provider: 'NASA'
  }
};

// Land cover classification mapping
const LAND_COVER_CLASSES = {
  1: { name: 'Dense Forest', color: '#0d5b1a', suitability: 'high' },
  2: { name: 'Open Forest', color: '#2d8f3f', suitability: 'high' },
  3: { name: 'Scrub Forest', color: '#5fb370', suitability: 'medium' },
  4: { name: 'Grassland', color: '#8fbc8f', suitability: 'medium' },
  5: { name: 'Agricultural Land', color: '#ffd700', suitability: 'low' },
  6: { name: 'Built-up Area', color: '#ff6347', suitability: 'none' },
  7: { name: 'Water Bodies', color: '#4169e1', suitability: 'none' },
  8: { name: 'Barren Land', color: '#d2691e', suitability: 'low' }
};

// Mock satellite analysis with comprehensive data
const performSatelliteAnalysis = (coordinates, dateRange, source = 'sentinel-2') => {
  const lat = coordinates[1];
  const lon = coordinates[0];
  
  // Mock analysis based on coordinates
  const mockAnalysis = {
    location: {
      latitude: lat,
      longitude: lon,
      district: 'Bhopal',
      state: 'Madhya Pradesh'
    },
    acquisitionDate: '2024-03-15T10:30:00Z',
    satellite: SATELLITE_SOURCES[source],
    imagery: {
      cloudCoverage: 12.5,
      quality: 'good',
      resolution: SATELLITE_SOURCES[source].resolution,
      downloadUrl: `/api/satellite/imagery/${Date.now()}`
    },
    landCover: {
      primaryClass: 1, // Dense Forest
      primaryClassName: LAND_COVER_CLASSES[1].name,
      confidence: 0.89,
      distribution: {
        'Dense Forest': 68.5,
        'Open Forest': 18.2,
        'Grassland': 8.9,
        'Water Bodies': 4.4
      }
    },
    vegetation: {
      ndvi: 0.78,
      evi: 0.65,
      savi: 0.72,
      lai: 4.2, // Leaf Area Index
      biomass: 125.6, // tons/hectare
      healthStatus: 'healthy'
    },
    changeDetection: {
      hasChanged: false,
      changeType: 'Stable',
      changePercentage: 2.1,
      timeSpan: '2023-2024',
      confidence: 0.94,
      alerts: []
    },
    forestMetrics: {
      canopyCover: 82.4,
      treeHeight: 18.5, // meters
      speciesDiversity: 'high',
      carbonStock: 89.3, // tons/hectare
      deforestationRisk: 'low'
    },
    tribalSuitability: {
      overall: 'high',
      score: 8.5,
      factors: {
        forestCover: 9.2,
        accessibility: 7.8,
        waterAvailability: 8.9,
        soilQuality: 8.1,
        biodiversity: 9.0
      },
      recommendations: [
        'Excellent forest cover suitable for traditional practices',
        'Good water resource availability',
        'High biodiversity supports NTFP collection',
        'Sustainable agriculture potential'
      ]
    },
    environmentalIndicators: {
      soilMoisture: 0.35,
      surfaceTemperature: 28.5, // Celsius
      precipitation: 1250, // mm/year
      evapotranspiration: 920, // mm/year
      droughtStress: 'low',
      fireRisk: 'medium'
    }
  };
  
  return mockAnalysis;
};

// Enhanced satellite analysis endpoint
router.get('/analyze', simpleAuth, async (req, res) => {
  try {
    const {
      lat,
      lon,
      startDate,
      endDate,
      source = 'sentinel-2',
      includeTimeSeries = false
    } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    const coordinates = [parseFloat(lon), parseFloat(lat)];
    const dateRange = { startDate, endDate };

    const analysis = performSatelliteAnalysis(coordinates, dateRange, source);

    // Add time series data if requested
    if (includeTimeSeries) {
      analysis.timeSeries = {
        ndvi: [
          { date: '2024-01-15', value: 0.72 },
          { date: '2024-02-15', value: 0.75 },
          { date: '2024-03-15', value: 0.78 },
          { date: '2024-04-15', value: 0.81 },
          { date: '2024-05-15', value: 0.79 },
          { date: '2024-06-15', value: 0.76 }
        ],
        landSurfaceTemperature: [
          { date: '2024-01-15', value: 22.1 },
          { date: '2024-02-15', value: 25.3 },
          { date: '2024-03-15', value: 28.5 },
          { date: '2024-04-15', value: 31.2 },
          { date: '2024-05-15', value: 29.8 },
          { date: '2024-06-15', value: 27.4 }
        ]
      };
    }

    res.json({
      status: 'success',
      analysisId: `SAT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      generatedAt: new Date().toISOString(),
      ...analysis
    });
  } catch (error) {
    console.error('Satellite analysis error:', error);
    res.status(500).json({ message: 'Server error during satellite analysis' });
  }
});

// Land cover classification for a region
router.post('/classify', simpleAuth, async (req, res) => {
  try {
    const {
      boundingBox, // [minLon, minLat, maxLon, maxLat]
      resolution = 30, // meters
      source = 'sentinel-2',
      classificationModel = 'random_forest'
    } = req.body;

    if (!boundingBox || boundingBox.length !== 4) {
      return res.status(400).json({ message: 'Valid bounding box is required [minLon, minLat, maxLon, maxLat]' });
    }

    const classificationResult = {
      classificationId: `CLASS_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      boundingBox,
      resolution: `${resolution}m`,
      satellite: SATELLITE_SOURCES[source],
      model: classificationModel,
      processedAt: new Date().toISOString(),
      
      results: {
        totalArea: 2847.5, // hectares
        classes: [
          { classId: 1, name: 'Dense Forest', area: 1845.2, percentage: 64.8, pixels: 205024 },
          { classId: 2, name: 'Open Forest', area: 568.9, percentage: 20.0, pixels: 63213 },
          { classId: 3, name: 'Scrub Forest', area: 227.6, percentage: 8.0, pixels: 25289 },
          { classId: 4, name: 'Grassland', area: 142.2, percentage: 5.0, pixels: 15803 },
          { classId: 7, name: 'Water Bodies', area: 63.6, percentage: 2.2, pixels: 7072 }
        ],
        accuracy: {
          overall: 0.92,
          kappa: 0.89,
          userAccuracy: {
            'Dense Forest': 0.95,
            'Open Forest': 0.88,
            'Scrub Forest': 0.85,
            'Grassland': 0.90,
            'Water Bodies': 0.98
          },
          producerAccuracy: {
            'Dense Forest': 0.93,
            'Open Forest': 0.91,
            'Scrub Forest': 0.82,
            'Grassland': 0.87,
            'Water Bodies': 0.96
          }
        },
        downloadUrls: {
          classificationMap: `/api/satellite/download/classification/${Date.now()}.tif`,
          confidenceMap: `/api/satellite/download/confidence/${Date.now()}.tif`,
          statistics: `/api/satellite/download/stats/${Date.now()}.json`
        }
      },
      
      tribalLandAssessment: {
        suitableArea: 2187.1, // hectares (Forest + Grassland)
        suitabilityPercentage: 76.8,
        recommendedForFRA: true,
        notes: 'High forest cover with good connectivity suitable for tribal rights recognition'
      }
    };

    res.json(classificationResult);
  } catch (error) {
    console.error('Classification error:', error);
    res.status(500).json({ message: 'Server error during classification' });
  }
});

// Change detection analysis
router.post('/change-detection', simpleAuth, async (req, res) => {
  try {
    const {
      coordinates,
      beforeDate,
      afterDate,
      source = 'sentinel-2',
      changeThreshold = 0.1
    } = req.body;

    if (!coordinates || !beforeDate || !afterDate) {
      return res.status(400).json({ message: 'Coordinates, before date, and after date are required' });
    }

    const changeDetectionResult = {
      analysisId: `CHANGE_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      location: {
        coordinates,
        area: '2.45 hectares'
      },
      timespan: {
        beforeDate,
        afterDate,
        durationDays: Math.floor((new Date(afterDate) - new Date(beforeDate)) / (1000 * 60 * 60 * 24))
      },
      satellite: SATELLITE_SOURCES[source],
      threshold: changeThreshold,
      
      changes: {
        detected: true,
        changePercentage: 15.6,
        changeType: 'Forest Loss',
        severity: 'moderate',
        confidence: 0.87,
        
        beforeState: {
          landCover: 'Dense Forest',
          ndvi: 0.82,
          biomass: 142.3,
          canopyCover: 89.2
        },
        afterState: {
          landCover: 'Open Forest',
          ndvi: 0.68,
          biomass: 98.7,
          canopyCover: 64.8
        },
        
        metrics: {
          ndviChange: -0.14,
          biomassChange: -43.6,
          canopyChange: -24.4,
          areaAffected: 0.38 // hectares
        }
      },
      
      possibleCauses: [
        { cause: 'Natural Logging', probability: 0.35, impact: 'moderate' },
        { cause: 'Seasonal Variation', probability: 0.28, impact: 'low' },
        { cause: 'Drought Stress', probability: 0.22, impact: 'moderate' },
        { cause: 'Fire Incident', probability: 0.15, impact: 'high' }
      ],
      
      alerts: [
        {
          type: 'forest_loss',
          severity: 'medium',
          message: 'Moderate forest loss detected - requires investigation',
          actionRequired: true,
          priority: 'high'
        }
      ],
      
      recommendations: [
        'Conduct ground verification of detected changes',
        'Assess if changes are due to permitted activities',
        'Consider increased monitoring frequency',
        'Evaluate need for conservation measures'
      ],
      
      visualizations: {
        beforeImage: `/api/satellite/images/before_${Date.now()}.jpg`,
        afterImage: `/api/satellite/images/after_${Date.now()}.jpg`,
        changeMap: `/api/satellite/images/change_${Date.now()}.jpg`,
        overlayMap: `/api/satellite/images/overlay_${Date.now()}.jpg`
      }
    };

    res.json(changeDetectionResult);
  } catch (error) {
    console.error('Change detection error:', error);
    res.status(500).json({ message: 'Server error during change detection' });
  }
});

// NDVI and vegetation health analysis
router.get('/vegetation-health', simpleAuth, async (req, res) => {
  try {
    const { lat, lon, startDate, endDate } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    const vegetationAnalysis = {
      analysisId: `VEG_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      location: {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon)
      },
      timeRange: { startDate, endDate },
      
      currentState: {
        ndvi: 0.78,
        evi: 0.65,
        savi: 0.72,
        msavi: 0.69,
        lai: 4.2,
        fapar: 0.84, // Fraction of Absorbed Photosynthetically Active Radiation
        gpp: 12.5, // Gross Primary Productivity
        healthStatus: 'healthy',
        stressLevel: 'low'
      },
      
      seasonalProfile: {
        spring: { avgNDVI: 0.75, status: 'good' },
        summer: { avgNDVI: 0.68, status: 'moderate' },
        monsoon: { avgNDVI: 0.82, status: 'excellent' },
        winter: { avgNDVI: 0.71, status: 'good' }
      },
      
      trends: {
        direction: 'stable',
        slope: 0.002, // per year
        significance: 0.85,
        changeRate: '0.2% per year increase',
        outlook: 'positive'
      },
      
      stressIndicators: {
        drought: {
          status: 'normal',
          vdi: 0.23, // Vegetation Drought Index
          risk: 'low'
        },
        fire: {
          status: 'normal',
          nbr: 0.45, // Normalized Burn Ratio
          risk: 'medium'
        },
        disease: {
          status: 'healthy',
          anomalies: [],
          risk: 'low'
        }
      },
      
      phenology: {
        greenupDate: '2024-03-15',
        peakGreenness: '2024-07-20',
        senescenceDate: '2024-10-15',
        dormancyDate: '2024-12-01',
        growingSeasonLength: 188 // days
      },
      
      recommendations: [
        'Vegetation health is good for tribal land use',
        'Continue current conservation practices',
        'Monitor during summer for drought stress',
        'Suitable for NTFP collection activities'
      ]
    };

    res.json(vegetationAnalysis);
  } catch (error) {
    console.error('Vegetation health analysis error:', error);
    res.status(500).json({ message: 'Server error during vegetation analysis' });
  }
});

// Batch analysis for multiple locations
router.post('/batch-analysis', simpleAuth, async (req, res) => {
  try {
    const { locations, analysisType = 'basic', source = 'sentinel-2' } = req.body;

    if (!locations || !Array.isArray(locations) || locations.length === 0) {
      return res.status(400).json({ message: 'Array of locations is required' });
    }

    if (locations.length > 50) {
      return res.status(400).json({ message: 'Maximum 50 locations allowed per batch' });
    }

    const batchId = `BATCH_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const results = [];

    for (let i = 0; i < locations.length; i++) {
      const location = locations[i];
      const coordinates = [location.lon, location.lat];
      
      const analysis = performSatelliteAnalysis(coordinates, null, source);
      
      results.push({
        locationId: location.id || `LOC_${i}`,
        coordinates,
        name: location.name || `Location ${i + 1}`,
        analysis: {
          landCover: analysis.landCover.primaryClassName,
          ndvi: analysis.vegetation.ndvi,
          suitabilityScore: analysis.tribalSuitability.score,
          suitability: analysis.tribalSuitability.overall,
          confidence: analysis.landCover.confidence
        },
        status: 'completed'
      });
    }

    const summary = {
      totalLocations: locations.length,
      completed: results.length,
      failed: 0,
      averageNDVI: (results.reduce((sum, r) => sum + r.analysis.ndvi, 0) / results.length).toFixed(3),
      suitabilityDistribution: {
        high: results.filter(r => r.analysis.suitability === 'high').length,
        medium: results.filter(r => r.analysis.suitability === 'medium').length,
        low: results.filter(r => r.analysis.suitability === 'low').length
      },
      recommendedForFRA: results.filter(r => r.analysis.suitabilityScore >= 7.0).length
    };

    res.json({
      batchId,
      status: 'completed',
      processedAt: new Date().toISOString(),
      processingTime: '45 seconds', // mock processing time
      summary,
      results,
      downloadUrl: `/api/satellite/batch/download/${batchId}`,
      reportUrl: `/api/satellite/batch/report/${batchId}`
    });
  } catch (error) {
    console.error('Batch analysis error:', error);
    res.status(500).json({ message: 'Server error during batch analysis' });
  }
});

// Get available satellite data sources
router.get('/sources', simpleAuth, async (req, res) => {
  try {
    const sources = Object.entries(SATELLITE_SOURCES).map(([key, value]) => ({
      id: key,
      ...value,
      available: true,
      lastUpdate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      coverage: 'Global',
      cost: key === 'sentinel-2' ? 'Free' : key === 'landsat-8' ? 'Free' : 'Commercial'
    }));

    const capabilities = {
      analyses: [
        'Land Cover Classification',
        'NDVI Calculation',
        'Change Detection',
        'Vegetation Health Assessment',
        'Forest Monitoring',
        'Water Body Detection',
        'Urban Growth Analysis',
        'Agricultural Monitoring'
      ],
      outputFormats: ['GeoTIFF', 'JSON', 'Shapefile', 'KML', 'PNG'],
      maxAreaPerRequest: '10,000 hectares',
      temporalRange: '2013 - Present',
      processingTime: '30 seconds - 5 minutes'
    };

    res.json({
      sources,
      capabilities,
      landCoverClasses: LAND_COVER_CLASSES
    });
  } catch (error) {
    console.error('Sources retrieval error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
