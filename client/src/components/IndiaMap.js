import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip, Paper, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { governmentColors } from '../theme/governmentTheme';
import './IndiaMap.css';

const IndiaMap = () => {
  const [highlightedState, setHighlightedState] = useState(null);
  const [animationStep, setAnimationStep] = useState(0);

  // State data for the four implementation states
  const stateData = {
    'madhya-pradesh': {
      name: 'Madhya Pradesh',
      claims: 6524,
      approved: 4234,
      villages: 1250,
      color: governmentColors.primaryBlue,
    },
    'odisha': {
      name: 'Odisha',
      claims: 4123,
      approved: 2654,
      villages: 850,
      color: governmentColors.success,
    },
    'telangana': {
      name: 'Telangana',
      claims: 3256,
      approved: 1876,
      villages: 650,
      color: governmentColors.saffron,
    },
    'tripura': {
      name: 'Tripura',
      claims: 1944,
      approved: 529,
      villages: 320,
      color: governmentColors.primaryGreen,
    },
  };

  // Animation cycle for highlighting states
  useEffect(() => {
    const states = Object.keys(stateData);
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % (states.length + 1));
      if (animationStep < states.length) {
        setHighlightedState(states[animationStep]);
      } else {
        setHighlightedState(null);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [animationStep]);

  // Complete India map outline with more accurate shape
  const indiaPath = `
    M 200 100
    L 220 80 L 250 70 L 300 65 L 350 60 L 400 55 L 450 60 L 500 65 L 550 70 L 600 75 L 650 85 L 700 100 L 750 120
    L 790 150 L 820 190 L 840 230 L 850 280 L 860 330 L 855 380 L 845 430 L 830 480 L 810 520 L 780 550 L 740 575
    L 690 590 L 640 595 L 580 595 L 520 590 L 460 585 L 400 575 L 350 560 L 300 540 L 250 515 L 210 480 L 180 440
    L 160 390 L 150 340 L 155 290 L 165 240 L 180 190 L 200 150 Z
  `;

  // Accurately positioned and sized state paths for the four highlighted states
  const statePaths = {
    'madhya-pradesh': {
      path: `M 300 280 L 480 270 L 520 320 L 510 380 L 470 420 L 410 430 L 350 415 L 310 385 L 295 340 L 300 300 Z`,
      center: { x: 400, y: 350 }
    },
    'odisha': {
      path: `M 550 350 L 620 340 L 660 370 L 675 420 L 670 470 L 635 500 L 580 505 L 540 485 L 535 440 L 545 395 Z`,
      center: { x: 605, y: 425 }
    },
    'telangana': {
      path: `M 430 420 L 510 415 L 540 450 L 535 490 L 500 520 L 460 525 L 425 505 L 415 470 L 425 445 Z`,
      center: { x: 475, y: 470 }
    },
    'tripura': {
      path: `M 720 290 L 760 285 L 780 310 L 770 340 L 740 350 L 715 335 L 710 315 Z`,
      center: { x: 745, y: 318 }
    },
  };

  return (
    <Box
      className="india-map-container background-particles"
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 400, md: 600 },
        background: `radial-gradient(circle at center, 
          rgba(13, 71, 161, 0.9) 0%, 
          rgba(21, 101, 192, 0.7) 25%, 
          rgba(46, 125, 50, 0.8) 50%, 
          rgba(255, 153, 51, 0.7) 75%, 
          rgba(13, 71, 161, 0.9) 100%)`,
        borderRadius: 4,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `3px solid rgba(255, 255, 255, 0.3)`,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 0 60px rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Enhanced background with animated particles */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 15% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 30%),
            radial-gradient(circle at 85% 75%, rgba(255, 255, 255, 0.08) 0%, transparent 35%),
            radial-gradient(circle at 45% 15%, rgba(255, 255, 255, 0.06) 0%, transparent 25%),
            radial-gradient(circle at 75% 45%, rgba(255, 255, 255, 0.1) 0%, transparent 30%)
          `,
          animation: 'float 20s ease-in-out infinite',
        }}
      />
      
      {/* Additional floating elements for more dynamism */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 30% 60%, rgba(255, 193, 7, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 70% 30%, rgba(76, 175, 80, 0.05) 0%, transparent 40%)
          `,
          animation: 'float 25s ease-in-out infinite reverse',
        }}
      />

      {/* Main SVG Map */}
      <Box
        component="svg"
        sx={{
          width: '100%',
          height: '100%',
          maxWidth: 600,
          maxHeight: 400,
        }}
        viewBox="0 0 1000 700"
      >
        {/* India base outline - complete map visible */}
        <motion.path
          d={indiaPath}
          fill="rgba(255, 255, 255, 0.15)"
          stroke="rgba(255, 255, 255, 0.8)"
          strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />

        {/* Highlighted state paths */}
        {Object.entries(statePaths).map(([stateKey, stateInfo]) => {
          const state = stateData[stateKey];
          const isHighlighted = highlightedState === stateKey;
          
          return (
            <motion.g key={stateKey}>
              {/* State path with strong highlight */}
              <motion.path
                className="state-path"
                d={stateInfo.path}
                fill={state.color}
                stroke="white"
                strokeWidth="3"
                style={{ cursor: 'pointer' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: isHighlighted ? 1 : 0.85,
                  scale: isHighlighted ? 1.05 : 1,
                }}
                transition={{ duration: 0.5 }}
                onHoverStart={() => setHighlightedState(stateKey)}
                onHoverEnd={() => setHighlightedState(null)}
                whileHover={{
                  scale: 1.08,
                  opacity: 1,
                  transition: { duration: 0.3 }
                }}
              />
              
              {/* Glowing effect for highlighted states */}
              <motion.path
                d={stateInfo.path}
                fill="none"
                stroke={state.color}
                strokeWidth="8"
                opacity="0.3"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHighlighted ? 0.5 : 0.2 }}
                transition={{ duration: 0.5 }}
                style={{ filter: 'blur(4px)' }}
              />
              
              {/* State labels - always visible for highlighted states */}
              <motion.text
                x={stateInfo.center.x}
                y={stateInfo.center.y}
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="700"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: isHighlighted ? 1 : 0.8 }}
                transition={{ duration: 0.3 }}
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
              >
                {state.name.split(' ')[0]}
              </motion.text>

              {/* Animated pulse effect */}
              {isHighlighted && (
                <motion.circle
                  cx={stateInfo.center.x}
                  cy={stateInfo.center.y}
                  r="0"
                  fill="none"
                  stroke={state.color}
                  strokeWidth="4"
                  animate={{ r: [0, 30, 60], opacity: [1, 0.6, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              )}
              
              {/* Secondary pulse for more visual impact */}
              {isHighlighted && (
                <motion.circle
                  cx={stateInfo.center.x}
                  cy={stateInfo.center.y}
                  r="0"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  animate={{ r: [0, 20, 40], opacity: [0.8, 0.4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
              )}
            </motion.g>
          );
        })}

        {/* Connection lines between states */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <line
            x1="400" y1="350"
            x2="605" y2="425"
            stroke={governmentColors.primaryBlue}
            strokeWidth="2"
            strokeDasharray="8,4"
            opacity="0.6"
          >
            <animate attributeName="stroke-dashoffset" values="0;-12" dur="3s" repeatCount="indefinite"/>
          </line>
          <line
            x1="605" y1="425"
            x2="475" y2="470"
            stroke={governmentColors.success}
            strokeWidth="2"
            strokeDasharray="8,4"
            opacity="0.6"
          >
            <animate attributeName="stroke-dashoffset" values="0;-12" dur="3s" repeatCount="indefinite"/>
          </line>
          <line
            x1="475" y1="470"
            x2="745" y2="318"
            stroke={governmentColors.saffron}
            strokeWidth="2"
            strokeDasharray="8,4"
            opacity="0.6"
          >
            <animate attributeName="stroke-dashoffset" values="0;-12" dur="3s" repeatCount="indefinite"/>
          </line>
          <line
            x1="745" y1="318"
            x2="400" y2="350"
            stroke={governmentColors.primaryGreen}
            strokeWidth="2"
            strokeDasharray="8,4"
            opacity="0.6"
          >
            <animate attributeName="stroke-dashoffset" values="0;-12" dur="3s" repeatCount="indefinite"/>
          </line>
        </motion.g>
      </Box>

      {/* Floating state information cards */}
      {highlightedState && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        >
          <Paper
            className="state-info-card"
            elevation={0}
            sx={{
              p: 2,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: 3,
              border: `2px solid ${stateData[highlightedState].color}`,
              minWidth: 200,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: stateData[highlightedState].color,
                mb: 1,
              }}
            >
              {stateData[highlightedState].name}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 1 }}>
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Claims
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {stateData[highlightedState].claims.toLocaleString()}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Approved
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {stateData[highlightedState].approved.toLocaleString()}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Villages
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {stateData[highlightedState].villages.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      )}

      {/* Title overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: governmentColors.white,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              mb: 1,
            }}
          >
            FRA Implementation States
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
            {Object.entries(stateData).map(([key, state]) => (
              <Chip
                key={key}
                size="small"
                label={state.name.split(' ')[0]}
                sx={{
                  backgroundColor: `${state.color}90`,
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              />
            ))}
          </Box>
        </motion.div>
      </Box>

      {/* Loading indicator for the animation cycle */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 10,
          right: 20,
          display: 'flex',
          gap: 1,
        }}
      >
        {[0, 1, 2, 3, 4].map((step) => (
          <Box
            key={step}
            className="loading-indicator"
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: animationStep === step ? governmentColors.goldAccent : 'rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default IndiaMap;