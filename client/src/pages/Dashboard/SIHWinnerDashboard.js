import React, { useState, useEffect, useRef } from 'react';
import './SIHAdvancedAnimations.css';
import './ResponsiveLayout.css';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Button,
  useTheme,
  alpha,
  Container,
  Paper,
  Chip,
  Avatar,
  CardActions,
  Divider,
  LinearProgress
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Assessment,
  Speed,
  Psychology,
  People,
  Agriculture,
  Timeline,
  Analytics,
  ShowChart,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  DataUsage,
  Satellite,
  FilterList,
  Refresh,
  Fullscreen,
  Download,
  Share,
  PlayCircleFilled,
  Seedling,
  Work,
  Home,
  School,
  LocalHospital,
  Nature,
  Flag,
  Landscape,
  Dashboard as DashboardIcon,
  BrainCircuit,
  ExternalLink
} from '@mui/icons-material';

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
  Filler,
  RadialLinearScale
} from 'chart.js';
import { Line, Bar, Doughnut, Radar, Scatter, PolarArea } from 'react-chartjs-2';

// Recharts imports
import {
  LineChart,
  Line as RechartsLine,
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter as RechartsScatter,
  ComposedChart
} from 'recharts';

// Framer Motion
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartTooltip,
  ChartLegend,
  Filler,
  RadialLinearScale
);

