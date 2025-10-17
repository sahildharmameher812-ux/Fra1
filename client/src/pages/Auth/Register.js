import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>Registration</Typography>
        <Typography variant="body1" gutterBottom>
          Registration feature coming soon...
        </Typography>
        <Button component={Link} to="/login" variant="contained" color="primary">
          Back to Login
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
