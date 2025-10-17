import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Language as LanguageIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../translations/translations';
import { governmentColors } from '../theme/governmentTheme';

const LanguageSwitcher = ({ iconColor = 'inherit' }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    handleClose();
  };

  const getCurrentLanguageName = () => {
    const lang = languages.find(l => l.code === currentLanguage);
    return lang ? lang.nativeName : 'English';
  };

  return (
    <>
      <Tooltip title={t('selectLanguage')}>
        <IconButton
          onClick={handleClick}
          size="large"
          sx={{
            color: iconColor,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
          }}
          aria-controls={open ? 'language-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <LanguageIcon />
        </IconButton>
      </Tooltip>

      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-button',
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            borderRadius: 2,
            minWidth: 220,
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
          <Typography variant="subtitle2" fontWeight={600} color="textSecondary">
            {t('selectLanguage')}
          </Typography>
        </Box>

        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={currentLanguage === language.code}
            sx={{
              py: 1.5,
              px: 2,
              '&:hover': {
                backgroundColor: `${governmentColors.lightBlue}20`,
              },
              '&.Mui-selected': {
                backgroundColor: `${governmentColors.lightBlue}40`,
                '&:hover': {
                  backgroundColor: `${governmentColors.lightBlue}50`,
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {currentLanguage === language.code ? (
                <CheckIcon sx={{ color: governmentColors.primaryBlue }} />
              ) : (
                <Box sx={{ width: 24 }} />
              )}
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                    {language.flag}
                  </Typography>
                  <Box>
                    <Typography variant="body2" fontWeight={currentLanguage === language.code ? 600 : 400}>
                      {language.nativeName}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {language.name}
                    </Typography>
                  </Box>
                </Box>
              }
            />
          </MenuItem>
        ))}
        
        <Divider sx={{ my: 1 }} />
        
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="caption" color="textSecondary">
            Current: {getCurrentLanguageName()}
          </Typography>
        </Box>
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
