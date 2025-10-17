import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const TestDashboard = () => {
  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* TEST - This should be visible */}
      <Card sx={{ mb: 4, p: 4, backgroundColor: '#fff', border: '3px solid red' }}>
        <Typography variant="h2" sx={{ color: 'red', textAlign: 'center', fontWeight: 800 }}>
          🚨 TEST SECTION - CHARTS INFO SHOULD BE HERE 🚨
        </Typography>
        <Typography variant="h4" sx={{ color: 'blue', textAlign: 'center', mt: 2 }}>
          This is a test to see if content renders properly
        </Typography>
      </Card>

      {/* Charts Information */}
      <Card sx={{ mb: 4, p: 4, backgroundColor: 'rgba(46, 125, 50, 0.1)', border: '3px solid #2E7D32' }}>
        <Typography variant="h3" sx={{ color: '#2E7D32', textAlign: 'center', fontWeight: 800, mb: 3 }}>
          📊 About Our Dashboard Charts
        </Typography>
        
        <Typography variant="h5" sx={{ color: '#1565C0', textAlign: 'center', mb: 4 }}>
          Our advanced analytics dashboard features 6 professional charts providing comprehensive insights into Forest Rights Atlas management.
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
          <Card sx={{ p: 3, backgroundColor: 'rgba(255, 112, 67, 0.1)', border: '2px solid #FF7043' }}>
            <Typography variant="h5" sx={{ color: '#FF7043', fontWeight: 700, mb: 2 }}>
              📈 Performance Analytics
            </Typography>
            <Typography variant="body1" sx={{ color: '#333' }}>
              Multi-layered area chart showing claims received vs processed over time with efficiency tracking.
            </Typography>
          </Card>
          
          <Card sx={{ p: 3, backgroundColor: 'rgba(21, 101, 192, 0.1)', border: '2px solid #1565C0' }}>
            <Typography variant="h5" sx={{ color: '#1565C0', fontWeight: 700, mb: 2 }}>
              🥧 AI Processing Pipeline  
            </Typography>
            <Typography variant="body1" sx={{ color: '#333' }}>
              Interactive doughnut chart showing AI processing time distribution across different stages.
            </Typography>
          </Card>
          
          <Card sx={{ p: 3, backgroundColor: 'rgba(46, 125, 50, 0.1)', border: '2px solid #2E7D32' }}>
            <Typography variant="h5" sx={{ color: '#2E7D32', fontWeight: 700, mb: 2 }}>
              🎯 System Performance
            </Typography>
            <Typography variant="body1" sx={{ color: '#333' }}>
              6-axis radar chart comparing current vs target performance across key metrics.
            </Typography>
          </Card>
        </Box>
      </Card>
      
      {/* Simple Statistics */}
      <Card sx={{ p: 4, backgroundColor: '#fff' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
          📊 Real-time System Overview
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ color: '#FF7043', fontWeight: 800 }}>47,892</Typography>
            <Typography>Total Claims</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ color: '#FF9800', fontWeight: 800 }}>12,847</Typography>
            <Typography>Pending</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ color: '#2E7D32', fontWeight: 800 }}>28,956</Typography>
            <Typography>Approved</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ color: '#1565C0', fontWeight: 800 }}>6,089</Typography>
            <Typography>Processing</Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default TestDashboard;