import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
  Container,
  Chip,
  Avatar,
  LinearProgress
} from '@mui/material';
import {
  Agriculture,
  Work,
  Home,
  School,
  Flag,
  Psychology,
  LaunchOutlined,
  Assessment,
  BarChart
} from '@mui/icons-material';

const BeautifulHomepage = ({ onNavigateToDashboard }) => {
  const [loading, setLoading] = useState(false); // Skip loading

  // Government colors
  const govtColors = {
    orange: '#FF9933',
    white: '#FFFFFF',
    green: '#138808',
    blue: '#000080',
    primary: '#2E7D32',
    secondary: '#1565C0',
    accent: '#FF7043'
  };

  // Essential government schemes (only 4 for balanced layout)
  const governmentSchemes = [
    {
      name: 'PM-KISAN',
      description: 'Pradhan Mantri Kisan Samman Nidhi integration for tribal farmers',
      icon: <Agriculture />,
      color: govtColors.green
    },
    {
      name: 'MGNREGA',
      description: 'Mahatma Gandhi National Rural Employment Guarantee Act linkage',
      icon: <Work />,
      color: govtColors.orange
    },
    {
      name: 'PM Awas Yojana',
      description: 'Housing for All scheme integration for tribal communities',
      icon: <Home />,
      color: govtColors.primary
    },
    {
      name: 'Tribal Education',
      description: 'Pre & Post Matric Scholarship schemes for ST students',
      icon: <School />,
      color: govtColors.secondary
    }
  ];

  // Key statistics (4 items for balanced grid)
  const statisticsData = [
    { icon: '🏛️', number: '2,847', label: 'Total Claims Processed' },
    { icon: '📄', number: '1,293', label: 'Approved Claims' },
    { icon: '⏳', number: '425', label: 'Pending Review' },
    { icon: '🌲', number: '15,680', label: 'Hectares Protected' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{ 
          background: `linear-gradient(135deg, ${govtColors.primary} 0%, ${govtColors.secondary} 100%)`,
          color: 'white'
        }}
      >
        <Typography variant="h2" sx={{ mb: 2, fontWeight: 800, fontSize: { xs: '2rem', md: '2.5rem' } }}>
          🇮🇳 FRA Atlas
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, opacity: 0.9, fontSize: { xs: '1rem', md: '1.25rem' } }}>
          Loading AI-Powered Forest Rights Portal...
        </Typography>
        <LinearProgress 
          sx={{ 
            width: { xs: 250, md: 300 },
            height: 6,
            borderRadius: 3,
            bgcolor: 'rgba(255,255,255,0.2)',
            '& .MuiLinearProgress-bar': {
              bgcolor: govtColors.orange
            }
          }} 
        />
      </Box>
    );
  }

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${govtColors.primary} 0%, ${govtColors.secondary} 100%)`,
      padding: '20px',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          marginBottom: '30px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '800',
            margin: '0 0 10px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px'
          }}>
            <span style={{ fontSize: '1.5em' }}>🇮🇳</span>
            FRA Atlas
          </h1>
          <h2 style={{
            fontSize: '1.2rem',
            opacity: '0.9',
            fontWeight: '500',
            margin: '0 0 20px 0'
          }}>
            AI-Powered Forest Rights Act Implementation Portal
          </h2>
          <div style={{
            background: `rgba(255, 153, 51, 0.2)`,
            border: `2px solid ${govtColors.orange}`,
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            display: 'inline-block',
            fontWeight: '600'
          }}>
            🏛️ Ministry of Tribal Affairs | Government of India
          </div>
        </div>

        {/* Dashboard Access Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '20px',
            padding: '30px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            minHeight: '220px'
          }}>
            <div style={{
              backgroundColor: govtColors.primary,
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              fontSize: '1.8rem'
            }}>
              📊
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              margin: '0 0 15px 0'
            }}>
              Main Dashboard
            </h3>
            <p style={{
              opacity: '0.8',
              marginBottom: '25px',
              lineHeight: '1.5',
              fontSize: '1rem'
            }}>
              Access real-time statistics, claim monitoring, and comprehensive system overview.
            </p>
            <button 
              onClick={onNavigateToDashboard}
              style={{
                background: `linear-gradient(135deg, ${govtColors.accent}, ${govtColors.orange})`,
                color: 'white',
                borderRadius: '25px',
                padding: '12px 24px',
                fontWeight: '600',
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              🚀 Open Dashboard
            </button>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '20px',
            padding: '30px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            minHeight: '220px'
          }}>
            <div style={{
              backgroundColor: govtColors.secondary,
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              fontSize: '1.8rem'
            }}>
              🧠
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              margin: '0 0 15px 0'
            }}>
              Advanced Analytics
            </h3>
            <p style={{
              opacity: '0.8',
              marginBottom: '25px',
              lineHeight: '1.5',
              fontSize: '1rem'
            }}>
              AI-powered analytics with predictive insights and comprehensive reporting.
            </p>
            <button 
              style={{
                background: `linear-gradient(135deg, ${govtColors.secondary}, ${govtColors.primary})`,
                color: 'white',
                borderRadius: '25px',
                padding: '12px 24px',
                fontWeight: '600',
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              📈 View Analytics
            </button>
          </div>
        </div>

        {/* Statistics Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          padding: '30px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '30px'
          }}>
            Live System Statistics
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              padding: '20px',
              minHeight: '120px'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🏛️</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 5px 0', color: govtColors.orange }}>12,847</h3>
              <p style={{ fontSize: '0.85rem', margin: '0', opacity: '0.8' }}>Total Claims Processed</p>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              padding: '20px',
              minHeight: '120px'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📄</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 5px 0', color: govtColors.orange }}>8,293</h3>
              <p style={{ fontSize: '0.85rem', margin: '0', opacity: '0.8' }}>Approved Claims</p>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              padding: '20px',
              minHeight: '120px'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⏳</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 5px 0', color: govtColors.orange }}>2,154</h3>
              <p style={{ fontSize: '0.85rem', margin: '0', opacity: '0.8' }}>Pending Review</p>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              padding: '20px',
              minHeight: '120px'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🌲</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 5px 0', color: govtColors.orange }}>45,680</h3>
              <p style={{ fontSize: '0.85rem', margin: '0', opacity: '0.8' }}>Hectares Protected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeautifulHomepage;
