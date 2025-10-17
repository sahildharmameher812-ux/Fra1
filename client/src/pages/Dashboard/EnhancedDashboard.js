import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  useTheme,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Tabs,
  Tab,
  IconButton,
  Tooltip as MuiTooltip,
  Snackbar,
  Alert
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ComposedChart,
  Treemap
} from 'recharts';
import { 
  TrendingUp, 
  Assessment, 
  People, 
  Agriculture, 
  Speed, 
  Psychology, 
  Refresh, 
  Fullscreen, 
  FullscreenExit, 
  BarChart as BarChartIcon, 
  PieChart as PieChartIcon, 
  Timeline, 
  Public, 
  EmojiEvents,
  Nature,
  Forest,
  Terrain,
  HomeWork,
  Description,
  TrendingDown,
  FilterAlt
} from '@mui/icons-material';
import './StunningDashboard.css';
import '../../dashboard-spacing-fix.css';
import {
  NotificationSystem,
  DashboardControls,
  LiveMetricsTicker,
  PerformanceIndicators,
  EnhancedTooltip
} from './InteractiveDashboardFeatures';

// Add new custom CSS for enhanced transitions
const customStyles = `
.dashboard-card {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.dashboard-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  z-index: 1;
  border-color: rgba(255, 152, 0, 0.3);
}

.stat-card-pulse {
  animation: pulse-animation 2s infinite;
}

.chart-appear {
  animation: chart-appear 0.8s forwards cubic-bezier(0.26, 0.86, 0.44, 0.985);
  opacity: 0;
  transform: translateY(20px) scale(0.97);
}

.color-indicator {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 6px;
  border-radius: 50%;
}

.tag-chip {
  font-size: 11px;
  height: 22px;
  margin-left: 8px;
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(76, 175, 80, 0.1) 100%);
  border: 1px solid rgba(76, 175, 80, 0.2);
  color: #333;
  font-weight: 500;
}

.live-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  font-size: 10px;
  background: linear-gradient(135deg, #4caf50 0%, #1976d2 100%);
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.live-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: white;
  border-radius: 50%;
  animation: live-pulse 1.5s infinite;
}

.dashboard-title {
  background: linear-gradient(135deg, #ff9800 0%, #4caf50 50%, #1976d2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: title-shimmer 4s infinite;
  background-size: 200% 100%;
}

.card-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #ff9800;
  color: white;
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

@keyframes chart-appear {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.97);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes pulse-animation {
  0% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
  }
}

@keyframes live-pulse {
  0% {
    opacity: 0.4;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    opacity: 0.4;
    transform: scale(0.8);
  }
}

@keyframes title-shimmer {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.filter-chip {
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: white;
  color: #333;
  font-weight: 500;
  transition: all 0.2s ease;
}

.filter-chip:hover, .filter-chip.active {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(76, 175, 80, 0.1) 100%);
  border-color: rgba(76, 175, 80, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.map-container {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  height: 100%;
  background: linear-gradient(135deg, #e3f2fd 0%, #e8f5e9 100%);
  border: 1px solid rgba(25, 118, 210, 0.1);
}

.map-content {
  position: relative;
  height: 100%;
  background-image: url('https://maps.googleapis.com/maps/api/staticmap?center=India&zoom=5&size=600x400&maptype=terrain&style=feature:administrative.country|element:geometry|color:0x4caf50&style=feature:water|color:0x1976d2&key=YOUR_API_KEY');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-placeholder {
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 12px;
  max-width: 80%;
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 100%);
}

.dashboard-btn {
  text-transform: none;
  border-radius: 8px;
  font-weight: 500;
  padding: 6px 16px;
  transition: all 0.2s ease;
  background: white;
  color: #333;
  border: 1px solid rgba(0,0,0,0.1);
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.dashboard-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  background: white;
}

.dashboard-btn.primary {
  background: linear-gradient(135deg, #1976d2 0%, #2196f3 100%);
  color: white;
  border: none;
}

.dashboard-btn.primary:hover {
  background: linear-gradient(135deg, #1565c0 0%, #1976d2 100%);
}

.dashboard-btn.success {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
  color: white;
  border: none;
}

.dashboard-btn.success:hover {
  background: linear-gradient(135deg, #388e3c 0%, #4caf50 100%);
}

.dashboard-btn.warning {
  background: linear-gradient(135deg, #ff9800 0%, #ffb74d 100%);
  color: white;
  border: none;
}

.dashboard-btn.warning:hover {
  background: linear-gradient(135deg, #f57c00 0%, #ff9800 100%);
}

.chart-tabs {
  margin-bottom: 16px;
}

.chart-tab {
  text-transform: none;
  font-size: 12px;
  min-height: 36px;
}
`;

