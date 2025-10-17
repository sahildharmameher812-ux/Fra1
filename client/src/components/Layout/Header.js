import React, { useState, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Badge,
  Tooltip,
  Divider,
  Paper,
  InputBase,
  Select,
  FormControl,
  Chip
} from '@mui/material';
import {
  AccountCircle,
  Notifications,
  Language,
  Settings,
  ExitToApp,
  Search,
  Menu as MenuIcon,
  Phone,
  AccessibilityNew,
  VolumeUp,
  Brightness4,
  Help
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const GovernmentHeader = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [language, setLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = async () => {
    await logout();
    handleProfileMenuClose();
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const notifications = [
    { id: 1, title: 'New FRA claim submitted', time: '2 minutes ago', type: 'info' },
    { id: 2, title: 'Document verification complete', time: '1 hour ago', type: 'success' },
    { id: 3, title: 'Monthly report due', time: '2 hours ago', type: 'warning' }
  ];

  return (
    <>
      {/* Government Top Bar */}
      <Box sx={{ 
        backgroundColor: '#FF6B35', 
        color: 'white', 
        py: 0.5,
        fontSize: '0.75rem'
      }}>
        <Box sx={{ 
          maxWidth: 1200, 
          mx: 'auto', 
          px: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Phone sx={{ fontSize: 14 }} />
              Helpline: 1800-XXX-XXXX
            </Typography>
            <Typography variant="caption">
              Screen Reader Access
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Accessibility Options">
              <IconButton size="small" color="inherit">
                <AccessibilityNew sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Text to Speech">
              <IconButton size="small" color="inherit">
                <VolumeUp sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="High Contrast">
              <IconButton size="small" color="inherit">
                <Brightness4 sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
            
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select
                value={language}
                onChange={handleLanguageChange}
                sx={{ 
                  color: 'white',
                  fontSize: '0.75rem',
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  '& .MuiSvgIcon-root': { color: 'white' }
                }}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="hi">हिंदी</MenuItem>
                <MenuItem value="bn">বাংলা</MenuItem>
                <MenuItem value="od">ଓଡ଼ିଆ</MenuItem>
                <MenuItem value="te">తెలుగు</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      {/* Main Header */}
      <AppBar 
        position="sticky" 
        elevation={2}
        sx={{ 
          backgroundColor: 'white',
          color: '#2E7D32',
          borderBottom: '3px solid #FF6B35'
        }}
      >
        <Toolbar sx={{ minHeight: '80px !important', px: 2 }}>
          {/* Menu Toggle - Always Visible */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuToggle}
            sx={{ 
              mr: 2, 
              backgroundColor: 'rgba(46, 125, 50, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(46, 125, 50, 0.2)',
              },
              border: '1px solid rgba(46, 125, 50, 0.3)'
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Government Logo & Branding */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: { xs: 1, md: 0 } }}>
            {/* Indian National Emblem */}
            <Box sx={{ 
              width: 60, 
              height: 60,
              background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E00 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)'
            }}>
              <Typography sx={{ 
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'white'
              }}>
                🇮🇳
              </Typography>
            </Box>
            
            <Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.1
                }}
              >
                FRA Atlas
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#FF6B35',
                  fontWeight: 600,
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5
                }}
              >
                Ministry of Tribal Affairs • Government of India
              </Typography>
            </Box>
          </Box>

          {/* Search Bar - Desktop */}
          <Box sx={{ 
            flexGrow: 1, 
            mx: 4, 
            display: { xs: 'none', md: 'block' },
            maxWidth: 400
          }}>
            <Paper
              component="form"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <IconButton sx={{ p: '10px' }} aria-label="search">
                <Search />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search FRA Atlas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Paper>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Help */}
            <Tooltip title="Help & Support">
              <IconButton color="inherit">
                <Help />
              </IconButton>
            </Tooltip>

            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton
                color="inherit"
                onClick={handleNotificationOpen}
              >
                <Badge badgeContent={notifications.length} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* User Profile */}
            <Button
              onClick={handleProfileMenuOpen}
              sx={{ 
                color: 'inherit',
                textTransform: 'none',
                borderRadius: '25px',
                px: 2,
                py: 1,
                '&:hover': {
                  backgroundColor: 'rgba(46, 125, 50, 0.1)'
                }
              }}
              startIcon={
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32,
                    backgroundColor: '#2E7D32',
                    fontSize: '0.875rem'
                  }}
                >
                  {user?.name?.charAt(0) || 'U'}
                </Avatar>
              }
            >
              <Box sx={{ textAlign: 'left', display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                  {user?.name || 'User'}
                </Typography>
                <Typography variant="caption" sx={{ color: '#666', lineHeight: 1 }}>
                  {user?.role || 'Officer'}
                </Typography>
              </Box>
            </Button>
          </Box>
        </Toolbar>

        {/* Navigation Breadcrumb */}
        <Box sx={{ 
          backgroundColor: '#f8f9fa', 
          px: 2, 
          py: 1,
          borderTop: '1px solid #e9ecef'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip 
              label="🏠 Home" 
              size="small" 
              variant="outlined"
              clickable
            />
            <Typography variant="body2" color="textSecondary">/</Typography>
            <Chip 
              label="📄 Document Management" 
              size="small" 
              color="primary"
              variant="filled"
            />
          </Box>
        </Box>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          sx: {
            width: 250,
            mt: 1
          }
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {user?.name || 'User Name'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {user?.email || 'user@example.com'}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {user?.department || 'Tribal Affairs Department'}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleProfileMenuClose}>
          <AccountCircle sx={{ mr: 2 }} />
          My Profile
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          <Settings sx={{ mr: 2 }} />
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          <ExitToApp sx={{ mr: 2 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleNotificationClose}
        PaperProps={{
          sx: {
            width: 320,
            mt: 1,
            maxHeight: 400
          }
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Notifications
          </Typography>
        </Box>
        <Divider />
        {notifications.map((notification) => (
          <MenuItem key={notification.id} onClick={handleNotificationClose}>
            <Box>
              <Typography variant="subtitle2">
                {notification.title}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {notification.time}
              </Typography>
            </Box>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={handleNotificationClose}>
          <Typography variant="body2" color="primary" sx={{ width: '100%', textAlign: 'center' }}>
            View All Notifications
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default GovernmentHeader;