const SIHWinnerDashboard = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [selectedChart, setSelectedChart] = useState(null);
  const [realTimeData, setRealTimeData] = useState([]);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [kpiData, setKpiData] = useState({
    totalClaims: 0,
    processedToday: 0,
    aiAccuracy: 0,
    efficiency: 0,
    tribalFamilies: 0,
    landCoverage: 0,
    processingSpeed: 0,
    satisfaction: 0
  });

  // Government of India Color scheme
  const colors = {
    primary: '#2E7D32',      // Green
    secondary: '#1565C0',     // Blue
    accent: '#FF7043',        // Orange
    background: '#FFFFFF',    // White
    surface: '#F8F9FA',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    govtOrange: '#FF9933',
    govtWhite: '#FFFFFF',
    govtGreen: '#138808',
    govtBlue: '#000080',
    gradient1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    gradient2: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    gradient3: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  };

  // Government schemes data
  const governmentSchemes = [
    {
      name: 'PM-KISAN',
      description: 'Pradhan Mantri Kisan Samman Nidhi integration for tribal farmers',
      icon: <Seedling />,
      color: colors.success
    },
    {
      name: 'MGNREGA',
      description: 'Mahatma Gandhi National Rural Employment Guarantee Act linkage',
      icon: <Work />,
      color: colors.warning
    },
    {
      name: 'PM Awas Yojana',
      description: 'Housing for All scheme integration for tribal communities',
      icon: <Home />,
      color: colors.primary
    },
    {
      name: 'Tribal Education',
      description: 'Pre & Post Matric Scholarship schemes for ST students',
      icon: <School />,
      color: colors.secondary
    },
    {
      name: 'Ayushman Bharat',
      description: 'Health insurance coverage for tribal families',
      icon: <LocalHospital />,
      color: colors.error
    },
    {
      name: 'Van Dhan Yojana',
      description: 'Tribal forest produce value addition scheme',
      icon: <Nature />,
      color: colors.accent
    }
  ];

  // Demo videos data
  const demoVideos = [
    {
      title: 'For Citizens/Users',
      description: 'Learn how to submit FRA claims, track applications, and access tribal welfare schemes',
      duration: '12:45',
      views: '15.2K'
    },
    {
      title: 'For Officers',
      description: 'Discover claim processing, verification tools, and decision support features',
      duration: '18:30',
      views: '8.7K'
    },
    {
      title: 'For Administrators',
      description: 'Explore system management, analytics dashboard, and policy implementation tools',
      duration: '22:15',
      views: '5.3K'
    }
  ];

  // Advanced counter animation hook
  const useCounter = (end, duration = 2500, decimals = 0) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!animationsEnabled) {
        setCount(end);
        return;
      }
      
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(decimals > 0 ? Number(start.toFixed(decimals)) : Math.ceil(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, [end, duration, decimals, animationsEnabled]);
    
    return count;
  };

  // Statistics counters
  const totalClaimsCount = useCounter(2847, 2000);
  const approvedCount = useCounter(1293, 2200);
  const pendingCount = useCounter(425, 2400);
  const hectaresCount = useCounter(15680, 2600);

  // Sample data for charts - Engineering level data
  const performanceData = [
    { month: 'Jan', claims: 4500, processed: 4200, accuracy: 94.5, efficiency: 89.2 },
    { month: 'Feb', claims: 5200, processed: 4980, accuracy: 95.8, efficiency: 91.4 },
    { month: 'Mar', claims: 4800, processed: 4650, accuracy: 96.9, efficiency: 93.1 },
    { month: 'Apr', claims: 6100, processed: 5890, accuracy: 97.2, efficiency: 94.8 },
    { month: 'May', claims: 5500, processed: 5350, accuracy: 97.8, efficiency: 95.6 },
    { month: 'Jun', claims: 6800, processed: 6650, accuracy: 98.1, efficiency: 96.3 },
    { month: 'Jul', claims: 7200, processed: 7050, accuracy: 98.4, efficiency: 97.1 }
  ];

  const aiProcessingData = {
    labels: ['Document Analysis', 'Land Verification', 'Tribal Authentication', 'Legal Compliance', 'Final Approval'],
    datasets: [{
      label: 'AI Processing Time (minutes)',
      data: [2.3, 4.7, 3.2, 5.8, 1.9],
      backgroundColor: [
        colors.primary,
        colors.secondary,
        colors.accent,
        alpha(colors.primary, 0.7),
        alpha(colors.secondary, 0.7)
      ],
      borderColor: colors.background,
      borderWidth: 3,
      hoverOffset: 15
    }]
  };

  const efficiencyRadarData = {
    labels: ['Speed', 'Accuracy', 'Coverage', 'Satisfaction', 'Compliance', 'Innovation'],
    datasets: [{
      label: 'Current Performance',
      data: [95, 98, 87, 92, 96, 89],
      backgroundColor: alpha(colors.primary, 0.2),
      borderColor: colors.primary,
      borderWidth: 3,
      pointBackgroundColor: colors.accent,
      pointBorderColor: colors.background,
      pointBorderWidth: 2,
      pointRadius: 6
    }, {
      label: 'Target Performance',
      data: [90, 95, 85, 90, 95, 85],
      backgroundColor: alpha(colors.secondary, 0.1),
      borderColor: colors.secondary,
      borderWidth: 2,
      borderDash: [5, 5],
      pointBackgroundColor: colors.secondary,
      pointBorderColor: colors.background,
      pointBorderWidth: 2,
      pointRadius: 4
    }]
  };

  const realTimeProcessingData = [
    { time: '00:00', queue: 245, processed: 892, errors: 3 },
    { time: '04:00', queue: 189, processed: 1156, errors: 1 },
    { time: '08:00', queue: 312, processed: 1578, errors: 2 },
    { time: '12:00', queue: 567, processed: 2134, errors: 0 },
    { time: '16:00', queue: 423, processed: 2689, errors: 1 },
    { time: '20:00', queue: 298, processed: 3045, errors: 0 }
  ];

  const geographicData = [
    { state: 'Odisha', families: 12500, area: 15600, completion: 94 },
    { state: 'Jharkhand', families: 9800, area: 11200, completion: 87 },
    { state: 'Chhattisgarh', families: 8900, area: 9800, completion: 91 },
    { state: 'Madhya Pradesh', families: 11200, area: 13400, completion: 89 },
    { state: 'Andhra Pradesh', families: 7600, area: 8900, completion: 96 },
    { state: 'Telangana', families: 6400, area: 7200, completion: 93 }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const chartVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  // Statistics counters
  const totalClaimsCount = useCounter(47892, 2000);
  const pendingCount = useCounter(12847, 2200);
  const approvedCount = useCounter(28956, 2400);
  const processingCount = useCounter(6089, 2600);

  // Initialize data
  useEffect(() => {
    const initTimer = setTimeout(() => {
      setLoading(false);
      setKpiData({
        totalClaims: 47892,
        processedToday: 2847,
        aiAccuracy: 98.4,
        efficiency: 97.1,
        tribalFamilies: 56789,
        landCoverage: 84.7,
        processingSpeed: 2.3,
        satisfaction: 96.8
      });
    }, 2000);

    // Real-time updates
    const realTimeTimer = setInterval(() => {
      const newEntry = {
        time: new Date().toLocaleTimeString(),
        value: Math.floor(Math.random() * 100) + 50,
        secondary: Math.floor(Math.random() * 50) + 25
      };
      setRealTimeData(prev => [...prev.slice(-9), newEntry]);
    }, 5000);

    return () => {
      clearTimeout(initTimer);
      clearInterval(realTimeTimer);
    };
  }, []);

  // Advanced KPI Card Component
  const AdvancedKPICard = ({ title, value, subtitle, icon, gradient, trend, suffix = '', decimals = 0 }) => {
    const animatedValue = useCounter(value, 2500, decimals);
    const ref = useRef(null);
    const isInView = useInView(ref);
    const controls = useAnimation();

    useEffect(() => {
      if (isInView) {
        controls.start('visible');
      }
    }, [isInView, controls]);

    return (
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="hidden"
        animate={controls}
        whileHover="hover"
        style={{ height: '100%' }}
      >
        <Card 
          sx={{
            height: 200,
            background: gradient,
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
              pointerEvents: 'none'
            }
          }}
          onClick={() => setSelectedChart(title)}
        >
          <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500, mb: 1 }}>
                  {title}
                </Typography>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 700, 
                    fontSize: '2.5rem',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: 1,
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  {decimals > 0 ? animatedValue.toFixed(decimals) : animatedValue.toLocaleString()}{suffix}
                </Typography>
              </Box>
              <Box sx={{ 
                width: 60, 
                height: 60,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)'
              }}>
                {icon}
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ opacity: 0.8, fontSize: 13 }}>
                {subtitle}
              </Typography>
              {trend && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  {trend > 0 ? 
                    <TrendingUp sx={{ fontSize: 18, color: '#4CAF50' }} /> : 
                    <TrendingDown sx={{ fontSize: 18, color: '#F44336' }} />
                  }
                  <Typography variant="caption" sx={{ 
                    fontWeight: 600,
                    fontSize: 12
                  }}>
                    {Math.abs(trend)}%
                  </Typography>
                </motion.div>
              )}
            </Box>

            {/* Animated background elements */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: -20,
                right: -20,
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                zIndex: 0
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  // Advanced Chart Container
  const ChartContainer = ({ title, icon, children, fullWidth = false, height = 400 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref);
    const controls = useAnimation();

    useEffect(() => {
      if (isInView) {
        controls.start('visible');
      }
    }, [isInView, controls]);

    return (
      <motion.div
        ref={ref}
        variants={chartVariants}
        initial="hidden"
        animate={controls}
        style={{ gridColumn: fullWidth ? '1 / -1' : 'auto' }}
      >
        <Card 
          sx={{ 
            height,
            background: colors.background,
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            border: `1px solid ${alpha(colors.primary, 0.1)}`,
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
              transform: 'translateY(-2px)',
              transition: 'all 0.3s ease'
            }
          }}
        >
          <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {icon}
                <Typography variant="h6" sx={{ fontWeight: 600, color: colors.primary }}>
                  {title}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Refresh">
                  <IconButton size="small" sx={{ color: colors.secondary }}>
                    <Refresh />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Fullscreen">
                  <IconButton size="small" sx={{ color: colors.secondary }}>
                    <Fullscreen />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            
            <Box sx={{ flex: 1, position: 'relative' }}>
              {children}
            </Box>

            {/* Live indicator */}
            <motion.div
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 11,
                fontWeight: 600,
                color: colors.success
              }}
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: colors.success
                }}
              />
              LIVE
            </motion.div>
          </Box>
        </Card>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{ background: colors.surface }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              style={{
                width: 100,
                height: 100,
                border: `4px solid ${alpha(colors.primary, 0.2)}`,
                borderTop: `4px solid ${colors.primary}`,
                borderRadius: '50%'
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              style={{
                position: 'absolute',
                fontSize: 24
              }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🏆
            </motion.div>
          </Box>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Typography variant="h4" sx={{ mt: 3, color: colors.primary, fontWeight: 700, textAlign: 'center' }}>
            🚀 SIH Winner Dashboard
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: colors.secondary, textAlign: 'center' }}>
            Loading advanced analytics and AI insights...
          </Typography>
        </motion.div>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: colors.surface,
      p: 3
    }}>
      {/* Simple Info Section - GUARANTEED TO SHOW */}
      <div style={{
        backgroundColor: '#2E7D32',
        color: 'white',
        padding: '30px',
        marginBottom: '30px',
        borderRadius: '12px',
        textAlign: 'center',
        border: '3px solid #1565C0',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
      }}>
        <h1 style={{ margin: '0 0 20px 0', fontSize: '2.5rem', fontWeight: '800' }}>🏆 SIH Winner Dashboard 2024</h1>
        <h2 style={{ margin: '0 0 25px 0', fontSize: '1.5rem', fontWeight: '400', opacity: '0.9' }}>Forest Rights Atlas - Advanced AI Analytics Platform</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginBottom: '25px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>98.4%</div>
            <div style={{ fontSize: '1rem', opacity: '0.8' }}>AI Accuracy Rate</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>2.3 min</div>
            <div style={{ fontSize: '1rem', opacity: '0.8' }}>Avg Processing Time</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>56,789+</div>
            <div style={{ fontSize: '1rem', opacity: '0.8' }}>Tribal Families Served</div>
          </div>
        </div>
        <p style={{ fontSize: '1.1rem', margin: '0', lineHeight: '1.6', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          🚀 Our AI-powered dashboard provides comprehensive insights through interactive charts and real-time data visualization for efficient Forest Rights Atlas management across India. Advanced machine learning algorithms ensure 98.4% accuracy with lightning-fast processing.
        </p>
      </div>
      
      {/* Charts Information Section - SIMPLE VERSION */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '25px',
        marginBottom: '30px',
        borderRadius: '12px',
        border: '2px solid #1565C0'
      }}>
        <h2 style={{ textAlign: 'center', color: '#2E7D32', fontSize: '2rem', fontWeight: '700', marginBottom: '20px' }}>📊 Dashboard Charts Information</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <h3 style={{ color: '#FF7043', fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px' }}>📈 Performance Analytics</h3>
            <p style={{ color: '#1565C0', margin: '0', lineHeight: '1.5', fontSize: '0.95rem' }}>Multi-layered area chart showing claims received vs processed over time with efficiency tracking and trend analysis.</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <h3 style={{ color: '#1565C0', fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px' }}>🥧 AI Processing Pipeline</h3>
            <p style={{ color: '#1565C0', margin: '0', lineHeight: '1.5', fontSize: '0.95rem' }}>Interactive doughnut chart displaying AI processing time distribution across different verification stages.</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <h3 style={{ color: '#2E7D32', fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px' }}>🎯 System Performance</h3>
            <p style={{ color: '#1565C0', margin: '0', lineHeight: '1.5', fontSize: '0.95rem' }}>6-axis radar chart comparing current vs target performance across Speed, Accuracy, Coverage, and Satisfaction.</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <h3 style={{ color: '#1565C0', fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px' }}>⏱️ Real-time Queue</h3>
            <p style={{ color: '#1565C0', margin: '0', lineHeight: '1.5', fontSize: '0.95rem' }}>Live line chart monitoring processing queue length, completed claims, and error rates with real-time updates.</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <h3 style={{ color: '#FF7043', fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px' }}>🌍 Geographic Coverage</h3>
            <p style={{ color: '#1565C0', margin: '0', lineHeight: '1.5', fontSize: '0.95rem' }}>State-wise bar chart showing tribal families served and completion percentages across Indian states and territories.</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <h3 style={{ color: '#2E7D32', fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px' }}>⚡ Processing Speed</h3>
            <p style={{ color: '#1565C0', margin: '0', lineHeight: '1.5', fontSize: '0.95rem' }}>Animated bar chart comparing average vs peak processing times, showing system efficiency improvements over months.</p>
          </div>
        </div>
        <div style={{ marginTop: '20px', textAlign: 'center', backgroundColor: 'rgba(46, 125, 50, 0.1)', padding: '15px', borderRadius: '8px' }}>
          <strong style={{ color: '#2E7D32', fontSize: '1.1rem' }}>🎯 Interactive Features: </strong>
          <span style={{ color: '#1565C0' }}>Click charts for details • Hover for highlights • Real-time updates • Fully responsive</span>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div variants={cardVariants}>
          <Card 
            sx={{ 
              mb: 4, 
              background: colors.gradient1,
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '300px'
            }}
          >
            <Box sx={{ p: 4, textAlign: 'center', position: 'relative', zIndex: 2 }}>
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontWeight: 900, 
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    textShadow: '0 4px 8px rgba(0,0,0,0.3)'
                  }}
                >
                  🏆 SIH Winner Dashboard 2024
                </Typography>
                
                <Typography 
                  variant="h4" 
                  sx={{ 
                    mb: 3, 
                    fontWeight: 400,
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    opacity: 0.9
                  }}
                >
                  Forest Rights Atlas - Advanced AI Analytics Platform
                </Typography>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <Grid container spacing={4} sx={{ mt: 2, justifyContent: 'center' }}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                        98.4%
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        AI Accuracy Rate
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                        2.3 min
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Average Processing Time
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                        56,789+
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Tribal Families Served
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Button 
                    variant="contained" 
                    size="large"
                    sx={{ 
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.3)',
                      '&:hover': { background: 'rgba(255,255,255,0.3)' },
                      px: 4,
                      py: 1.5
                    }}
                  >
                    📊 View Analytics
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    sx={{ 
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.5)',
                      '&:hover': { 
                        borderColor: 'white',
                        background: 'rgba(255,255,255,0.1)'
                      },
                      px: 4,
                      py: 1.5
                    }}
                  >
                    📁 Manage Claims
                  </Button>
                </Box>
              </motion.div>
            </Box>
            
            {/* Background animated elements */}
            <motion.div
              style={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                zIndex: 1
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            
            <motion.div
              style={{
                position: 'absolute',
                bottom: -30,
                left: -30,
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                zIndex: 1
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.05, 0.2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2
              }}
            />
          </Card>
        </motion.div>

        {/* Key Features Section */}
        <motion.div variants={cardVariants}>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={3}>
              <Card 
                sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  height: '100%',
                  background: 'rgba(255, 112, 67, 0.05)',
                  border: '1px solid rgba(255, 112, 67, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(255, 112, 67, 0.2)'
                  }
                }}
              >
                <Typography variant="h2" sx={{ color: colors.accent, mb: 2 }}>🤖</Typography>
                <Typography variant="h6" sx={{ color: colors.accent, fontWeight: 600, mb: 1 }}>
                  AI-Powered Processing
                </Typography>
                <Typography variant="body2" sx={{ color: colors.secondary, opacity: 0.8 }}>
                  Advanced machine learning algorithms for faster and more accurate claim processing
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card 
                sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  height: '100%',
                  background: 'rgba(21, 101, 192, 0.05)',
                  border: '1px solid rgba(21, 101, 192, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(21, 101, 192, 0.2)'
                  }
                }}
              >
                <Typography variant="h2" sx={{ color: colors.secondary, mb: 2 }}>📊</Typography>
                <Typography variant="h6" sx={{ color: colors.secondary, fontWeight: 600, mb: 1 }}>
                  Real-Time Analytics
                </Typography>
                <Typography variant="body2" sx={{ color: colors.secondary, opacity: 0.8 }}>
                  Live monitoring and comprehensive analytics dashboard for informed decision making
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card 
                sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  height: '100%',
                  background: 'rgba(46, 125, 50, 0.05)',
                  border: '1px solid rgba(46, 125, 50, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(46, 125, 50, 0.2)'
                  }
                }}
              >
                <Typography variant="h2" sx={{ color: colors.primary, mb: 2 }}>🛡️</Typography>
                <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600, mb: 1 }}>
                  Secure & Compliant
                </Typography>
                <Typography variant="body2" sx={{ color: colors.secondary, opacity: 0.8 }}>
                  Government-grade security with full compliance to data protection regulations
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card 
                sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  height: '100%',
                  background: 'rgba(46, 125, 50, 0.05)',
                  border: '1px solid rgba(46, 125, 50, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(46, 125, 50, 0.2)'
                  }
                }}
              >
                <Typography variant="h2" sx={{ color: colors.primary, mb: 2 }}>🌍</Typography>
                <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600, mb: 1 }}>
                  National Coverage
                </Typography>
                <Typography variant="body2" sx={{ color: colors.secondary, opacity: 0.8 }}>
                  Comprehensive coverage across all states and union territories of India
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </motion.div>

        {/* Charts Information Section */}
        <motion.div variants={cardVariants}>
          <Card 
            sx={{ 
              mb: 4, 
              background: colors.background,
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              border: `1px solid ${alpha(colors.secondary, 0.1)}`,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ p: 4 }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  textAlign: 'center',
                  color: colors.primary,
                  fontWeight: 700,
                  mb: 2,
                  fontSize: '2rem'
                }}
              >
                📊 Advanced Analytics & Chart Insights
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  textAlign: 'center',
                  color: colors.secondary,
                  mb: 4,
                  opacity: 0.8,
                  maxWidth: 800,
                  mx: 'auto'
                }}
              >
                Our AI-powered dashboard provides comprehensive insights through interactive charts and real-time data visualization for Forest Rights Atlas management.
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                    <Box 
                      sx={{ 
                        width: 50, 
                        height: 50, 
                        borderRadius: 2,
                        background: colors.gradient2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <ShowChart sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600, mb: 1 }}>
                        Performance Analytics Chart
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.secondary, opacity: 0.8, lineHeight: 1.6 }}>
                        Multi-layered area chart showing claims received vs processed over time, with efficiency percentage overlay. Helps track system performance and identify processing bottlenecks.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                    <Box 
                      sx={{ 
                        width: 50, 
                        height: 50, 
                        borderRadius: 2,
                        background: colors.gradient1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <PieChartIcon sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600, mb: 1 }}>
                        AI Processing Pipeline
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.secondary, opacity: 0.8, lineHeight: 1.6 }}>
                        Interactive doughnut chart displaying AI processing time distribution across different stages: Document Analysis, Land Verification, and Final Approval.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                    <Box 
                      sx={{ 
                        width: 50, 
                        height: 50, 
                        borderRadius: 2,
                        background: colors.gradient3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Analytics sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600, mb: 1 }}>
                        System Performance Radar
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.secondary, opacity: 0.8, lineHeight: 1.6 }}>
                        6-axis radar chart comparing current performance metrics against target values across Speed, Accuracy, Coverage, Satisfaction, Compliance, and Innovation.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                    <Box 
                      sx={{ 
                        width: 50, 
                        height: 50, 
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #1565C0 0%, #4CAF50 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Timeline sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600, mb: 1 }}>
                        Real-time Processing Queue
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.secondary, opacity: 0.8, lineHeight: 1.6 }}>
                        Live line chart monitoring queue length, processed claims, and error rates throughout the day with real-time updates every few seconds.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                    <Box 
                      sx={{ 
                        width: 50, 
                        height: 50, 
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #FF7043 0%, #4CAF50 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Assessment sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600, mb: 1 }}>
                        Geographic Coverage
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.secondary, opacity: 0.8, lineHeight: 1.6 }}>
                        State-wise bar chart showing tribal families served and completion percentages across different states and union territories of India.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                    <Box 
                      sx={{ 
                        width: 50, 
                        height: 50, 
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #2E7D32 0%, #FF7043 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Speed sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600, mb: 1 }}>
                        Processing Speed Analysis
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.secondary, opacity: 0.8, lineHeight: 1.6 }}>
                        Animated bar chart comparing average vs peak processing times, demonstrating the improvement in system efficiency over the months.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/* Interactive Features Info */}
              <Box sx={{ mt: 4, p: 3, background: 'rgba(46, 125, 50, 0.02)', borderRadius: 3, border: `1px solid ${alpha(colors.primary, 0.1)}` }}>
                <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600, mb: 2, textAlign: 'center' }}>
                  🎯 Interactive Chart Features
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ color: colors.secondary, fontWeight: 600 }}>🖱️ Click</Typography>
                      <Typography variant="caption" sx={{ color: colors.secondary, opacity: 0.7 }}>Detailed insights</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ color: colors.secondary, fontWeight: 600 }}>🎨 Hover</Typography>
                      <Typography variant="caption" sx={{ color: colors.secondary, opacity: 0.7 }}>Data highlights</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ color: colors.secondary, fontWeight: 600 }}>🔄 Real-time</Typography>
                      <Typography variant="caption" sx={{ color: colors.secondary, opacity: 0.7 }}>Live updates</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ color: colors.secondary, fontWeight: 600 }}>📱 Responsive</Typography>
                      <Typography variant="caption" sx={{ color: colors.secondary, opacity: 0.7 }}>All devices</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Card>
        </motion.div>

        {/* Charts Information Section - VISIBLE */}
        <motion.div variants={cardVariants}>
          <Box sx={{ mb: 4, p: 4, backgroundColor: 'rgba(46, 125, 50, 0.02)', borderRadius: 3, border: '2px solid #2E7D32' }}>
            <Typography 
              variant="h3" 
              sx={{ 
                textAlign: 'center',
                color: colors.primary,
                fontWeight: 800,
                mb: 2,
                fontSize: '2.5rem'
              }}
            >
              📊 About Our Dashboard Charts
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{ 
                textAlign: 'center',
                color: colors.secondary,
                mb: 4,
                maxWidth: 900,
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Our advanced analytics dashboard features 6 professional charts providing comprehensive insights into Forest Rights Atlas management with real-time data visualization and AI-powered analytics.
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 3, height: '100%', background: 'rgba(255, 112, 67, 0.05)', border: '1px solid rgba(255, 112, 67, 0.2)' }}>
                  <Typography variant="h5" sx={{ color: colors.accent, fontWeight: 700, mb: 2, textAlign: 'center' }}>
                    📈 Performance Analytics
                  </Typography>
                  <Typography variant="body1" sx={{ color: colors.secondary, textAlign: 'center', lineHeight: 1.6 }}>
                    Multi-layered area chart showing claims received vs processed over time with efficiency tracking
                  </Typography>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 3, height: '100%', background: 'rgba(21, 101, 192, 0.05)', border: '1px solid rgba(21, 101, 192, 0.2)' }}>
                  <Typography variant="h5" sx={{ color: colors.secondary, fontWeight: 700, mb: 2, textAlign: 'center' }}>
                    🥧 AI Processing Pipeline
                  </Typography>
                  <Typography variant="body1" sx={{ color: colors.secondary, textAlign: 'center', lineHeight: 1.6 }}>
                    Interactive doughnut chart showing AI processing time distribution across different stages
                  </Typography>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 3, height: '100%', background: 'rgba(46, 125, 50, 0.05)', border: '1px solid rgba(46, 125, 50, 0.2)' }}>
                  <Typography variant="h5" sx={{ color: colors.primary, fontWeight: 700, mb: 2, textAlign: 'center' }}>
                    🎯 System Performance
                  </Typography>
                  <Typography variant="body1" sx={{ color: colors.secondary, textAlign: 'center', lineHeight: 1.6 }}>
                    6-axis radar chart comparing current vs target performance across key metrics
                  </Typography>
                </Card>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4, p: 3, background: 'white', borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600, mb: 2 }}>
                🎯 Interactive Features: Click charts for details • Hover for highlights • Real-time updates • Fully responsive
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Statistics Bar */}
        <motion.div variants={cardVariants}>
          <Card 
            sx={{ 
              mb: 4, 
              background: colors.background,
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              border: `1px solid ${alpha(colors.primary, 0.1)}`,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ p: 3 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  textAlign: 'center',
                  color: colors.primary,
                  fontWeight: 600,
                  mb: 3,
                  fontSize: '1.2rem'
                }}
              >
                📊 Real-time System Overview
              </Typography>
              
              <Grid container spacing={3}>
                {/* Total Claims */}
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <Box 
                        className="sih-stats-circle"
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          borderRadius: '50%',
                          background: colors.gradient2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 12px',
                          boxShadow: '0 8px 20px rgba(255, 112, 67, 0.3)'
                        }}
                      >
                        <Typography 
                          className="sih-stats-number"
                          variant="h4" 
                          sx={{ 
                            color: 'white',
                            fontWeight: 800,
                            fontSize: '1.8rem'
                          }}
                        >
                          {totalClaimsCount.toLocaleString()}
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ color: colors.accent, fontWeight: 600 }}>
                        Total Claims
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.secondary, opacity: 0.7 }}>
                        All Applications
                      </Typography>
                    </motion.div>
                  </Box>
                </Grid>

                {/* Pending */}
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <Box 
                        className="sih-stats-circle"
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 12px',
                          boxShadow: '0 8px 20px rgba(255, 152, 0, 0.3)'
                        }}
                      >
                        <Typography 
                          className="sih-stats-number"
                          variant="h4" 
                          sx={{ 
                            color: 'white',
                            fontWeight: 800,
                            fontSize: '1.8rem'
                          }}
                        >
                          {pendingCount.toLocaleString()}
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ color: '#FF9800', fontWeight: 600 }}>
                        Pending
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.secondary, opacity: 0.7 }}>
                        Under Review
                      </Typography>
                    </motion.div>
                  </Box>
                </Grid>

                {/* Approved */}
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      <Box 
                        className="sih-stats-circle"
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          borderRadius: '50%',
                          background: colors.gradient1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 12px',
                          boxShadow: '0 8px 20px rgba(46, 125, 50, 0.3)'
                        }}
                      >
                        <Typography 
                          className="sih-stats-number"
                          variant="h4" 
                          sx={{ 
                            color: 'white',
                            fontWeight: 800,
                            fontSize: '1.8rem'
                          }}
                        >
                          {approvedCount.toLocaleString()}
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ color: colors.primary, fontWeight: 600 }}>
                        Approved
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.secondary, opacity: 0.7 }}>
                        Successfully Processed
                      </Typography>
                    </motion.div>
                  </Box>
                </Grid>

                {/* Processing */}
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    >
                      <Box 
                        className="sih-stats-circle"
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 12px',
                          boxShadow: '0 8px 20px rgba(21, 101, 192, 0.3)',
                          position: 'relative'
                        }}
                      >
                        <Typography 
                          className="sih-stats-number"
                          variant="h4" 
                          sx={{ 
                            color: 'white',
                            fontWeight: 800,
                            fontSize: '1.8rem'
                          }}
                        >
                          {processingCount.toLocaleString()}
                        </Typography>
                        
                        {/* Animated processing indicator */}
                        <motion.div
                          className="sih-processing-dot"
                          style={{
                            position: 'absolute',
                            top: -2,
                            right: -2,
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            background: '#4CAF50'
                          }}
                          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </Box>
                      <Typography variant="body1" sx={{ color: colors.secondary, fontWeight: 600 }}>
                        Processing
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.secondary, opacity: 0.7 }}>
                        Currently Active
                      </Typography>
                    </motion.div>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            
            {/* Background decoration */}
            <motion.div
              style={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.05) 0%, rgba(21, 101, 192, 0.05) 100%)',
                zIndex: 0
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </Card>
        </motion.div>

        {/* KPI Cards */}
        <motion.div variants={cardVariants}>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <AdvancedKPICard
                title="Total Claims"
                value={kpiData.totalClaims}
                subtitle="Forest Rights Applications"
                icon={<Assessment sx={{ fontSize: 32, color: 'white' }} />}
                gradient={colors.gradient1}
                trend={12.5}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AdvancedKPICard
                title="AI Accuracy"
                value={kpiData.aiAccuracy}
                subtitle="Real-time Processing"
                icon={<Psychology sx={{ fontSize: 32, color: 'white' }} />}
                gradient={colors.gradient2}
                trend={5.2}
                suffix="%"
                decimals={1}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AdvancedKPICard
                title="Tribal Families"
                value={kpiData.tribalFamilies}
                subtitle="Beneficiaries Served"
                icon={<People sx={{ fontSize: 32, color: 'white' }} />}
                gradient={colors.gradient3}
                trend={18.7}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AdvancedKPICard
                title="Processing Speed"
                value={kpiData.processingSpeed}
                subtitle="Minutes per Application"
                icon={<Speed sx={{ fontSize: 32, color: 'white' }} />}
                gradient={colors.gradient1}
                trend={-15.3}
                decimals={1}
              />
            </Grid>
          </Grid>
        </motion.div>

        {/* Charts Grid */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: 3, 
          mb: 4 
        }}>
          {/* Performance Trends */}
          <ChartContainer 
            title="Performance Analytics" 
            icon={<ShowChart sx={{ color: colors.primary }} />}
            fullWidth
            height={450}
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={performanceData}>
                <defs>
                  <linearGradient id="claimsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={colors.primary} stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="processedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={colors.secondary} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={alpha(colors.primary, 0.1)} />
                <XAxis dataKey="month" stroke={colors.primary} />
                <YAxis yAxisId="left" stroke={colors.primary} />
                <YAxis yAxisId="right" orientation="right" stroke={colors.secondary} />
                <RechartsTooltip 
                  contentStyle={{
                    backgroundColor: colors.background,
                    border: `1px solid ${colors.primary}`,
                    borderRadius: 8,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }}
                />
                <RechartsLegend />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="claims" 
                  stroke={colors.primary}
                  strokeWidth={3}
                  fill="url(#claimsGradient)"
                  name="Claims Received"
                />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="processed" 
                  stroke={colors.secondary}
                  strokeWidth={3}
                  fill="url(#processedGradient)"
                  name="Claims Processed"
                />
                <RechartsLine 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke={colors.accent}
                  strokeWidth={4}
                  dot={{ fill: colors.accent, strokeWidth: 2, r: 6 }}
                  name="Efficiency %"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* AI Processing Distribution */}
          <ChartContainer 
            title="AI Processing Pipeline" 
            icon={<PieChartIcon sx={{ color: colors.secondary }} />}
            height={400}
          >
            <Doughnut
              data={aiProcessingData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: colors.primary,
                      font: { size: 12 },
                      padding: 20
                    }
                  },
                  tooltip: {
                    backgroundColor: colors.background,
                    titleColor: colors.primary,
                    bodyColor: colors.secondary,
                    borderColor: colors.primary,
                    borderWidth: 1
                  }
                },
                cutout: '60%',
                animation: {
                  animateRotate: true,
                  animateScale: true,
                  duration: 2000
                }
              }}
            />
          </ChartContainer>

          {/* Efficiency Radar */}
          <ChartContainer 
            title="System Performance Radar" 
            icon={<Analytics sx={{ color: colors.accent }} />}
            height={400}
          >
            <Radar
              data={efficiencyRadarData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: colors.primary,
                      font: { size: 12 }
                    }
                  }
                },
                scales: {
                  r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      color: colors.secondary,
                      font: { size: 10 }
                    },
                    grid: {
                      color: alpha(colors.primary, 0.2)
                    },
                    angleLines: {
                      color: alpha(colors.primary, 0.2)
                    }
                  }
                },
                animation: {
                  duration: 2000,
                  easing: 'easeInOutQuart'
                }
              }}
            />
          </ChartContainer>

          {/* Real-time Processing */}
          <ChartContainer 
            title="Real-time Processing Queue" 
            icon={<Timeline sx={{ color: colors.primary }} />}
            height={400}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={realTimeProcessingData}>
                <CartesianGrid strokeDasharray="3 3" stroke={alpha(colors.primary, 0.1)} />
                <XAxis dataKey="time" stroke={colors.primary} />
                <YAxis stroke={colors.primary} />
                <RechartsTooltip 
                  contentStyle={{
                    backgroundColor: colors.background,
                    border: `1px solid ${colors.primary}`,
                    borderRadius: 8
                  }}
                />
                <RechartsLegend />
                <RechartsLine 
                  type="monotone" 
                  dataKey="queue" 
                  stroke={colors.accent}
                  strokeWidth={3}
                  dot={{ fill: colors.accent, strokeWidth: 2, r: 5 }}
                  name="Queue Length"
                />
                <RechartsLine 
                  type="monotone" 
                  dataKey="processed" 
                  stroke={colors.secondary}
                  strokeWidth={3}
                  dot={{ fill: colors.secondary, strokeWidth: 2, r: 5 }}
                  name="Processed"
                />
                <RechartsLine 
                  type="monotone" 
                  dataKey="errors" 
                  stroke="#F44336"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "#F44336", strokeWidth: 2, r: 4 }}
                  name="Errors"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Geographic Distribution */}
          <ChartContainer 
            title="Geographic Coverage" 
            icon={<Satellite sx={{ color: colors.secondary }} />}
            height={400}
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={geographicData}>
                <CartesianGrid strokeDasharray="3 3" stroke={alpha(colors.primary, 0.1)} />
                <XAxis dataKey="state" stroke={colors.primary} angle={-45} textAnchor="end" height={100} />
                <YAxis stroke={colors.primary} />
                <RechartsTooltip 
                  contentStyle={{
                    backgroundColor: colors.background,
                    border: `1px solid ${colors.primary}`,
                    borderRadius: 8
                  }}
                />
                <RechartsLegend />
                <RechartsBar dataKey="families" fill={colors.primary} name="Families" radius={[4, 4, 0, 0]} />
                <RechartsBar dataKey="completion" fill={colors.secondary} name="Completion %" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Processing Speed Metrics */}
          <ChartContainer 
            title="Processing Speed Analysis" 
            icon={<Speed sx={{ color: colors.accent }} />}
            height={400}
          >
            <Bar
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                  label: 'Average Processing Time (hours)',
                  data: [24, 18, 15, 12, 8, 6, 4],
                  backgroundColor: colors.gradient1,
                  borderColor: colors.primary,
                  borderWidth: 2,
                  borderRadius: 8,
                  borderSkipped: false
                }, {
                  label: 'Peak Processing Time (hours)',
                  data: [48, 36, 28, 22, 16, 12, 8],
                  backgroundColor: alpha(colors.accent, 0.7),
                  borderColor: colors.accent,
                  borderWidth: 2,
                  borderRadius: 8,
                  borderSkipped: false
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      color: colors.primary,
                      font: { size: 12 }
                    }
                  }
                },
                scales: {
                  x: {
                    ticks: { color: colors.primary },
                    grid: { color: alpha(colors.primary, 0.1) }
                  },
                  y: {
                    ticks: { color: colors.primary },
                    grid: { color: alpha(colors.primary, 0.1) }
                  }
                },
                animation: {
                  duration: 2000,
                  easing: 'easeInOutBounce'
                }
              }}
            />
          </ChartContainer>
        </Box>

        {/* Action Buttons */}
        <motion.div
          variants={cardVariants}
          style={{ 
            position: 'fixed', 
            bottom: 24, 
            right: 24, 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 12 
          }}
        >
          <Tooltip title="Download Report">
            <IconButton 
              sx={{ 
                background: colors.gradient1,
                color: 'white',
                '&:hover': { background: colors.gradient2, transform: 'scale(1.1)' },
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              <Download />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Share Dashboard">
            <IconButton 
              sx={{ 
                background: colors.gradient2,
                color: 'white',
                '&:hover': { background: colors.gradient3, transform: 'scale(1.1)' },
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              <Share />
            </IconButton>
          </Tooltip>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default SIHWinnerDashboard;