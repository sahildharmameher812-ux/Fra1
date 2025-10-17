import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  Button,
  Chip
} from '@mui/material';
import {
  Menu as MenuIcon,
  NotificationsOutlined,
  AccountCircle,
  Logout,
  Settings,
  Forest,
  Language
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onMenuClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    handleProfileMenuClose();
  };

  const handleProfile = () => {
    navigate('/profile');
    handleProfileMenuClose();
  };

  const getRoleColor = (role) => {
    const colors = {
      'admin': 'error',
      'ministry_official': 'primary',
      'state_officer': 'secondary',
      'district_officer': 'info',
      'forest_officer': 'success',
      'ngo_partner': 'warning',
      'beneficiary': 'default'
    };
    return colors[role] || 'default';
  };

  const mockNotifications = [
    { id: 1, message: 'New FRA claim submitted in Tripura', time: '2 min ago', unread: true },
    { id: 2, message: 'Land verification completed for 25 claims', time: '1 hour ago', unread: true },
    { id: 3, message: 'Monthly report generated', time: '3 hours ago', unread: false }
  ];

  const unreadCount = mockNotifications.filter(n => n.unread).length;

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar>
        {/* Menu Button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo and Title */}
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <Forest sx={{ mr: 1, fontSize: 32 }} />
          <Box>
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
              FRA Atlas
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.7rem' }}>
              Ministry of Tribal Affairs | Govt. of India
            </Typography>
          </Box>
        </Box>

        {/* User State and Role */}
        <Box sx={{ mr: 3, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 1, opacity: 0.9 }}>
            {user?.state !== 'All' ? user?.state : 'All States'}
          </Typography>
          <Chip 
            label={user?.role?.replace('_', ' ').toUpperCase() || 'USER'} 
            size="small"
            color={getRoleColor(user?.role)}
            sx={{ 
              fontSize: '0.7rem',
              height: 24,
              fontWeight: 600
            }}
          />
        </Box>

        {/* Language Selector */}
        <Tooltip title="Language">
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <Language />
          </IconButton>
        </Tooltip>

        {/* Notifications */}
        <Tooltip title="Notifications">
          <IconButton
            color="inherit"
            onClick={handleNotificationMenuOpen}
            sx={{ mr: 1 }}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsOutlined />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* User Profile Menu */}
        <Tooltip title="Profile">
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                bgcolor: 'rgba(255,255,255,0.2)',
                fontSize: '0.9rem'
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Avatar>
          </IconButton>
        </Tooltip>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          PaperProps={{
            sx: { 
              mt: 1.5,
              minWidth: 250,
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }
          }}
        >
          <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {user?.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user?.email}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {user?.department} • {user?.district}
            </Typography>
          </Box>
          
          <MenuItem onClick={handleProfile}>
            <AccountCircle sx={{ mr: 2 }} />
            Profile Settings
          </MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>
            <Settings sx={{ mr: 2 }} />
            Preferences
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
            <Logout sx={{ mr: 2 }} />
            Logout
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationMenuClose}
          PaperProps={{
            sx: { 
              mt: 1.5,
              minWidth: 320,
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              maxHeight: 400
            }
          }}
        >
          <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
            <Typography variant="subtitle1" fontWeight={600}>
              Notifications ({unreadCount} new)
            </Typography>
          </Box>
          
          {mockNotifications.map((notification) => (
            <MenuItem 
              key={notification.id}
              onClick={handleNotificationMenuClose}
              sx={{ 
                py: 1.5,
                borderLeft: notification.unread ? '3px solid #2E7D32' : 'none',
                bgcolor: notification.unread ? 'rgba(46, 125, 50, 0.05)' : 'transparent'
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: notification.unread ? 600 : 400,
                    mb: 0.5
                  }}
                >
                  {notification.message}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {notification.time}
                </Typography>
              </Box>
            </MenuItem>
          ))}
          
          <Box sx={{ p: 1, borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
            <Button size="small" color="primary">
              View All Notifications
            </Button>
          </Box>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
