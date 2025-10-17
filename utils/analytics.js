// Analytics utilities for FRA system
const fs = require('fs');
const path = require('path');

/**
 * Generate advanced statistical reports
 * @param {Object} data - Raw data for analysis
 * @param {Object} options - Report generation options
 * @returns {Object} Formatted report with insights
 */
const generateAdvancedReport = (data, options = {}) => {
  const { 
    reportType = 'comprehensive',
    timeframe = '6m',
    includeVisualization = true,
    format = 'json'
  } = options;

  // Mock implementation - in real system would perform complex analytics
  const report = {
    reportId: `RPT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: reportType,
    generatedAt: new Date().toISOString(),
    
    summary: {
      totalRecords: data?.totalClaims || 15678,
      analysisTimeframe: timeframe,
      keyMetrics: {
        approvalRate: 71.6,
        avgProcessingTime: 44.2,
        systemEfficiency: 92.3,
        userSatisfaction: 4.2
      }
    },
    
    insights: [
      'Approval rates have improved by 12% in the analysis period',
      'Processing efficiency shows consistent upward trend',
      'Digital submissions have increased by 45%',
      'Peak application periods align with harvest seasons'
    ],
    
    recommendations: [
      'Continue automation initiatives to maintain efficiency gains',
      'Focus on capacity building in high-volume districts',
      'Implement predictive analytics for resource allocation',
      'Enhance digital literacy programs for applicants'
    ],
    
    visualizations: includeVisualization ? {
      charts: [
        {
          type: 'line',
          title: 'Monthly Approval Trends',
          dataUrl: `/api/analytics/charts/monthly-trends/${Date.now()}`
        },
        {
          type: 'pie',
          title: 'Claim Distribution by Status',
          dataUrl: `/api/analytics/charts/status-distribution/${Date.now()}`
        },
        {
          type: 'bar',
          title: 'State-wise Performance',
          dataUrl: `/api/analytics/charts/state-performance/${Date.now()}`
        }
      ]
    } : null,
    
    exportUrls: {
      pdf: `/api/analytics/reports/download/${Date.now()}.pdf`,
      excel: `/api/analytics/reports/download/${Date.now()}.xlsx`,
      csv: `/api/analytics/reports/download/${Date.now()}.csv`
    }
  };

  return report;
};

/**
 * Calculate trend analysis for time series data
 * @param {Array} timeSeries - Array of time-value pairs
 * @param {Object} options - Analysis options
 * @returns {Object} Trend analysis results
 */
const calculateTrends = (timeSeries, options = {}) => {
  const { 
    method = 'linear_regression',
    confidenceInterval = 0.95,
    forecastPeriods = 3 
  } = options;

  if (!timeSeries || timeSeries.length < 2) {
    throw new Error('Insufficient data for trend analysis');
  }

  // Simple linear regression implementation
  const n = timeSeries.length;
  const xValues = timeSeries.map((_, index) => index);
  const yValues = timeSeries.map(point => point.value);
  
  const sumX = xValues.reduce((sum, x) => sum + x, 0);
  const sumY = yValues.reduce((sum, y) => sum + y, 0);
  const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
  const sumXX = xValues.reduce((sum, x) => sum + x * x, 0);
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  // Calculate R-squared
  const yMean = sumY / n;
  const totalSumSquares = yValues.reduce((sum, y) => sum + Math.pow(y - yMean, 2), 0);
  const residualSumSquares = yValues.reduce((sum, y, i) => {
    const predicted = slope * i + intercept;
    return sum + Math.pow(y - predicted, 2);
  }, 0);
  const rSquared = 1 - (residualSumSquares / totalSumSquares);
  
  // Generate forecast
  const forecast = [];
  for (let i = 1; i <= forecastPeriods; i++) {
    const predictedValue = slope * (n + i - 1) + intercept;
    forecast.push({
      period: n + i,
      predicted: Math.round(predictedValue * 100) / 100,
      confidence: Math.max(0.5, rSquared - (i * 0.1)) // Decreasing confidence
    });
  }
  
  return {
    slope,
    intercept,
    rSquared,
    trend: slope > 0.1 ? 'increasing' : slope < -0.1 ? 'decreasing' : 'stable',
    strength: Math.abs(slope),
    significance: rSquared,
    forecast,
    interpretation: {
      direction: slope > 0 ? 'upward' : slope < 0 ? 'downward' : 'neutral',
      rate: `${(slope * 100).toFixed(2)}% per period`,
      reliability: rSquared > 0.8 ? 'high' : rSquared > 0.5 ? 'medium' : 'low'
    }
  };
};

/**
 * Perform advanced statistical analysis on dataset
 * @param {Array} dataset - Array of data points
 * @param {Object} options - Analysis options
 * @returns {Object} Statistical analysis results
 */
const performStatisticalAnalysis = (dataset, options = {}) => {
  const { 
    includeDistribution = true,
    includeCorrelation = false,
    outlierDetection = true 
  } = options;

  if (!dataset || dataset.length === 0) {
    throw new Error('Empty dataset provided');
  }

  // Basic descriptive statistics
  const sorted = [...dataset].sort((a, b) => a - b);
  const n = dataset.length;
  const mean = dataset.reduce((sum, val) => sum + val, 0) / n;
  const median = n % 2 === 0 
    ? (sorted[n/2 - 1] + sorted[n/2]) / 2 
    : sorted[Math.floor(n/2)];
  
  const variance = dataset.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (n - 1);
  const standardDeviation = Math.sqrt(variance);
  
  const q1 = sorted[Math.floor(n * 0.25)];
  const q3 = sorted[Math.floor(n * 0.75)];
  const iqr = q3 - q1;
  
  // Outlier detection using IQR method
  const outliers = outlierDetection 
    ? dataset.filter(val => val < q1 - 1.5 * iqr || val > q3 + 1.5 * iqr)
    : [];

  const statistics = {
    descriptive: {
      count: n,
      mean: Math.round(mean * 100) / 100,
      median: Math.round(median * 100) / 100,
      mode: calculateMode(dataset),
      min: Math.min(...dataset),
      max: Math.max(...dataset),
      range: Math.max(...dataset) - Math.min(...dataset),
      standardDeviation: Math.round(standardDeviation * 100) / 100,
      variance: Math.round(variance * 100) / 100,
      quartiles: {
        q1: Math.round(q1 * 100) / 100,
        q2: median,
        q3: Math.round(q3 * 100) / 100,
        iqr: Math.round(iqr * 100) / 100
      }
    },
    
    outliers: {
      count: outliers.length,
      values: outliers,
      percentage: Math.round((outliers.length / n) * 100 * 100) / 100
    },
    
    distribution: includeDistribution ? {
      skewness: calculateSkewness(dataset, mean, standardDeviation),
      kurtosis: calculateKurtosis(dataset, mean, standardDeviation),
      normality: assessNormality(dataset)
    } : null,
    
    insights: generateStatisticalInsights(mean, median, standardDeviation, outliers.length)
  };

  return statistics;
};

/**
 * Calculate mode of a dataset
 * @param {Array} dataset - Array of numbers
 * @returns {number|null} Mode value or null if no mode exists
 */
const calculateMode = (dataset) => {
  const frequency = {};
  let maxFreq = 0;
  let mode = null;
  
  dataset.forEach(val => {
    frequency[val] = (frequency[val] || 0) + 1;
    if (frequency[val] > maxFreq) {
      maxFreq = frequency[val];
      mode = val;
    }
  });
  
  return maxFreq > 1 ? mode : null;
};

/**
 * Calculate skewness of a dataset
 * @param {Array} dataset - Array of numbers
 * @param {number} mean - Mean of the dataset
 * @param {number} stdDev - Standard deviation
 * @returns {number} Skewness value
 */
const calculateSkewness = (dataset, mean, stdDev) => {
  const n = dataset.length;
  const sumCubedDeviations = dataset.reduce((sum, val) => {
    return sum + Math.pow((val - mean) / stdDev, 3);
  }, 0);
  
  return sumCubedDeviations / n;
};

/**
 * Calculate kurtosis of a dataset
 * @param {Array} dataset - Array of numbers
 * @param {number} mean - Mean of the dataset
 * @param {number} stdDev - Standard deviation
 * @returns {number} Kurtosis value
 */
const calculateKurtosis = (dataset, mean, stdDev) => {
  const n = dataset.length;
  const sumFourthPowerDeviations = dataset.reduce((sum, val) => {
    return sum + Math.pow((val - mean) / stdDev, 4);
  }, 0);
  
  return (sumFourthPowerDeviations / n) - 3; // Excess kurtosis
};

/**
 * Assess normality of dataset
 * @param {Array} dataset - Array of numbers
 * @returns {Object} Normality assessment
 */
const assessNormality = (dataset) => {
  // Simplified normality test - in practice would use Shapiro-Wilk or other tests
  const n = dataset.length;
  const mean = dataset.reduce((sum, val) => sum + val, 0) / n;
  const stdDev = Math.sqrt(dataset.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (n - 1));
  
  const skewness = calculateSkewness(dataset, mean, stdDev);
  const kurtosis = calculateKurtosis(dataset, mean, stdDev);
  
  // Rule of thumb: if |skewness| < 2 and |kurtosis| < 7, data is approximately normal
  const isNormal = Math.abs(skewness) < 2 && Math.abs(kurtosis) < 7;
  
  return {
    isNormal,
    confidence: isNormal ? 'moderate' : 'low',
    reason: !isNormal 
      ? `Skewness: ${skewness.toFixed(2)}, Kurtosis: ${kurtosis.toFixed(2)}`
      : 'Distribution appears approximately normal'
  };
};

/**
 * Generate insights from statistical analysis
 * @param {number} mean - Dataset mean
 * @param {number} median - Dataset median
 * @param {number} stdDev - Standard deviation
 * @param {number} outlierCount - Number of outliers
 * @returns {Array} Array of insights
 */
const generateStatisticalInsights = (mean, median, stdDev, outlierCount) => {
  const insights = [];
  
  // Mean vs Median comparison
  const meanMedianDiff = Math.abs(mean - median);
  if (meanMedianDiff > stdDev * 0.1) {
    insights.push(mean > median 
      ? 'Distribution is right-skewed (few high values pulling mean up)'
      : 'Distribution is left-skewed (few low values pulling mean down)');
  } else {
    insights.push('Distribution is approximately symmetric');
  }
  
  // Variability assessment
  const coefficientOfVariation = (stdDev / mean) * 100;
  if (coefficientOfVariation > 30) {
    insights.push('High variability in the data (CV > 30%)');
  } else if (coefficientOfVariation < 10) {
    insights.push('Low variability in the data (CV < 10%)');
  } else {
    insights.push('Moderate variability in the data');
  }
  
  // Outlier assessment
  if (outlierCount > 0) {
    insights.push(`${outlierCount} potential outlier(s) detected - may need investigation`);
  } else {
    insights.push('No significant outliers detected');
  }
  
  return insights;
};

/**
 * Export data to various formats
 * @param {Object} data - Data to export
 * @param {string} format - Export format (json, csv, excel)
 * @param {string} filename - Output filename
 * @returns {Object} Export result
 */
const exportData = (data, format, filename) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fullFilename = `${filename}_${timestamp}.${format}`;
  const exportPath = path.join(__dirname, '..', 'exports', fullFilename);
  
  try {
    // Ensure exports directory exists
    const exportsDir = path.dirname(exportPath);
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir, { recursive: true });
    }
    
    switch (format.toLowerCase()) {
      case 'json':
        fs.writeFileSync(exportPath, JSON.stringify(data, null, 2));
        break;
        
      case 'csv':
        const csvContent = convertToCSV(data);
        fs.writeFileSync(exportPath, csvContent);
        break;
        
      case 'excel':
        // Mock Excel export - in real implementation would use a library like xlsx
        const excelData = JSON.stringify(data, null, 2);
        fs.writeFileSync(exportPath, excelData);
        break;
        
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
    
    return {
      success: true,
      filename: fullFilename,
      path: exportPath,
      size: fs.statSync(exportPath).size,
      createdAt: new Date().toISOString()
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Convert data to CSV format
 * @param {Object|Array} data - Data to convert
 * @returns {string} CSV formatted string
 */
const convertToCSV = (data) => {
  if (Array.isArray(data)) {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        return typeof value === 'string' ? `"${value}"` : value;
      });
      csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
  } else if (typeof data === 'object') {
    // Convert object to CSV
    const entries = Object.entries(data);
    return entries.map(([key, value]) => `${key},${value}`).join('\n');
  }
  
  return data.toString();
};

/**
 * Calculate performance metrics
 * @param {Object} systemData - System performance data
 * @returns {Object} Calculated performance metrics
 */
const calculatePerformanceMetrics = (systemData) => {
  const {
    totalClaims,
    approvedClaims,
    rejectedClaims,
    pendingClaims,
    avgProcessingTime,
    userFeedback = []
  } = systemData;

  const completedClaims = approvedClaims + rejectedClaims;
  const totalProcessed = completedClaims + pendingClaims;
  
  const metrics = {
    efficiency: {
      throughputRate: Math.round((completedClaims / totalProcessed) * 100 * 100) / 100,
      approvalRate: Math.round((approvedClaims / completedClaims) * 100 * 100) / 100,
      rejectionRate: Math.round((rejectedClaims / completedClaims) * 100 * 100) / 100,
      pendingRate: Math.round((pendingClaims / totalProcessed) * 100 * 100) / 100
    },
    
    quality: {
      averageProcessingTime: avgProcessingTime,
      processingTimeScore: Math.max(0, 100 - ((avgProcessingTime - 30) * 2)), // Optimal: 30 days
      userSatisfaction: userFeedback.length > 0 
        ? userFeedback.reduce((sum, rating) => sum + rating, 0) / userFeedback.length
        : 0
    },
    
    productivity: {
      claimsPerDay: Math.round((completedClaims / 365) * 100) / 100,
      systemUtilization: Math.min(100, (totalProcessed / (totalProcessed * 1.2)) * 100),
      capacityUtilization: Math.round((totalProcessed / 20000) * 100 * 100) / 100 // Assume 20k capacity
    },
    
    overallScore: 0 // Will be calculated below
  };
  
  // Calculate overall performance score (weighted average)
  const weights = {
    throughput: 0.3,
    approval: 0.25,
    processingTime: 0.25,
    satisfaction: 0.2
  };
  
  metrics.overallScore = Math.round(
    (metrics.efficiency.throughputRate * weights.throughput +
     metrics.efficiency.approvalRate * weights.approval +
     metrics.quality.processingTimeScore * weights.processingTime +
     (metrics.quality.userSatisfaction * 20) * weights.satisfaction) * 100
  ) / 100;
  
  return metrics;
};

module.exports = {
  generateAdvancedReport,
  calculateTrends,
  performStatisticalAnalysis,
  exportData,
  calculatePerformanceMetrics,
  convertToCSV
};