const EnhancedDashboard = ({ onNavigateHome }) => {
  const theme = useTheme();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeChartTab, setActiveChartTab] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredStatCard, setHoveredStatCard] = useState(null);
  const [refreshingData, setRefreshingData] = useState(false);
  const [showInteractiveFeatures, setShowInteractiveFeatures] = useState(true);
  const [dashboardMessage, setDashboardMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Create a reference to append custom styles
  const customStyleRef = useRef();

  // SIH color scheme
  const colors = {
    primary: '#1976d2',      // Blue
    secondary: '#4caf50',    // Green  
    accent: '#ff9800',       // Orange
    light: '#ffffff',        // White
    darkBlue: '#0d47a1',
    darkGreen: '#2e7d32',
    darkOrange: '#e65100',
    lightBlue: '#bbdefb',
    lightGreen: '#c8e6c9',
    lightOrange: '#ffe0b2'
  };

  // Enhanced data for various chart types
  const monthlyData = [
    { month: 'Jan', claims: 4000, processed: 3500, approved: 3200, revenue: 85, rating: 4.5 },
    { month: 'Feb', claims: 3000, processed: 2800, approved: 2500, revenue: 78, rating: 4.2 },
    { month: 'Mar', claims: 5000, processed: 4800, approved: 4300, revenue: 92, rating: 4.7 },
    { month: 'Apr', claims: 4500, processed: 4200, approved: 3900, revenue: 88, rating: 4.4 },
    { month: 'May', claims: 6000, processed: 5800, approved: 5400, revenue: 95, rating: 4.9 },
    { month: 'Jun', claims: 5500, processed: 5300, approved: 5000, revenue: 91, rating: 4.6 },
  ];

  const pieData = [
    { name: 'Forest Rights', value: 35, color: colors.secondary },
    { name: 'Land Claims', value: 25, color: colors.primary },
    { name: 'Tribal Affairs', value: 20, color: colors.accent },
    { name: 'Others', value: 20, color: '#9c27b0' }
  ];

  const radarData = [
    { subject: 'Accuracy', A: 120, B: 110, fullMark: 150 },
    { subject: 'Speed', A: 98, B: 130, fullMark: 150 },
    { subject: 'Efficiency', A: 86, B: 130, fullMark: 150 },
    { subject: 'Quality', A: 99, B: 100, fullMark: 150 },
    { subject: 'Coverage', A: 85, B: 90, fullMark: 150 },
    { subject: 'Innovation', A: 65, B: 85, fullMark: 150 },
  ];

  const scatterData = [
    { x: 100, y: 200, z: 200, name: 'Adivasi Rights' },
    { x: 120, y: 100, z: 260, name: 'Land Mapping' },
    { x: 170, y: 300, z: 400, name: 'Forest Conservation' },
    { x: 140, y: 250, z: 280, name: 'Tribal Housing' },
    { x: 150, y: 400, z: 500, name: 'Resource Allocation' },
    { x: 110, y: 280, z: 200, name: 'Education Rights' }
  ];

  const trendData = [
    { time: '00:00', users: 120, sessions: 89, conversions: 67 },
    { time: '04:00', users: 98, sessions: 72, conversions: 54 },
    { time: '08:00', users: 180, sessions: 140, conversions: 98 },
    { time: '12:00', users: 250, sessions: 200, conversions: 145 },
    { time: '16:00', users: 320, sessions: 280, conversions: 189 },
    { time: '20:00', users: 280, sessions: 240, conversions: 167 },
  ];

  const treeMapData = [
    {
      name: 'Forest Types',
      children: [
        { name: 'Reserved Forest', size: 4000, color: colors.primary },
        { name: 'Protected Forest', size: 3000, color: colors.secondary },
        { name: 'Community Forest', size: 2000, color: colors.accent },
        { name: 'Private Forest', size: 1000, color: '#9c27b0' }
      ]
    }
  ];

  const barData = [
    { state: 'Odisha', value: 400, color: colors.primary },
    { state: 'MP', value: 300, color: colors.secondary },
    { state: 'Chhattisgarh', value: 500, color: colors.accent },
    { state: 'Jharkhand', value: 700, color: '#9c27b0' },
    { state: 'WB', value: 600, color: colors.darkBlue },
    { state: 'AP', value: 400, color: colors.darkGreen },
    { state: 'Maharashtra', value: 550, color: colors.darkOrange }
  ];

  const stateData = [
    { state: 'Madhya Pradesh', claims: 5423, approved: 4356, percent: 80.3, color: colors.primary },
    { state: 'Odisha', claims: 4821, approved: 3954, percent: 82.0, color: colors.secondary },
    { state: 'Chhattisgarh', claims: 3754, approved: 3102, percent: 82.6, color: colors.accent },
    { state: 'Jharkhand', claims: 3256, approved: 2598, percent: 79.8, color: '#9c27b0' },
    { state: 'Maharashtra', claims: 2987, approved: 2389, percent: 80.0, color: colors.darkBlue }
  ];

  // Add custom styles when component mounts
  useEffect(() => {
    // Add custom styles to head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = customStyles;
    document.head.appendChild(styleElement);
    customStyleRef.current = styleElement;

    // Animation timers
    setTimeout(() => setAnimationComplete(true), 1000);
    
    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    
    // Clean up
    return () => {
      clearInterval(timer);
      if (customStyleRef.current) {
        document.head.removeChild(customStyleRef.current);
      }
    };
  }, []);

  // Function to simulate refreshing data
  const handleRefreshData = () => {
    setRefreshingData(true);
    setTimeout(() => {
      setRefreshingData(false);
    }, 1500);
  };

  // Handler for chart tab change
  const handleChartTabChange = (event, newValue) => {
    setActiveChartTab(newValue);
  };

  // Handler for filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Handler for interactive controls
  const handleControlChange = (action, value) => {
    switch (action) {
      case 'playPause':
        setDashboardMessage(value ? 'Dashboard resumed' : 'Dashboard paused');
        setShowSuccessMessage(true);
        break;
      case 'exportComplete':
        setDashboardMessage('Dashboard report exported successfully!');
        setShowSuccessMessage(true);
        break;
      case 'linkCopied':
        setDashboardMessage('Dashboard link copied to clipboard!');
        setShowSuccessMessage(true);
        break;
      default:
        break;
    }
  };

  // Handler for new notifications
  const handleNewNotification = (notification) => {
    // Could update global state or perform other actions
    console.log('New notification:', notification);
  };

  const StatCard = ({ title, value, subtitle, icon, color, trend, index = 0, badge }) => {
    const isHovered = hoveredStatCard === index;
    const trendIsPositive = trend > 0;
    
    return (
      <Card 
        className="dashboard-card"
        sx={{
          background: `linear-gradient(135deg, ${color}08 0%, ${color}03 100%)`,
          border: `1px solid ${color}15`,
          borderRadius: '16px',
          height: 'auto',
          minHeight: '180px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: isHovered ? `0 12px 28px rgba(0,0,0,0.15), 0 0 0 2px ${color}25` : '0 2px 8px rgba(0,0,0,0.08)',
          transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        }}
        onMouseEnter={() => setHoveredStatCard(index)}
        onMouseLeave={() => setHoveredStatCard(null)}
      >
        {badge && (
          <div className="card-badge">{badge}</div>
        )}
        <CardContent sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          padding: '24px !important'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="body2" sx={{ 
                color, 
                fontWeight: 600, 
                fontSize: '13px',
                mb: '8px'
              }}>
                {title}
              </Typography>
              <Typography variant="h3" sx={{ 
                fontWeight: 700, 
                fontSize: '2.2rem',
                background: `linear-gradient(135deg, ${color} 0%, ${color}90 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.1,
                mb: 0
              }}>
                {value}
              </Typography>
            </Box>
            <Box sx={{ 
              width: 48, 
              height: 48,
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color
            }}>
              {icon}
            </Box>
          </Box>
          
          <Box>
            <Typography variant="body2" sx={{ 
              color: '#666', 
              fontSize: '12px',
              mb: trend ? '6px' : 0
            }}>
              {subtitle}
            </Typography>
            {trend && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {trendIsPositive ? (
                  <TrendingUp sx={{ fontSize: 14, color: colors.secondary }} />
                ) : (
                  <TrendingDown sx={{ fontSize: 14, color: '#f44336' }} />
                )}
                <Typography variant="caption" sx={{ 
                  color: trendIsPositive ? colors.secondary : '#f44336', 
                  fontWeight: 600,
                  fontSize: '11px'
                }}>
                  {trendIsPositive ? '+' : ''}{trend}%
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
        <Box sx={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          height: '3px',
          background: `linear-gradient(90deg, ${color}40 0%, ${color} 50%, ${color}40 100%)`,
          opacity: 0.7
        }} />
      </Card>
    );
  };

  const ChartCard = ({ title, children, height = 350, index = 0, bgColor = 'blue', actions, tabs }) => {
    const delay = index * 100;
    
    return (
      <Card 
        className="dashboard-card chart-appear"
        sx={{
          borderRadius: '16px',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          overflow: 'visible',
          position: 'relative',
          width: '100%',
          height: 'auto',
          backgroundColor: '#ffffff',
          animationDelay: `${delay}ms`,
        }}
      >
        <Box sx={{ 
          padding: '20px 24px', 
          borderBottom: '1px solid rgba(0,0,0,0.04)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6" sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            fontSize: '1.05rem',
            fontWeight: 600,
            color: '#2c3e50',
            margin: 0
          }}>
            {title}
            <Box sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: colors.secondary,
              animation: 'pulse 2s infinite'
            }} />
          </Typography>
          
          {actions && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {actions}
            </Box>
          )}
        </Box>
        
        {tabs && (
          <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
            <Tabs 
              value={activeChartTab} 
              onChange={handleChartTabChange}
              className="chart-tabs"
              textColor="primary"
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              {tabs.map((tab, i) => (
                <Tab key={i} label={tab} className="chart-tab" />
              ))}
            </Tabs>
          </Box>
        )}
        
        <Box sx={{ 
          padding: tabs ? '12px 24px 24px 24px' : '20px 24px 24px 24px',
          height,
          width: '100%',
          position: 'relative',
          overflow: 'visible'
        }}>
          <div className="live-badge">
            <span className="live-dot"></span> LIVE
          </div>
          {children}
        </Box>
      </Card>
    );
  };

  return (
    <>
      {/* Interactive Features */}
      {showInteractiveFeatures && (
        <>
          <NotificationSystem onNewNotification={handleNewNotification} />
          <DashboardControls onControlChange={handleControlChange} />
          <LiveMetricsTicker />
          <PerformanceIndicators />
        </>
      )}
      
      {/* Success Message Snackbar */}
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={3000}
        onClose={() => setShowSuccessMessage(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={() => setShowSuccessMessage(false)}
          severity="success"
          variant="filled"
          sx={{ 
            background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
            fontWeight: 600
          }}
        >
          {dashboardMessage}
        </Alert>
      </Snackbar>
      
      <Box sx={{ 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
        minHeight: '100vh',
        padding: '16px',
        paddingTop: showInteractiveFeatures ? '80px' : '16px', // Account for live ticker
        fontFamily: '"Inter", "Roboto", sans-serif'
      }}>
      {/* Header Section */}
      <Box sx={{ 
        textAlign: 'center', 
        mb: '24px',
        mx: '16px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: '32px 24px',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        position: 'relative'
      }}>
        {/* Back to Home Button */}
        {onNavigateHome && (
          <Button
            onClick={onNavigateHome}
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
              color: 'white',
              borderRadius: '20px',
              px: 2,
              py: 0.8,
              fontWeight: 600,
              fontSize: '0.85rem',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(255, 152, 0, 0.4)'
              }
            }}
            startIcon={<HomeWork sx={{ fontSize: 18 }} />}
          >
            Back to Home
          </Button>
        )}
        
        <Typography variant="h2" className="dashboard-title" sx={{ 
          fontWeight: 700,
          fontSize: '2.4rem',
          marginBottom: '8px',
          lineHeight: 1.2
        }}>
          🌲 Forest Rights Atlas Dashboard
        </Typography>
        <Typography variant="h6" sx={{ 
          color: '#555', 
          fontWeight: 400, 
          fontSize: '1.1rem',
          mb: 1
        }}>
          Comprehensive Analytics & Real-time Intelligence for Tribal Rights
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 2 }}>
          <Chip 
            label="Live Data" 
            size="small" 
            color="success" 
            sx={{ height: 24, fontWeight: 500 }} 
            icon={<Box sx={{ width: 8, height: 8, bgcolor: 'white', borderRadius: '50%', animation: 'live-pulse 1.5s infinite' }} />} 
          />
          <Chip 
            label={`Last Updated: ${currentTime.toLocaleTimeString()}`} 
            size="small" 
            variant="outlined" 
            sx={{ height: 24 }} 
          />
          <Chip 
            label="SIH 2024" 
            size="small" 
            sx={{ 
              height: 24, 
              fontWeight: 500, 
              background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)', 
              color: 'white' 
            }} 
            icon={<EmojiEvents sx={{ fontSize: 14, color: 'white' }} />} 
          />
        </Box>
      </Box>

      {/* Filter Section */}
      <Box sx={{ mx: '16px', mb: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="filter-chips">
          <Chip 
            label="All Data" 
            className={`filter-chip ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
            icon={<FilterAlt sx={{ fontSize: 16 }} />}
          />
          <Chip 
            label="Tribal Claims" 
            className={`filter-chip ${activeFilter === 'tribal' ? 'active' : ''}`}
            onClick={() => handleFilterChange('tribal')}
            icon={<People sx={{ fontSize: 16 }} />}
          />
          <Chip 
            label="Forest Coverage" 
            className={`filter-chip ${activeFilter === 'forest' ? 'active' : ''}`}
            onClick={() => handleFilterChange('forest')}
            icon={<Forest sx={{ fontSize: 16 }} />}
          />
          <Chip 
            label="Land Rights" 
            className={`filter-chip ${activeFilter === 'land' ? 'active' : ''}`}
            onClick={() => handleFilterChange('land')}
            icon={<Terrain sx={{ fontSize: 16 }} />}
          />
          <Chip 
            label="Community Housing" 
            className={`filter-chip ${activeFilter === 'housing' ? 'active' : ''}`}
            onClick={() => handleFilterChange('housing')}
            icon={<HomeWork sx={{ fontSize: 16 }} />}
          />
        </div>
        
        <Button 
          className="dashboard-btn"
          startIcon={<Refresh />}
          onClick={handleRefreshData}
          disabled={refreshingData}
        >
          {refreshingData ? <CircularProgress size={16} /> : 'Refresh Data'}
        </Button>
      </Box>

      {/* KPI Stats Grid */}
      <Grid container spacing={2} sx={{ 
        mb: '24px', 
        mx: '0px',
        '& .MuiGrid-item': {
          paddingLeft: '16px !important',
          paddingRight: '16px !important',
          paddingTop: '16px !important',
          paddingBottom: '0px !important'
        }
      }}>
        <Grid item xs={12} md={2}>
          <EnhancedTooltip
            title="Total Claims"
            description="Complete forest rights applications submitted through the FRA system"
            color={colors.primary}
          >
            <div>
              <StatCard
                title="Total Claims"
                value="24,567"
                subtitle="Forest Rights Applications"
                icon={<Assessment sx={{ fontSize: 28 }} />}
                color={colors.primary}
                trend={12.5}
                index={0}
                badge="TOP"
              />
            </div>
          </EnhancedTooltip>
        </Grid>
        <Grid item xs={12} md={2}>
          <StatCard
            title="AI Accuracy"
            value="94.2%"
            subtitle="Machine Learning Precision"
            icon={<Psychology sx={{ fontSize: 28 }} />}
            color={colors.secondary}
            trend={8.7}
            index={1}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <StatCard
            title="Families Served"
            value="45,789"
            subtitle="Tribal Beneficiaries"
            icon={<People sx={{ fontSize: 28 }} />}
            color={colors.accent}
            trend={15.3}
            index={2}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <StatCard
            title="Land Coverage"
            value="78.4%"
            subtitle="Forest Area Mapped"
            icon={<Agriculture sx={{ fontSize: 28 }} />}
            color={colors.primary}
            trend={22.1}
            index={3}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <StatCard
            title="Processing Speed"
            value="2.3s"
            subtitle="Average Response Time"
            icon={<Speed sx={{ fontSize: 28 }} />}
            color={colors.secondary}
            trend={-18.5}
            index={4}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <StatCard
            title="Success Rate"
            value="96.8%"
            subtitle="Claim Approval Rate"
            icon={<TrendingUp sx={{ fontSize: 28 }} />}
            color={colors.accent}
            trend={5.2}
            index={5}
            badge="NEW"
          />
        </Grid>
      </Grid>

      {/* Main Charts Grid */}
      <Grid container spacing={2} sx={{ 
        mb: '24px', 
        mx: '0px',
        '& .MuiGrid-item': {
          paddingLeft: '16px !important',
          paddingRight: '16px !important',
          paddingTop: '16px !important',
          paddingBottom: '0px !important'
        }
      }}>
        {/* Area Chart */}
        <Grid item xs={12} lg={8}>
          <ChartCard 
            title="📈 Claims Processing Analytics" 
            height={400} 
            index={6} 
            bgColor="blue"
            tabs={['Monthly Trend', 'Quarterly', 'Yearly', 'Regional']}
            actions={
              <MuiTooltip title="View Fullscreen">
                <IconButton size="small">
                  <Fullscreen fontSize="small" />
                </IconButton>
              </MuiTooltip>
            }
          >
            <ResponsiveContainer 
              width="100%" 
              height="100%" 
              style={{ 
                minHeight: '350px', 
                opacity: 1, 
                visibility: 'visible' 
              }}
            >
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorClaims" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={colors.primary} stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorProcessed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={colors.secondary} stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.accent} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={colors.accent} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fill: '#666', fontSize: 12 }} />
                <YAxis tick={{ fill: '#666', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }} 
                  animationDuration={300}
                  cursor={{ stroke: colors.accent, strokeWidth: 1, strokeDasharray: '5 5' }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="approved" 
                  stackId="1" 
                  stroke={colors.accent} 
                  fill="url(#colorApproved)" 
                  name="Approved" 
                  strokeWidth={2}
                  activeDot={{ r: 6, strokeWidth: 1, stroke: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="processed" 
                  stackId="1" 
                  stroke={colors.secondary} 
                  fill="url(#colorProcessed)" 
                  name="Processed" 
                  strokeWidth={2}
                  activeDot={{ r: 6, strokeWidth: 1, stroke: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="claims" 
                  stackId="1" 
                  stroke={colors.primary} 
                  fill="url(#colorClaims)" 
                  name="Total Claims" 
                  strokeWidth={2}
                  activeDot={{ r: 6, strokeWidth: 1, stroke: '#fff' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} lg={4}>
          <ChartCard 
            title="🥧 Distribution Analysis" 
            height={400} 
            index={7} 
            bgColor="green"
            tabs={['Claims Types', 'Forest Types', 'Demographics']}
          >
            <ResponsiveContainer 
              width="100%" 
              height="100%" 
              style={{ 
                minHeight: '350px', 
                opacity: 1, 
                visibility: 'visible' 
              }}
            >
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="none"
                  paddingAngle={2}
                  animationBegin={300}
                  animationDuration={1500}
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Secondary Charts Grid */}
      <Grid container spacing={2} sx={{ 
        mb: '24px', 
        mx: '0px',
        '& .MuiGrid-item': {
          paddingLeft: '16px !important',
          paddingRight: '16px !important',
          paddingTop: '16px !important',
          paddingBottom: '0px !important'
        }
      }}>
        {/* Bar Chart - State-wise data */}
        <Grid item xs={12} lg={6}>
          <ChartCard 
            title="📊 State-wise Performance" 
            height={350} 
            index={8} 
            bgColor="orange"
          >
            <ResponsiveContainer width="100%" height="100%" style={{ opacity: 1, visibility: 'visible' }}>
              <BarChart 
                data={barData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={true} vertical={false} />
                <XAxis type="number" tick={{ fill: '#666', fontSize: 12 }} />
                <YAxis 
                  type="category" 
                  dataKey="state" 
                  tick={{ fill: '#666', fontSize: 12 }} 
                  width={80}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }} 
                />
                <Bar 
                  dataKey="value" 
                  name="Claims" 
                  radius={[0, 4, 4, 0]}
                >
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Radar Chart */}
        <Grid item xs={12} lg={6}>
          <ChartCard 
            title="🎯 FRA Performance Metrics" 
            height={350} 
            index={9} 
            bgColor="purple"
          >
            <ResponsiveContainer width="100%" height="100%" style={{ opacity: 1, visibility: 'visible' }}>
              <RadarChart data={radarData} outerRadius={100}>
                <PolarGrid stroke="#e0e0e0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 11 }} />
                <PolarRadiusAxis tick={{ fill: '#666', fontSize: 10 }} />
                <Radar 
                  name="Current" 
                  dataKey="A" 
                  stroke={colors.primary} 
                  fill={colors.primary} 
                  fillOpacity={0.3} 
                  strokeWidth={2} 
                  animationDuration={1500}
                />
                <Radar 
                  name="Target" 
                  dataKey="B" 
                  stroke={colors.secondary} 
                  fill={colors.secondary} 
                  fillOpacity={0.2} 
                  strokeWidth={2} 
                  animationDuration={1500}
                  animationBegin={300}
                />
                <Legend />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Tertiary Charts Grid */}
      <Grid container spacing={2} sx={{ 
        mb: '24px', 
        mx: '0px',
        '& .MuiGrid-item': {
          paddingLeft: '16px !important',
          paddingRight: '16px !important',
          paddingTop: '16px !important',
          paddingBottom: '0px !important'
        }
      }}>
        {/* Treemap */}
        <Grid item xs={12} lg={4}>
          <ChartCard 
            title="🌳 Forest Type Distribution" 
            height={350} 
            index={10} 
            bgColor="teal"
          >
            <ResponsiveContainer width="100%" height="100%" style={{ opacity: 1, visibility: 'visible' }}>
              <Treemap
                data={treeMapData[0].children}
                dataKey="size"
                nameKey="name"
                aspectRatio={4/3}
                stroke="#fff"
                animationDuration={1000}
              >
                {treeMapData[0].children.map((item, index) => (
                  <Cell key={`cell-${index}`} fill={item.color} />
                ))}
              </Treemap>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Real-time Line Chart */}
        <Grid item xs={12} lg={4}>
          <ChartCard 
            title="📈 Real-time System Activity" 
            height={350} 
            index={11} 
            bgColor="blue"
          >
            <ResponsiveContainer width="100%" height="100%" style={{ opacity: 1, visibility: 'visible' }}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" tick={{ fill: '#666', fontSize: 11 }} />
                <YAxis tick={{ fill: '#666', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke={colors.primary} 
                  strokeWidth={3} 
                  dot={{ r: 4 }} 
                  name="Active Users"
                  activeDot={{ r: 6, strokeWidth: 1, stroke: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sessions" 
                  stroke={colors.secondary} 
                  strokeWidth={3} 
                  dot={{ r: 4 }} 
                  name="Sessions"
                  activeDot={{ r: 6, strokeWidth: 1, stroke: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="conversions" 
                  stroke={colors.accent} 
                  strokeWidth={3} 
                  dot={{ r: 4 }} 
                  name="Conversions" 
                  activeDot={{ r: 6, strokeWidth: 1, stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Interactive Map */}
        <Grid item xs={12} lg={4}>
          <ChartCard 
            title="🗺️ Geographic Distribution" 
            height={350} 
            index={12} 
            bgColor="green"
          >
            <div className="map-container">
              <div className="map-overlay"></div>
              <div className="map-content">
                <div className="map-placeholder">
                  <Typography variant="h6" sx={{ fontWeight: 600, color: colors.primary, mb: 1 }}>
                    Interactive Tribal Rights Map
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                    Visualize geographic distribution of FRA claims and approvals across India
                  </Typography>
                  <Button 
                    className="dashboard-btn primary"
                    startIcon={<Public />}
                    size="small"
                  >
                    Explore Full Map
                  </Button>
                </div>
              </div>
            </div>
          </ChartCard>
        </Grid>
      </Grid>

      {/* State-wise Data Table */}
      <Grid container spacing={2} sx={{ 
        mb: '24px', 
        mx: '0px',
        '& .MuiGrid-item': {
          paddingLeft: '16px !important',
          paddingRight: '16px !important',
          paddingTop: '16px !important',
          paddingBottom: '0px !important'
        }
      }}>
        <Grid item xs={12}>
          <ChartCard 
            title="📋 State-wise FRA Implementation" 
            height="auto" 
            index={13}
          >
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              width: '100%',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid rgba(0,0,0,0.08)',
            }}>
              <Box sx={{ 
                display: 'flex', 
                bgcolor: 'rgba(0,0,0,0.02)', 
                p: 2,
                borderBottom: '1px solid rgba(0,0,0,0.08)'
              }}>
                <Typography sx={{ fontWeight: 600, flex: 2 }}>State</Typography>
                <Typography sx={{ fontWeight: 600, flex: 1, textAlign: 'center' }}>Total Claims</Typography>
                <Typography sx={{ fontWeight: 600, flex: 1, textAlign: 'center' }}>Approved</Typography>
                <Typography sx={{ fontWeight: 600, flex: 1, textAlign: 'center' }}>Approval %</Typography>
              </Box>
              
              {stateData.map((state, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    display: 'flex', 
                    p: 2,
                    borderBottom: index < stateData.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                    '&:hover': {
                      bgcolor: 'rgba(0,0,0,0.01)'
                    }
                  }}
                >
                  <Box sx={{ flex: 2, display: 'flex', alignItems: 'center' }}>
                    <Box 
                      component="span" 
                      sx={{ 
                        display: 'inline-block',
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: state.color,
                        mr: 1.5
                      }} 
                    />
                    <Typography>{state.state}</Typography>
                  </Box>
                  <Typography sx={{ flex: 1, textAlign: 'center' }}>{state.claims.toLocaleString()}</Typography>
                  <Typography sx={{ flex: 1, textAlign: 'center' }}>{state.approved.toLocaleString()}</Typography>
                  <Typography 
                    sx={{ 
                      flex: 1, 
                      textAlign: 'center',
                      color: state.percent > 80 ? colors.darkGreen : colors.darkOrange,
                      fontWeight: 600
                    }}
                  >
                    {state.percent}%
                  </Typography>
                </Box>
              ))}
            </Box>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box sx={{ 
        textAlign: 'center', 
        mt: '32px', 
        mx: '16px',
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.3)'
      }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 600,
          background: 'linear-gradient(135deg, #ff9800 0%, #4caf50 50%, #1976d2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🏆 SIH 2024 Winner - Forest Rights Atlas Dashboard
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', mt: 1, mb: 2 }}>
          Powered by Advanced Analytics • Real-time Data Processing • AI-Driven Insights
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button className="dashboard-btn success" startIcon={<Description />} size="small">
            Export Report
          </Button>
          <Button className="dashboard-btn primary" startIcon={<Public />} size="small">
            View Full Map
          </Button>
          <Button className="dashboard-btn warning" startIcon={<Assessment />} size="small">
            Advanced Analytics
          </Button>
        </Box>
      </Box>
      </Box>
    </>
  );
};

export default EnhancedDashboard;
