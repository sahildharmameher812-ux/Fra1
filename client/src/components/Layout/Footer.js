import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Facebook,
  Twitter,
  YouTube,
  Language,
  Security,
  Policy,
  Accessibility,
  ContactSupport,
  Description,
  Balance,
  AccountBalance
} from '@mui/icons-material';

const GovernmentFooter = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#1B5E20',
        color: 'white',
        mt: 'auto'
      }}
    >
      {/* Main Footer Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Government Branding */}
          <Grid item xs={12} md={3}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{
                  width: 50,
                  height: 50,
                  backgroundColor: '#FF6B35',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2
                }}>
                  <Typography sx={{ fontSize: '1.2rem' }}>🇮🇳</Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    FRA Atlas
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Digital India Initiative
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                Empowering tribal communities through technology-driven forest rights implementation and monitoring.
              </Typography>
              
              {/* Certifications */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip 
                  label="GIGW Certified" 
                  size="small" 
                  sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}
                />
                <Chip 
                  label="ISO 27001" 
                  size="small" 
                  sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Quick Links
            </Typography>
            <List dense sx={{ p: 0 }}>
              {[
                { text: 'Home', icon: <Language /> },
                { text: 'About FRA', icon: <Description /> },
                { text: 'Guidelines', icon: <Policy /> },
                { text: 'Resources', icon: <Description /> },
                { text: 'Contact Us', icon: <ContactSupport /> }
              ].map((item, index) => (
                <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                  <Link 
                    href="#" 
                    color="inherit" 
                    underline="hover"
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      opacity: 0.9,
                      '&:hover': { opacity: 1 }
                    }}
                  >
                    <Box sx={{ mr: 1, fontSize: 16 }}>{item.icon}</Box>
                    <Typography variant="body2">{item.text}</Typography>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Legal & Compliance */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Legal & Compliance
            </Typography>
            <List dense sx={{ p: 0 }}>
              {[
                { text: 'Privacy Policy', icon: <Security /> },
                { text: 'Terms of Use', icon: <Balance /> },
                { text: 'Accessibility', icon: <Accessibility /> },
                { text: 'RTI Act', icon: <Policy /> },
                { text: 'Disclaimer', icon: <Description /> }
              ].map((item, index) => (
                <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                  <Link 
                    href="#" 
                    color="inherit" 
                    underline="hover"
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      opacity: 0.9,
                      '&:hover': { opacity: 1 }
                    }}
                  >
                    <Box sx={{ mr: 1, fontSize: 16 }}>{item.icon}</Box>
                    <Typography variant="body2">{item.text}</Typography>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Ministry Information */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Ministry Links
            </Typography>
            <List dense sx={{ p: 0 }}>
              {[
                { text: 'MoTA Portal', icon: <AccountBalance /> },
                { text: 'MyGov', icon: <Language /> },
                { text: 'India.gov.in', icon: <Language /> },
                { text: 'Digital India', icon: <Language /> },
                { text: 'Data Portal', icon: <Description /> }
              ].map((item, index) => (
                <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                  <Link 
                    href="#" 
                    color="inherit" 
                    underline="hover"
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      opacity: 0.9,
                      '&:hover': { opacity: 1 }
                    }}
                  >
                    <Box sx={{ mr: 1, fontSize: 16 }}>{item.icon}</Box>
                    <Typography variant="body2">{item.text}</Typography>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Contact Information
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOn sx={{ mr: 1, fontSize: 18 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Ministry of Tribal Affairs
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8, ml: 3, mb: 1 }}>
                Shastri Bhawan, New Delhi - 110001
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Phone sx={{ mr: 1, fontSize: 18 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Helpline: 1800-XXX-XXXX
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Email sx={{ mr: 1, fontSize: 18 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  support@fra-atlas.gov.in
                </Typography>
              </Box>
            </Box>

            {/* Social Media */}
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Follow Us
            </Typography>
            <Box>
              <IconButton 
                color="inherit" 
                size="small"
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  mr: 1,
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton 
                color="inherit" 
                size="small"
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  mr: 1,
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton 
                color="inherit" 
                size="small"
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                }}
              >
                <YouTube />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />

      {/* Stats Bar */}
      <Box sx={{ backgroundColor: 'rgba(0,0,0,0.2)', py: 2 }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={6} md={3} textAlign="center">
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFD54F' }}>
                1,78,945
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Claims Processed
              </Typography>
            </Grid>
            <Grid item xs={6} md={3} textAlign="center">
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFD54F' }}>
                45,67,890
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Hectares Secured
              </Typography>
            </Grid>
            <Grid item xs={6} md={3} textAlign="center">
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFD54F' }}>
                6,78,901
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Families Benefited
              </Typography>
            </Grid>
            <Grid item xs={6} md={3} textAlign="center">
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFD54F' }}>
                28
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                States/UTs Covered
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Bottom Bar */}
      <Box sx={{ backgroundColor: '#0D4F14', py: 2 }}>
        <Container maxWidth="lg">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: { xs: 1, md: 0 } }}>
                © 2024 Ministry of Tribal Affairs, Government of India. All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                Last Updated: {new Date().toLocaleDateString('en-IN')} | Version 1.0.0
              </Typography>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <Typography variant="caption" sx={{ opacity: 0.8, textAlign: 'center', display: 'block' }}>
              Best viewed in Chrome, Firefox, Safari, Edge. Site designed & developed by 
              <Link href="#" color="inherit" sx={{ mx: 0.5 }}>National Informatics Centre (NIC)</Link>
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default GovernmentFooter;
