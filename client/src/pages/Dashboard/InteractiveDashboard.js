import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Chip,
  useTheme,
  alpha,
  Zoom,
  Slide
} from '@mui/material';
import {
  TrendingUp,
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
  Refresh,
  Fullscreen,
  Download,
  Share,
  FilterList,
  Close,
  PlayArrow,
  Pause,
  SkipNext
} from '@mui/icons-material';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import SIHWinnerDashboard from './SIHWinnerDashboard';

// Enhanced Interactive Dashboard with real-time features
const InteractiveDashboard = () => {
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedChart, setSelectedChart] = useState(null);
  const [fullscreenChart, setFullscreenChart] = useState(null);
  const [filterActive, setFilterActive] = useState(false);
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    activeUsers: 1247,
    processingRate: 95.7,
    systemLoad: 67,
    errorRate: 0.02
  });
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', message: 'New claim processed successfully', time: '2 min ago' },
    { id: 2, type: 'info', message: 'System update completed', time: '5 min ago' },
    { id: 3, type: 'warning', message: 'High processing volume detected', time: '8 min ago' }
  ]);

  // Real-time data updates
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20) - 10,
        processingRate: Math.max(90, Math.min(99, prev.processingRate + (Math.random() - 0.5) * 2)),
        systemLoad: Math.max(30, Math.min(90, prev.systemLoad + (Math.random() - 0.5) * 10)),
        errorRate: Math.max(0, Math.min(0.1, prev.errorRate + (Math.random() - 0.5) * 0.01))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Chart click handler
  const handleChartClick = (chartType, data) => {
    setSelectedChart({ type: chartType, data, timestamp: Date.now() });
    
    // Add vibration feedback on mobile
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  // Fullscreen handler
  const handleFullscreen = (chartType) => {
    setFullscreenChart(chartType);
  };

  // Animated metrics component
  const RealTimeMetric = ({ title, value, unit, color, icon }) => {
    const controls = useAnimation();
    const prevValue = useRef(value);

    useEffect(() => {
      if (prevValue.current !== value) {
        controls.start({
          scale: [1, 1.1, 1],
          transition: { duration: 0.3 }
        });
        prevValue.current = value;
      }
    }, [value, controls]);

    return (
      <motion.div animate={controls}>
        <Card 
          sx={{ 
            background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
            border: `1px solid ${color}30`,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: `0 8px 25px ${color}20`
            }
          }}
          onClick={() => handleChartClick('metric', { title, value, unit })}
        >
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box 
              sx={{ 
                p: 1, 
                borderRadius: 2, 
                background: color,
                color: 'white',
                display: 'flex'
              }}
            >
              {icon}
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {title}
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {typeof value === 'number' ? value.toFixed(value < 1 ? 2 : 0) : value}{unit}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  // Interactive notification system
  const NotificationToast = ({ notification, onClose }) => (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        sx={{ 
          mb: 1, 
          background: notification.type === 'success' ? '#4CAF5015' : 
                     notification.type === 'warning' ? '#FF980015' : '#2196F315',
          border: `1px solid ${
            notification.type === 'success' ? '#4CAF50' : 
            notification.type === 'warning' ? '#FF9800' : '#2196F3'
          }30`
        }}
      >
        <CardContent sx={{ py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" fontWeight="medium">
              {notification.message}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {notification.time}
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => onClose(notification.id)}>
            <Close sx={{ fontSize: 16 }} />
          </IconButton>
        </CardContent>
      </Card>
    </motion.div>
  );

  // Control panel component
  const ControlPanel = () => (
    <Card sx={{ mb: 3, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          🏆 SIH Dashboard Controls
        </Typography>
        
        <Tooltip title={isPlaying ? 'Pause Updates' : 'Resume Updates'}>
          <IconButton 
            onClick={() => setIsPlaying(!isPlaying)}
            sx={{ 
              background: isPlaying ? '#4CAF50' : '#FF9800',
              color: 'white',
              '&:hover': { background: isPlaying ? '#45a049' : '#f57c00' }
            }}
          >
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Refresh Data">
          <IconButton onClick={() => window.location.reload()}>
            <Refresh />
          </IconButton>
        </Tooltip>

        <Tooltip title="Toggle Filter">
          <IconButton 
            onClick={() => setFilterActive(!filterActive)}
            sx={{ color: filterActive ? '#2196F3' : 'inherit' }}
          >
            <FilterList />
          </IconButton>
        </Tooltip>

        <Tooltip title="Download Report">
          <IconButton>
            <Download />
          </IconButton>
        </Tooltip>
      </CardContent>
    </Card>
  );

  // Chart detail modal
  const ChartDetailModal = () => (
    <Dialog 
      open={!!selectedChart} 
      onClose={() => setSelectedChart(null)}
      maxWidth="md"
      fullWidth
      TransitionComponent={Zoom}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          Chart Details - {selectedChart?.type}
        </Typography>
        <IconButton onClick={() => setSelectedChart(null)}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <Typography variant="body1" gutterBottom>
            Detailed analysis and insights for the selected chart component.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
            <Chip label="Real-time" color="success" size="small" />
            <Chip label="Interactive" color="primary" size="small" />
            <Chip label="AI Powered" color="secondary" size="small" />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );

  return (
    <Box sx={{ p: 3, background: '#F8F9FA', minHeight: '100vh' }}>
      {/* Control Panel */}
      <ControlPanel />

      {/* Real-time Metrics Bar */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <RealTimeMetric
            title="Active Users"
            value={realTimeMetrics.activeUsers}
            unit=""
            color="#4CAF50"
            icon={<People />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <RealTimeMetric
            title="Processing Rate"
            value={realTimeMetrics.processingRate}
            unit="%"
            color="#2196F3"
            icon={<Speed />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <RealTimeMetric
            title="System Load"
            value={realTimeMetrics.systemLoad}
            unit="%"
            color="#FF9800"
            icon={<Assessment />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <RealTimeMetric
            title="Error Rate"
            value={realTimeMetrics.errorRate}
            unit="%"
            color="#F44336"
            icon={<Analytics />}
          />
        </Grid>
      </Grid>

      {/* Main Dashboard */}
      <SIHWinnerDashboard />

      {/* Notifications Panel */}
      <Box 
        sx={{ 
          position: 'fixed', 
          top: 20, 
          right: 20, 
          width: 300,
          zIndex: 1000,
          maxHeight: '50vh',
          overflow: 'auto'
        }}
      >
        <AnimatePresence>
          {notifications.map(notification => (
            <NotificationToast
              key={notification.id}
              notification={notification}
              onClose={(id) => setNotifications(prev => prev.filter(n => n.id !== id))}
            />
          ))}
        </AnimatePresence>
      </Box>

      {/* Interactive Modals */}
      <ChartDetailModal />

      {/* Status Indicator */}
      <motion.div
        style={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(255,255,255,0.9)',
          padding: '8px 16px',
          borderRadius: 20,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
        animate={{ scale: isPlaying ? [1, 1.05, 1] : 1 }}
        transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
      >
        <motion.div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: isPlaying ? '#4CAF50' : '#FF9800'
          }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <Typography variant="caption" fontWeight="bold">
          {isPlaying ? 'LIVE' : 'PAUSED'}
        </Typography>
      </motion.div>
    </Box>
  );
};

export default InteractiveDashboard;