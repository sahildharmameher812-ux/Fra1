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
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Language,
  Facebook,
  Twitter,
  YouTube,
  LinkedIn,
  Policy,
  Security,
  Accessibility,
  Help,
} from '@mui/icons-material';
import { governmentColors } from '../theme/governmentTheme';
import { useLanguage } from '../context/LanguageContext';
import { formatNumber } from '../utils/numberFormatter';

const Footer = () => {
  const { t, currentLanguage } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: t('aboutFRA'), href: '#' },
    { name: t('userGuide'), href: '#' },
    { name: t('trainingMaterials'), href: '#' },
    { name: t('faq'), href: '#' },
    { name: t('support'), href: '#' },
    { name: t('downloads'), href: '#' },
  ];

  const legalLinks = [
    { name: t('privacyPolicy'), icon: <Policy />, href: '#' },
    { name: t('termsOfUse'), icon: <Security />, href: '#' },
    { name: t('accessibility'), icon: <Accessibility />, href: '#' },
    { name: t('helpSupport'), icon: <Help />, href: '#' },
  ];

  const states = [
    t('madhyaPradesh'),
    t('tripura'),
    t('odisha'),
    t('telangana'),
  ];

  return (
    <Box
      component="footer"
      className="government-footer"
      sx={{
        background: `linear-gradient(135deg, ${governmentColors.primaryGreen} 0%, ${governmentColors.green} 100%)`,
        color: 'white',
        mt: 'auto',
      }}
    >
      {/* Main Footer Content */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Organization Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    bgcolor: 'white',
                    borderRadius: '50%',
                    p: 1.5,
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '2rem',
                      lineHeight: 1,
                    }}
                  >
                    🌲
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {t('fraAtlasFooter')}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {t('forestRightsActPortal')}
                  </Typography>
                </Box>
              </Box>
              
              <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.8 }}>
                {t('aiPoweredWebGISDesc')}
              </Typography>

              {/* Contact Info */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn fontSize="small" />
                  <Typography variant="body2">
                    {t('ministryAddress')}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone fontSize="small" />
                  <Typography variant="body2">
                    {formatNumber('+91-11-2338-6354', currentLanguage)} / {formatNumber('2338-9833', currentLanguage)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email fontSize="small" />
                  <Typography variant="body2">
                    {t('emailAddress')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              {t('quickLinks')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="footer-link"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: governmentColors.goldAccent,
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* States Covered */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              {t('statesCoveredFooter')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {states.map((state) => (
                <Chip
                  key={state}
                  label={state}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                    color: 'white',
                    fontWeight: 500,
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.25)',
                      transform: 'translateX(5px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </Box>
          </Grid>

          {/* Government & Social Links */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              {t('connectResources')}
            </Typography>
            
            {/* Social Media */}
            <Typography variant="body2" fontWeight="600" sx={{ mb: 2 }}>
              {t('followUs')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
              {[
                { icon: <Facebook />, name: 'Facebook' },
                { icon: <Twitter />, name: 'Twitter' },
                { icon: <YouTube />, name: 'YouTube' },
                { icon: <LinkedIn />, name: 'LinkedIn' },
              ].map((social) => (
                <IconButton
                  key={social.name}
                  sx={{
                    color: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>

            {/* Digital India */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Language />
              <Typography variant="body2" fontWeight="600">
                {t('digitalIndiaInitiative')}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.8rem' }}>
              {t('digitalIndiaDesc')}
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Legal Links Bar */}
      <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.2)' }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'stretch', md: 'center' },
              justifyContent: 'space-between',
              py: 2,
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 2,
              }}
            >
              {legalLinks.map((link, index) => (
                <React.Fragment key={link.name}>
                  <Link
                    href={link.href}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      color: 'rgba(255, 255, 255, 0.8)',
                      textDecoration: 'none',
                      fontSize: '0.8rem',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: governmentColors.goldAccent,
                      },
                    }}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ bgcolor: 'rgba(255, 255, 255, 0.3)' }}
                    />
                  )}
                </React.Fragment>
              ))}
            </Box>

            <Typography
              variant="body2"
              sx={{ 
                opacity: 0.8, 
                fontSize: '0.8rem',
                textAlign: { xs: 'center', md: 'right' }
              }}
            >
              {t('lastUpdated')}: {formatNumber(new Date().getDate(), currentLanguage)} {new Date().toLocaleDateString(currentLanguage === 'en' ? 'en-IN' : currentLanguage === 'hi' ? 'hi-IN' : 'en-IN', {
                month: 'long'
              })} {formatNumber(new Date().getFullYear(), currentLanguage)}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Copyright Bar */}
      <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.3)' }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 2,
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontSize: '0.8rem', opacity: 0.9 }}>
              © {formatNumber(currentYear, currentLanguage)} {t('governmentRights')}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ fontSize: '0.8rem', opacity: 0.8 }}>
                {t('developedUnder')}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 0.5,
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                }}
              >
                <Typography sx={{ fontSize: '1rem' }}>🇮🇳</Typography>
                <Typography variant="body2" sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
                  {t('bharatSarkar')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;