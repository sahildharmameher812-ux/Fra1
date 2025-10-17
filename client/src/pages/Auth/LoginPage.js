import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  CircularProgress,
  Fade,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  LockOutlined,
  Visibility,
  VisibilityOff,
  PersonAdd,
  Security,
  AccountBalance,
  Forest,
  AdminPanelSettings,
  Work,
  Groups,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { governmentColors } from '../../theme/governmentTheme';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, authError, demoUsers } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('🚀 Attempting login and navigation...');
      await login(credentials.email, credentials.password);
      console.log('✅ Login successful, navigating to home...');
      // Navigate to homepage after successful login
      navigate('/');
    } catch (error) {
      console.log('❌ Login failed:', error);
      // Error handling is done in the auth context
    }
  };

  const handleDemoLogin = async (email) => {
    console.log('📋 Demo login clicked for:', email);
    setCredentials({
      email: email,
      password: 'demo123'
    });
    setSelectedDemo(email);
    
    // Automatically login with demo account
    try {
      await login(email, 'demo123');
      console.log('✅ Demo login successful, navigating to home...');
      navigate('/');
    } catch (error) {
      console.log('❌ Demo login failed:', error);
    }
  };

  const demoAccounts = [
    {
      email: 'admin@fra.gov.in',
      role: 'System Administrator',
      icon: <AdminPanelSettings />,
      color: governmentColors.primaryBlue,
      description: 'Full system access & management',
      features: ['System Management', 'All Reports', 'User Management', 'Analytics']
    },
    {
      email: 'officer@fra.gov.in',
      role: 'Forest Rights Officer',
      icon: <Work />,
      color: governmentColors.success,
      description: 'Review & approve claims',
      features: ['Claim Review', 'Approval Rights', 'State Reports', 'Field Management']
    },
    {
      email: 'user@fra.gov.in',
      role: 'Community Representative',
      icon: <Groups />,
      color: governmentColors.saffron,
      description: 'Submit & track claims',
      features: ['Submit Claims', 'Track Status', 'Community Portal', 'Document Upload']
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, 
          ${governmentColors.primaryBlue} 0%, 
          ${governmentColors.saffron} 35%, 
          ${governmentColors.primaryGreen} 70%, 
          ${governmentColors.navy} 100%)`,
        display: 'flex',
        alignItems: 'center',
        py: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
          `,
          animation: 'float 15s ease-in-out infinite',
        }}
      />

      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            {/* Left Side - Branding & Information */}
            <Grid item xs={12} lg={6}>
              <motion.div variants={itemVariants}>
                <Box sx={{ textAlign: { xs: 'center', lg: 'left' }, mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: { xs: 'center', lg: 'flex-start' } }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: governmentColors.white,
                        color: governmentColors.primaryBlue,
                        mr: 3,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                      }}
                    >
                      <Forest sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          color: governmentColors.white,
                          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                          mb: 1,
                        }}
                      >
                        FRA Atlas
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          color: governmentColors.white,
                          opacity: 0.9,
                          fontWeight: 500,
                        }}
                      >
                        Forest Rights Act Portal
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      color: governmentColors.white,
                      mb: 3,
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    AI-Powered WebGIS Decision Support System
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: governmentColors.white,
                      opacity: 0.9,
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                      mb: 4,
                      maxWidth: 600,
                    }}
                  >
                    Secure access to comprehensive forest rights management across 
                    Madhya Pradesh, Tripura, Odisha, and Telangana with advanced 
                    satellite imagery and AI-powered analytics.
                  </Typography>

                  {/* Features List */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: { xs: 'center', lg: 'flex-start' } }}>
                    {['Satellite Monitoring', 'AI Analytics', 'Claim Management', 'Real-time Reports'].map((feature, index) => (
                      <Chip
                        key={index}
                        label={feature}
                        sx={{
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          color: governmentColors.white,
                          fontWeight: 600,
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            {/* Right Side - Login Form */}
            <Grid item xs={12} lg={6}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    maxWidth: 500,
                    mx: 'auto',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 4,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {/* Login Header */}
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor: governmentColors.primaryBlue,
                        mx: 'auto',
                        mb: 2,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                      }}
                    >
                      <LockOutlined sx={{ fontSize: 30 }} />
                    </Avatar>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: governmentColors.navy,
                        mb: 1,
                      }}
                    >
                      Secure Login
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: governmentColors.grey[600],
                        fontSize: '1rem',
                      }}
                    >
                      Access your FRA Atlas dashboard
                    </Typography>
                  </Box>

                  {/* Error Alert */}
                  {authError && (
                    <Fade in={true}>
                      <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                        {authError}
                      </Alert>
                    </Fade>
                  )}

                  {/* Login Form */}
                  <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
                    <TextField
                      fullWidth
                      name="email"
                      label="Email Address"
                      type="email"
                      value={credentials.email}
                      onChange={handleInputChange}
                      variant="outlined"
                      margin="normal"
                      required
                      sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonAdd color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      value={credentials.password}
                      onChange={handleInputChange}
                      variant="outlined"
                      margin="normal"
                      required
                      sx={{
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Security color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={loading}
                      sx={{
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        borderRadius: 2,
                        bgcolor: governmentColors.primaryBlue,
                        boxShadow: '0 4px 20px rgba(21, 101, 192, 0.4)',
                        '&:hover': {
                          bgcolor: governmentColors.navy,
                          boxShadow: '0 6px 25px rgba(21, 101, 192, 0.6)',
                        },
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </Box>

                  {/* Demo Accounts Section */}
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: governmentColors.navy,
                        mb: 2,
                        textAlign: 'center',
                      }}
                    >
                      🎯 Try Demo Accounts
                    </Typography>

                    <Grid container spacing={2}>
                      {demoAccounts.map((account, index) => (
                        <Grid item xs={12} key={account.email}>
                          <Card
                            sx={{
                              cursor: 'pointer',
                              border: selectedDemo === account.email 
                                ? `2px solid ${account.color}` 
                                : '1px solid rgba(0,0,0,0.1)',
                              borderRadius: 2,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: `0 8px 25px ${account.color}20`,
                                border: `2px solid ${account.color}`,
                              },
                            }}
                            onClick={() => handleDemoLogin(account.email)}
                          >
                            <CardContent sx={{ p: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Avatar
                                  sx={{
                                    bgcolor: `${account.color}15`,
                                    color: account.color,
                                    mr: 2,
                                    width: 40,
                                    height: 40,
                                  }}
                                >
                                  {account.icon}
                                </Avatar>
                                <Box sx={{ flexGrow: 1 }}>
                                  <Typography
                                    variant="subtitle1"
                                    sx={{
                                      fontWeight: 700,
                                      color: governmentColors.navy,
                                      fontSize: '0.95rem',
                                    }}
                                  >
                                    {account.role}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: governmentColors.grey[600],
                                      fontSize: '0.85rem',
                                    }}
                                  >
                                    {account.description}
                                  </Typography>
                                </Box>
                                <Chip
                                  label="demo123"
                                  size="small"
                                  sx={{
                                    bgcolor: `${account.color}20`,
                                    color: account.color,
                                    fontWeight: 600,
                                    fontSize: '0.75rem',
                                  }}
                                />
                              </Box>
                              
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                                {account.features.slice(0, 2).map((feature, idx) => (
                                  <Chip
                                    key={idx}
                                    label={feature}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                      fontSize: '0.7rem',
                                      height: 20,
                                      borderColor: account.color,
                                      color: account.color,
                                    }}
                                  />
                                ))}
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>

                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: governmentColors.grey[500],
                          fontSize: '0.9rem',
                        }}
                      >
                        🔐 All demo accounts use password: <strong>demo123</strong>
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LoginPage;