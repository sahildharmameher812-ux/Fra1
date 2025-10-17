import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Tooltip,
  IconButton,
  Chip,
  LinearProgress,
  Zoom,
  Grow,
  Badge
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  Download,
  Share,
  Notifications,
  TrendingUp,
  Speed,
  Nature,
  Assessment,
  Close,
  CheckCircle,
  Info,
  Warning,
  Error
} from '@mui/icons-material';

// Real-time notification system
export const NotificationSystem = ({ onNewNotification }) => {
  const [notifications, setNotifications] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);

  const notificationTypes = [
    { 
      type: 'success', 
      icon: CheckCircle, 
      color: '#4caf50', 
      messages: [
        'New forest claim approved in Odisha',
        'AI processing completed successfully',
        'System performance optimized',
        'Data synchronization completed'
      ]
    },
    { 
      type: 'info', 
      icon: Info, 
      color: '#1976d2', 
      messages: [
        'New tribal rights application received',
        'System update available',
        'Monthly report ready for download',
        'User activity spike detected'
      ]
    },
    { 
      type: 'warning', 
      icon: Warning, 
      color: '#ff9800', 
      messages: [
        'High system load detected',
        'Pending claims require attention',
        'Backup process running',
        'Network latency increased'
      ]
    }
  ];

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      const randomMessage = randomType.messages[Math.floor(Math.random() * randomType.messages.length)];
      
      const newNotification = {
        id: Date.now(),
        type: randomType.type,
        message: randomMessage,
        icon: randomType.icon,
        color: randomType.color,
        timestamp: new Date().toLocaleTimeString()
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]); // Keep only 10 latest
      setCurrentNotification(newNotification);
      setShowSnackbar(true);
      
      if (onNewNotification) {
        onNewNotification(newNotification);
      }
    }, 8000); // New notification every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={currentNotification?.type}
          variant="filled"
          sx={{ 
            minWidth: 300,
            '& .MuiAlert-icon': {
              fontSize: 24
            }
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {currentNotification?.message}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              {currentNotification?.timestamp}
            </Typography>
          </Box>
        </Alert>
      </Snackbar>
    </>
  );
};

