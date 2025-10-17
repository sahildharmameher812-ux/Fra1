import React, { useState, useRef, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemButton,
  Paper,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList
} from '@mui/material';
import {
  Menu as MenuIcon,
  MoreVert,
  Notifications,
  AccountCircle,
  Settings,
  Map as MapIcon,
  DocumentScanner,
  Satellite,
  Dashboard as DashboardIcon,
  Analytics,
  Psychology,
  AdminPanelSettings,
  LocationOn,
  Assessment,
  Timeline,
  Speed,
  TrendingUp,
  CloudUpload,
  NaturePeople,
  Agriculture,
  Forest,
  Terrain,
  MyLocation,
  FilterAlt,
  Layers,
  ZoomInMap,
  FindInPage,
  SmartToy,
  BrightnessMedium,
  NetworkCell,
  RadarSharp,
  ScannerSharp
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const EnhancedHeader = ({ onMenuToggle }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);
  const [atlasMenuOpen, setAtlasMenuOpen] = useState(false);
  const [ocrMenuOpen, setOcrMenuOpen] = useState(false);
  const [satelliteMenuOpen, setSatelliteMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(5);
  const [currentTime, setCurrentTime] = useState(new Date());

  const atlasMenuRef = useRef(null);
  const ocrMenuRef = useRef(null);
  const satelliteMenuRef = useRef(null);

  // Government color scheme
  const colors = {
    saffron: '#FF9933',
    white: '#FFFFFF',
    green: '#138808',
    navy: '#000080',
    primaryGreen: '#2E7D32',
    secondaryBlue: '#1565C0',
    accentOrange: '#FF7043',
    overlayWhite: 'rgba(255, 255, 255, 0.95)',
    overlayDark: 'rgba(0, 0, 0, 0.1)'
  };

  // Main Navigation Items
  const mainNavItems = [
    { name: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', color: colors.primaryGreen },
    { name: 'Analytics', icon: <Analytics />, path: '/analytics', color: colors.secondaryBlue },
    { name: 'Claims Management', icon: <Assessment />, path: '/claims', color: colors.accentOrange },
    { name: 'Decision Support', icon: <Psychology />, path: '/decision-support', color: colors.green },
    { name: 'User Management', icon: <AdminPanelSettings />, path: '/users', color: colors.navy }
  ];

  // Atlas Maps Sub-menu
  const atlasMenuItems = [
    {
      name: 'Interactive WebGIS',
      description: 'Main atlas with all layers and tools',
      icon: <MapIcon />,
      path: '/map',
      color: colors.primaryGreen,
      features: ['State Selection', 'Layer Control', 'Real-time Data']
    },
    {
      name: 'Satellite Overlay',
      description: 'High-resolution satellite imagery',
      icon: <Satellite />,
      path: '/map?mode=satellite',
      color: colors.secondaryBlue,
      features: ['ISRO Data', 'LANDSAT', 'Real-time Feeds']
    },
    {
      name: 'FRA Claims Mapping',
      description: 'Visualize approved and pending claims',
      icon: <LocationOn />,
      path: '/map?layer=claims',
      color: colors.accentOrange,
      features: ['IFR/CFR/CR', 'Status Tracking', 'Progress Maps']
    },
    {
      name: 'Forest Cover Analysis',
      description: 'AI-powered forest monitoring',
      icon: <Forest />,
      path: '/map?analysis=forest',
      color: colors.green,
      features: ['Change Detection', 'Degradation Alerts', 'Carbon Mapping']
    }
  ];

  // OCR Document Processing Sub-menu
  const ocrMenuItems = [
    {
      name: 'Document Upload',
      description: 'Upload legacy FRA documents for processing',
      icon: <CloudUpload />,
      path: '/documents?mode=upload',
      color: colors.primaryGreen,
      features: ['Bulk Upload', 'PDF/Image Support', 'Auto-Classification']
    },
    {
      name: 'OCR Processing',
      description: 'AI-powered text extraction and NER',
      icon: <ScannerSharp />,
      path: '/documents?mode=ocr',
      color: colors.secondaryBlue,
      features: ['Text Extraction', 'Entity Recognition', 'Data Validation']
    },
    {
      name: 'Document Verification',
      description: 'Verify extracted data and signatures',
      icon: <FindInPage />,
      path: '/documents?mode=verify',
      color: colors.accentOrange,
      features: ['Manual Review', 'Signature Detection', 'Compliance Check']
    },
    {
      name: 'Digital Archive',
      description: 'Browse digitized document repository',
      icon: <DocumentScanner />,
      path: '/documents?mode=archive',
      color: colors.green,
      features: ['Search & Filter', 'Version Control', 'Audit Trail']
    }
  ];

  // Satellite Alerts Sub-menu
  const satelliteMenuItems = [
    {
      name: 'Real-time Monitoring',
      description: 'Live satellite feeds and alerts',
      icon: <RadarSharp />,
      path: '/satellite?mode=realtime',
      color: colors.primaryGreen,
      features: ['Live Feeds', 'Change Detection', 'Auto Alerts']
    },
    {
      name: 'Forest Cover Analysis',
      description: 'AI-powered forest change detection',
      icon: <Terrain />,
      path: '/satellite?analysis=forest',
      color: colors.secondaryBlue,
      features: ['Deforestation Alerts', 'Regeneration Tracking', 'Carbon Estimation']
    },
    {
      name: 'Land Use Classification',
      description: 'ML-based land classification system',
      icon: <SmartToy />,
      path: '/satellite?mode=classification',
      color: colors.accentOrange,
      features: ['Multi-class Detection', 'Accuracy Assessment', 'Training Data']
    },
    {
      name: 'Alert Management',
      description: 'Configure and manage satellite alerts',
      icon: <BrightnessMedium />,
      path: '/satellite?mode=alerts',
      color: colors.green,
      features: ['Threshold Setting', 'Notification Rules', 'Report Generation']
    }
  ];

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleMoreMenuOpen = (event) => {
    setMoreMenuAnchor(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreMenuAnchor(null);
  };

  const handleMenuToggle = (menuName, state) => {
    switch (menuName) {
      case 'atlas':
        setAtlasMenuOpen(state);
        setOcrMenuOpen(false);
        setSatelliteMenuOpen(false);
        break;
      case 'ocr':
        setOcrMenuOpen(state);
        setAtlasMenuOpen(false);
        setSatelliteMenuOpen(false);
        break;
      case 'satellite':
        setSatelliteMenuOpen(state);
        setAtlasMenuOpen(false);
        setOcrMenuOpen(false);
        break;
      default:
        setAtlasMenuOpen(false);
        setOcrMenuOpen(false);
        setSatelliteMenuOpen(false);
    }
  };

  const renderSubMenu = (items, isOpen, anchorRef, onClose) => (
    <Popper
      open={isOpen}
      anchorEl={anchorRef.current}
      role={undefined}
      placement="bottom-start"
      transition
      disablePortal
      sx={{ zIndex: 9999 }}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
          }}
        >
          <Paper
            elevation={8}
            sx={{
              background: colors.overlayWhite,
              backdropFilter: 'blur(20px)',
              borderRadius: 3,
              mt: 1,
              minWidth: 350,
              maxWidth: 400,
              border: `1px solid ${colors.overlayDark}`
            }}
          >
            <ClickAwayListener onClickAway={onClose}>
              <Box sx={{ p: 2 }}>
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        mb: index < items.length - 1 ? 2 : 0,
                        borderRadius: 2,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        border: `1px solid transparent`,
                        '&:hover': {
                          background: `${item.color}10`,
                          border: `1px solid ${item.color}30`,
                          transform: 'translateY(-2px)'
                        }
                      }}
                      onClick={() => {
                        handleNavigation(item.path);
                        onClose();
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                        <Avatar
                          sx={{
                            bgcolor: item.color,
                            color: 'white',
                            width: 40,
                            height: 40,
                            mr: 2
                          }}
                        >
                          {item.icon}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 600,
                              color: colors.navy,
                              mb: 0.5
                            }}
                          >
                            {item.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: colors.navy,
                              opacity: 0.7,
                              fontSize: '0.85rem',
                              lineHeight: 1.3
                            }}
                          >
                            {item.description}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {item.features.map((feature, fIndex) => (
                          <Chip
                            key={fIndex}
                            label={feature}
                            size="small"
                            sx={{
                              bgcolor: `${item.color}15`,
                              color: item.color,
                              fontSize: '0.7rem',
                              height: 20
                            }}
                          />
                        ))}
                      </Box>
                    </Paper>
                  </motion.div>
                ))}
              </Box>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: colors.overlayWhite,
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${colors.overlayDark}`,
          zIndex: 9998
        }}
      >
        <Toolbar sx={{ px: { xs: 1, md: 3 } }}>
          {/* Menu Toggle */}
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            sx={{ color: colors.primaryGreen, mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Government Branding */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <Avatar
              sx={{
                bgcolor: colors.saffron,
                color: 'white',
                mr: 2,
                width: 45,
                height: 45,
                fontSize: '1.2rem'
              }}
            >
              🇮🇳
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: colors.primaryGreen,
                  fontWeight: 800,
                  fontSize: '1.3rem'
                }}
              >
                FRA Atlas
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: colors.navy,
                  fontSize: '0.7rem',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Ministry of Tribal Affairs | Govt. of India
              </Typography>
            </Box>
          </Box>

          {/* Main Navigation - Desktop */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1, flex: 1 }}>
            <Button
              ref={atlasMenuRef}
              onClick={() => handleMenuToggle('atlas', !atlasMenuOpen)}
              startIcon={<MapIcon />}
              sx={{
                color: atlasMenuOpen ? colors.primaryGreen : colors.navy,
                bgcolor: atlasMenuOpen ? `${colors.primaryGreen}15` : 'transparent',
                '&:hover': { bgcolor: `${colors.primaryGreen}10` },
                borderRadius: 2,
                px: 2,
                fontWeight: 600
              }}
            >
              Atlas Maps
            </Button>

            <Button
              ref={ocrMenuRef}
              onClick={() => handleMenuToggle('ocr', !ocrMenuOpen)}
              startIcon={<DocumentScanner />}
              sx={{
                color: ocrMenuOpen ? colors.secondaryBlue : colors.navy,
                bgcolor: ocrMenuOpen ? `${colors.secondaryBlue}15` : 'transparent',
                '&:hover': { bgcolor: `${colors.secondaryBlue}10` },
                borderRadius: 2,
                px: 2,
                fontWeight: 600
              }}
            >
              OCR System
            </Button>

            <Button
              ref={satelliteMenuRef}
              onClick={() => handleMenuToggle('satellite', !satelliteMenuOpen)}
              startIcon={<Satellite />}
              sx={{
                color: satelliteMenuOpen ? colors.accentOrange : colors.navy,
                bgcolor: satelliteMenuOpen ? `${colors.accentOrange}15` : 'transparent',
                '&:hover': { bgcolor: `${colors.accentOrange}10` },
                borderRadius: 2,
                px: 2,
                fontWeight: 600
              }}
            >
              Satellite Alerts
            </Button>
          </Box>

          {/* Right Side Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Time Display */}
            <Typography
              variant="body2"
              sx={{
                color: colors.navy,
                mr: 2,
                display: { xs: 'none', md: 'block' }
              }}
            >
              {currentTime.toLocaleString('en-IN', {
                timeStyle: 'short',
                dateStyle: 'short'
              })}
            </Typography>

            {/* Status Indicators */}
            <Tooltip title="System Status: Online">
              <Chip
                label="LIVE"
                size="small"
                sx={{
                  bgcolor: colors.green,
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  animation: 'pulse 2s infinite',
                  display: { xs: 'none', sm: 'inline-flex' }
                }}
              />
            </Tooltip>

            {/* Notifications */}
            <Tooltip title="System Notifications">
              <IconButton sx={{ color: colors.primaryGreen }}>
                <Badge badgeContent={notifications} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* More Options */}
            <Tooltip title="More Options">
              <IconButton
                onClick={handleMoreMenuOpen}
                sx={{ color: colors.primaryGreen }}
              >
                <MoreVert />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sub-menus */}
      {renderSubMenu(atlasMenuItems, atlasMenuOpen, atlasMenuRef, () => setAtlasMenuOpen(false))}
      {renderSubMenu(ocrMenuItems, ocrMenuOpen, ocrMenuRef, () => setOcrMenuOpen(false))}
      {renderSubMenu(satelliteMenuItems, satelliteMenuOpen, satelliteMenuRef, () => setSatelliteMenuOpen(false))}

      {/* Navigation Drawer - Mobile */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 300,
            background: colors.overlayWhite,
            backdropFilter: 'blur(20px)'
          }
        }}
      >
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Avatar
            sx={{
              bgcolor: colors.saffron,
              color: 'white',
              margin: '0 auto 15px',
              width: 70,
              height: 70,
              fontSize: '2rem'
            }}
          >
            🏛️
          </Avatar>
          <Typography variant="h6" sx={{ color: colors.primaryGreen, fontWeight: 700, mb: 1 }}>
            FRA Atlas Portal
          </Typography>
          <Chip
            label="SIH 2024 Winner"
            sx={{
              bgcolor: colors.saffron,
              color: 'white',
              fontWeight: 600
            }}
          />
        </Box>

        <Divider />

        <List sx={{ px: 2, py: 1 }}>
          {mainNavItems.map((item, index) => (
            <ListItemButton
              key={index}
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: 2,
                mb: 1,
                '&:hover': {
                  bgcolor: `${item.color}10`,
                  '& .MuiListItemIcon-root': {
                    color: item.color
                  }
                }
              }}
            >
              <ListItemIcon sx={{ color: colors.navy, minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: 500,
                    color: colors.navy
                  }
                }}
              />
            </ListItemButton>
          ))}
        </List>

        <Divider />

        <List sx={{ px: 2, py: 1 }}>
          <Typography variant="overline" sx={{ px: 2, color: colors.navy, fontWeight: 600 }}>
            Quick Access
          </Typography>
          
          <ListItemButton
            onClick={() => handleNavigation('/map')}
            sx={{ borderRadius: 2, mb: 1 }}
          >
            <ListItemIcon sx={{ color: colors.primaryGreen, minWidth: 40 }}>
              <MapIcon />
            </ListItemIcon>
            <ListItemText primary="Atlas Maps" />
          </ListItemButton>

          <ListItemButton
            onClick={() => handleNavigation('/documents')}
            sx={{ borderRadius: 2, mb: 1 }}
          >
            <ListItemIcon sx={{ color: colors.secondaryBlue, minWidth: 40 }}>
              <DocumentScanner />
            </ListItemIcon>
            <ListItemText primary="OCR Documents" />
          </ListItemButton>

          <ListItemButton
            onClick={() => handleNavigation('/satellite')}
            sx={{ borderRadius: 2 }}
          >
            <ListItemIcon sx={{ color: colors.accentOrange, minWidth: 40 }}>
              <Satellite />
            </ListItemIcon>
            <ListItemText primary="Satellite Monitoring" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* More Options Menu */}
      <Menu
        anchorEl={moreMenuAnchor}
        open={Boolean(moreMenuAnchor)}
        onClose={handleMoreMenuClose}
        PaperProps={{
          sx: {
            background: colors.overlayWhite,
            backdropFilter: 'blur(20px)',
            borderRadius: 2,
            mt: 1
          }
        }}
      >
        <MenuItem onClick={() => { handleNavigation('/profile'); handleMoreMenuClose(); }}>
          <AccountCircle sx={{ mr: 2, color: colors.primaryGreen }} />
          Profile & Account
        </MenuItem>
        <MenuItem onClick={() => { handleNavigation('/settings'); handleMoreMenuClose(); }}>
          <Settings sx={{ mr: 2, color: colors.secondaryBlue }} />
          System Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { handleNavigation('/help'); handleMoreMenuClose(); }}>
          <Typography variant="body2" sx={{ color: colors.navy, ml: 5 }}>
            Help & Support
          </Typography>
        </MenuItem>
      </Menu>

      {/* Global Styles for Animations */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </>
  );
};

export default EnhancedHeader;