import React, { useState, useEffect } from 'react';
import '../../styles/modern-animations.css';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Container,
  Paper,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  LinearProgress,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Fab,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  CardActions,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  PlayArrow,
  Dashboard as DashboardIcon,
  Map as MapIcon,
  DocumentScanner,
  Satellite,
  Analytics,
  MoreVert,
  Menu as MenuIcon,
  Close,
  LocationOn,
  People,
  Agriculture,
  Work,
  Home,
  School,
  LocalHospital,
  Nature,
  TrendingUp,
  Security,
  Speed,
  Psychology,
  Assessment,
  Timeline,
  Notifications,
  Settings,
  AccountCircle,
  Launch,
  VideoLibrary,
  Info,
  Download,
  Share,
  Fullscreen,
  ChevronRight,
  Forest,
  LandscapeSharp,
  MyLocation,
  AdminPanelSettings,
  SupervisorAccount,
  PersonAdd,
  ExpandMore,
  AutoAwesome,
  Verified,
  EmojiEvents,
  Insights,
  DataUsage,
  CloudUpload,
  SmartToy,
  Fingerprint,
  Public,
  TrendingDown
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Chart components
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Legend
} from 'recharts';

const UltraModernHomepage = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);
  const [activeStep, setActiveStep] = useState(0);
  const [realTimeStats, setRealTimeStats] = useState({
    totalClaims: 2847,
    approvedClaims: 1293,
    pendingReview: 425,
    hectaresProtected: 15680,
    tribalFamilies: 8934,
    documentsProcessed: 12456,
    aiAccuracy: 94.7,
    systemUptime: 99.8
  });

  // Government of India Color Scheme
  const colors = {
    saffron: '#FF9933',
    white: '#FFFFFF',
    green: '#138808',
    navy: '#000080',
    primaryGreen: '#2E7D32',
    secondaryBlue: '#1565C0',
    accentOrange: '#FF7043',
    lightBackground: '#F8F9FA',
    cardBackground: 'rgba(255, 255, 255, 0.95)',
    gradientPrimary: 'linear-gradient(135deg, #2E7D32 0%, #1565C0 100%)',
    gradientSecondary: 'linear-gradient(135deg, #FF9933 0%, #FF7043 100%)',
    overlayWhite: 'rgba(255, 255, 255, 0.9)',
    overlayDark: 'rgba(0, 0, 0, 0.1)',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3'
  };

  // Role-based Demo Videos
  const roleBasedVideos = [
    {
      id: 1,
      role: 'Admin',
      title: 'System Administration Guide',
      description: 'Complete administrative control: user management, system configuration, data analytics, and policy implementation',
      duration: '18:45',
      views: '8.2K',
      category: 'Administrative',
      thumbnail: '👨‍💼',
      color: colors.error,
      features: ['User Management', 'System Config', 'Analytics Dashboard', 'Policy Control'],
      path: '/admin-demo'
    },
    {
      id: 2,
      role: 'Officer',
      title: 'Claims Processing & Verification',
      description: 'Field officer workflow: claim processing, document verification, site inspection, and approval workflow',
      duration: '15:30',
      views: '12.5K',
      category: 'Field Operations',
      thumbnail: '👮‍♂️',
      color: colors.secondaryBlue,
      features: ['Claim Processing', 'Document Review', 'Site Verification', 'Approval Workflow'],
      path: '/officer-demo'
    },
    {
      id: 3,
      role: 'Citizen/Beneficiary',
      title: 'How to Apply for FRA Rights',
      description: 'Step-by-step guide for tribal communities: application submission, document upload, status tracking, and rights claiming',
      duration: '12:20',
      views: '25.7K',
      category: 'Public Guide',
      thumbnail: '👥',
      color: colors.success,
      features: ['Online Application', 'Document Upload', 'Status Tracking', 'Rights Information'],
      path: '/citizen-demo'
    }
  ];

  // Problem Statement Steps
  const problemStatementSteps = [
    {
      label: 'Data Digitization',
      description: 'Legacy FRA records digitized using AI-powered OCR and NER technology',
      icon: <DocumentScanner />,
      color: colors.primaryGreen
    },
    {
      label: 'FRA Atlas Creation',
      description: 'Interactive WebGIS showing potential and granted FRA areas with satellite data',
      icon: <MapIcon />,
      color: colors.secondaryBlue
    },
    {
      label: 'Asset Mapping',
      description: 'AI/ML powered mapping of farms, water bodies, and forest resources',
      icon: <Satellite />,
      color: colors.accentOrange
    },
    {
      label: 'Decision Support System',
      description: 'CSS scheme layering and targeted development recommendations',
      icon: <Psychology />,
      color: colors.saffron
    }
  ];

  // Enhanced Statistics
  const enhancedStats = [
    {
      label: 'Total Claims Processed',
      value: realTimeStats.totalClaims.toLocaleString(),
      icon: '📊',
      color: colors.primaryGreen,
      change: '+12.3%',
      trend: 'up',
      description: 'Individual & Community Forest Rights'
    },
    {
      label: 'AI Processing Accuracy',
      value: `${realTimeStats.aiAccuracy}%`,
      icon: '🤖',
      color: colors.secondaryBlue,
      change: '+2.1%',
      trend: 'up',
      description: 'OCR & Document Recognition'
    },
    {
      label: 'Tribal Families Benefited',
      value: realTimeStats.tribalFamilies.toLocaleString(),
      icon: '👪',
      color: colors.success,
      change: '+8.7%',
      trend: 'up',
      description: 'Across 4 States Coverage'
    },
    {
      label: 'System Uptime',
      value: `${realTimeStats.systemUptime}%`,
      icon: '⚡',
      color: colors.warning,
      change: '+0.1%',
      trend: 'up',
      description: '24/7 High Availability'
    }
  ];

  // Government Schemes - Enhanced
  const governmentSchemes = [
    {
      name: 'PM-KISAN',
      fullName: 'Pradhan Mantri Kisan Samman Nidhi',
      description: 'Direct income support for small and marginal tribal farmers',
      icon: <Agriculture />,
      color: colors.green,
      beneficiaries: '2,847',
      amount: '₹6,000/year',
      status: 'Active',
      completion: 87
    },
    {
      name: 'MGNREGA',
      fullName: 'Mahatma Gandhi National Rural Employment Guarantee Act',
      description: '100 days guaranteed employment for tribal households',
      icon: <Work />,
      color: colors.saffron,
      beneficiaries: '1,923',
      amount: '₹250/day',
      status: 'Active',
      completion: 94
    },
    {
      name: 'PM Awas Yojana',
      fullName: 'Pradhan Mantri Awas Yojana - Gramin',
      description: 'Housing assistance for tribal families',
      icon: <Home />,
      color: colors.primaryGreen,
      beneficiaries: '1,456',
      amount: '₹1.20L',
      status: 'Active',
      completion: 73
    },
    {
      name: 'Ayushman Bharat',
      fullName: 'Pradhan Mantri Jan Arogya Yojana',
      description: 'Health insurance coverage for tribal families',
      icon: <LocalHospital />,
      color: colors.error,
      beneficiaries: '5,672',
      amount: '₹5L coverage',
      status: 'Active',
      completion: 89
    }
  ];

  // System Features
  const systemFeatures = [
    {
      title: 'AI-Powered OCR',
      description: 'Intelligent document processing with 94.7% accuracy',
      icon: <SmartToy />,
      color: colors.secondaryBlue
    },
    {
      title: 'Satellite Integration',
      description: 'Real-time ISRO satellite data and analysis',
      icon: <Satellite />,
      color: colors.accentOrange
    },
    {
      title: 'WebGIS Portal',
      description: 'Interactive mapping with multiple data layers',
      icon: <Public />,
      color: colors.primaryGreen
    },
    {
      title: 'Secure & Compliant',
      description: 'Government-grade security and data protection',
      icon: <Security />,
      color: colors.error
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  // Update time and stats
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setRealTimeStats(prev => ({
        totalClaims: prev.totalClaims + Math.floor(Math.random() * 3),
        approvedClaims: prev.approvedClaims + Math.floor(Math.random() * 2),
        pendingReview: prev.pendingReview + Math.floor(Math.random() * 5) - 2,
        hectaresProtected: prev.hectaresProtected + Math.floor(Math.random() * 10),
        tribalFamilies: prev.tribalFamilies + Math.floor(Math.random() * 5),
        documentsProcessed: prev.documentsProcessed + Math.floor(Math.random() * 8),
        aiAccuracy: Math.min(99.9, prev.aiAccuracy + (Math.random() - 0.5) * 0.1),
        systemUptime: Math.min(100, prev.systemUptime + (Math.random() - 0.5) * 0.01)
      }));
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  const handleVideoOpen = (video) => {
    setSelectedVideo(video);
    setVideoDialogOpen(true);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: colors.lightBackground,
        position: 'relative',
        overflow: 'auto'
      }}
    >
      {/* Ultra-Modern Header with Indian Flag Animation */}
      <Box
        sx={{
          background: 'linear-gradient(to bottom, #FF9933 0%, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%, #138808 100%)',
          color: 'white',
          py: 10,
          mb: 8,
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh'
        }}
      >
        {/* Animated Flag Waves */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              linear-gradient(45deg, transparent 49%, rgba(255,255,255,0.1) 50%, transparent 51%),
              linear-gradient(-45deg, transparent 49%, rgba(255,255,255,0.1) 50%, transparent 51%),
              linear-gradient(to bottom, 
                #FF9933 0%, #FF9933 30%, 
                rgba(255,255,255,0.95) 30%, rgba(255,255,255,0.95) 70%, 
                #138808 70%, #138808 100%
              )
            `,
            animation: 'flagWave 6s ease-in-out infinite',
            opacity: 0.9
          }}
        />
        
        {/* Ashoka Chakra Effect */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: '10%',
            transform: 'translateY(-50%)',
            width: 150,
            height: 150,
            borderRadius: '50%',
            border: '3px solid rgba(0, 0, 128, 0.3)',
            background: 'radial-gradient(circle, transparent 40%, rgba(0, 0, 128, 0.1) 50%, transparent 60%)',
            animation: 'chakraRotate 20s linear infinite',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: `repeating-conic-gradient(
                from 0deg,
                rgba(0, 0, 128, 0.2) 0deg 15deg,
                transparent 15deg 30deg
              )`
            }
          }}
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container alignItems="center" spacing={6}>
              <Grid item xs={12} lg={8}>
                <motion.div variants={itemVariants}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: colors.saffron,
                        color: 'white',
                        mr: 3,
                        width: 80,
                        height: 80,
                        fontSize: '2rem'
                      }}
                    >
                      🏆
                    </Avatar>
                    <Box>
                      <Chip
                        label="SIH 2024 Winner"
                        sx={{
                          bgcolor: colors.saffron,
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '1rem',
                          px: 2,
                          py: 1,
                          mb: 1
                        }}
                      />
                      <Typography variant="caption" sx={{ display: 'block', opacity: 0.9 }}>
                        Ministry of Tribal Affairs | Government of India
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 900,
                      mb: 2,
                      fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                      lineHeight: 1.1,
                      background: 'linear-gradient(45deg, #FFFFFF 30%, #FFE0B2 90%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    AI-Powered FRA Atlas
                  </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 4,
                      opacity: 0.95,
                      fontWeight: 400,
                      lineHeight: 1.6,
                      fontSize: { xs: '1.2rem', md: '1.5rem' }
                    }}
                  >
                    Integrated WebGIS-based Decision Support System for
                    <Box component="span" sx={{ fontWeight: 700, color: colors.saffron }}>
                      {' '}Madhya Pradesh, Tripura, Odisha & Telangana
                    </Box>
                  </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<Launch />}
                      onClick={() => handleNavigation('/comprehensive')}
                      sx={{
                        bgcolor: colors.saffron,
                        color: 'white',
                        '&:hover': { bgcolor: '#E67E22', transform: 'translateY(-2px)' },
                        borderRadius: 3,
                        px: 4,
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        boxShadow: '0 8px 32px rgba(255, 153, 51, 0.4)',
                        transition: 'all 0.3s ease'
                      }}
                      className="btn-modern"
                    >
                      Launch System
                    </Button>

                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<VideoLibrary />}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        '&:hover': {
                          borderColor: colors.saffron,
                          bgcolor: 'rgba(255, 153, 51, 0.1)',
                          transform: 'translateY(-2px)'
                        },
                        borderRadius: 3,
                        px: 4,
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      View Demos
                    </Button>
                  </Box>
                </motion.div>
              </Grid>

              <Grid item xs={12} lg={4}>
                <motion.div
                  variants={itemVariants}
                  className="fade-in delay-3"
                >
                  <Box sx={{ textAlign: 'center', position: 'relative' }}>
                    <Avatar
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(20px)',
                        border: '3px solid rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        width: 180,
                        height: 180,
                        fontSize: '4rem',
                        margin: '0 auto',
                        boxShadow: '0 16px 64px rgba(0, 0, 0, 0.2)',
                        position: 'relative',
                        overflow: 'visible'
                      }}
                    >
                      🌲
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -10,
                          right: -10,
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          bgcolor: colors.saffron,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem'
                        }}
                      >
                        ✨
                      </Box>
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{
                        mt: 3,
                        fontWeight: 600,
                        opacity: 0.9
                      }}
                    >
                      Empowering Tribal Communities
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        mt: 1,
                        opacity: 0.8,
                        fontStyle: 'italic'
                      }}
                    >
                      Through Advanced Technology
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ pb: 8, px: { xs: 3, md: 6 } }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Enhanced Real-time Statistics */}
          <motion.div variants={itemVariants}>
            <Box sx={{ mb: 10 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: colors.navy,
                  mb: 4,
                  textAlign: 'center'
                }}
              >
                🔥 Live System Metrics
              </Typography>
              
              <Grid container spacing={3}>
                {enhancedStats.map((stat, index) => (
                  <Grid item xs={12} sm={6} lg={3} key={index}>
                    <motion.div
                      variants={cardHoverVariants}
                      whileHover="hover"
                      className="card-hover"
                    >
                      <Card
                        elevation={0}
                        sx={{
                          background: colors.cardBackground,
                          borderRadius: 4,
                  p: 4,
                  textAlign: 'center',
                  border: `2px solid ${colors.overlayDark}`,
                          position: 'relative',
                          overflow: 'hidden',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 4,
                            background: `linear-gradient(90deg, ${stat.color}, ${stat.color}80)`
                          }
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: `${stat.color}20`,
                            color: stat.color,
                            width: 70,
                            height: 70,
                            fontSize: '2rem',
                            margin: '0 auto 16px',
                            border: `3px solid ${stat.color}30`
                          }}
                        >
                          {stat.icon}
                        </Avatar>
                        
                        <Typography
                          variant="h3"
                          sx={{
                            fontWeight: 900,
                            color: colors.navy,
                            mb: 1,
                            fontSize: { xs: '2rem', md: '2.5rem' }
                          }}
                        >
                          {stat.value}
                        </Typography>
                        
                        <Typography
                          variant="h6"
                          sx={{
                            color: colors.navy,
                            fontWeight: 600,
                            mb: 1
                          }}
                        >
                          {stat.label}
                        </Typography>
                        
                        <Typography
                          variant="body2"
                          sx={{
                            color: colors.navy,
                            opacity: 0.7,
                            mb: 2,
                            fontSize: '0.9rem'
                          }}
                        >
                          {stat.description}
                        </Typography>
                        
                        <Chip
                          label={stat.change}
                          size="small"
                          icon={stat.trend === 'up' ? <TrendingUp /> : <TrendingDown />}
                          sx={{
                            bgcolor: stat.trend === 'up' ? colors.success : colors.error,
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.8rem'
                          }}
                        />
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>

          {/* Role-based Demo Videos */}
          <motion.div variants={itemVariants}>
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: colors.navy,
                  mb: 2,
                  textAlign: 'center'
                }}
              >
                📺 How to Use - Role-based Guides
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  color: colors.navy,
                  opacity: 0.7,
                  mb: 4,
                  textAlign: 'center'
                }}
              >
                Comprehensive training videos for different user roles
              </Typography>
              
              <Grid container spacing={4}>
                {roleBasedVideos.map((video, index) => (
                  <Grid item xs={12} md={4} key={video.id}>
                    <motion.div
                      variants={cardHoverVariants}
                      whileHover="hover"
                      className="card-hover"
                    >
                      <Card
                        elevation={0}
                        sx={{
                          borderRadius: 4,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: `2px solid ${colors.overlayDark}`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: video.color,
                            boxShadow: `0 16px 64px ${video.color}40`
                          }
                        }}
                        onClick={() => handleVideoOpen(video)}
                      >
                        {/* Video Thumbnail */}
                        <Box
                          sx={{
                            height: 200,
                            background: `linear-gradient(135deg, ${video.color} 0%, ${video.color}CC 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            color: 'white'
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: '4rem',
                              mb: 1
                            }}
                          >
                            {video.thumbnail}
                          </Typography>
                          
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 16,
                              right: 16
                            }}
                          >
                            <Chip
                              label={video.role}
                              size="small"
                              sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.9)',
                                color: video.color,
                                fontWeight: 700
                              }}
                            />
                          </Box>
                          
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 16,
                              left: 16,
                              right: 16,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                              {video.duration}
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                              {video.views} views
                            </Typography>
                          </Box>
                          
                          <IconButton
                            sx={{
                              position: 'absolute',
                              bgcolor: 'rgba(255, 255, 255, 0.9)',
                              color: video.color,
                              '&:hover': {
                                bgcolor: 'white',
                                transform: 'scale(1.1)'
                              }
                            }}
                          >
                            <PlayArrow sx={{ fontSize: '2rem' }} />
                          </IconButton>
                        </Box>

                        <CardContent sx={{ p: 3 }}>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              color: colors.navy,
                              mb: 2
                            }}
                          >
                            {video.title}
                          </Typography>
                          
                          <Typography
                            variant="body1"
                            sx={{
                              color: colors.navy,
                              opacity: 0.8,
                              mb: 3,
                              lineHeight: 1.6
                            }}
                          >
                            {video.description}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                            {video.features.map((feature, fIndex) => (
                              <Chip
                                key={fIndex}
                                label={feature}
                                size="small"
                                sx={{
                                  bgcolor: `${video.color}15`,
                                  color: video.color,
                                  fontSize: '0.75rem',
                                  fontWeight: 500
                                }}
                              />
                            ))}
                          </Box>
                          
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<PlayArrow />}
                            sx={{
                              borderColor: video.color,
                              color: video.color,
                              '&:hover': {
                                borderColor: video.color,
                                bgcolor: `${video.color}10`
                              },
                              borderRadius: 2,
                              fontWeight: 600
                            }}
                          >
                            Watch {video.role} Guide
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>

          {/* Problem Statement Solution Steps */}
          <motion.div variants={itemVariants}>
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: colors.navy,
                  mb: 4,
                  textAlign: 'center'
                }}
              >
                🎯 Our Solution Approach
              </Typography>
              
              <Grid container spacing={4}>
                {problemStatementSteps.map((step, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <motion.div
                      variants={cardHoverVariants}
                      whileHover="hover"
                      className="card-hover"
                    >
                      <Card
                        elevation={0}
                        sx={{
                          p: 3,
                          textAlign: 'center',
                          borderRadius: 4,
                          border: `2px solid ${colors.overlayDark}`,
                          background: colors.cardBackground,
                          position: 'relative',
                          '&::before': {
                            content: `"${index + 1}"`,
                            position: 'absolute',
                            top: -15,
                            left: 20,
                            width: 30,
                            height: 30,
                            borderRadius: '50%',
                            bgcolor: step.color,
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '1rem'
                          }
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: `${step.color}20`,
                            color: step.color,
                            width: 60,
                            height: 60,
                            margin: '0 auto 16px',
                            border: `3px solid ${step.color}30`
                          }}
                        >
                          {step.icon}
                        </Avatar>
                        
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: colors.navy,
                            mb: 2
                          }}
                        >
                          {step.label}
                        </Typography>
                        
                        <Typography
                          variant="body2"
                          sx={{
                            color: colors.navy,
                            opacity: 0.8,
                            lineHeight: 1.6
                          }}
                        >
                          {step.description}
                        </Typography>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>

          {/* Enhanced Government Schemes */}
          <motion.div variants={itemVariants}>
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: colors.navy,
                  mb: 2,
                  textAlign: 'center'
                }}
              >
                🏛️ Integrated Government Schemes
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  color: colors.navy,
                  opacity: 0.7,
                  mb: 4,
                  textAlign: 'center'
                }}
              >
                Seamless integration with Central Sector Schemes for tribal welfare
              </Typography>
              
              <Grid container spacing={4}>
                {governmentSchemes.map((scheme, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <motion.div
                      variants={cardHoverVariants}
                      whileHover="hover"
                      className="card-hover"
                    >
                      <Card
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 4,
                          border: `2px solid ${colors.overlayDark}`,
                          background: colors.cardBackground,
                          position: 'relative'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <Avatar
                            sx={{
                              bgcolor: scheme.color,
                              color: 'white',
                              mr: 2,
                              width: 50,
                              height: 50
                            }}
                          >
                            {scheme.icon}
                          </Avatar>
                          
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                color: colors.navy,
                                mb: 0.5
                              }}
                            >
                              {scheme.name}
                            </Typography>
                            
                            <Chip
                              label={scheme.status}
                              size="small"
                              sx={{
                                bgcolor: colors.success,
                                color: 'white',
                                fontSize: '0.7rem'
                              }}
                            />
                          </Box>
                        </Box>
                        
                        <Typography
                          variant="body2"
                          sx={{
                            color: colors.navy,
                            mb: 3,
                            lineHeight: 1.5
                          }}
                        >
                          {scheme.description}
                        </Typography>
                        
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="caption" sx={{ color: colors.navy, opacity: 0.7 }}>
                              Implementation Progress
                            </Typography>
                            <Typography variant="caption" sx={{ color: scheme.color, fontWeight: 600 }}>
                              {scheme.completion}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={scheme.completion}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              bgcolor: `${scheme.color}20`,
                              '& .MuiLinearProgress-bar': {
                                bgcolor: scheme.color,
                                borderRadius: 3
                              }
                            }}
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="caption" sx={{ color: colors.navy, opacity: 0.7 }}>
                              Beneficiaries
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: scheme.color }}>
                              {scheme.beneficiaries}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="caption" sx={{ color: colors.navy, opacity: 0.7 }}>
                              Amount
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: scheme.color }}>
                              {scheme.amount}
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>

          {/* System Features */}
          <motion.div variants={itemVariants}>
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: colors.navy,
                  mb: 4,
                  textAlign: 'center'
                }}
              >
                ⚡ Advanced System Features
              </Typography>
              
              <Grid container spacing={3}>
                {systemFeatures.map((feature, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <motion.div
                      variants={cardHoverVariants}
                      whileHover="hover"
                      className="card-hover"
                    >
                      <Card
                        elevation={0}
                        sx={{
                          p: 4,
                          textAlign: 'center',
                          borderRadius: 4,
                          background: `linear-gradient(135deg, ${feature.color}10 0%, ${feature.color}05 100%)`,
                          border: `2px solid ${feature.color}30`,
                          position: 'relative'
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: feature.color,
                            color: 'white',
                            width: 60,
                            height: 60,
                            margin: '0 auto 16px'
                          }}
                        >
                          {feature.icon}
                        </Avatar>
                        
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: colors.navy,
                            mb: 2
                          }}
                        >
                          {feature.title}
                        </Typography>
                        
                        <Typography
                          variant="body2"
                          sx={{
                            color: colors.navy,
                            opacity: 0.8
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>
        </motion.div>
      </Container>

      {/* Video Dialog */}
      <Dialog
        open={videoDialogOpen}
        onClose={() => setVideoDialogOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 3,
            background: selectedVideo?.color,
            color: 'white'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                mr: 2,
                fontSize: '1.5rem'
              }}
            >
              {selectedVideo?.thumbnail}
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {selectedVideo?.title}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {selectedVideo?.role} Training Guide
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={() => setVideoDialogOpen(false)}
            sx={{ color: 'white' }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ p: 0 }}>
          <Box
            sx={{
              width: '100%',
              height: 500,
              background: `linear-gradient(135deg, ${selectedVideo?.color}20 0%, ${selectedVideo?.color}10 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem'
            }}
          >
            🎥 Video Player Interface
          </Box>
          
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ color: colors.navy, mb: 2, fontWeight: 600 }}>
              What you'll learn:
            </Typography>
            <Typography variant="body1" sx={{ color: colors.navy, mb: 3, lineHeight: 1.7 }}>
              {selectedVideo?.description}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {selectedVideo?.features.map((feature, index) => (
                <Chip
                  key={index}
                  label={feature}
                  sx={{
                    bgcolor: `${selectedVideo?.color}15`,
                    color: selectedVideo?.color,
                    fontWeight: 500
                  }}
                />
              ))}
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Chip
                label={`Duration: ${selectedVideo?.duration}`}
                variant="outlined"
                icon={<Timeline />}
              />
              <Chip
                label={`Views: ${selectedVideo?.views}`}
                variant="outlined"
                icon={<Insights />}
              />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Quick Access FAB */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          bgcolor: colors.saffron,
          color: 'white',
          '&:hover': {
            bgcolor: '#E67E22',
            transform: 'scale(1.1)'
          },
          boxShadow: '0 8px 32px rgba(255, 153, 51, 0.4)',
          width: 64,
          height: 64
        }}
        onClick={() => handleNavigation('/comprehensive')}
      >
        <Launch sx={{ fontSize: '1.5rem' }} />
      </Fab>
    </Box>
  );
};

export default UltraModernHomepage;