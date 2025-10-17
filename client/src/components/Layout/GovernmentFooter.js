import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
  Chip,
  Avatar,
  Paper
} from '@mui/material';
import {
  Language,
  Email,
  Phone,
  LocationOn,
  Security,
  Gavel,
  AccessibilityNew,
  CloudDownload,
  DataUsage,
  Policy,
  ContactSupport,
  Article,
  Business,
  AccountBalance,
  Public,
  Shield,
  OpenInNew,
  Description,
  School,
  Work,
  Home as HomeIcon,
  LocalHospital,
  Agriculture,
  Nature
} from '@mui/icons-material';

const GovernmentFooter = () => {
  // Government color scheme
  const colors = {
    saffron: '#FF9933',
    white: '#FFFFFF',
    green: '#138808',
    navy: '#000080',
    primaryGreen: '#2E7D32',
    secondaryBlue: '#1565C0',
    lightBackground: '#F8F9FA',
    overlayDark: 'rgba(0, 0, 0, 0.1)'
  };

  // Government Links
  const governmentLinks = [
    { name: 'Ministry of Tribal Affairs', url: 'https://tribal.gov.in', icon: <AccountBalance /> },
    { name: 'Digital India', url: 'https://digitalindia.gov.in', icon: <Public /> },
    { name: 'National Portal of India', url: 'https://india.gov.in', icon: <Language /> },
    { name: 'MyGov', url: 'https://mygov.in', icon: <Business /> }
  ];

  // Quick Links
  const quickLinks = [
    { name: 'About FRA 2006', url: '/about-fra' },
    { name: 'User Manual', url: '/manual' },
    { name: 'Training Videos', url: '/training' },
    { name: 'Contact Support', url: '/support' },
    { name: 'System Status', url: '/status' },
    { name: 'API Documentation', url: '/api-docs' }
  ];

  // Government Schemes
  const schemes = [
    { name: 'PM-KISAN', icon: <Agriculture />, url: 'https://pmkisan.gov.in' },
    { name: 'MGNREGA', icon: <Work />, url: 'https://nrega.nic.in' },
    { name: 'PM Awas Yojana', icon: <HomeIcon />, url: 'https://pmayg.nic.in' },
    { name: 'Ayushman Bharat', icon: <LocalHospital />, url: 'https://pmjay.gov.in' },
    { name: 'Van Dhan Yojana', icon: <Nature />, url: 'https://vandhan.gov.in' },
    { name: 'Tribal Education', icon: <School />, url: 'https://scholarship.gov.in' }
  ];

  // Legal & Policy Links
  const legalLinks = [
    { name: 'Privacy Policy', icon: <Shield /> },
    { name: 'Terms of Service', icon: <Gavel /> },
    { name: 'Accessibility Statement', icon: <AccessibilityNew /> },
    { name: 'RTI Act 2005', icon: <Article /> },
    { name: 'Security Policy', icon: <Security /> },
    { name: 'Data Protection', icon: <DataUsage /> }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        background: `linear-gradient(135deg, ${colors.primaryGreen} 0%, ${colors.secondaryBlue} 100%)`,
        color: 'white',
        pt: 6,
        pb: 3,
        mt: 4
      }}
    >
      <Container maxWidth="xl">
        {/* Main Footer Content */}
        <Grid container spacing={4}>
          {/* Organization Information */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: colors.saffron,
                    color: 'white',
                    mr: 2,
                    width: 50,
                    height: 50
                  }}
                >
                  🇮🇳
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    FRA Atlas
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    AI-Powered Forest Rights Portal
                  </Typography>
                </Box>
              </Box>
              
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.9, lineHeight: 1.6 }}>
                Ministry of Tribal Affairs, Government of India's comprehensive digital platform 
                for Forest Rights Act implementation, monitoring, and decision support.
              </Typography>
              
              <Chip
                label="SIH 2024 Winner"
                sx={{
                  bgcolor: colors.saffron,
                  color: 'white',
                  fontWeight: 600,
                  mb: 2
                }}
              />
            </Box>

            {/* Contact Information */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Contact Information
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOn sx={{ mr: 2, fontSize: 18 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Shastri Bhawan, New Delhi - 110001
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Email sx={{ mr: 2, fontSize: 18 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  support@fraatlas.gov.in
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Phone sx={{ mr: 2, fontSize: 18 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  1800-11-6666 (Toll Free)
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Government Links & Quick Access */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Government Portals
              </Typography>
              <Grid container spacing={1}>
                {governmentLinks.map((link, index) => (
                  <Grid item xs={12} key={index}>
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: 'white',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        py: 0.5,
                        opacity: 0.9,
                        '&:hover': {
                          opacity: 1,
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      <Box sx={{ mr: 2, display: 'flex' }}>
                        {link.icon}
                      </Box>
                      {link.name}
                      <OpenInNew sx={{ ml: 1, fontSize: 14 }} />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Quick Links
              </Typography>
              <Grid container spacing={1}>
                {quickLinks.map((link, index) => (
                  <Grid item xs={6} key={index}>
                    <Link
                      href={link.url}
                      sx={{
                        color: 'white',
                        textDecoration: 'none',
                        opacity: 0.9,
                        fontSize: '0.85rem',
                        '&:hover': {
                          opacity: 1,
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {link.name}
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          {/* Government Schemes & Legal */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Integrated Schemes
              </Typography>
              <Grid container spacing={1}>
                {schemes.map((scheme, index) => (
                  <Grid item xs={6} key={index}>
                    <Paper
                      elevation={0}
                      sx={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        p: 1,
                        borderRadius: 2,
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.2)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                      onClick={() => window.open(scheme.url, '_blank')}
                    >
                      <Avatar
                        sx={{
                          bgcolor: colors.saffron,
                          color: 'white',
                          width: 30,
                          height: 30,
                          margin: '0 auto 8px'
                        }}
                      >
                        {scheme.icon}
                      </Avatar>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {scheme.name}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Legal & Compliance
              </Typography>
              <Grid container spacing={1}>
                {legalLinks.map((legal, index) => (
                  <Grid item xs={6} key={index}>
                    <Link
                      href="#"
                      sx={{
                        color: 'white',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        py: 0.5,
                        opacity: 0.9,
                        fontSize: '0.85rem',
                        '&:hover': {
                          opacity: 1,
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      <Box sx={{ mr: 1, display: 'flex' }}>
                        {legal.icon}
                      </Box>
                      {legal.name}
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* System Information & Stats */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                p: 2,
                borderRadius: 2,
                textAlign: 'center'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, color: colors.saffron, mb: 1 }}>
                System Status
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>99.7%</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>Uptime</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>0.23s</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>Response</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Live</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>Status</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                p: 2,
                borderRadius: 2,
                textAlign: 'center'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, color: colors.saffron, mb: 1 }}>
                Coverage Statistics
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>4</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>States</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>65</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>Districts</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>2.8K</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>Claims</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                p: 2,
                borderRadius: 2,
                textAlign: 'center'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, color: colors.saffron, mb: 1 }}>
                Technology Stack
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>AI/ML</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>Powered</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>WebGIS</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>Integrated</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Cloud</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>Native</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Bottom Footer */}
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: { xs: 2, md: 0 } }}>
              © {currentYear} Ministry of Tribal Affairs, Government of India. All rights reserved. |{' '}
              <Link href="https://digitalindia.gov.in" sx={{ color: colors.saffron }}>
                Digital India Initiative
              </Link>
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 1 }}>
              <Chip
                label="ISO 27001"
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '0.7rem'
                }}
              />
              <Chip
                label="GDPR Compliant"
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '0.7rem'
                }}
              />
              <Chip
                label="Accessible"
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '0.7rem'
                }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Version & Build Info */}
        <Box sx={{ textAlign: 'center', mt: 3, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            FRA Atlas v2.1.0 | Built with React & Node.js | Powered by ISRO Satellite Data & AI/ML
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default GovernmentFooter;