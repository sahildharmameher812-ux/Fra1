import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Analytics API Service
export const analyticsAPI = {
  // Get dashboard analytics data
  getDashboard: async (params = {}) => {
    try {
      const response = await api.get('/analytics/dashboard', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching analytics dashboard:', error);
      throw error;
    }
  },

  // Get detailed statistics
  getStatistics: async (params = {}) => {
    try {
      const response = await api.get('/analytics/statistics', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  },

  // Get trend analysis
  getTrends: async (params = {}) => {
    try {
      const response = await api.get('/analytics/trends', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching trends:', error);
      throw error;
    }
  },

  // Get performance metrics
  getPerformance: async (params = {}) => {
    try {
      const response = await api.get('/analytics/performance', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching performance metrics:', error);
      throw error;
    }
  },

  // Generate custom report
  generateReport: async (reportConfig) => {
    try {
      const response = await api.post('/analytics/reports/generate', reportConfig);
      return response.data;
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  },

  // Get visualization data
  getVisualization: async (type, params = {}) => {
    try {
      const response = await api.get(`/analytics/visualizations/${type}`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching visualization data:', error);
      throw error;
    }
  }
};

// DSS (Decision Support System) API Service
export const dssAPI = {
  // Get village data for analysis
  getVillages: async (stateId) => {
    try {
      const response = await api.get('/dss/villages', { 
        params: stateId ? { state: stateId } : {} 
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching villages:', error);
      throw error;
    }
  },

  // Get available schemes
  getSchemes: async () => {
    try {
      const response = await api.get('/dss/schemes');
      return response.data;
    } catch (error) {
      console.error('Error fetching schemes:', error);
      throw error;
    }
  },

  // Run AI analysis for recommendations
  runAnalysis: async (analysisConfig) => {
    try {
      const response = await api.post('/dss/analyze', analysisConfig);
      return response.data;
    } catch (error) {
      console.error('Error running DSS analysis:', error);
      throw error;
    }
  },

  // Get scheme recommendations
  getRecommendations: async (villageId, params = {}) => {
    try {
      const response = await api.get(`/dss/recommendations/${villageId}`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
  },

  // Save analysis results
  saveAnalysis: async (analysisData) => {
    try {
      const response = await api.post('/dss/save-analysis', analysisData);
      return response.data;
    } catch (error) {
      console.error('Error saving analysis:', error);
      throw error;
    }
  },

  // Get analysis history
  getAnalysisHistory: async (params = {}) => {
    try {
      const response = await api.get('/dss/history', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching analysis history:', error);
      throw error;
    }
  }
};

// OCR API Service
export const ocrAPI = {
  // Upload documents for processing
  uploadDocuments: async (files, onProgress) => {
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append('documents', file);
      });

      const response = await api.post('/ocr/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading documents:', error);
      throw error;
    }
  },

  // Process document with OCR
  processDocument: async (documentId, options = {}) => {
    try {
      const response = await api.post(`/ocr/process/${documentId}`, options);
      return response.data;
    } catch (error) {
      console.error('Error processing document:', error);
      throw error;
    }
  },

  // Get OCR results
  getOCRResults: async (documentId) => {
    try {
      const response = await api.get(`/ocr/results/${documentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching OCR results:', error);
      throw error;
    }
  },

  // Get NER results
  getNERResults: async (documentId) => {
    try {
      const response = await api.get(`/ocr/ner/${documentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching NER results:', error);
      throw error;
    }
  },

  // Get processing status
  getProcessingStatus: async (documentId) => {
    try {
      const response = await api.get(`/ocr/status/${documentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching processing status:', error);
      throw error;
    }
  },

  // Get processing history
  getProcessingHistory: async (params = {}) => {
    try {
      const response = await api.get('/ocr/history', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching processing history:', error);
      throw error;
    }
  },

  // Batch process documents
  batchProcess: async (documentIds, options = {}) => {
    try {
      const response = await api.post('/ocr/batch-process', {
        documentIds,
        ...options
      });
      return response.data;
    } catch (error) {
      console.error('Error batch processing documents:', error);
      throw error;
    }
  },

  // Export results
  exportResults: async (documentId, format = 'json') => {
    try {
      const response = await api.get(`/ocr/export/${documentId}`, {
        params: { format },
        responseType: format === 'json' ? 'json' : 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting results:', error);
      throw error;
    }
  }
};

// General API Service
export const generalAPI = {
  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Error checking API health:', error);
      throw error;
    }
  },

  // Get system status
  getSystemStatus: async () => {
    try {
      const response = await api.get('/system/status');
      return response.data;
    } catch (error) {
      console.error('Error fetching system status:', error);
      throw error;
    }
  },

  // Get user profile
  getUserProfile: async () => {
    try {
      const response = await api.get('/user/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // Update user profile
  updateUserProfile: async (profileData) => {
    try {
      const response = await api.put('/user/profile', profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }
};

// WebSocket service for real-time updates
export class WebSocketService {
  constructor() {
    this.ws = null;
    this.listeners = new Map();
  }

  connect() {
    const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:5000';
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.notifyListeners(data.type, data.payload);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      // Attempt to reconnect after 5 seconds
      setTimeout(() => this.connect(), 5000);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  subscribe(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(callback);
  }

  unsubscribe(eventType, callback) {
    if (this.listeners.has(eventType)) {
      const callbacks = this.listeners.get(eventType);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  notifyListeners(eventType, payload) {
    if (this.listeners.has(eventType)) {
      this.listeners.get(eventType).forEach(callback => {
        try {
          callback(payload);
        } catch (error) {
          console.error('Error in WebSocket callback:', error);
        }
      });
    }
  }

  send(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }
}

// Create singleton WebSocket service instance
export const wsService = new WebSocketService();

// Utility functions
export const apiUtils = {
  // Format error messages
  formatError: (error) => {
    if (error.response?.data?.message) {
      return error.response.data.message;
    } else if (error.message) {
      return error.message;
    } else {
      return 'An unexpected error occurred';
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Get auth token
  getAuthToken: () => {
    return localStorage.getItem('authToken');
  },

  // Set auth token
  setAuthToken: (token) => {
    localStorage.setItem('authToken', token);
  },

  // Remove auth token
  removeAuthToken: () => {
    localStorage.removeItem('authToken');
  },

  // Download file from blob
  downloadBlob: (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
};

export default api;