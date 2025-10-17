import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { governmentColors } from '../../theme/governmentTheme';
import LoginPage from '../../pages/Auth/LoginPage';

const LoadingScreen = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: `linear-gradient(135deg, 
        ${governmentColors.primaryBlue} 0%, 
        ${governmentColors.saffron} 35%, 
        ${governmentColors.primaryGreen} 70%, 
        ${governmentColors.navy} 100%)`,
    }}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          mb: 4,
        }}
      >
        <CircularProgress
          size={80}
          thickness={3}
          sx={{
            color: governmentColors.white,
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: governmentColors.white,
            fontSize: '2rem',
          }}
        >
          🌲
        </Box>
      </Box>
      
      <Typography
        variant="h4"
        sx={{
          color: governmentColors.white,
          fontWeight: 700,
          mb: 2,
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        }}
      >
        FRA Atlas
      </Typography>
      
      <Typography
        variant="h6"
        sx={{
          color: governmentColors.white,
          opacity: 0.9,
          fontWeight: 400,
          mb: 3,
        }}
      >
        Loading your dashboard...
      </Typography>
      
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: governmentColors.white,
            opacity: 0.7,
          }}
        >
          Initializing secure connection
        </Typography>
      </motion.div>
    </motion.div>
  </Box>
);

const ProtectedRoute = ({ children, requiredPermission = null, requiredRole = null }) => {
  const { user, loading, isAuthenticated, hasPermission, isRole } = useAuth();

  // Show loading screen while checking authentication
  if (loading) {
    return <LoadingScreen />;
  }

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Check if user has required permission
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          p: 4,
          bgcolor: governmentColors.grey[50],
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            sx={{
              color: governmentColors.error,
              mb: 2,
              fontSize: '4rem',
            }}
          >
            😫
          </Typography>
          
          <Typography
            variant="h4"
            sx={{
              color: governmentColors.navy,
              fontWeight: 700,
              mb: 2,
            }}
          >
            Access Denied
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: governmentColors.grey[600],
              mb: 3,
              maxWidth: 500,
            }}
          >
            You don't have permission to access this feature. Please contact your administrator if you believe this is an error.
          </Typography>
          
          <Typography
            variant="body2"
            sx={{
              color: governmentColors.grey[500],
              fontSize: '0.9rem',
            }}
          >
            Required permission: <strong>{requiredPermission}</strong><br />
            Your role: <strong>{user?.role || 'Unknown'}</strong>
          </Typography>
        </motion.div>
      </Box>
    );
  }

  // Check if user has required role
  if (requiredRole && !isRole(requiredRole)) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          p: 4,
          bgcolor: governmentColors.grey[50],
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            sx={{
              color: governmentColors.warning,
              mb: 2,
              fontSize: '4rem',
            }}
          >
            ⚠️
          </Typography>
          
          <Typography
            variant="h4"
            sx={{
              color: governmentColors.navy,
              fontWeight: 700,
              mb: 2,
            }}
          >
            Insufficient Role
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: governmentColors.grey[600],
              mb: 3,
              maxWidth: 500,
            }}
          >
            This section is restricted to {requiredRole} users only. Please contact your administrator for role upgrade if needed.
          </Typography>
          
          <Typography
            variant="body2"
            sx={{
              color: governmentColors.grey[500],
              fontSize: '0.9rem',
            }}
          >
            Required role: <strong>{requiredRole}</strong><br />
            Your role: <strong>{user?.role || 'Unknown'}</strong>
          </Typography>
        </motion.div>
      </Box>
    );
  }

  // User is authenticated and has required permissions/role
  return <>{children}</>;
};

export default ProtectedRoute;
