import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [fraData, setFraData] = useState([]);
  const [satelliteData, setSatelliteData] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({});
  const [loading, setLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      // In a real application, this would be actual API calls
      // For now, we'll use the mock data from our datasets
      const mockData = await loadMockData();
      setFraData(mockData.fraData);
      setSatelliteData(mockData.satelliteData);
      setAnalyticsData(mockData.analytics);
    } catch (error) {
      console.error('Failed to load initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMockData = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      fraData: generateMockFRAData(),
      satelliteData: generateMockSatelliteData(),
      analytics: generateMockAnalytics()
    };
  };

  const generateMockFRAData = () => {
    const states = ['Madhya Pradesh', 'Tripura', 'Odisha', 'Telangana'];
    const tribalGroups = {
      'Madhya Pradesh': ['Gond', 'Bhil', 'Korku', 'Baiga'],
      'Tripura': ['Tripuri', 'Reang', 'Jamatia', 'Chakma'],
      'Odisha': ['Santhal', 'Gond', 'Kandha', 'Oraon'],
      'Telangana': ['Gond', 'Koya', 'Chenchu', 'Yerukula']
    };
    
    const data = [];
    states.forEach(state => {
      for (let i = 0; i < 100; i++) {
        data.push({
          id: `FRA-${state.substring(0,2)}-${Date.now()}-${i}`,
          state,
          district: `District-${Math.floor(Math.random() * 5) + 1}`,
          village: `Village-${Math.floor(Math.random() * 20) + 1}`,
          claimantName: `Claimant ${i + 1}`,
          tribalGroup: tribalGroups[state][Math.floor(Math.random() * tribalGroups[state].length)],
          claimType: ['IFR', 'CR', 'CFR'][Math.floor(Math.random() * 3)],
          status: ['approved', 'pending', 'rejected', 'under_verification'][Math.floor(Math.random() * 4)],
          landArea: Math.random() * 10 + 1,
          submissionDate: new Date(2020 + Math.random() * 4, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
          coordinates: {
            lat: 20 + Math.random() * 10,
            lng: 75 + Math.random() * 15
          }
        });
      }
    });
    
    return data;
  };

  const generateMockSatelliteData = () => {
    return {
      forestCover: {
        total: 245678.5,
        dense: 145234.2,
        moderate: 78456.3,
        sparse: 21988.0
      },
      landUseClassification: {
        tribal: 89456.7,
        nonTribal: 156221.8,
        mixed: 34567.2
      },
      changeDetection: {
        forestIncrease: 2.3,
        settlementExpansion: 5.7,
        agriculturalGrowth: 3.4
      }
    };
  };

  const generateMockAnalytics = () => {
    return {
      totalClaims: 15678,
      approvedClaims: 11234,
      pendingClaims: 3456,
      rejectedClaims: 988,
      tribalFamiliesBenefited: 45678,
      averageProcessingTime: 45,
      schemeIntegration: {
        pmKisan: 78,
        jalJeevan: 65,
        mgnrega: 89,
        dajgua: 34
      }
    };
  };

  const fetchFRAData = async (filters = {}) => {
    setLoading(true);
    try {
      // In real implementation, this would be:
      // const response = await axios.get('/api/fra/claims', { params: filters });
      // setFraData(response.data);
      
      // For now, filter mock data
      let filteredData = fraData;
      if (filters.state && filters.state !== 'All') {
        filteredData = filteredData.filter(item => item.state === filters.state);
      }
      if (filters.status) {
        filteredData = filteredData.filter(item => item.status === filters.status);
      }
      
      return filteredData;
    } catch (error) {
      console.error('Failed to fetch FRA data:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async (params = {}) => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return analyticsData;
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const submitFRAClaim = async (claimData) => {
    try {
      // Mock API call
      const response = await new Promise(resolve => {
        setTimeout(() => {
          const newClaim = {
            id: `FRA-${claimData.state.substring(0,2)}-${Date.now()}`,
            ...claimData,
            status: 'submitted',
            submissionDate: new Date()
          };
          resolve({ data: newClaim });
        }, 1000);
      });
      
      setFraData(prev => [...prev, response.data]);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Failed to submit FRA claim:', error);
      return { success: false, error: error.message };
    }
  };

  const updateClaimStatus = async (claimId, newStatus, comments = '') => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setFraData(prev => 
        prev.map(claim => 
          claim.id === claimId 
            ? { ...claim, status: newStatus, lastUpdated: new Date(), comments }
            : claim
        )
      );
      
      return { success: true };
    } catch (error) {
      console.error('Failed to update claim status:', error);
      return { success: false, error: error.message };
    }
  };

  const processDocument = async (file, documentType) => {
    try {
      // Mock OCR processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const extractedData = {
        claimantName: 'Sample Name',
        village: 'Sample Village',
        tribalGroup: 'Sample Tribe',
        landArea: 2.5,
        confidence: 0.92
      };
      
      return { success: true, extractedData };
    } catch (error) {
      console.error('Failed to process document:', error);
      return { success: false, error: error.message };
    }
  };

  const analyzeSatelliteData = async (coordinates, dateRange) => {
    try {
      // Mock satellite analysis
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const analysis = {
        landCover: 'Dense Forest',
        vegetationIndex: 0.78,
        changeDetection: 'Stable',
        suitableForTribal: true,
        confidence: 0.89
      };
      
      return { success: true, analysis };
    } catch (error) {
      console.error('Failed to analyze satellite data:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    fraData,
    satelliteData,
    analyticsData,
    loading,
    fetchFRAData,
    fetchAnalytics,
    submitFRAClaim,
    updateClaimStatus,
    processDocument,
    analyzeSatelliteData,
    refreshData: loadInitialData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
