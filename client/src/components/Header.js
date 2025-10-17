import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Tooltip,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Map,
  Assessment,
  CloudUpload,
  Settings,
  Notifications,
  AccountCircle,
  Home,
  InfoOutlined,
  ContactMail,
  Policy,
  Security,
  Language,
  Close,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { governmentColors } from '../theme/governmentTheme';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import '../styles/governmentStyles.css';

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Authentication
  const { user, logout, getWelcomeMessage } = useAuth();
  
  // Language
  const { t } = useLanguage();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: t('home'), path: '/', icon: <Home /> },
    { name: t('dashboard'), path: '/dashboard', icon: <Dashboard /> },
    { name: t('webgisMaps'), path: '/maps', icon: <Map /> },
    { name: t('analytics'), path: '/analytics', icon: <Assessment /> },
    { name: t('ocrSystem'), path: '/ocr', icon: <CloudUpload /> },
    { name: t('dssPortal'), path: '/dss', icon: <Settings /> },
  ];

  const userMenuItems = [
    { name: t('profile'), icon: <AccountCircle /> },
    { name: t('settings'), icon: <Settings /> },
    { name: t('helpSupport'), icon: <InfoOutlined /> },
    { name: t('contact'), icon: <ContactMail /> },
  ];

  const handleUserMenuOpen = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorElUser(null);
  };
  
  const handleLogout = () => {
    logout();
    setAnchorElUser(null);
    navigate('/login');
  };

  const handleNotificationsOpen = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorElNotifications(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const drawer = (
    <Box sx={{ width: 280, height: '100%' }}>
      <Box sx={{ 
        p: 3, 
        background: `linear-gradient(135deg, ${governmentColors.saffron} 0%, ${governmentColors.primaryBlue} 100%)`,
        color: 'white',
        textAlign: 'center'
      }}>
        <Avatar
          sx={{ 
            width: 60, 
            height: 60, 
            mx: 'auto', 
            mb: 2, 
            bgcolor: governmentColors.white,
            color: governmentColors.primaryBlue,
            fontSize: '2rem'
          }}
        >
          🌲
        </Avatar>
        <Typography variant="h6" fontWeight="bold">
          {t('appName')}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          {t('ministry')}
        </Typography>
      </Box>
      
      <List sx={{ pt: 0 }}>
        {navigationItems.map((item) => (
          <ListItem
            button
            key={item.name}
            onClick={() => {
              navigate(item.path);
              setMobileOpen(false);
            }}
            sx={{
              py: 1.5,
              px: 3,
              '&:hover': {
                backgroundColor: `${governmentColors.lightBlue}`,
                borderLeft: `4px solid ${governmentColors.primaryBlue}`,
              },
              ...(isActivePath(item.path) && {
                backgroundColor: `${governmentColors.lightBlue}`,
                borderLeft: `4px solid ${governmentColors.primaryBlue}`,
                '& .MuiListItemText-primary': {
                  fontWeight: 600,
                  color: governmentColors.primaryBlue,
                },
              }),
            }}
          >
            <ListItemIcon 
              sx={{ 
                color: isActivePath(item.path) ? governmentColors.primaryBlue : 'inherit',
                minWidth: 40
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ px: 3, py: 2 }}>
          <Typography variant="caption" color="textSecondary" gutterBottom>
            {t('quickAccess')}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
            <Button
              size="small"
              startIcon={<Policy />}
              sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
            >
              {t('privacyPolicy')}
            </Button>
            <Button
              size="small"
              startIcon={<Security />}
              sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
            >
              {t('securityGuidelines')}
            </Button>
            <Button
              size="small"
              startIcon={<Language />}
              sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
            >
              {t('language')}
            </Button>
          </Box>
        </Box>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        className="government-header"
        sx={{
          background: isScrolled
            ? `linear-gradient(135deg, ${governmentColors.saffron} 0%, ${governmentColors.primaryOrange} 50%, ${governmentColors.primaryBlue} 100%)`
            : `linear-gradient(135deg, ${governmentColors.saffron} 0%, ${governmentColors.primaryOrange} 50%, ${governmentColors.primaryBlue} 100%)`,
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: `3px solid ${governmentColors.goldAccent}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.15)' : '0 4px 16px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 0, sm: 2 } }}>
            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Government Logo & Title */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                flexGrow: isMobile ? 1 : 0,
                cursor: 'pointer'
              }}
              onClick={() => navigate('/')}
            >
              <Avatar
                className="government-logo"
                sx={{
                  bgcolor: governmentColors.white,
                  color: governmentColors.primaryGreen,
                  width: { xs: 40, md: 48 },
                  height: { xs: 40, md: 48 },
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                }}
              >
                🌲
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: 800,
                    color: governmentColors.white,
                    fontSize: { sm: '1.25rem', md: '1.5rem' },
                    background: `linear-gradient(135deg, ${governmentColors.white} 0%, ${governmentColors.goldAccent} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {t('appName')}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: governmentColors.white,
                    opacity: 0.9,
                    fontSize: '0.875rem',
                    mt: -0.5,
                  }}
                >
                  {t('ministry')}
                </Typography>
              </Box>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', ml: 4 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {navigationItems.map((item) => (
                    <Button
                      key={item.name}
                      className={`nav-item ${isActivePath(item.path) ? 'active' : ''}`}
                      onClick={() => navigate(item.path)}
                      sx={{
                        color: governmentColors.white,
                        fontWeight: isActivePath(item.path) ? 700 : 500,
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        position: 'relative',
                        textTransform: 'none',
                        fontSize: '0.95rem',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          transform: 'translateY(-2px)',
                        },
                        ...(isActivePath(item.path) && {
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          '&::after': {
                            width: '100%',
                          },
                        }),
                      }}
                    >
                      {item.name}
                    </Button>
                  ))}
                </Box>
              </Box>
            )}

            {/* Right Side Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Language Switcher */}
              <LanguageSwitcher iconColor={governmentColors.white} />
              
              {/* Notifications */}
              <Tooltip title={t('notifications')}>
                <IconButton
                  size="large"
                  onClick={handleNotificationsOpen}
                  sx={{ 
                    color: governmentColors.white,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  <Badge badgeContent={3} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* User Menu */}
              <Tooltip title={t('accountSettings')}>
                <IconButton
                  onClick={handleUserMenuOpen}
                  size="small"
                  sx={{ ml: 1 }}
                >
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: user?.role === 'admin' ? governmentColors.primaryBlue :
                               user?.role === 'officer' ? governmentColors.success :
                               governmentColors.saffron,
                      color: governmentColors.white,
                      fontSize: '1rem',
                      fontWeight: 600,
                    }}
                  >
                    {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'U'}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={handleDrawerToggle}>
            <Close />
          </IconButton>
        </Box>
        {drawer}
      </Drawer>

      {/* User Menu */}
      <Menu
        anchorEl={anchorElUser}
        id="account-menu"
        open={Boolean(anchorElUser)}
        onClose={handleUserMenuClose}
        onClick={handleUserMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            borderRadius: 2,
            minWidth: 200,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: user?.role === 'admin' ? governmentColors.primaryBlue :
                         user?.role === 'officer' ? governmentColors.success :
                         governmentColors.saffron,
                color: governmentColors.white,
                fontSize: '1rem',
                fontWeight: 600,
                mr: 2,
              }}
            >
              {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'U'}
            </Avatar>
            <Box>
              <Typography variant="body1" fontWeight={600}>
                {user?.name || 'Unknown User'}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {user?.designation || 'User'}
              </Typography>
            </Box>
          </Box>
          <Typography variant="caption" color="textSecondary">
            {user?.email || 'No email'} • {user?.state || 'No state'}
          </Typography>
        </Box>
        
        {userMenuItems.map((item) => (
          <MenuItem key={item.name} sx={{ py: 1 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              {item.icon}
            </ListItemIcon>
            {item.name}
          </MenuItem>
        ))}
        
        <Divider />
        <MenuItem sx={{ py: 1, color: 'error.main' }} onClick={handleLogout}>
          <ListItemIcon sx={{ minWidth: 36, color: 'error.main' }}>
            <Security />
          </ListItemIcon>
          {t('signOut')}
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={anchorElNotifications}
        open={Boolean(anchorElNotifications)}
        onClose={handleNotificationsClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            borderRadius: 2,
            minWidth: 320,
            maxWidth: 400,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={600}>
            {t('notificationTitle')}
          </Typography>
        </Box>
        
        {[1, 2, 3].map((notification) => (
          <MenuItem key={notification} sx={{ py: 1.5, px: 2, flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="body2" fontWeight={500}>
              {t('claimStatusUpdate')}
            </Typography>
            <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
              {t('newClaimSubmitted')} Madhya Pradesh {t('region')}
            </Typography>
            <Typography variant="caption" color="primary" sx={{ mt: 0.5 }}>
              2 {t('hoursAgo')}
            </Typography>
          </MenuItem>
        ))}
        
        <Divider />
        <MenuItem sx={{ justifyContent: 'center', py: 1 }}>
          <Typography variant="body2" color="primary">
            {t('viewAllNotifications')}
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;