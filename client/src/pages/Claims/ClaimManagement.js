import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function ClaimManagement() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)', color: 'white' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          ⚖️ Claim Management
        </Typography>
      </Paper>
      <Typography variant="h6">FRA Claim Management System Coming Soon...</Typography>
    </Box>
  );
}
