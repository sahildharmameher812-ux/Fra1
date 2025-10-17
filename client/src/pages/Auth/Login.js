import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { Forest, AccountBalance, Security, Language } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast.success(`Welcome back, ${result.user.name}!`);
        navigate('/dashboard');
      } else {
        setError(result.error);
        toast.error(result.error);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role) => {
    setLoading(true);
    const demoAccounts = {
      admin: { email: 'admin@fra.gov.in', password: 'demo123' },
      officer: { email: 'officer@fra.gov.in', password: 'demo123' },
      beneficiary: { email: 'beneficiary@fra.gov.in', password: 'demo123' }
    };

    try {
      const result = await login(demoAccounts[role].email, demoAccounts[role].password);
      if (result.success) {
        toast.success(`Logged in as ${role}`);
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error('Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #4CAF50 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Welcome Content */}
          <Grid item xs={12} md={6}>
            <Box sx={{ color: 'white', pr: { md: 4 } }}>
              <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
                <Forest sx={{ fontSize: 60, mr: 2 }} />
                <Box>
                  <Typography variant="h3" fontWeight="bold">
                    FRA Atlas
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    Forest Rights Act Implementation Portal
                  </Typography>
                </Box>
              </Box>
              
              <Typography variant="h5" gutterBottom>
                Welcome to the AI-Powered WebGIS Decision Support System
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
                Monitor and manage Forest Rights Act implementation across Madhya Pradesh, 
                Tripura, Odisha, and Telangana with cutting-edge satellite imagery analysis, 
                AI-powered document processing, and comprehensive scheme integration.
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center" sx={{ p: 2 }}>
                    <AccountBalance sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6">15,678+</Typography>
                    <Typography variant="caption">Claims Processed</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center" sx={{ p: 2 }}>
                    <Forest sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6">245,678</Typography>
                    <Typography variant="caption">Hectares Mapped</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center" sx={{ p: 2 }}>
                    <Security sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6">94.2%</Typography>
                    <Typography variant="caption">AI Accuracy</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Right Side - Login Form */}
          <Grid item xs={12} md={6}>
            <Card elevation={8} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                {/* Government Header */}
                <Box textAlign="center" sx={{ mb: 4 }}>
                  <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                    Secure Login
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Ministry of Tribal Affairs, Government of India
                  </Typography>
                  <Divider sx={{ mt: 2 }} />
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    sx={{ mb: 3 }}
                    variant="outlined"
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    sx={{ mb: 3 }}
                    variant="outlined"
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ 
                      mb: 3, 
                      py: 1.5,
                      background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)'
                      }
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                  </Button>
                </form>

                <Divider sx={{ mb: 3 }}>
                  <Typography variant="caption" color="textSecondary">
                    🚀 Quick Demo Access - Click to Login
                  </Typography>
                </Divider>

                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      onClick={() => handleDemoLogin('admin')}
                      disabled={loading}
                      sx={{ 
                        bgcolor: '#d32f2f',
                        '&:hover': { bgcolor: '#b71c1c' },
                        textTransform: 'none',
                        fontWeight: 600
                      }}
                    >
                      👤 Admin Demo
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      onClick={() => handleDemoLogin('officer')}
                      disabled={loading}
                      sx={{ 
                        bgcolor: '#1976d2',
                        '&:hover': { bgcolor: '#0d47a1' },
                        textTransform: 'none',
                        fontWeight: 600
                      }}
                    >
                      🏛️ Officer Demo
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      onClick={() => handleDemoLogin('beneficiary')}
                      disabled={loading}
                      sx={{ 
                        bgcolor: '#388e3c',
                        '&:hover': { bgcolor: '#2e7d32' },
                        textTransform: 'none',
                        fontWeight: 600
                      }}
                    >
                      👨‍🌾 User Demo
                    </Button>
                  </Grid>
                </Grid>
                
                <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
                  <Typography variant="caption">
                    <strong>Demo Credentials:</strong> Click any button above for instant access to different user roles.
                    All features are fully functional with realistic SIH 2024 demo data.
                  </Typography>
                </Alert>

                <Box textAlign="center" sx={{ mt: 3 }}>
                  <Typography variant="body2" color="textSecondary">
                    Don't have an account?{' '}
                    <Link 
                      to="/register" 
                      style={{ 
                        color: '#2E7D32', 
                        textDecoration: 'none',
                        fontWeight: 500
                      }}
                    >
                      Register here
                    </Link>
                  </Typography>
                </Box>

                <Box textAlign="center" sx={{ mt: 3, pt: 2, borderTop: '1px solid #e0e0e0' }}>
                  <Typography variant="caption" color="textSecondary">
                    🔒 Secured by Government of India | Digital India Initiative
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
