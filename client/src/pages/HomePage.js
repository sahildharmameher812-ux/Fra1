import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  LinearProgress,
  Paper,
} from '@mui/material';
import {
  Dashboard,
  Map,
  Assessment,
  CloudUpload,
  Settings,
  ArrowForward,
  CheckCircle,
  PendingActions,
  Forest,
  Home,
  Groups,
  PlayArrow,
  TrendingUp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { governmentColors } from '../theme/governmentTheme';
import IndiaMap from '../components/IndiaMap';
import { useLanguage } from '../context/LanguageContext';
import { formatNumberWithCommas, formatPercentage } from '../utils/numberFormatter';
import '../styles/animations.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLanguage();
  const [stats, setStats] = useState({
    totalClaims: 0,
    approvedClaims: 0,
    pendingClaims: 0,
    forestCoverArea: 0,
  });

  // Animation refs and controls
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const dashboardRef = useRef(null);
  const featuresRef = useRef(null);
  
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const isDashboardInView = useInView(dashboardRef, { once: true, amount: 0.2 });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.2 });

  const heroControls = useAnimation();
  const statsControls = useAnimation();
  const dashboardControls = useAnimation();
  const featuresControls = useAnimation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300
      }
    }
  };

  const statsCardVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  // Animation effects
  useEffect(() => {
    if (isHeroInView) {
      heroControls.start("visible");
    }
  }, [heroControls, isHeroInView]);

  useEffect(() => {
    if (isDashboardInView) {
      dashboardControls.start("visible");
    }
  }, [dashboardControls, isDashboardInView]);

  useEffect(() => {
    if (isFeaturesInView) {
      featuresControls.start("visible");
    }
  }, [featuresControls, isFeaturesInView]);

  // Animate stats on page load
  useEffect(() => {
    const finalStats = {
      totalClaims: 2847,
      approvedClaims: 1293,
      pendingClaims: 425,
      forestCoverArea: 15680,
    };

    const duration = 2000;
    const steps = 60;

    for (let i = 0; i <= steps; i++) {
      setTimeout(() => {
        const progress = i / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 2);
        
        setStats({
          totalClaims: Math.floor(finalStats.totalClaims * easeProgress),
          approvedClaims: Math.floor(finalStats.approvedClaims * easeProgress),
          pendingClaims: Math.floor(finalStats.pendingClaims * easeProgress),
          forestCoverArea: Math.floor(finalStats.forestCoverArea * easeProgress),
        });
      }, (i * duration) / steps);
    }
  }, []);

  const features = [
    {
      title: t('interactiveDashboardTitle'),
      description: t('interactiveDashboardDesc'),
      icon: <Dashboard />,
      color: governmentColors.primaryBlue,
      route: '/dashboard',
    },
    {
      title: t('webgisMapsTitle'),
      description: t('webgisMapsDesc'),
      icon: <Map />,
      color: governmentColors.primaryGreen,
      route: '/maps',
    },
    {
      title: t('analyticsReportsTitle'),
      description: t('analyticsReportsDesc'),
      icon: <Assessment />,
      color: governmentColors.saffron,
      route: '/analytics',
    },
    {
      title: t('ocrDocumentSystemTitle'),
      description: t('ocrDocumentSystemDesc'),
      icon: <CloudUpload />,
      color: governmentColors.primaryOrange,
      route: '/ocr',
    },
    {
      title: t('decisionSupportSystemTitle'),
      description: t('decisionSupportSystemDesc'),
      icon: <Settings />,
      color: governmentColors.navy,
      route: '/dss',
    },
  ];

  const stateData = [
    { state: t('odisha'), totalClaims: 1247, approved: 892, completion: 72, color: governmentColors.primaryBlue },
    { state: t('chhattisgarh'), totalClaims: 856, approved: 634, completion: 74, color: governmentColors.primaryGreen },
    { state: t('jharkhand'), totalClaims: 523, approved: 387, completion: 74, color: governmentColors.saffron },
    { state: t('madhyaPradesh'), totalClaims: 421, approved: 298, completion: 71, color: governmentColors.warning },
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={heroControls}
        variants={containerVariants}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, 
              ${governmentColors.primaryBlue} 0%, 
              ${governmentColors.primaryGreen} 50%, 
              ${governmentColors.saffron} 100%
            )`,
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            py: 8,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Animated background particles */}
          <motion.div
            className="background-particles"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
            }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                style={{
                  position: 'absolute',
                  width: Math.random() * 4 + 2,
                  height: Math.random() * 4 + 2,
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  borderRadius: '50%',
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>

          <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '3rem', md: '4.5rem', lg: '5rem' },
                      fontWeight: 900,
                      color: 'white',
                      mb: 2,
                      textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    }}
                  >
                    {t('heroTitle')}
                  </Typography>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h4"
                    sx={{
                      color: 'rgba(255,255,255,0.95)',
                      mb: 3,
                      fontWeight: 600,
                    }}
                  >
                    {t('heroSubtitle')}
                  </Typography>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '1.2rem',
                      color: 'rgba(255,255,255,0.9)',
                      mb: 5,
                      lineHeight: 1.8,
                      maxWidth: 600,
                    }}
                  >
                    {t('heroDescription')}
                  </Typography>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 3, 
                    flexWrap: 'wrap'
                  }}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<Dashboard />}
                        onClick={() => navigate('/dashboard')}
                        sx={{
                          background: 'rgba(255,255,255,0.2)',
                          backdropFilter: 'blur(10px)',
                          color: 'white',
                          border: '1px solid rgba(255,255,255,0.3)',
                          px: 4,
                          py: 2,
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          borderRadius: '50px',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'rgba(255,255,255,0.25)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                          },
                        }}
                      >
                        {t('launchDashboard')}
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<PlayArrow />}
                        sx={{
                          borderColor: 'rgba(255,255,255,0.6)',
                          color: 'white',
                          px: 4,
                          py: 2,
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          borderRadius: '50px',
                          border: '2px solid',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: 'white',
                            background: 'rgba(255,255,255,0.1)',
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        {t('watchDemo')}
                      </Button>
                    </motion.div>
                  </Box>
                </motion.div>
              
                {/* Quick Stats */}
                <motion.div variants={itemVariants}>
                  <Grid container spacing={4} sx={{ mt: 4 }}>
                    {[
                      { label: t('statesCovered'), value: formatNumberWithCommas(4, currentLanguage) },
                      { label: t('claimsProcessed'), value: formatNumberWithCommas(stats.totalClaims, currentLanguage) },
                      { label: t('forestAreaHa2'), value: formatNumberWithCommas(stats.forestCoverArea, currentLanguage) },
                    ].map((stat, index) => (
                      <Grid item xs={4} key={index}>
                        <motion.div
                          initial={{ scale: 0, rotateY: 90 }}
                          animate={{ scale: 1, rotateY: 0 }}
                          transition={{ 
                            delay: index * 0.2, 
                            type: "spring", 
                            stiffness: 200,
                            damping: 15
                          }}
                          whileHover={{ 
                            scale: 1.1, 
                            y: -5,
                            transition: { type: "spring", stiffness: 300 }
                          }}
                        >
                          <Box sx={{ textAlign: 'left' }}>
                            <Typography
                              variant="h3"
                              sx={{
                                fontWeight: 900,
                                color: 'white',
                                fontSize: { xs: '1.5rem', md: '2.2rem' },
                                lineHeight: 1,
                                mb: 0.5,
                              }}
                            >
                              {stat.value}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: 'rgba(255,255,255,0.8)',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                              }}
                            >
                              {stat.label}
                            </Typography>
                          </Box>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </motion.div>
            </Grid>
            
              <Grid item xs={12} md={6}>
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: 5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  <Box
                    sx={{
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: 4,
                      p: 3,
                      border: '1px solid rgba(255,255,255,0.2)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Animated glow effect */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                        borderRadius: 4,
                      }}
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                      <IndiaMap />
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </motion.div>

      {/* Implementation Dashboard Section */}
      <motion.div
        ref={dashboardRef}
        initial="hidden"
        animate={dashboardControls}
        variants={containerVariants}
      >
        <Box sx={{ py: 10, background: 'rgba(248,250,252,1)' }}>
          <Container maxWidth="xl">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <motion.div variants={itemVariants}>
                <Chip
                  label={t('liveImplementationData')}
                  sx={{
                    px: 3,
                    py: 1,
                    fontSize: '1rem',
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${governmentColors.primaryGreen}15, ${governmentColors.primaryBlue}15)`,
                    border: `1px solid ${governmentColors.primaryGreen}30`,
                    color: governmentColors.primaryGreen,
                    mb: 3,
                  }}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    color: governmentColors.navy,
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                  }}
                >
                  {t('implementationDashboard')}
                </Typography>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    color: governmentColors.grey[600],
                    maxWidth: 700,
                    mx: 'auto',
                    lineHeight: 1.6,
                  }}
                >
                  {t('comprehensiveTracking')}
                </Typography>
              </motion.div>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={4} sx={{ mb: 8 }}>
              {[
                {
                  title: t('totalApplications'),
                  value: formatNumberWithCommas(stats.totalClaims, currentLanguage),
                  subtitle: t('monthIncrease'),
                  icon: <Assessment />,
                  color: governmentColors.primaryBlue,
                },
                {
                  title: t('rightsGranted'),
                  value: formatNumberWithCommas(stats.approvedClaims, currentLanguage),
                  subtitle: t('successfullyProcessed'),
                  icon: <CheckCircle />,
                  color: governmentColors.success,
                },
                {
                  title: t('underReview'),
                  value: formatNumberWithCommas(stats.pendingClaims, currentLanguage),
                  subtitle: t('awaitingVerification'),
                  icon: <PendingActions />,
                  color: governmentColors.warning,
                },
                {
                  title: t('protectedArea'),
                  value: `${formatNumberWithCommas(stats.forestCoverArea, currentLanguage)} Ha`,
                  subtitle: t('forestCoverSecured'),
                  icon: <Forest />,
                  color: governmentColors.primaryGreen,
                },
              ].map((card, index) => (
                <Grid item xs={12} sm={6} lg={3} key={card.title}>
                  <motion.div
                    variants={statsCardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover="hover"
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 4,
                        height: '100%',
                        background: 'white',
                        borderRadius: 3,
                        border: `1px solid ${card.color}20`,
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: `0 20px 40px ${card.color}25`,
                          border: `1px solid ${card.color}40`,
                        },
                      }}
                    >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: `${card.color}15`,
                        color: card.color,
                        mr: 2,
                        width: 48,
                        height: 48,
                      }}
                    >
                      {card.icon}
                    </Avatar>
                  </Box>
                  
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: card.color,
                      mb: 1,
                      fontSize: '2.5rem',
                      lineHeight: 1,
                    }}
                  >
                    {card.value}
                  </Typography>
                  
                  <Typography
                    variant="h6"
                    sx={{
                      color: governmentColors.grey[800],
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    {card.title}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    sx={{
                      color: governmentColors.grey[600],
                      fontWeight: 500,
                    }}
                  >
                    {card.subtitle}
                      </Typography>
                      
                      {/* Animated background effect */}
                      <motion.div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `radial-gradient(circle at 30% 40%, ${card.color}10, transparent 70%)`,
                          borderRadius: 3,
                          opacity: 0,
                        }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={4}>
              {/* Regional Impact Overview */}
              <Grid item xs={12} lg={8}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      background: 'white',
                      borderRadius: 3,
                      border: '1px solid rgba(0,0,0,0.08)',
                    }}
                  >
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: governmentColors.navy,
                          mb: 4,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        {t('regionalImpactOverview')}
                      </Typography>
                    </motion.div>
                
                    <Grid container spacing={3}>
                      {stateData.map((state, index) => (
                        <Grid item xs={12} md={6} key={state.state}>
                          <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{ 
                              scale: 1.02, 
                              y: -5,
                              transition: { type: "spring", stiffness: 300 }
                            }}
                          >
                            <Box
                              sx={{
                                p: 3,
                                borderRadius: 2,
                                background: `${state.color}08`,
                                border: `1px solid ${state.color}20`,
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                overflow: 'hidden',
                                '&:hover': {
                                  background: `${state.color}12`,
                                  transform: 'translateY(-2px)',
                                },
                              }}
                            >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: state.color,
                            mb: 2,
                          }}
                        >
                          {state.state}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
                          <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, color: governmentColors.grey[800] }}>
                              {formatNumberWithCommas(state.totalClaims, currentLanguage)}
                            </Typography>
                            <Typography variant="caption" sx={{ color: governmentColors.grey[600] }}>
                              {t('totalClaims')}
                            </Typography>
                          </Box>
                          
                          <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, color: state.color }}>
                              {formatNumberWithCommas(state.approved, currentLanguage)}
                            </Typography>
                            <Typography variant="caption" sx={{ color: governmentColors.grey[600] }}>
                              {t('approved')}
                            </Typography>
                          </Box>
                        </Box>
                        
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${state.completion}%` }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 + 0.5, duration: 1.5, ease: "easeOut" }}
                              >
                                <LinearProgress
                                  variant="determinate"
                                  value={state.completion}
                                  sx={{
                                    height: 6,
                                    borderRadius: 3,
                                    bgcolor: `${state.color}20`,
                                    '& .MuiLinearProgress-bar': {
                                      bgcolor: state.color,
                                      borderRadius: 3,
                                    },
                                  }}
                                />
                              </motion.div>
                              
                              <Typography
                                variant="caption"
                                sx={{
                                  color: governmentColors.grey[600],
                                  mt: 1,
                                  display: 'block',
                                }}
                              >
                                {formatPercentage(state.completion, currentLanguage)} {t('completionRate')}
                              </Typography>
                              
                              {/* Hover effect overlay */}
                              <motion.div
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  background: `linear-gradient(45deg, transparent, ${state.color}05, transparent)`,
                                  borderRadius: 2,
                                  opacity: 0,
                                }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              />
                            </Box>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </motion.div>
              </Grid>

              {/* System Health Panel */}
              <Grid item xs={12} lg={4}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    rotateY: 5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      height: '100%',
                      background: `linear-gradient(135deg, ${governmentColors.navy}, ${governmentColors.primaryBlue})`,
                      color: 'white',
                      borderRadius: 3,
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    {/* Animated background particles for system health */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        style={{
                          position: 'absolute',
                          width: 4,
                          height: 4,
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          borderRadius: '50%',
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                          duration: Math.random() * 2 + 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                    
                    <CardContent sx={{ p: 4, height: '100%', position: 'relative', zIndex: 1 }}>
                      <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 800,
                            mb: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          {t('systemHealth')}
                        </Typography>
                      </motion.div>
                      <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            opacity: 0.9,
                            mb: 4,
                            fontSize: '1.1rem',
                          }}
                        >
                          {t('realTimePlatformMonitoring')}
                        </Typography>
                      </motion.div>
                      
                      {[
                        { label: t('platformUptime'), value: formatPercentage(99.8, currentLanguage), icon: '🚀' },
                        { label: t('dataAccuracy'), value: formatPercentage(99.2, currentLanguage), icon: '📊' },
                        { label: t('responseTime'), value: formatNumberWithCommas(1.2, currentLanguage) + 's', icon: '⚡' },
                        { label: t('activeUsers'), value: formatNumberWithCommas(2847, currentLanguage), icon: '👥' },
                        { label: t('securityStatus'), value: t('protectedStatus'), icon: '🛡️' },
                      ].map((metric, index) => (
                        <motion.div
                          key={index}
                          initial={{ x: -30, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                          whileHover={{ 
                            scale: 1.02,
                            x: 5,
                            transition: { type: "spring", stiffness: 400 }
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              py: 2,
                              mb: 2,
                              borderRadius: 2,
                              background: 'rgba(255,255,255,0.1)',
                              px: 3,
                              transition: 'all 0.3s ease',
                              position: 'relative',
                              overflow: 'hidden',
                              '&:hover': {
                                background: 'rgba(255,255,255,0.15)',
                              },
                            }}
                          >
                            {/* Animated pulse effect */}
                            <motion.div
                              style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: 3,
                                background: 'rgba(255,255,255,0.5)',
                              }}
                              animate={{
                                opacity: [0.3, 1, 0.3],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.3,
                              }}
                            />
                            
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography sx={{ fontSize: '1.2rem', mr: 2 }}>
                                {metric.icon}
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: 600 }}
                              >
                                {metric.label}
                              </Typography>
                            </Box>
                            
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 700 }}
                            >
                              {metric.value}
                            </Typography>
                          </Box>
                        </motion.div>
                      ))}
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1, duration: 0.5 }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            textAlign: 'center',
                            opacity: 0.7,
                            mt: 3,
                            pt: 2,
                            borderTop: '1px solid rgba(255,255,255,0.2)',
                          }}
                        >
                          {t('lastUpdatedJustNow')}
                        </Typography>
                      </motion.div>
                    </CardContent>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </motion.div>

      {/* Platform Features Section */}
      <motion.div
        ref={featuresRef}
        initial="hidden"
        animate={featuresControls}
        variants={containerVariants}
      >
        <Box sx={{ py: 10, background: 'white' }}>
          <Container maxWidth="xl">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    color: governmentColors.navy,
                    mb: 3,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                  }}
                >
                  {t('comprehensivePlatformFeatures')}
                </Typography>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    color: governmentColors.grey[600],
                    maxWidth: 800,
                    mx: 'auto',
                  }}
                >
                  {t('advancedAITechnology')}
                </Typography>
              </motion.div>
            </Box>
          
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover="hover"
                  >
                    <Card
                      onClick={() => navigate(feature.route)}
                      sx={{
                        height: '100%',
                        background: 'white',
                        borderRadius: 3,
                        border: '1px solid rgba(0,0,0,0.08)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: `0 20px 40px rgba(255, 152, 0, 0.15), 0 10px 20px rgba(33, 150, 243, 0.1)`,
                          border: `1px solid ${governmentColors.primaryOrange}30`,
                          background: `linear-gradient(135deg, white 0%, rgba(255, 152, 0, 0.03) 50%, rgba(33, 150, 243, 0.03) 100%)`,
                        },
                      }}
                    >
                      {/* Animated gradient overlay */}
                      <motion.div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 4,
                          background: `linear-gradient(90deg, ${governmentColors.primaryOrange}, ${governmentColors.primaryBlue})`,
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, duration: 0.8 }}
                      />
                      
                      {/* Hover shine effect */}
                      <motion.div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                          borderRadius: 3,
                        }}
                        whileHover={{
                          left: '100%',
                          transition: { duration: 0.6 }
                        }}
                      />
                      
                      <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                        <motion.div
                          whileHover={{ 
                            scale: 1.1, 
                            rotate: [0, -10, 10, -5, 0],
                            transition: { duration: 0.5 }
                          }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: `${feature.color}15`,
                              color: feature.color,
                              mb: 3,
                              width: 64,
                              height: 64,
                              border: `2px solid ${feature.color}30`,
                            }}
                          >
                            {feature.icon}
                          </Avatar>
                        </motion.div>
                        
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              mb: 2,
                              fontWeight: 700,
                              color: governmentColors.navy,
                            }}
                          >
                            {feature.title}
                          </Typography>
                        </motion.div>
                        
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              color: governmentColors.grey[600],
                              mb: 3,
                              lineHeight: 1.7,
                            }}
                          >
                            {feature.description}
                          </Typography>
                        </motion.div>
                        
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="contained"
                            onClick={() => navigate(feature.route)}
                            endIcon={
                              <motion.div
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                              >
                                <ArrowForward />
                              </motion.div>
                            }
                            sx={{
                              background: `linear-gradient(135deg, ${feature.color}, ${feature.color}CC)`,
                              color: 'white',
                              fontWeight: 600,
                              px: 3,
                              py: 1,
                              borderRadius: 2,
                              position: 'relative',
                              overflow: 'hidden',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                background: `linear-gradient(135deg, ${governmentColors.primaryOrange}, ${governmentColors.primaryBlue})`,
                                transform: 'translateY(-2px)',
                                boxShadow: `0 8px 25px rgba(${feature.color === governmentColors.primaryOrange ? '255, 152, 0' : '33, 150, 243'}, 0.3)`,
                              },
                              '&:active': {
                                transform: 'translateY(0px)',
                              },
                            }}
                          >
                            {t('exploreFeature')}
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </motion.div>
    </Box>
  );
};

export default HomePage;