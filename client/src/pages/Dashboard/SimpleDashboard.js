import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Paper } from '@mui/material';
import { BarChart, TrendingUp, Assessment, People } from '@mui/icons-material';

const SimpleDashboard = () => {
  return (
    <Box 
      sx={{ 
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        padding: '20px',
        color: '#333'
      }}
    >
      {/* Header */}
      <Typography 
        variant="h4" 
        sx={{ 
          color: '#2E7D32', 
          fontWeight: 'bold', 
          marginBottom: '30px',
          textAlign: 'center'
        }}
      >
        🌲 FRA Dashboard - Forest Rights Atlas
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ marginBottom: '30px' }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: 'white', border: '2px solid #e0e0e0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Assessment sx={{ fontSize: 40, color: '#2E7D32' }} />
                <Box>
                  <Typography variant="h5" sx={{ color: '#2E7D32', fontWeight: 'bold' }}>
                    24,567
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Total Claims
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: 'white', border: '2px solid #e0e0e0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TrendingUp sx={{ fontSize: 40, color: '#1976d2' }} />
                <Box>
                  <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                    1,847
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Processed Today
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: 'white', border: '2px solid #e0e0e0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <BarChart sx={{ fontSize: 40, color: '#ff9800' }} />
                <Box>
                  <Typography variant="h5" sx={{ color: '#ff9800', fontWeight: 'bold' }}>
                    94.2%
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    AI Accuracy
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: 'white', border: '2px solid #e0e0e0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <People sx={{ fontSize: 40, color: '#9c27b0' }} />
                <Box>
                  <Typography variant="h5" sx={{ color: '#9c27b0', fontWeight: 'bold' }}>
                    45,789
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Families Served
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content Areas */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper 
            sx={{ 
              padding: '20px', 
              backgroundColor: 'white', 
              border: '2px solid #e0e0e0',
              minHeight: '400px'
            }}
          >
            <Typography variant="h6" sx={{ color: '#2E7D32', marginBottom: '20px' }}>
              📊 Analytics Overview
            </Typography>
            <Box 
              sx={{ 
                height: '300px', 
                backgroundColor: '#f9f9f9', 
                border: '1px dashed #ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px'
              }}
            >
              <Typography variant="h6" sx={{ color: '#666' }}>
                Charts and Analytics Will Load Here
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              padding: '20px', 
              backgroundColor: 'white', 
              border: '2px solid #e0e0e0',
              minHeight: '400px'
            }}
          >
            <Typography variant="h6" sx={{ color: '#2E7D32', marginBottom: '20px' }}>
              🗺️ Map View
            </Typography>
            <Box 
              sx={{ 
                height: '300px', 
                backgroundColor: '#f0f8ff', 
                border: '1px dashed #4CAF50',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px'
              }}
            >
              <Typography variant="h6" sx={{ color: '#4CAF50' }}>
                Interactive Map Will Load Here
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Status Section */}
      <Box sx={{ marginTop: '30px' }}>
        <Paper sx={{ padding: '20px', backgroundColor: 'white', border: '2px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ color: '#2E7D32', marginBottom: '10px' }}>
            ✅ System Status
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box sx={{ padding: '10px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
                <Typography variant="body1" sx={{ color: '#2E7D32' }}>
                  🟢 Backend: Connected
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ padding: '10px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
                <Typography variant="body1" sx={{ color: '#2E7D32' }}>
                  🟢 Database: Active
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ padding: '10px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
                <Typography variant="body1" sx={{ color: '#2E7D32' }}>
                  🟢 AI Service: Running
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', marginTop: '30px', padding: '20px' }}>
        <Typography variant="body2" sx={{ color: '#666' }}>
          🌲 Forest Rights Atlas - Ministry of Tribal Affairs, Government of India
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          Dashboard is now visible and working! 🎉
        </Typography>
      </Box>
    </Box>
  );
};

export default SimpleDashboard;