// Interactive dashboard controls
export const DashboardControls = ({ onControlChange }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (onControlChange) {
      onControlChange('playPause', !isPlaying);
    }
  };

  const handleExport = () => {
    setShowExportDialog(true);
  };

  const handleStartExport = () => {
    setIsExporting(true);
    setShowExportDialog(false);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      if (onControlChange) {
        onControlChange('exportComplete', true);
      }
    }, 3000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'FRA Dashboard - SIH 2024 Winner',
        text: 'Check out this amazing Forest Rights Atlas Dashboard!',
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      if (onControlChange) {
        onControlChange('linkCopied', true);
      }
    }
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <Box sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        zIndex: 1000
      }}>
        <Zoom in timeout={1000}>
          <Fab
            color="primary"
            onClick={handlePlayPause}
            sx={{
              background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            {isPlaying ? <Pause /> : <PlayArrow />}
          </Fab>
        </Zoom>
        
        <Zoom in timeout={1200}>
          <Fab
            color="secondary"
            onClick={handleExport}
            disabled={isExporting}
            sx={{
              background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #388e3c 0%, #4caf50 100%)',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            {isExporting ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LinearProgress 
                  size={24} 
                  sx={{ 
                    color: 'white',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'white'
                    }
                  }} 
                />
              </Box>
            ) : (
              <Download />
            )}
          </Fab>
        </Zoom>
        
        <Zoom in timeout={1400}>
          <Fab
            onClick={handleShare}
            sx={{
              background: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(135deg, #f57c00 0%, #ff9800 100%)',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <Share />
          </Fab>
        </Zoom>
        
        <Zoom in timeout={1600}>
          <Badge badgeContent={notificationCount} color="error">
            <Fab
              size="medium"
              sx={{
                background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%)',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Notifications />
            </Fab>
          </Badge>
        </Zoom>
      </Box>

      {/* Export Dialog */}
      <Dialog
        open={showExportDialog}
        onClose={() => setShowExportDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #1976d2 0%, #4caf50 100%)',
          color: 'white',
          fontWeight: 700
        }}>
          Export Dashboard Report
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
            Generate a comprehensive report with all charts and analytics data.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            <Chip label="PDF Format" color="primary" variant="outlined" />
            <Chip label="Excel Data" color="secondary" variant="outlined" />
            <Chip label="High Resolution" color="success" variant="outlined" />
            <Chip label="All Charts" color="warning" variant="outlined" />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
          <Button 
            onClick={() => setShowExportDialog(false)}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleStartExport}
            variant="contained"
            sx={{ 
              borderRadius: 2,
              background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #388e3c 0%, #4caf50 100%)'
              }
            }}
          >
            Export Now
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Live metrics ticker
export const LiveMetricsTicker = () => {
  const [metrics, setMetrics] = useState([
    { label: 'Claims Processed', value: 1247, trend: '+5.2%', color: '#1976d2' },
    { label: 'Active Users', value: 892, trend: '+12.1%', color: '#4caf50' },
    { label: 'Response Time', value: '2.3s', trend: '-8.5%', color: '#ff9800' },
    { label: 'Success Rate', value: '96.8%', trend: '+2.1%', color: '#9c27b0' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: typeof metric.value === 'number' 
          ? metric.value + Math.floor(Math.random() * 10) 
          : metric.value
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      zIndex: 1100,
      p: 1
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}>
        {metrics.map((metric, index) => (
          <Grow key={index} in timeout={1000 + index * 200}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              minWidth: 'fit-content',
              p: 1,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${metric.color}15 0%, ${metric.color}05 100%)`,
              border: `1px solid ${metric.color}20`
            }}>
              <Box 
                sx={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  bgcolor: metric.color,
                  animation: 'pulse 2s infinite'
                }} 
              />
              <Typography variant="caption" sx={{ fontWeight: 600, color: '#666' }}>
                {metric.label}:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: metric.color }}>
                {metric.value}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: metric.trend.startsWith('+') ? '#4caf50' : '#f44336',
                  fontWeight: 600
                }}
              >
                {metric.trend}
              </Typography>
            </Box>
          </Grow>
        ))}
      </Box>
    </Box>
  );
};

// Performance indicators
export const PerformanceIndicators = () => {
  const [indicators, setIndicators] = useState([
    { name: 'CPU Usage', value: 45, color: '#1976d2', icon: Speed },
    { name: 'Memory', value: 67, color: '#4caf50', icon: Assessment },
    { name: 'Network', value: 23, color: '#ff9800', icon: TrendingUp },
    { name: 'Eco Score', value: 89, color: '#2e7d32', icon: Nature }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndicators(prev => prev.map(indicator => ({
        ...indicator,
        value: Math.max(10, Math.min(95, indicator.value + (Math.random() - 0.5) * 20))
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{
      position: 'fixed',
      top: '50%',
      left: 16,
      transform: 'translateY(-50%)',
      zIndex: 999
    }}>
      {indicators.map((indicator, index) => {
        const IconComponent = indicator.icon;
        return (
          <Zoom key={index} in timeout={800 + index * 200}>
            <Card sx={{
              mb: 2,
              p: 2,
              minWidth: 120,
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${indicator.color}30`,
              borderRadius: 3,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateX(8px) scale(1.05)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <IconComponent sx={{ color: indicator.color, fontSize: 20, mr: 1 }} />
                <Typography variant="caption" sx={{ fontWeight: 600, color: '#666' }}>
                  {indicator.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={indicator.value}
                  sx={{
                    flex: 1,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: `${indicator.color}20`,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: indicator.color,
                      borderRadius: 3
                    }
                  }}
                />
                <Typography variant="caption" sx={{ fontWeight: 700, color: indicator.color }}>
                  {Math.round(indicator.value)}%
                </Typography>
              </Box>
            </Card>
          </Zoom>
        );
      })}
    </Box>
  );
};

// Enhanced tooltip system
export const EnhancedTooltip = ({ children, title, description, color = '#1976d2' }) => {
  return (
    <Tooltip
      title={
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {description}
          </Typography>
        </Box>
      }
      arrow
      placement="top"
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: color,
            maxWidth: 300,
            fontSize: '0.875rem',
            borderRadius: 2,
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
          }
        },
        arrow: {
          sx: {
            color: color
          }
        }
      }}
    >
      {children}
    </Tooltip>
  );
};