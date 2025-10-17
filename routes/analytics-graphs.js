const express = require('express');
const router = express.Router();

// Simple auth middleware
const simpleAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });
  next();
};

// Advanced Chart Data Generation
const generateChartData = (chartType, filters = {}) => {
  const { timeframe = '12m', state, district, status } = filters;
  
  switch (chartType) {
    case 'claim-timeline':
      return {
        type: 'line',
        title: 'FRA Claims Timeline Analysis',
        subtitle: 'Monthly claim submissions and approvals (2023-2024)',
        data: [
          { month: 'Jan 2023', submitted: 1234, approved: 890, rejected: 78, pending: 266 },
          { month: 'Feb 2023', submitted: 1456, approved: 1023, rejected: 89, pending: 344 },
          { month: 'Mar 2023', submitted: 1678, approved: 1156, rejected: 102, pending: 420 },
          { month: 'Apr 2023', submitted: 1345, approved: 945, rejected: 67, pending: 333 },
          { month: 'May 2023', submitted: 1567, approved: 1098, rejected: 98, pending: 371 },
          { month: 'Jun 2023', submitted: 1789, approved: 1234, rejected: 123, pending: 432 },
          { month: 'Jul 2023', submitted: 1923, approved: 1345, rejected: 134, pending: 444 },
          { month: 'Aug 2023', submitted: 1654, approved: 1198, rejected: 98, pending: 358 },
          { month: 'Sep 2023', submitted: 1876, approved: 1323, rejected: 145, pending: 408 },
          { month: 'Oct 2023', submitted: 2034, approved: 1456, rejected: 156, pending: 422 },
          { month: 'Nov 2023', submitted: 1789, approved: 1289, rejected: 123, pending: 377 },
          { month: 'Dec 2023', submitted: 1567, approved: 1134, rejected: 98, pending: 335 },
          { month: 'Jan 2024', submitted: 1890, approved: 1378, rejected: 112, pending: 400 },
          { month: 'Feb 2024', submitted: 2156, approved: 1567, rejected: 134, pending: 455 },
          { month: 'Mar 2024', submitted: 2345, approved: 1689, rejected: 156, pending: 500 }
        ],
        xAxis: 'month',
        yAxis: ['submitted', 'approved', 'rejected', 'pending'],
        colors: ['#3B82F6', '#10B981', '#EF4444', '#F59E0B'],
        insights: [
          'Steady increase in claim submissions over time',
          'Approval rate improved from 72% to 78% year-over-year',
          'Peak submission months: March, October',
          'Processing efficiency increased by 15% in 2024'
        ]
      };

    case 'state-performance':
      return {
        type: 'bar',
        title: 'State-wise FRA Performance Analysis',
        subtitle: 'Claims processed, approval rates, and efficiency metrics by state',
        data: [
          {
            state: 'Madhya Pradesh',
            claims: 6789,
            approved: 4567,
            pending: 1456,
            rejected: 766,
            approvalRate: 67.3,
            efficiency: 94.2,
            avgProcessingTime: 45.2,
            area: 245670.5,
            tribalPop: 1234567
          },
          {
            state: 'Tripura',
            claims: 4567,
            approved: 3456,
            pending: 892,
            rejected: 219,
            approvalRate: 75.7,
            efficiency: 89.7,
            avgProcessingTime: 38.7,
            area: 156789.3,
            tribalPop: 567890
          },
          {
            state: 'Odisha',
            claims: 2789,
            approved: 2123,
            pending: 456,
            rejected: 210,
            approvalRate: 76.1,
            efficiency: 92.8,
            avgProcessingTime: 52.1,
            area: 98765.2,
            tribalPop: 890123
          },
          {
            state: 'Telangana',
            claims: 1533,
            approved: 1088,
            pending: 321,
            rejected: 124,
            approvalRate: 71.0,
            efficiency: 87.3,
            avgProcessingTime: 41.8,
            area: 67890.1,
            tribalPop: 345678
          }
        ],
        xAxis: 'state',
        yAxis: ['claims', 'approved', 'approvalRate', 'efficiency'],
        colors: ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'],
        insights: [
          'Tripura leads in approval rate (75.7%)',
          'Madhya Pradesh handles largest volume (6,789 claims)',
          'Odisha shows best efficiency (92.8%)',
          'Average processing time varies from 38-52 days across states'
        ]
      };

    case 'processing-funnel':
      return {
        type: 'funnel',
        title: 'FRA Claim Processing Funnel',
        subtitle: 'Journey from application submission to title distribution',
        data: [
          { stage: 'Applications Submitted', count: 15678, percentage: 100, color: '#3B82F6' },
          { stage: 'Initial Review Passed', count: 14234, percentage: 90.8, color: '#10B981' },
          { stage: 'Document Verification', count: 13456, percentage: 85.8, color: '#8B5CF6' },
          { stage: 'Field Survey Completed', count: 12789, percentage: 81.6, color: '#F59E0B' },
          { stage: 'Committee Approved', count: 11234, percentage: 71.6, color: '#06B6D4' },
          { stage: 'Titles Issued', count: 10567, percentage: 67.4, color: '#10B981' },
          { stage: 'Rights Exercised', count: 9823, percentage: 62.7, color: '#22C55E' }
        ],
        insights: [
          'Overall completion rate: 62.7%',
          'Major drop-off at committee review stage (10%)',
          'Field survey completion rate: 95.1%',
          'Title issuance efficiency: 94.1%'
        ]
      };

    case 'land-use-analysis':
      return {
        type: 'pie',
        title: 'Forest Land Use Classification',
        subtitle: 'Distribution of recognized forest land types under FRA',
        data: [
          { category: 'Dense Forest', area: 456789, percentage: 45.2, color: '#059669', claims: 5678 },
          { category: 'Open Forest', area: 234567, percentage: 23.2, color: '#10B981', claims: 3456 },
          { category: 'Degraded Forest', area: 123456, percentage: 12.2, color: '#34D399', claims: 1234 },
          { category: 'Grassland', area: 98765, percentage: 9.8, color: '#6EE7B7', claims: 987 },
          { category: 'Scrubland', area: 67890, percentage: 6.7, color: '#A7F3D0', claims: 678 },
          { category: 'Water Bodies', area: 23456, percentage: 2.3, color: '#3B82F6', claims: 234 },
          { category: 'Other', area: 6543, percentage: 0.6, color: '#9CA3AF', claims: 65 }
        ],
        total_area: 1011466, // hectares
        total_claims: 12332,
        insights: [
          'Dense forest constitutes 45.2% of recognized land',
          'Combined forest categories: 80.6% of total area',
          'Grassland and scrubland suitable for grazing: 16.5%',
          'Average claim size: 2.1 hectares per beneficiary'
        ]
      };

    case 'tribal-demographics':
      return {
        type: 'stacked-bar',
        title: 'Tribal Demographic Analysis',
        subtitle: 'FRA beneficiaries by tribal groups and claim types',
        data: [
          {
            tribe: 'Gond',
            population: 567890,
            individual_claims: 2345,
            community_claims: 234,
            area_recognized: 45678,
            avg_family_size: 4.2
          },
          {
            tribe: 'Bhil',
            population: 345678,
            individual_claims: 1567,
            community_claims: 156,
            area_recognized: 34567,
            avg_family_size: 3.8
          },
          {
            tribe: 'Santhal',
            population: 234567,
            individual_claims: 1234,
            community_claims: 123,
            area_recognized: 23456,
            avg_family_size: 4.5
          },
          {
            tribe: 'Munda',
            population: 123456,
            individual_claims: 789,
            community_claims: 78,
            area_recognized: 12345,
            avg_family_size: 3.9
          },
          {
            tribe: 'Oraon',
            population: 98765,
            individual_claims: 567,
            community_claims: 56,
            area_recognized: 9876,
            avg_family_size: 4.1
          }
        ],
        xAxis: 'tribe',
        yAxis: ['individual_claims', 'community_claims'],
        colors: ['#3B82F6', '#10B981'],
        insights: [
          'Gond tribe has highest claim volume (2,345 individual)',
          'Community claims constitute 12% of total claims',
          'Average land per family: 2.3 hectares',
          'Santhal tribe shows highest average family size (4.5)'
        ]
      };

    case 'processing-time-heatmap':
      return {
        type: 'heatmap',
        title: 'Processing Time Heatmap',
        subtitle: 'Average processing days by state and claim type',
        data: [
          { state: 'Madhya Pradesh', individual: 42, community: 67, cfr: 89, other: 34 },
          { state: 'Tripura', individual: 36, community: 58, cfr: 72, other: 28 },
          { state: 'Odisha', individual: 48, community: 71, cfr: 95, other: 38 },
          { state: 'Telangana', individual: 39, community: 62, cfr: 78, other: 31 }
        ],
        xAxis: ['individual', 'community', 'cfr', 'other'],
        yAxis: ['Madhya Pradesh', 'Tripura', 'Odisha', 'Telangana'],
        colorScale: {
          min: 28,
          max: 95,
          colors: ['#10B981', '#F59E0B', '#EF4444']
        },
        insights: [
          'Community Forest Rights take longest to process',
          'Tripura shows fastest processing across all categories',
          'Individual claims processed fastest (28-48 days)',
          'Significant variation in CFR processing (72-95 days)'
        ]
      };

    case 'satellite-analysis-trends':
      return {
        type: 'area',
        title: 'Satellite-based Forest Cover Trends',
        subtitle: 'NDVI and forest cover changes in FRA areas (2020-2024)',
        data: [
          { year: 2020, ndvi: 0.72, forest_cover: 78.5, degraded_area: 15.2, improved_area: 6.3 },
          { year: 2021, ndvi: 0.74, forest_cover: 79.1, degraded_area: 14.8, improved_area: 6.1 },
          { year: 2022, ndvi: 0.76, forest_cover: 79.8, degraded_area: 14.2, improved_area: 6.0 },
          { year: 2023, ndvi: 0.78, forest_cover: 80.5, degraded_area: 13.5, improved_area: 6.0 },
          { year: 2024, ndvi: 0.79, forest_cover: 81.2, degraded_area: 12.8, improved_area: 6.0 }
        ],
        xAxis: 'year',
        yAxis: ['ndvi', 'forest_cover', 'degraded_area'],
        colors: ['#10B981', '#059669', '#F59E0B'],
        insights: [
          'Consistent NDVI improvement: 0.72 to 0.79',
          'Forest cover increased by 2.7% over 4 years',
          'Degraded area reduced by 15.8%',
          'Community conservation efforts showing positive impact'
        ]
      };

    case 'economic-impact':
      return {
        type: 'multi-line',
        title: 'Economic Impact of FRA Implementation',
        subtitle: 'Income improvement and livelihood changes post-FRA recognition',
        data: [
          { year: 2019, avg_income: 25000, forest_income: 8500, agriculture_income: 12000, other_income: 4500 },
          { year: 2020, avg_income: 27500, forest_income: 9200, agriculture_income: 13000, other_income: 5300 },
          { year: 2021, avg_income: 31200, forest_income: 10800, agriculture_income: 14500, other_income: 5900 },
          { year: 2022, avg_income: 34800, forest_income: 12200, agriculture_income: 15800, other_income: 6800 },
          { year: 2023, avg_income: 38500, forest_income: 13800, agriculture_income: 17200, other_income: 7500 },
          { year: 2024, avg_income: 42300, forest_income: 15500, agriculture_income: 18900, other_income: 7900 }
        ],
        xAxis: 'year',
        yAxis: ['avg_income', 'forest_income', 'agriculture_income', 'other_income'],
        colors: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
        insights: [
          'Average income increased by 69% (2019-2024)',
          'Forest-based income grew by 82%',
          'Agriculture income improved by 57%',
          'Economic security significantly enhanced'
        ]
      };

    case 'gender-analysis':
      return {
        type: 'donut',
        title: 'Gender Distribution in FRA Claims',
        subtitle: 'Analysis of women\'s participation in forest rights recognition',
        data: [
          { category: 'Male Claimants', count: 8965, percentage: 57.2, color: '#3B82F6' },
          { category: 'Female Claimants', count: 4567, percentage: 29.1, color: '#EC4899' },
          { category: 'Joint Claims', count: 2146, percentage: 13.7, color: '#10B981' }
        ],
        additional_metrics: {
          women_committee_members: 3456,
          women_leaders: 234,
          women_sarpanch: 89,
          joint_pattas: 2146
        },
        insights: [
          'Women\'s direct participation: 29.1%',
          'Joint claims (couples): 13.7%',
          'Total women involvement: 42.8%',
          'Need to increase women\'s direct participation'
        ]
      };

    case 'document-digitization':
      return {
        type: 'progress',
        title: 'Historical Document Digitization Progress',
        subtitle: 'Converting paper records to digital format (2006-2024)',
        data: {
          categories: [
            { name: 'Legal Framework', total: 15, digitized: 15, progress: 100, quality: 'High' },
            { name: 'State Documents', total: 67, digitized: 58, progress: 86.6, quality: 'High' },
            { name: 'Survey Records', total: 34, digitized: 28, progress: 82.4, quality: 'Medium' },
            { name: 'Court Judgments', total: 23, digitized: 21, progress: 91.3, quality: 'High' },
            { name: 'Government Orders', total: 12, digitized: 11, progress: 91.7, quality: 'High' },
            { name: 'Research Studies', total: 5, digitized: 5, progress: 100, quality: 'High' }
          ],
          overall: {
            total_documents: 156,
            digitized: 138,
            progress: 88.5,
            pages_scanned: 45678,
            ocr_processed: 39456,
            quality_verified: 34567
          }
        },
        insights: [
          'Overall digitization progress: 88.5%',
          '45,678 pages scanned and processed',
          'Legal framework 100% digitized',
          'Survey records need quality improvement'
        ]
      };

    default:
      return {
        type: 'error',
        message: 'Unknown chart type requested'
      };
  }
};

