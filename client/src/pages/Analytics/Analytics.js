import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';

const Analytics = () => {
  return (
    <Box sx={{ p: 3 }}>
      <div className="slide-in-down">
        <Paper elevation={3} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)', color: 'white' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            📈 Advanced Analytics
          </Typography>
          <Typography variant="subtitle1">
            Comprehensive analytics and insights for FRA implementation
          </Typography>
        </Paper>
      </div>
      
      <div className="fade-in delay-1">
        <Typography variant="h6" sx={{ mb: 3 }}>Advanced Analytics Dashboard Coming Soon...</Typography>
      </div>
      
      {/* Sample Analytics Cards with smooth transitions */}
      <div className="slide-in-up delay-2">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <div className="scale-in delay-1">
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    📊 Data Insights
                  </Typography>
                  <Typography variant="body1">
                    AI-powered analytics engine processing real-time FRA data
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <div className="scale-in delay-2">
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    🎯 Predictive Models
                  </Typography>
                  <Typography variant="body1">
                    Machine learning algorithms for claim approval predictions
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <div className="scale-in delay-3">
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    🗺️ Spatial Analysis
                  </Typography>
                  <Typography variant="body1">
                    Geographic information system for land pattern analysis
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default Analytics;
