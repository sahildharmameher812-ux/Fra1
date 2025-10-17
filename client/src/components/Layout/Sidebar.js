import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  Typography,
  Chip,
  Collapse,
  Badge
} from '@mui/material';
import {
  Dashboard,
  Map,
  Assessment,
  CloudUpload,
  Gavel,
  People,
  AccountCircle,
  Satellite,
  Psychology,
  AdminPanelSettings,
  ExpandLess,
  ExpandMore,
  Layers,
  Timeline,
  BarChart,
  PieChart,
  TrendingUp,
  Forest,
  LocationOn,
  Analytics,
  Terrain,
  ViewModule,
  DataUsage,
  ShowChart,
  Insights,
  Public,
  NaturePeople,
  DocumentScanner,
  Assignment,
  Security,
  Settings,
  NotificationImportant
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 280;

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isRole: hasRole, hasPermission } = useAuth();
  
  // State for expandable sections
  const [expandedSections, setExpandedSections] = useState({
    atlas: false,
    analysis: false,
    management: false,
    admin: false
  });
  
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuSections = [
    {
      title: 'Main',
      items: [
        {
          text: 'Dashboard',
          icon: <Dashboard />,
          path: '/dashboard',
          roles: ['all'],
          badge: null
        }
      ]
    },
    {
      title: 'FRA Atlas & Mapping',
      key: 'atlas',
      icon: <Map />,
      expandable: true,
      roles: ['all'],
      items: [
        {
          text: 'Interactive Atlas Map',
          icon: <Public />,
          path: '/map',
          roles: ['all'],
          description: 'Full WebGIS mapping interface'
        },
        {
          text: 'Satellite View',
          icon: <Satellite />,
          path: '/satellite',
          roles: ['all'],
          badge: 'Live',
          description: 'Real-time NASA satellite data'
        },
        {
          text: 'Forest Cover Analysis',
          icon: <Forest />,
          path: '/map?layer=forest',
          roles: ['all'],
          description: 'Forest density mapping'
        },
        {
          text: 'Tribal Land Boundaries',
          icon: <NaturePeople />,
          path: '/map?layer=tribal',
          roles: ['all'],
          description: 'FRA recognized areas'
        },
        {
          text: 'Terrain & Elevation',
          icon: <Terrain />,
          path: '/map?layer=terrain',
          roles: ['all'],
          description: 'Topographic analysis'
        }
      ]
    },
    {
      title: 'Analytics & Reports',
      key: 'analysis',
      icon: <Assessment />,
      expandable: true,
      roles: ['all'],
      items: [
        {
          text: 'Dashboard Analytics',
          icon: <Analytics />,
          path: '/analytics',
          roles: ['all'],
          description: 'Comprehensive data insights'
        },
        {
          text: 'Statistical Charts',
          icon: <BarChart />,
          path: '/analytics?view=charts',
          roles: ['all'],
          description: 'Bar charts, pie charts, trends'
        },
        {
          text: 'Time Series Analysis',
          icon: <Timeline />,
          path: '/analytics?view=timeline',
          roles: ['all'],
          description: 'Historical data trends'
        },
        {
          text: 'Performance Graphs',
          icon: <TrendingUp />,
          path: '/analytics?view=performance',
          roles: ['all'],
          description: 'KPI monitoring graphs'
        },
        {
          text: 'Custom Reports',
          icon: <ShowChart />,
          path: '/analytics?view=reports',
          roles: ['admin', 'ministry_official', 'state_officer'],
          description: 'Generate custom analytics'
        },
        {
          text: 'AI Insights',
          icon: <Insights />,
          path: '/decision-support',
          roles: ['admin', 'ministry_official', 'state_officer'],
          badge: 'AI',
          description: 'Machine learning predictions'
        }
      ]
    },
    {
      title: 'Document & Claim Management',
      key: 'management',
      icon: <Gavel />,
      expandable: true,
      roles: ['admin', 'ministry_official', 'state_officer', 'district_officer', 'forest_officer'],
      items: [
        {
          text: 'Document Upload',
          icon: <CloudUpload />,
          path: '/documents',
          roles: ['admin', 'ministry_official', 'state_officer', 'district_officer', 'forest_officer'],
          description: 'Upload FRA documents'
        },
        {
          text: 'Claim Processing',
          icon: <Assignment />,
          path: '/claims',
          roles: ['admin', 'ministry_official', 'state_officer', 'district_officer', 'forest_officer'],
          badge: '156',
          description: 'Process FRA claims'
        },
        {
          text: 'Document Scanner',
          icon: <DocumentScanner />,
          path: '/documents?view=scanner',
          roles: ['admin', 'ministry_official', 'state_officer', 'district_officer'],
          badge: 'OCR',
          description: 'AI document recognition'
        },
        {
          text: 'Verification Status',
          icon: <Security />,
          path: '/claims?view=verification',
          roles: ['admin', 'ministry_official', 'state_officer', 'district_officer'],
          description: 'Document verification tracking'
        }
      ]
    },
    {
      title: 'System Administration',
      key: 'admin',
      icon: <AdminPanelSettings />,
      expandable: true,
      roles: ['admin', 'ministry_official'],
      items: [
        {
          text: 'User Management',
          icon: <People />,
          path: '/users',
          roles: ['admin', 'ministry_official'],
          description: 'Manage user accounts'
        },
        {
          text: 'System Settings',
          icon: <Settings />,
          path: '/admin/settings',
          roles: ['admin'],
          description: 'System configuration'
        },
        {
          text: 'Alert Management',
          icon: <NotificationImportant />,
          path: '/admin/alerts',
          roles: ['admin', 'ministry_official'],
          badge: '3',
          description: 'System notifications'
        }
      ]
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname + location.search === path;
  };

  const canAccessItem = (item) => {
    if (item.roles.includes('all')) return true;
    return item.roles.some(role => hasRole(role));
  };
  
  const canAccessSection = (section) => {
    if (section.roles.includes('all')) return true;
    return section.roles.some(role => hasRole(role));
  };

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
          borderRight: '1px solid #e0e0e0'
        },
      }}
    >
      <Toolbar />
      
      {/* User Info Section */}
      <Box sx={{ p: 2, bgcolor: 'rgba(46, 125, 50, 0.05)', borderBottom: '1px solid #e0e0e0' }}>
        <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
          <AccountCircle sx={{ mr: 1, color: 'primary.main' }} />
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              {user?.name}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {user?.role?.replace('_', ' ').toUpperCase()}
            </Typography>
          </Box>
        </Box>
        <Chip 
          label={user?.state !== 'All' ? user?.state : 'All States'} 
          size="small"
          color="primary"
          variant="outlined"
          sx={{ fontSize: '0.7rem' }}
        />
      </Box>

      <List sx={{ pt: 2 }}>
        {menuSections.map((section) => {
          if (section.expandable && !canAccessSection(section)) return null;
          
          return (
            <Box key={section.title}>
              {/* Section Items (non-expandable) */}
              {!section.expandable && section.items?.map((item) => {
                if (!canAccessItem(item)) return null;
                
                const active = isActive(item.path);
                
                return (
                  <ListItem key={item.text} disablePadding sx={{ px: 1, mb: 0.5 }}>
                    <ListItemButton
                      onClick={() => handleNavigation(item.path)}
                      sx={{
                        borderRadius: 2,
                        mx: 1,
                        backgroundColor: active ? 'rgba(46, 125, 50, 0.1)' : 'transparent',
                        color: active ? 'primary.main' : 'text.primary',
                        '&:hover': {
                          backgroundColor: active 
                            ? 'rgba(46, 125, 50, 0.15)' 
                            : 'rgba(0, 0, 0, 0.04)',
                        },
                        borderLeft: active ? '3px solid #2E7D32' : '3px solid transparent'
                      }}
                    >
                      <ListItemIcon 
                        sx={{ 
                          color: active ? 'primary.main' : 'text.secondary',
                          minWidth: 40
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.text}
                        primaryTypographyProps={{
                          fontWeight: active ? 600 : 500,
                          fontSize: '0.9rem'
                        }}
                      />
                      {item.badge && (
                        <Badge 
                          badgeContent={item.badge} 
                          color={item.badge === 'Live' ? 'error' : item.badge === 'AI' ? 'secondary' : 'primary'}
                          sx={{ mr: 1 }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
              
              {/* Expandable Section Header */}
              {section.expandable && (
                <>
                  <ListItem disablePadding sx={{ px: 1, mb: 0.5 }}>
                    <ListItemButton
                      onClick={() => toggleSection(section.key)}
                      sx={{
                        borderRadius: 2,
                        mx: 1,
                        backgroundColor: expandedSections[section.key] ? 'rgba(46, 125, 50, 0.05)' : 'transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(46, 125, 50, 0.08)',
                        },
                        py: 1.5
                      }}
                    >
                      <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                        {section.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={section.title}
                        primaryTypographyProps={{
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          color: 'primary.main'
                        }}
                      />
                      {expandedSections[section.key] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </ListItem>
                  
                  {/* Expandable Section Items */}
                  <Collapse in={expandedSections[section.key]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{ pl: 2 }}>
                      {section.items?.map((item) => {
                        if (!canAccessItem(item)) return null;
                        
                        const active = isActive(item.path);
                        
                        return (
                          <ListItem key={item.text} disablePadding sx={{ px: 1, mb: 0.5 }}>
                            <ListItemButton
                              onClick={() => handleNavigation(item.path)}
                              sx={{
                                borderRadius: 2,
                                mx: 1,
                                backgroundColor: active ? 'rgba(46, 125, 50, 0.1)' : 'transparent',
                                color: active ? 'primary.main' : 'text.primary',
                                '&:hover': {
                                  backgroundColor: active 
                                    ? 'rgba(46, 125, 50, 0.15)' 
                                    : 'rgba(0, 0, 0, 0.04)',
                                },
                                borderLeft: active ? '2px solid #2E7D32' : 'none',
                                py: 0.8
                              }}
                            >
                              <ListItemIcon 
                                sx={{ 
                                  color: active ? 'primary.main' : 'text.secondary',
                                  minWidth: 36
                                }}
                              >
                                {item.icon}
                              </ListItemIcon>
                              <ListItemText 
                                primary={item.text}
                                secondary={item.description}
                                primaryTypographyProps={{
                                  fontWeight: active ? 600 : 400,
                                  fontSize: '0.85rem'
                                }}
                                secondaryTypographyProps={{
                                  fontSize: '0.7rem',
                                  color: 'text.secondary'
                                }}
                              />
                              {item.badge && (
                                <Chip 
                                  label={item.badge} 
                                  size="small"
                                  color={item.badge === 'Live' ? 'error' : item.badge === 'AI' || item.badge === 'OCR' ? 'secondary' : 'primary'}
                                  sx={{ 
                                    fontSize: '0.65rem',
                                    height: 18,
                                    '& .MuiChip-label': { px: 1 }
                                  }}
                                />
                              )}
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              )}
              
              {/* Divider between sections */}
              {section.expandable && <Divider sx={{ my: 1, mx: 2 }} />}
            </Box>
          );
        })}
      </List>

      <Divider sx={{ mt: 2 }} />

      {/* Quick Stats */}
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="textSecondary" gutterBottom>
          Quick Stats
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="caption">Active Claims</Typography>
            <Typography variant="caption" fontWeight={600}>3,456</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="caption">Processed Today</Typography>
            <Typography variant="caption" fontWeight={600}>89</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="caption">Your State</Typography>
            <Typography variant="caption" fontWeight={600}>
              {user?.state !== 'All' ? user?.state?.substring(0, 2) : 'ALL'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ mt: 'auto', p: 2, borderTop: '1px solid #e0e0e0' }}>
        <Typography variant="caption" color="textSecondary" align="center" display="block">
          FRA Atlas v1.0
        </Typography>
        <Typography variant="caption" color="textSecondary" align="center" display="block">
          Digital India Initiative
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
