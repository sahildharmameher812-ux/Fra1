import React, { useState, useEffect, useRef } from 'react';
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
  CardMedia
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
  MyLocation
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
  Cell
} from 'recharts';

const ModernHomepage = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);
  const [realTimeStats, setRealTimeStats] = useState({
    totalClaims: 2847,
    approvedClaims: 1293,
    pendingReview: 425,
    hectaresProtected: 15680
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
    overlayDark: 'rgba(0, 0, 0, 0.1)'
  };

  // Problem Statement Data
  const problemStatement = {
    title: "Development of AI-powered FRA Atlas and WebGIS-based Decision Support System (DSS) for Integrated Monitoring of Forest Rights Act (FRA) Implementation",
    states: ["Madhya Pradesh", "Tripura", "Odisha", "Telangana"],
    objectives: [
      "Digitize and standardize legacy data of FRA claims, verifications, and pattas",
      "Create an FRA Atlas showing potential and granted FRA areas using AI and satellite data",
      "Integrate a WebGIS portal to visualize and manage spatial and socio-economic data",
      "Use Remote Sensing and AI/ML to map capital and social assets",
      "Build a Decision Support System (DSS) to recommend and layer CSS schemes"
    ],
    ministry: "Ministry of Tribal Affairs (MoTA)",
    category: "SIH 2024 Winner"
  };

  // Demo Videos Data
  const demoVideos = [
    {
      id: 1,
      title: "FRA Atlas - Complete System Overview",
      description: "Comprehensive demonstration of the AI-powered FRA Atlas system showcasing all features and capabilities",
      duration: "15:32",
      views: "25.7K",
      category: "System Overview",
      thumbnail: "🏛️",
      color: colors.primaryGreen
    },
    {
      id: 2,
      title: "For Citizens & Beneficiaries",
      description: "Learn how tribal communities can submit FRA claims, track applications, and access welfare schemes",
      duration: "12:45",
      views: "18.3K",
      category: "User Guide",
      thumbnail: "👥",
      color: colors.secondaryBlue
    },
    {
      id: 3,
      title: "For Government Officers",
      description: "Administrative portal walkthrough for claim processing, verification, and decision-making tools",
      duration: "18:24",
      views: "12.1K",
      category: "Officer Training",
      thumbnail: "👨‍💼",
      color: colors.accentOrange
    },
    {
      id: 4,
      title: "AI & Satellite Integration",
      description: "Advanced features including OCR document processing, satellite analysis, and AI-powered insights",
      duration: "21:16",
      views: "9.8K",
      category: "Technical Demo",
      thumbnail: "🛰️",
      color: colors.saffron
    }
  ];

  // Government Schemes Integration
  const governmentSchemes = [
    {
      name: 'PM-KISAN',
      fullName: 'Pradhan Mantri Kisan Samman Nidhi',
      description: 'Direct income support for small and marginal tribal farmers',
      icon: <Agriculture />,
      color: colors.green,
      beneficiaries: '2,847',
      amount: '₹6,000/year'
    },
    {
      name: 'MGNREGA',
      fullName: 'Mahatma Gandhi National Rural Employment Guarantee Act',
      description: '100 days guaranteed employment for tribal households',
      icon: <Work />,
      color: colors.saffron,
      beneficiaries: '1,923',
      amount: '₹250/day'
    },
    {
      name: 'PM Awas Yojana',
      fullName: 'Pradhan Mantri Awas Yojana - Gramin',
      description: 'Housing assistance for tribal families',
      icon: <Home />,
      color: colors.primaryGreen,
      beneficiaries: '1,456',
      amount: '₹1.20L'
    },
    {
      name: 'Tribal Education',
      fullName: 'Pre & Post Matric Scholarships',
      description: 'Educational support for tribal students',
      icon: <School />,
      color: colors.secondaryBlue,
      beneficiaries: '3,241',
      amount: '₹35K/year'
    },
    {
      name: 'Ayushman Bharat',
      fullName: 'Pradhan Mantri Jan Arogya Yojana',
      description: 'Health insurance coverage for tribal families',
      icon: <LocalHospital />,
      color: '#E91E63',
      beneficiaries: '5,672',
      amount: '₹5L coverage'
    },
    {
      name: 'Van Dhan Yojana',
      fullName: 'Tribal Forest Produce Value Addition',
      description: 'Value addition and marketing of forest produce',
      icon: <Nature />,
      color: colors.accentOrange,
      beneficiaries: '892',
      amount: '₹18K/month'
    }
  ];

  // Real-time Data for Charts
  const claimsData = [
    { month: 'Jan', approved: 245, pending: 89, rejected: 23 },
    { month: 'Feb', approved: 267, pending: 95, rejected: 18 },
    { month: 'Mar', approved: 298, pending: 102, rejected: 15 },
    { month: 'Apr', approved: 324, pending: 87, rejected: 22 },
    { month: 'May', approved: 356, pending: 134, rejected: 19 },
    { month: 'Jun', approved: 389, pending: 112, rejected: 16 }
  ];

  const stateWiseData = [
    { name: 'Madhya Pradesh', value: 35, color: colors.primaryGreen },
    { name: 'Odisha', value: 28, color: colors.secondaryBlue },
    { name: 'Telangana', value: 22, color: colors.saffron },
    { name: 'Tripura', value: 15, color: colors.accentOrange }
  ];

  // Navigation Menu Items
  const navigationItems = [
    { name: 'Main Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { name: 'Atlas Maps', icon: <MapIcon />, path: '/map' },
    { name: 'OCR Documents', icon: <DocumentScanner />, path: '/documents' },
    { name: 'Satellite Analysis', icon: <Satellite />, path: '/satellite' },
    { name: 'Analytics', icon: <Analytics />, path: '/analytics' },
    { name: 'Decision Support', icon: <Psychology />, path: '/decision-support' }
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
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
        hectaresProtected: prev.hectaresProtected + Math.floor(Math.random() * 10)
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

  const handleMoreMenuOpen = (event) => {
    setMoreMenuAnchor(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreMenuAnchor(null);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: colors.gradientPrimary,
        position: 'relative',
        overflow: 'auto'
      }}
    >
      {/* Government Header */}
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          background: colors.overlayWhite,
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${colors.overlayDark}`
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            sx={{ color: colors.primaryGreen }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, ml: 2 }}>
            <Avatar
              sx={{ 
                bgcolor: colors.saffron, 
                color: 'white', 
                mr: 2, 
                width: 40, 
                height: 40 
              }}
            >
              🇮🇳
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ color: colors.primaryGreen, fontWeight: 700 }}>
                FRA Atlas
              </Typography>
              <Typography variant="caption" sx={{ color: colors.navy, fontSize: '0.75rem' }}>
                Ministry of Tribal Affairs | Government of India
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: colors.navy, mr: 2 }}>
              {currentTime.toLocaleTimeString('en-IN')}
            </Typography>
            
            <IconButton sx={{ color: colors.primaryGreen }}>
              <Badge badgeContent={notifications} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            
            <IconButton 
              onClick={handleMoreMenuOpen}
              sx={{ color: colors.primaryGreen }}
            >
              <MoreVert />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: colors.overlayWhite,
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Avatar
            sx={{ 
              bgcolor: colors.saffron, 
              color: 'white', 
              margin: '0 auto 10px',
              width: 60, 
              height: 60 
            }}
          >
            🏛️
          </Avatar>
          <Typography variant="h6" sx={{ color: colors.primaryGreen, fontWeight: 700 }}>
            FRA Atlas Portal
          </Typography>
        </Box>
        
        <Divider />
        
        <List>
          {navigationItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                handleNavigation(item.path);
                setDrawerOpen(false);
              }}
              sx={{
                '&:hover': {
                  bgcolor: colors.overlayDark,
                  '& .MuiListItemIcon-root': {
                    color: colors.primaryGreen
                  }
                }
              }}
            >
              <ListItemIcon sx={{ color: colors.navy }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.name}
                sx={{ color: colors.navy }}
              />
              <ChevronRight sx={{ color: colors.navy }} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* More Options Menu */}
      <Menu
        anchorEl={moreMenuAnchor}
        open={Boolean(moreMenuAnchor)}
        onClose={handleMoreMenuClose}
      >
        <MenuItem onClick={() => handleNavigation('/profile')}>
          <AccountCircle sx={{ mr: 1 }} />
          Profile
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/settings')}>
          <Settings sx={{ mr: 1 }} />
          Settings
        </MenuItem>
      </Menu>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ pt: 12, pb: 4 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants}>
            <Card
              elevation={0}
              sx={{
                background: colors.cardBackground,
                borderRadius: 4,
                p: 4,
                mb: 4,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${colors.overlayDark}`
              }}
            >
              <Grid container alignItems="center" spacing={4}>
                <Grid item xs={12} md={8}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      sx={{ 
                        bgcolor: colors.saffron, 
                        color: 'white', 
                        mr: 2, 
                        width: 60, 
                        height: 60 
                      }}
                    >
                      🏆
                    </Avatar>
                    <Chip
                      label="SIH 2024 Winner"
                      sx={{
                        bgcolor: colors.saffron,
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.9rem'
                      }}
                    />
                  </Box>
                  
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: colors.primaryGreen,
                      mb: 2,
                      fontSize: { xs: '2rem', md: '3rem' }
                    }}
                  >
                    AI-Powered FRA Atlas & WebGIS DSS
                  </Typography>
                  
                  <Typography
                    variant="h6"
                    sx={{
                      color: colors.navy,
                      mb: 3,
                      lineHeight: 1.6,
                      fontSize: { xs: '1rem', md: '1.25rem' }
                    }}
                  >
                    Integrated Monitoring of Forest Rights Act Implementation for{' '}
                    <strong>Madhya Pradesh, Tripura, Odisha, and Telangana</strong>
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<Launch />}
                      onClick={() => handleNavigation('/dashboard')}
                      sx={{
                        bgcolor: colors.primaryGreen,
                        '&:hover': { bgcolor: colors.green },
                        borderRadius: 2,
                        px: 3,
                        py: 1.5
                      }}
                    >
                      Launch Dashboard
                    </Button>
                    
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<VideoLibrary />}
                      onClick={() => handleVideoOpen(demoVideos[0])}
                      sx={{
                        borderColor: colors.primaryGreen,
                        color: colors.primaryGreen,
                        '&:hover': {
                          borderColor: colors.green,
                          bgcolor: 'rgba(46, 125, 50, 0.1)'
                        },
                        borderRadius: 2,
                        px: 3,
                        py: 1.5
                      }}
                    >
                      Watch Demo
                    </Button>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      sx={{
                        bgcolor: colors.primaryGreen,
                        color: 'white',
                        width: 120,
                        height: 120,
                        fontSize: '3rem',
                        margin: '0 auto',
                        boxShadow: '0 8px 32px rgba(46, 125, 50, 0.3)'
                      }}
                    >
                      🌲
                    </Avatar>
                    <Typography
                      variant="body2"
                      sx={{ 
                        color: colors.navy, 
                        mt: 2,
                        fontStyle: 'italic'
                      }}
                    >
                      Empowering Tribal Communities Through Technology
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </motion.div>

          {/* Real-time Statistics */}
          <motion.div variants={itemVariants}>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {[
                { 
                  label: 'Total Claims', 
                  value: realTimeStats.totalClaims.toLocaleString(), 
                  icon: '📄', 
                  color: colors.primaryGreen,
                  change: '+12%'
                },
                { 
                  label: 'Approved Claims', 
                  value: realTimeStats.approvedClaims.toLocaleString(), 
                  icon: '✅', 
                  color: colors.green,
                  change: '+8%'
                },
                { 
                  label: 'Pending Review', 
                  value: realTimeStats.pendingReview.toLocaleString(), 
                  icon: '⏳', 
                  color: colors.saffron,
                  change: '-5%'
                },
                { 
                  label: 'Hectares Protected', 
                  value: realTimeStats.hectaresProtected.toLocaleString(), 
                  icon: '🌲', 
                  color: colors.accentOrange,
                  change: '+15%'
                }
              ].map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      background: colors.cardBackground,
                      borderRadius: 3,
                      p: 3,
                      textAlign: 'center',
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${colors.overlayDark}`,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                      }
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: stat.color,
                        color: 'white',
                        width: 60,
                        height: 60,
                        fontSize: '1.5rem',
                        margin: '0 auto 16px',
                        boxShadow: `0 4px 16px ${stat.color}40`
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: colors.navy,
                        mb: 1
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: colors.navy, mb: 1 }}
                    >
                      {stat.label}
                    </Typography>
                    <Chip
                      label={stat.change}
                      size="small"
                      sx={{
                        bgcolor: stat.change.startsWith('+') ? colors.green : colors.saffron,
                        color: 'white',
                        fontSize: '0.75rem'
                      }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* Demo Videos Section */}
          <motion.div variants={itemVariants}>
            <Card
              elevation={0}
              sx={{
                background: colors.cardBackground,
                borderRadius: 4,
                p: 4,
                mb: 4,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${colors.overlayDark}`
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: colors.secondaryBlue,
                    color: 'white',
                    mr: 2
                  }}
                >
                  <VideoLibrary />
                </Avatar>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: colors.navy }}
                >
                  System Demonstrations & Training Videos
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                {demoVideos.map((video, index) => (
                  <Grid item xs={12} sm={6} md={3} key={video.id}>
                    <Card
                      elevation={0}
                      sx={{
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        borderRadius: 3,
                        overflow: 'hidden',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)'
                        }
                      }}
                      onClick={() => handleVideoOpen(video)}
                    >
                      <Box
                        sx={{
                          height: 160,
                          background: `linear-gradient(135deg, ${video.color} 0%, ${video.color}CC 100%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative'
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: '3rem',
                            mb: 1
                          }}
                        >
                          {video.thumbnail}
                        </Typography>
                        <Fab
                          size="medium"
                          sx={{
                            position: 'absolute',
                            bgcolor: 'rgba(255, 255, 255, 0.9)',
                            color: video.color,
                            '&:hover': {
                              bgcolor: 'white'
                            }
                          }}
                        >
                          <PlayArrow />
                        </Fab>
                      </Box>
                      <CardContent sx={{ p: 2 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: colors.navy,
                            mb: 1,
                            fontSize: '1rem'
                          }}
                        >
                          {video.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: colors.navy,
                            opacity: 0.7,
                            mb: 2,
                            fontSize: '0.85rem',
                            lineHeight: 1.4
                          }}
                        >
                          {video.description}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Chip
                            label={video.category}
                            size="small"
                            sx={{
                              bgcolor: video.color,
                              color: 'white',
                              fontSize: '0.7rem'
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{ color: colors.navy, opacity: 0.6 }}
                          >
                            {video.duration} • {video.views} views
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </motion.div>

          {/* Government Schemes Integration */}
          <motion.div variants={itemVariants}>
            <Card
              elevation={0}
              sx={{
                background: colors.cardBackground,
                borderRadius: 4,
                p: 4,
                mb: 4,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${colors.overlayDark}`
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: colors.saffron,
                    color: 'white',
                    mr: 2
                  }}
                >
                  🏛️
                </Avatar>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: colors.navy }}
                >
                  Central Sector Schemes Integration
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                {governmentSchemes.map((scheme, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      elevation={0}
                      sx={{
                        height: '100%',
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                        }
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <Avatar
                            sx={{
                              bgcolor: scheme.color,
                              color: 'white',
                              mr: 2,
                              width: 48,
                              height: 48
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
                                mb: 0.5,
                                fontSize: '1.1rem'
                              }}
                            >
                              {scheme.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: colors.navy,
                                opacity: 0.7,
                                fontSize: '0.8rem'
                              }}
                            >
                              {scheme.fullName}
                            </Typography>
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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="caption" sx={{ color: colors.navy, opacity: 0.7 }}>
                              Beneficiaries
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: scheme.color }}>
                              {scheme.beneficiaries}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="caption" sx={{ color: colors.navy, opacity: 0.7 }}>
                              Amount
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: scheme.color }}>
                              {scheme.amount}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </motion.div>

          {/* Charts Section */}
          <motion.div variants={itemVariants}>
            <Grid container spacing={4} sx={{ mb: 4 }}>
              {/* Claims Trend */}
              <Grid item xs={12} md={8}>
                <Card
                  elevation={0}
                  sx={{
                    background: colors.cardBackground,
                    borderRadius: 4,
                    p: 3,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${colors.overlayDark}`
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, color: colors.navy, mb: 3 }}>
                    📈 Claims Processing Trend (Last 6 Months)
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={claimsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={colors.overlayDark} />
                      <XAxis dataKey="month" stroke={colors.navy} />
                      <YAxis stroke={colors.navy} />
                      <RechartsTooltip 
                        contentStyle={{
                          backgroundColor: colors.cardBackground,
                          border: `1px solid ${colors.overlayDark}`,
                          borderRadius: '8px'
                        }}
                      />
                      <Area type="monotone" dataKey="approved" stackId="1" stroke={colors.green} fill={colors.green} />
                      <Area type="monotone" dataKey="pending" stackId="1" stroke={colors.saffron} fill={colors.saffron} />
                      <Area type="monotone" dataKey="rejected" stackId="1" stroke="#f44336" fill="#f44336" />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>
              </Grid>

              {/* State Distribution */}
              <Grid item xs={12} md={4}>
                <Card
                  elevation={0}
                  sx={{
                    background: colors.cardBackground,
                    borderRadius: 4,
                    p: 3,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${colors.overlayDark}`
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, color: colors.navy, mb: 3 }}>
                    🗺️ State-wise Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={stateWiseData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {stateWiseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <Box sx={{ mt: 2 }}>
                    {stateWiseData.map((state, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: state.color,
                            mr: 2
                          }}
                        />
                        <Typography variant="body2" sx={{ color: colors.navy, fontSize: '0.85rem' }}>
                          {state.name}: {state.value}%
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </motion.div>
        </motion.div>
      </Container>

      {/* Video Dialog */}
      <Dialog
        open={videoDialogOpen}
        onClose={() => setVideoDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: selectedVideo?.color, color: 'white', mr: 2 }}>
              {selectedVideo?.thumbnail}
            </Avatar>
            <Typography variant="h6">
              {selectedVideo?.title}
            </Typography>
          </Box>
          <IconButton onClick={() => setVideoDialogOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              width: '100%',
              height: 400,
              bgcolor: colors.lightBackground,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2
            }}
          >
            <Typography variant="h6" sx={{ color: colors.navy }}>
              Video Player Placeholder
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: colors.navy, mb: 2 }}>
            {selectedVideo?.description}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Chip
              label={selectedVideo?.category}
              sx={{
                bgcolor: selectedVideo?.color,
                color: 'white'
              }}
            />
            <Chip
              label={`${selectedVideo?.duration} • ${selectedVideo?.views} views`}
              variant="outlined"
            />
          </Box>
        </DialogContent>
      </Dialog>

      {/* Floating Action Button for Quick Access */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          bgcolor: colors.primaryGreen,
          '&:hover': { bgcolor: colors.green }
        }}
        onClick={() => handleNavigation('/dashboard')}
      >
        <Launch />
      </Fab>
    </Box>
  );
};

export default ModernHomepage;