// Advanced Analytics Dashboard
router.get('/advanced-dashboard', simpleAuth, async (req, res) => {
  try {
    const { timeframe = '12m' } = req.query;
    
    const dashboardData = {
      summary: {
        total_claims: 15678,
        processing_rate: 89.4,
        avg_approval_time: 44.2,
        system_efficiency: 92.3,
        document_digitization: 88.5,
        beneficiary_satisfaction: 4.2
      },
      
      charts: [
        {
          id: 'claim-timeline',
          title: 'Claims Timeline',
          type: 'line',
          size: 'large',
          data: generateChartData('claim-timeline', { timeframe })
        },
        {
          id: 'state-performance',
          title: 'State Performance',
          type: 'bar',
          size: 'large',
          data: generateChartData('state-performance', { timeframe })
        },
        {
          id: 'processing-funnel',
          title: 'Processing Funnel',
          type: 'funnel',
          size: 'medium',
          data: generateChartData('processing-funnel', { timeframe })
        },
        {
          id: 'land-use-analysis',
          title: 'Land Use Distribution',
          type: 'pie',
          size: 'medium',
          data: generateChartData('land-use-analysis', { timeframe })
        }
      ],
      
      kpis: [
        { label: 'Claims Processed', value: '15,678', change: '+12.5%', trend: 'up' },
        { label: 'Approval Rate', value: '71.6%', change: '+2.3%', trend: 'up' },
        { label: 'Avg Processing Time', value: '44.2 days', change: '-8.5%', trend: 'down' },
        { label: 'Digital Documents', value: '88.5%', change: '+15.2%', trend: 'up' }
      ],
      
      alerts: [
        {
          type: 'warning',
          message: 'Processing time in Odisha above average (52.1 days)',
          action: 'Review resource allocation'
        },
        {
          type: 'success',
          message: 'Tripura achieved 75.7% approval rate',
          action: 'Study best practices for replication'
        },
        {
          type: 'info',
          message: '18 historical documents pending digitization',
          action: 'Schedule scanning and OCR processing'
        }
      ]
    };
    
    res.json(dashboardData);
  } catch (error) {
    console.error('Advanced dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Individual chart endpoints
router.get('/charts/:chartType', simpleAuth, async (req, res) => {
  try {
    const { chartType } = req.params;
    const filters = req.query;
    
    const chartData = generateChartData(chartType, filters);
    
    if (chartData.type === 'error') {
      return res.status(400).json(chartData);
    }
    
    res.json({
      chart: chartData,
      generated_at: new Date().toISOString(),
      filters_applied: filters
    });
  } catch (error) {
    console.error('Chart generation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Interactive analytics endpoint
router.post('/interactive-analysis', simpleAuth, async (req, res) => {
  try {
    const {
      analysis_type,
      parameters,
      filters = {}
    } = req.body;
    
    let analysisResult = {};
    
    switch (analysis_type) {
      case 'correlation_analysis':
        analysisResult = {
          type: 'correlation',
          title: 'Correlation Analysis: Processing Time vs Approval Rate',
          correlations: [
            { variables: ['processing_time', 'approval_rate'], coefficient: -0.23, significance: 0.05 },
            { variables: ['forest_cover', 'claim_success'], coefficient: 0.67, significance: 0.01 },
            { variables: ['document_quality', 'processing_speed'], coefficient: 0.45, significance: 0.02 },
            { variables: ['tribal_population', 'claim_volume'], coefficient: 0.89, significance: 0.001 }
          ],
          insights: [
            'Higher forest cover areas show 67% correlation with claim success',
            'Document quality significantly impacts processing speed',
            'Tribal population density strongly predicts claim volume'
          ]
        };
        break;
        
      case 'predictive_modeling':
        analysisResult = {
          type: 'prediction',
          title: 'Predictive Model: Claim Approval Probability',
          model: {
            algorithm: 'Random Forest',
            accuracy: 0.87,
            features: [
              { name: 'document_completeness', importance: 0.34 },
              { name: 'forest_cover_percentage', importance: 0.28 },
              { name: 'community_support', importance: 0.22 },
              { name: 'historical_occupation', importance: 0.16 }
            ]
          },
          predictions: [
            { claim_id: 'PRED_001', probability: 0.89, risk_factors: [] },
            { claim_id: 'PRED_002', probability: 0.65, risk_factors: ['incomplete_survey'] },
            { claim_id: 'PRED_003', probability: 0.92, risk_factors: [] }
          ]
        };
        break;
        
      case 'anomaly_detection':
        analysisResult = {
          type: 'anomaly',
          title: 'Anomaly Detection in FRA Processing',
          anomalies: [
            {
              type: 'processing_delay',
              description: 'Unusual delay in field survey completion',
              affected_claims: 23,
              severity: 'medium',
              location: 'Bhopal District'
            },
            {
              type: 'approval_rate_drop',
              description: 'Sudden drop in approval rate',
              affected_claims: 12,
              severity: 'high',
              location: 'Tripura East'
            }
          ],
          recommendations: [
            'Investigate field survey bottlenecks in Bhopal',
            'Review committee decisions in Tripura East',
            'Increase monitoring of processing times'
          ]
        };
        break;
        
      default:
        return res.status(400).json({ message: 'Invalid analysis type' });
    }
    
    res.json({
      analysis: analysisResult,
      parameters,
      filters,
      generated_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('Interactive analysis error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Export chart data
router.get('/export/:chartType/:format', simpleAuth, async (req, res) => {
  try {
    const { chartType, format } = req.params;
    const filters = req.query;
    
    const chartData = generateChartData(chartType, filters);
    
    if (chartData.type === 'error') {
      return res.status(400).json(chartData);
    }
    
    const exportData = {
      chart_type: chartType,
      format: format,
      data: chartData.data,
      metadata: {
        title: chartData.title,
        subtitle: chartData.subtitle,
        generated_at: new Date().toISOString(),
        filters: filters
      }
    };
    
    switch (format.toLowerCase()) {
      case 'json':
        res.json(exportData);
        break;
      case 'csv':
        // Convert to CSV format (simplified)
        const csvData = convertToCSV(chartData.data);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=${chartType}_data.csv`);
        res.send(csvData);
        break;
      default:
        res.status(400).json({ message: 'Unsupported export format' });
    }
  } catch (error) {
    console.error('Chart export error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to convert data to CSV
function convertToCSV(data) {
  if (!Array.isArray(data) || data.length === 0) return '';
  
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
}

module.exports = router;
