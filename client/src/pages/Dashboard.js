import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  LinearProgress,
  IconButton,
  Tooltip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Badge,
  CircularProgress,
} from '@mui/material';
import {
  Assessment,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  PendingActions,
  Warning,
  Forest,
  Home,
  Groups,
  LocationOn,
  Satellite,
  Agriculture,
  Water,
  Timeline,
  Notifications,
  Download,
  Refresh,
  FilterList,
  ArrowUpward,
  ArrowDownward,
  MoreVert,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
  RadialBarChart,
  RadialBar,
  Legend,
} from 'recharts';
import { governmentColors } from '../theme/governmentTheme';
import { useLanguage } from '../context/LanguageContext';
import { formatLocalizedNumber, formatLocalizedPercentage, formatLocalizedDate } from '../utils/numberLocalization';
import '../styles/chartAnimations.css';

const Dashboard = () => {
  const { t, currentLanguage } = useLanguage();
  const [selectedState, setSelectedState] = useState('all');
  const [timeRange, setTimeRange] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Animate numbers on mount
  const [animatedStats, setAnimatedStats] = useState({
    totalClaims: 0,
    approvedClaims: 0,
    pendingClaims: 0,
    rejectedClaims: 0,
    forestArea: 0,
    villages: 0,
    officers: 0,
    digitalizedDocs: 0,
  });

  useEffect(() => {
    const finalStats = {
      totalClaims: 15847,
      approvedClaims: 9293,
      pendingClaims: 4825,
      rejectedClaims: 1729,
      forestArea: 245680,
      villages: 2847,
      officers: 186,
      digitalizedDocs: 12543,
    };

    const animateNumbers = () => {
      const duration = 2500;
      const steps = 60;
      const stepDuration = duration / steps;

      for (let i = 0; i <= steps; i++) {
        setTimeout(() => {
          const progress = i / steps;
          setAnimatedStats({
            totalClaims: Math.floor(finalStats.totalClaims * progress),
            approvedClaims: Math.floor(finalStats.approvedClaims * progress),
            pendingClaims: Math.floor(finalStats.pendingClaims * progress),
            rejectedClaims: Math.floor(finalStats.rejectedClaims * progress),
            forestArea: Math.floor(finalStats.forestArea * progress),
            villages: Math.floor(finalStats.villages * progress),
            officers: Math.floor(finalStats.officers * progress),
            digitalizedDocs: Math.floor(finalStats.digitalizedDocs * progress),
          });
        }, i * stepDuration);
      }
    };

    animateNumbers();
  }, [selectedState]);

  // Animation states for charts
  const [animateCharts, setAnimateCharts] = useState(false);
  
  useEffect(() => {
    // Trigger chart animations after component mounts
    const timer = setTimeout(() => {
      setAnimateCharts(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Chart animation configurations
  const chartAnimationConfig = {
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: 'ease-out',
  };
  
  const staggeredAnimationConfig = {
    animationBegin: 200,
    animationDuration: 1200,
    animationEasing: 'ease-in-out',
  };
  
  const pulseAnimationConfig = {
    animationBegin: 300,
    animationDuration: 2000,
    animationEasing: 'ease-in-out',
  };

  // Sample data for charts
  const stateWiseData = [
    { name: t('madhyaPradesh'), claims: 6524, approved: 4234, pending: 1890, rejected: 400 },
    { name: t('odisha'), claims: 4123, approved: 2654, pending: 1234, rejected: 235 },
    { name: t('telangana'), claims: 3256, approved: 1876, pending: 1045, rejected: 335 },
    { name: t('tripura'), claims: 1944, approved: 529, pending: 656, rejected: 759 },
  ];

  const monthlyTrendData = [
    { month: t('january').substring(0, 3), claims: 1234, approved: 856, digitized: 1100, villages: 45, officers: 12 },
    { month: t('february').substring(0, 3), claims: 1456, approved: 1023, digitized: 1350, villages: 52, officers: 14 },
    { month: t('march').substring(0, 3), claims: 1678, approved: 1234, digitized: 1580, villages: 58, officers: 16 },
    { month: t('april').substring(0, 3), claims: 1543, approved: 1098, digitized: 1430, villages: 63, officers: 18 },
    { month: t('may').substring(0, 3), claims: 1789, approved: 1345, digitized: 1680, villages: 67, officers: 20 },
    { month: t('june').substring(0, 3), claims: 1654, approved: 1234, digitized: 1540, villages: 71, officers: 22 },
  ];

  const weeklyProgressData = [
    { week: t('week1'), processing: 856, completed: 645, backlog: 211 },
    { week: t('week2'), processing: 923, completed: 734, backlog: 189 },
    { week: t('week3'), processing: 1045, completed: 823, backlog: 222 },
    { week: t('week4'), processing: 1156, completed: 934, backlog: 222 },
  ];

  const forestCoverageData = [
    { region: t('denseForestLabel'), area: 45678, percentage: 38.2, color: governmentColors.darkGreen },
    { region: t('moderateForestLabel'), area: 32456, percentage: 27.1, color: governmentColors.primaryGreen },
    { region: t('openForestLabel'), area: 28934, percentage: 24.2, color: governmentColors.success },
    { region: t('scrublandLabel'), area: 12567, percentage: 10.5, color: governmentColors.warning },
  ];

  const beneficiaryDemographics = [
    { category: t('individualClaims'), count: 8456, percentage: 53.4, color: governmentColors.primaryBlue },
    { category: t('communityClaims'), count: 4234, percentage: 26.7, color: governmentColors.success },
    { category: t('jointClaims'), count: 2145, percentage: 13.5, color: governmentColors.saffron },
    { category: t('institutionalClaims'), count: 1012, percentage: 6.4, color: governmentColors.info },
  ];

  const performanceMetrics = [
    { metric: t('applicationProcessingMetric'), score: 85, target: 90, color: governmentColors.success },
    { metric: t('documentVerificationMetric'), score: 78, target: 85, color: governmentColors.warning },
    { metric: t('fieldSurveyCompletionMetric'), score: 92, target: 95, color: governmentColors.success },
    { metric: t('finalApprovalRateMetric'), score: 68, target: 80, color: governmentColors.error },
    { metric: t('digitalIntegrationMetric'), score: 94, target: 90, color: governmentColors.success },
  ];

  const districtPerformanceData = [
    { district: t('bastar'), claims: 1234, approved: 856, efficiency: 69.4 },
    { district: t('dindori'), claims: 956, approved: 723, efficiency: 75.6 },
    { district: t('mandla'), claims: 1156, approved: 934, efficiency: 80.8 },
    { district: t('betul'), claims: 834, approved: 567, efficiency: 68.0 },
    { district: t('chhindwara'), claims: 1045, approved: 789, efficiency: 75.5 },
  ];

  const satelliteAnalyticsData = [
    { date: '2024-01', forestLoss: 234, detected: 456, verified: 389 },
    { date: '2024-02', forestLoss: 189, detected: 412, verified: 356 },
    { date: '2024-03', forestLoss: 267, detected: 523, verified: 445 },
    { date: '2024-04', forestLoss: 156, detected: 378, verified: 312 },
    { date: '2024-05', forestLoss: 198, detected: 434, verified: 367 },
    { date: '2024-06', forestLoss: 223, detected: 456, verified: 389 },
  ];

  const claimTypeData = [
    { name: t('individualForestRightsIFR'), value: 8456, color: governmentColors.success },
    { name: t('communityForestRightsCFR'), value: 4234, color: governmentColors.primaryBlue },
    { name: t('communityRightsCR'), value: 3157, color: governmentColors.saffron },
  ];

  const assetMappingData = [
    { asset: t('agriculturalLand'), detected: 15680, verified: 13245, accuracy: 84.5 },
    { asset: t('forestCoverAsset'), detected: 28456, verified: 26234, accuracy: 92.2 },
    { asset: t('waterBodiesAsset'), detected: 3456, verified: 3123, accuracy: 90.4 },
    { asset: t('homesteadsAsset'), detected: 18234, verified: 16789, accuracy: 92.1 },
  ];

  const dssRecommendations = [
    {
      scheme: t('pmKisan'),
      eligibleBeneficiaries: 12456,
      enrolled: 8234,
      priority: t('high'),
      status: t('active'),
    },
    {
      scheme: t('jalJeevanMission'),
      eligibleBeneficiaries: 8765,
      enrolled: 5432,
      priority: t('critical'),
      status: t('pending'),
    },
    {
      scheme: t('mgnrega'),
      eligibleBeneficiaries: 15678,
      enrolled: 12345,
      priority: t('medium'),
      status: t('active'),
    },
    {
      scheme: t('dajgua'),
      eligibleBeneficiaries: 6789,
      enrolled: 4567,
      priority: t('high'),
      status: t('review'),
    },
  ];

  const recentActivities = [
    {
      type: 'claim_approved',
      message: t('ifrClaimApprovedMessage'),
      time: '2 hours ago',
      icon: <CheckCircle />,
      color: governmentColors.success,
    },
    {
      type: 'document_digitized',
      message: t('legacyDocumentsDigitizedMessage'),
      time: '4 hours ago',
      icon: <Assessment />,
      color: governmentColors.primaryBlue,
    },
    {
      type: 'satellite_analysis',
      message: t('satelliteImageryProcessedMessage'),
      time: '6 hours ago',
      icon: <Satellite />,
      color: governmentColors.info,
    },
    {
      type: 'dss_recommendation',
      message: t('dssRecommendationMessage'),
      time: '8 hours ago',
      icon: <TrendingUp />,
      color: governmentColors.saffron,
    },
  ];

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLastUpdated(new Date());
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        background: `linear-gradient(135deg, ${governmentColors.lightBlue} 0%, ${governmentColors.lightGreen} 100%)`,
        py: 3,
      }}
    >
      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Dashboard Header */}
          <motion.div variants={itemVariants}>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 4,
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    background: `linear-gradient(135deg, ${governmentColors.navy} 0%, ${governmentColors.primaryBlue} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    mb: 1,
                  }}
                >
                  🏛️ {t('dashboardTitle')}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: governmentColors.grey[600],
                    fontWeight: 500,
                  }}
                >
                  {t('aiPoweredDSS')}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: governmentColors.grey[500],
                    mt: 0.5,
                  }}
                >
                  {t('lastUpdatedText')}: {formatLocalizedDate(lastUpdated, currentLanguage)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>{t('selectState')}</InputLabel>
                  <Select
                    value={selectedState}
                    label={t('selectState')}
                    onChange={(e) => setSelectedState(e.target.value)}
                  >
                    <MenuItem value="all">{t('allStates')}</MenuItem>
                    <MenuItem value="mp">{t('madhyaPradesh')}</MenuItem>
                    <MenuItem value="od">{t('odisha')}</MenuItem>
                    <MenuItem value="tg">{t('telangana')}</MenuItem>
                    <MenuItem value="tr">{t('tripura')}</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>{t('timeRange')}</InputLabel>
                  <Select
                    value={timeRange}
                    label={t('timeRange')}
                    onChange={(e) => setTimeRange(e.target.value)}
                  >
                    <MenuItem value="daily">{t('daily') || 'Daily'}</MenuItem>
                    <MenuItem value="weekly">{t('weekly')}</MenuItem>
                    <MenuItem value="monthly">{t('monthly')}</MenuItem>
                    <MenuItem value="yearly">{t('yearly')}</MenuItem>
                  </Select>
                </FormControl>
                
                <Tooltip title={t('refreshData')}>
                  <IconButton 
                    onClick={handleRefresh}
                    disabled={loading}
                    sx={{
                      bgcolor: governmentColors.white,
                      '&:hover': { bgcolor: governmentColors.lightBlue },
                    }}
                  >
                    {loading ? <CircularProgress size={20} /> : <Refresh />}
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </motion.div>

          {/* Key Statistics Cards */}
          <motion.div variants={itemVariants}>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {[
                {
                  title: t('totalClaims'),
                  value: formatLocalizedNumber(animatedStats.totalClaims, currentLanguage),
                  icon: <Assessment />,
                  color: governmentColors.primaryBlue,
                  trend: { value: 12.5, direction: 'up' },
                  description: t('acrossAllStates'),
                },
                {
                  title: t('approvedClaims'),
                  value: formatLocalizedNumber(animatedStats.approvedClaims, currentLanguage),
                  icon: <CheckCircle />,
                  color: governmentColors.success,
                  trend: { value: 8.3, direction: 'up' },
                  description: `${t('successRate')}: ${formatLocalizedPercentage(58.6, currentLanguage)}%`,
                },
                {
                  title: t('pendingClaims'),
                  value: formatLocalizedNumber(animatedStats.pendingClaims, currentLanguage),
                  icon: <PendingActions />,
                  color: governmentColors.warning,
                  trend: { value: 3.2, direction: 'down' },
                  description: t('underProcessing'),
                },
                {
                  title: t('forestAreaProtected'),
                  value: `${formatLocalizedNumber(animatedStats.forestArea, currentLanguage)} Ha`,
                  icon: <Forest />,
                  color: governmentColors.primaryGreen,
                  trend: { value: 15.7, direction: 'up' },
                  description: t('totalAreaCovered'),
                },
                {
                  title: t('tribalVillagesTitle'),
                  value: formatLocalizedNumber(animatedStats.villages, currentLanguage),
                  icon: <Home />,
                  color: governmentColors.saffron,
                  trend: { value: 5.4, direction: 'up' },
                  description: t('villagesCoveredText'),
                },
                {
                  title: t('documentsDigitized'),
                  value: formatLocalizedNumber(animatedStats.digitalizedDocs, currentLanguage),
                  icon: <Satellite />,
                  color: governmentColors.info,
                  trend: { value: 22.8, direction: 'up' },
                  description: t('aiOcrProcessed'),
                },
              ].map((stat, index) => (
                <Grid item xs={12} sm={6} md={4} lg={2} key={stat.title}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Card
                      className="stats-card animated-card"
                      sx={{
                        p: 2.5,
                        height: '100%',
                        background: `linear-gradient(135deg, ${stat.color}08 0%, ${stat.color}15 100%)`,
                        border: `2px solid ${stat.color}20`,
                        borderRadius: 3,
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 4,
                          background: stat.color,
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Avatar
                          sx={{
                            bgcolor: `${stat.color}20`,
                            color: stat.color,
                            width: 48,
                            height: 48,
                            mr: 1.5,
                          }}
                        >
                          {stat.icon}
                        </Avatar>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {stat.trend.direction === 'up' ? (
                            <ArrowUpward sx={{ color: governmentColors.success, fontSize: 16 }} />
                          ) : (
                            <ArrowDownward sx={{ color: governmentColors.error, fontSize: 16 }} />
                          )}
                          <Typography
                            variant="caption"
                            sx={{
                              color: stat.trend.direction === 'up' ? governmentColors.success : governmentColors.error,
                              fontWeight: 600,
                            }}
                          >
                            {formatLocalizedPercentage(stat.trend.value, currentLanguage)}%
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 800,
                          color: stat.color,
                          fontSize: '1.75rem',
                          mb: 0.5,
                        }}
                      >
                        {stat.value}
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        sx={{
                          color: governmentColors.navy,
                          fontWeight: 600,
                          mb: 0.5,
                        }}
                      >
                        {stat.title}
                      </Typography>
                      
                      <Typography
                        variant="caption"
                        sx={{
                          color: governmentColors.grey[600],
                        }}
                      >
                        {stat.description}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* Charts Row 1 */}
          <Grid container spacing={3} sx={{ mb: 4 }} className="chart-row">
            {/* State-wise Claims Distribution */}
            <Grid item xs={12} lg={8}>
              <motion.div variants={itemVariants}>
                <Card className="animated-card animated-chart chart-container" sx={{ p: 3, height: 400 }}>
                  <Typography variant="h6" className="chart-title" sx={{ fontWeight: 700, color: governmentColors.navy, mb: 3 }}>
                    🏛️ {t('stateWiseFraClaimsDistribution')}
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stateWiseData}>
                      <defs>
                        {/* Enhanced gradients for bars */}
                        <linearGradient id="approvedBarGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={governmentColors.success} stopOpacity={1}/>
                          <stop offset="100%" stopColor={governmentColors.success} stopOpacity={0.7}/>
                        </linearGradient>
                        <linearGradient id="pendingBarGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={governmentColors.warning} stopOpacity={1}/>
                          <stop offset="100%" stopColor={governmentColors.warning} stopOpacity={0.7}/>
                        </linearGradient>
                        <linearGradient id="rejectedBarGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={governmentColors.error} stopOpacity={1}/>
                          <stop offset="100%" stopColor={governmentColors.error} stopOpacity={0.7}/>
                        </linearGradient>
                        
                        {/* Glow filters for hover effects */}
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                          <feMerge> 
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke={governmentColors.grey[300]} 
                        opacity={0.6}
                      />
                      
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12, fill: governmentColors.navy, fontWeight: 500 }}
                        axisLine={{ stroke: governmentColors.grey[400] }}
                        tickLine={{ stroke: governmentColors.grey[400] }}
                      />
                      
                      <YAxis 
                        tick={{ fontSize: 12, fill: governmentColors.navy, fontWeight: 500 }}
                        axisLine={{ stroke: governmentColors.grey[400] }}
                        tickLine={{ stroke: governmentColors.grey[400] }}
                      />
                      
                      <RechartsTooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: `2px solid ${governmentColors.grey[200]}`,
                          borderRadius: 16,
                          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                          backdropFilter: 'blur(20px)',
                          padding: '12px 16px'
                        }}
                        labelStyle={{ 
                          color: governmentColors.navy, 
                          fontWeight: 700,
                          fontSize: '15px',
                          marginBottom: '8px'
                        }}
                        cursor={{
                          fill: 'rgba(74, 144, 226, 0.1)',
                          stroke: governmentColors.primaryBlue,
                          strokeWidth: 2,
                          strokeDasharray: '5 5'
                        }}
                      />
                      
                      <Bar 
                        dataKey="approved" 
                        fill="url(#approvedBarGradient)" 
                        radius={[6, 6, 0, 0]}
                        name={t('approvedClaims')}
                        animationBegin={0}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      />
                      
                      <Bar 
                        dataKey="pending" 
                        fill="url(#pendingBarGradient)" 
                        radius={[6, 6, 0, 0]}
                        name={t('pendingClaims')}
                        animationBegin={200}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      />
                      
                      <Bar 
                        dataKey="rejected" 
                        fill="url(#rejectedBarGradient)" 
                        radius={[6, 6, 0, 0]}
                        name={t('rejectedClaims')}
                        animationBegin={400}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </motion.div>
            </Grid>

            {/* Claim Types Distribution */}
            <Grid item xs={12} lg={4}>
              <motion.div variants={itemVariants}>
                <Card className="animated-card animated-chart chart-container" sx={{ p: 3, height: 400 }}>
                  <Typography variant="h6" className="chart-title" sx={{ fontWeight: 700, color: governmentColors.navy, mb: 3 }}>
                    📊 {t('fraClaimTypes')}
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <defs>
                        {/* Enhanced gradients for pie slices */}
                        {claimTypeData.map((entry, index) => (
                          <linearGradient key={`gradient-${index}`} id={`pieGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor={entry.color} stopOpacity={1}/>
                            <stop offset="100%" stopColor={entry.color} stopOpacity={0.8}/>
                          </linearGradient>
                        ))}
                        
                        {/* Glow effect for hover */}
                        <filter id="pieGlow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge> 
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      
                      <Pie
                        data={claimTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={110}
                        paddingAngle={3}
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={2000}
                        animationEasing="ease-out"
                        label={({ name, percent }) => `${formatLocalizedPercentage(percent * 100, currentLanguage)}%`}
                        labelLine={false}
                      >
                        {claimTypeData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={`url(#pieGradient${index})`}
                            stroke={entry.color}
                            strokeWidth={2}
                            style={{
                              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                              transition: 'all 0.3s ease'
                            }}
                          />
                        ))}
                      </Pie>
                      
                      <RechartsTooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: `2px solid ${governmentColors.grey[200]}`,
                          borderRadius: 16,
                          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                          backdropFilter: 'blur(20px)',
                          padding: '12px 16px'
                        }}
                        formatter={(value, name) => [formatLocalizedNumber(value, currentLanguage), name]}
                      />
                      
                      <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        iconType="rect"
                        wrapperStyle={{ 
                          fontSize: '12px',
                          fontWeight: 600,
                          paddingTop: '16px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </motion.div>
            </Grid>
          </Grid>

          {/* Charts Row 2: Monthly Trends & Weekly Progress */}
          <Grid container spacing={3} sx={{ mb: 4 }} className="chart-row">
            {/* Monthly Trends - Enhanced */}
            <Grid item xs={12} lg={8}>
              <motion.div variants={itemVariants}>
                <Card className="animated-card animated-chart chart-container" sx={{ p: 3, height: 400 }}>
                  <Typography variant="h6" className="chart-title" sx={{ fontWeight: 700, color: governmentColors.navy, mb: 3 }}>
                    📈 {t('monthlyImplementationTrends')}
                  </Typography>
                  <ResponsiveContainer width="100%" height={320}>
                    <AreaChart data={monthlyTrendData}>
                      <defs>
                        <linearGradient id="claimsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={governmentColors.primaryBlue} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={governmentColors.primaryBlue} stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="approvedGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={governmentColors.success} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={governmentColors.success} stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="digitizedGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={governmentColors.saffron} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={governmentColors.saffron} stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={governmentColors.grey[300]} />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <RechartsTooltip 
                        contentStyle={{
                          backgroundColor: governmentColors.white,
                          border: `1px solid ${governmentColors.grey[300]}`,
                          borderRadius: 8,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="claims" 
                        stroke={governmentColors.primaryBlue} 
                        fillOpacity={1} 
                        fill="url(#claimsGradient)"
                        strokeWidth={4}
                        name={t('claimsReceived')}
                        animationBegin={0}
                        animationDuration={2000}
                        animationEasing="ease-out"
                        dot={{ 
                          fill: governmentColors.primaryBlue, 
                          strokeWidth: 3, 
                          stroke: governmentColors.white,
                          r: 6,
                          style: { 
                            filter: 'drop-shadow(0 2px 4px rgba(74, 144, 226, 0.3))',
                            transition: 'all 0.3s ease'
                          }
                        }}
                        activeDot={{ 
                          r: 8, 
                          fill: governmentColors.primaryBlue,
                          stroke: governmentColors.white,
                          strokeWidth: 3,
                          style: {
                            filter: 'drop-shadow(0 4px 8px rgba(74, 144, 226, 0.5))'
                          }
                        }}
                      />
                      
                      <Area 
                        type="monotone" 
                        dataKey="approved" 
                        stroke={governmentColors.success} 
                        fillOpacity={1} 
                        fill="url(#approvedGradient)"
                        strokeWidth={4}
                        name={t('claimsApproved')}
                        animationBegin={300}
                        animationDuration={2000}
                        animationEasing="ease-out"
                        dot={{ 
                          fill: governmentColors.success, 
                          strokeWidth: 3, 
                          stroke: governmentColors.white,
                          r: 6,
                          style: { 
                            filter: 'drop-shadow(0 2px 4px rgba(76, 175, 80, 0.3))',
                            transition: 'all 0.3s ease'
                          }
                        }}
                        activeDot={{ 
                          r: 8, 
                          fill: governmentColors.success,
                          stroke: governmentColors.white,
                          strokeWidth: 3,
                          style: {
                            filter: 'drop-shadow(0 4px 8px rgba(76, 175, 80, 0.5))'
                          }
                        }}
                      />
                      
                      <Area 
                        type="monotone" 
                        dataKey="digitized" 
                        stroke={governmentColors.saffron} 
                        fillOpacity={1} 
                        fill="url(#digitizedGradient)"
                        strokeWidth={4}
                        name={t('documentsDigitizedLabel')}
                        animationBegin={600}
                        animationDuration={2000}
                        animationEasing="ease-out"
                        dot={{ 
                          fill: governmentColors.saffron, 
                          strokeWidth: 3, 
                          stroke: governmentColors.white,
                          r: 6,
                          style: { 
                            filter: 'drop-shadow(0 2px 4px rgba(255, 193, 7, 0.3))',
                            transition: 'all 0.3s ease'
                          }
                        }}
                        activeDot={{ 
                          r: 8, 
                          fill: governmentColors.saffron,
                          stroke: governmentColors.white,
                          strokeWidth: 3,
                          style: {
                            filter: 'drop-shadow(0 4px 8px rgba(255, 193, 7, 0.5))'
                          }
                        }}
                      />
                      <Legend />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>
              </motion.div>
            </Grid>

            {/* Weekly Progress Data */}
            <Grid item xs={12} lg={4}>
              <motion.div variants={itemVariants}>
                <Card className="animated-card animated-chart chart-container" sx={{ p: 3, height: 400 }}>
                  <Typography variant="h6" className="chart-title" sx={{ fontWeight: 700, color: governmentColors.navy, mb: 3 }}>
                    📅 {t('weeklyProgressTracking')}
                  </Typography>
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart 
                      data={weeklyProgressData} 
                      margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                      <defs>
                        {/* Enhanced gradients for weekly progress bars */}
                        <linearGradient id="completedWeeklyGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={governmentColors.success} stopOpacity={1}/>
                          <stop offset="100%" stopColor={governmentColors.success} stopOpacity={0.7}/>
                        </linearGradient>
                        <linearGradient id="processingWeeklyGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={governmentColors.warning} stopOpacity={1}/>
                          <stop offset="100%" stopColor={governmentColors.warning} stopOpacity={0.7}/>
                        </linearGradient>
                        <linearGradient id="backlogWeeklyGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={governmentColors.error} stopOpacity={1}/>
                          <stop offset="100%" stopColor={governmentColors.error} stopOpacity={0.7}/>
                        </linearGradient>
                      </defs>
                      
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke={governmentColors.grey[300]} 
                        opacity={0.6}
                      />
                      
                      <XAxis 
                        dataKey="week" 
                        tick={{ fontSize: 11, fill: governmentColors.navy, fontWeight: 500 }}
                        axisLine={{ stroke: governmentColors.grey[400] }}
                        tickLine={{ stroke: governmentColors.grey[400] }}
                      />
                      
                      <YAxis 
                        tick={{ fontSize: 11, fill: governmentColors.navy, fontWeight: 500 }}
                        axisLine={{ stroke: governmentColors.grey[400] }}
                        tickLine={{ stroke: governmentColors.grey[400] }}
                      />
                      
                      <RechartsTooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: `2px solid ${governmentColors.grey[200]}`,
                          borderRadius: 16,
                          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                          backdropFilter: 'blur(20px)',
                          padding: '12px 16px'
                        }}
                        labelStyle={{ 
                          color: governmentColors.navy, 
                          fontWeight: 700,
                          fontSize: '15px',
                          marginBottom: '8px'
                        }}
                        cursor={{
                          fill: 'rgba(74, 144, 226, 0.1)',
                          stroke: governmentColors.primaryBlue,
                          strokeWidth: 2,
                          strokeDasharray: '5 5'
                        }}
                      />
                      
                      <Legend 
                        wrapperStyle={{ 
                          paddingTop: '20px', 
                          fontSize: '12px',
                          fontWeight: 600
                        }}
                        iconType="rect"
                      />
                      
                      <Bar 
                        dataKey="completed" 
                        fill="url(#completedWeeklyGradient)" 
                        radius={[6, 6, 0, 0]}
                        name={t('completedLabel')}
                        animationBegin={0}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      />
                      
                      <Bar 
                        dataKey="processing" 
                        fill="url(#processingWeeklyGradient)" 
                        radius={[6, 6, 0, 0]}
                        name={t('processedLabel')}
                        animationBegin={200}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      />
                      
                      <Bar 
                        dataKey="backlog" 
                        fill="url(#backlogWeeklyGradient)" 
                        radius={[6, 6, 0, 0]}
                        name={t('backlogLabel')}
                        animationBegin={400}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </motion.div>
            </Grid>
          </Grid>

          {/* Charts Row 3: Forest Coverage & Beneficiary Demographics */}
          <Grid container spacing={3} sx={{ mb: 4 }} className="chart-row">
            {/* Forest Coverage Analysis */}
            <Grid item xs={12} lg={6}>
              <motion.div variants={itemVariants}>
                <Card className="animated-card animated-chart chart-container" sx={{ p: 3, height: 400 }}>
                  <Typography variant="h6" className="chart-title" sx={{ fontWeight: 700, color: governmentColors.navy, mb: 3 }}>
                    🌲 {t('forestCoverageDistributionByRegion')}
                  </Typography>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <defs>
                        {/* Enhanced gradients for forest coverage slices */}
                        {forestCoverageData.map((entry, index) => (
                          <linearGradient key={`forestGradient${index}`} id={`forestGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor={entry.color} stopOpacity={1}/>
                            <stop offset="100%" stopColor={entry.color} stopOpacity={0.8}/>
                          </linearGradient>
                        ))}
                        
                        {/* Enhanced shadow filter */}
                        <filter id="forestShadow">
                          <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3"/>
                        </filter>
                      </defs>
                      
                      <Pie
                        data={forestCoverageData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ region, percentage }) => `${formatLocalizedPercentage(percentage, currentLanguage)}%`}
                        outerRadius={85}
                        innerRadius={20}
                        fill="#8884d8"
                        dataKey="area"
                        animationBegin={0}
                        animationDuration={2200}
                        animationEasing="ease-out"
                        paddingAngle={2}
                      >
                        {forestCoverageData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={`url(#forestGradient${index})`}
                            stroke={entry.color}
                            strokeWidth={3}
                            style={{
                              filter: 'url(#forestShadow)',
                              transition: 'all 0.3s ease'
                            }}
                          />
                        ))}
                      </Pie>
                      
                      <RechartsTooltip 
                        formatter={(value) => [`${formatLocalizedNumber(value, currentLanguage)} Ha`, 'Area']}
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: `2px solid ${governmentColors.grey[200]}`,
                          borderRadius: 16,
                          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                          backdropFilter: 'blur(20px)',
                          padding: '12px 16px'
                        }}
                        labelStyle={{ 
                          color: governmentColors.navy, 
                          fontWeight: 700,
                          fontSize: '14px'
                        }}
                      />
                      
                      <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        iconType="rect"
                        wrapperStyle={{ 
                          fontSize: '11px',
                          fontWeight: 600,
                          paddingTop: '12px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {forestCoverageData.map((item, index) => (
                      <Chip
                        key={index}
                        size="small"
                        label={`${item.region}: ${formatLocalizedNumber(item.area, currentLanguage)} Ha`}
                        sx={{ 
                          backgroundColor: `${item.color}20`,
                          color: item.color,
                          fontWeight: 600
                        }}
                      />
                    ))}
                  </Box>
                </Card>
              </motion.div>
            </Grid>

            {/* Beneficiary Demographics */}
            <Grid item xs={12} lg={6}>
              <motion.div variants={itemVariants}>
                <Card className="animated-card animated-chart chart-container" sx={{ p: 3, height: 400 }}>
                  <Typography variant="h6" className="chart-title" sx={{ fontWeight: 700, color: governmentColors.navy, mb: 3 }}>
                    👥 {t('beneficiaryDemographicsByClaimType')}
                  </Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={beneficiaryDemographics}>
                      <defs>
                        {/* Enhanced gradients for beneficiary bars */}
                        {beneficiaryDemographics.map((entry, index) => (
                          <linearGradient key={`beneficiaryGradient${index}`} id={`beneficiaryGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={entry.color} stopOpacity={1}/>
                            <stop offset="100%" stopColor={entry.color} stopOpacity={0.7}/>
                          </linearGradient>
                        ))}
                        
                        {/* Enhanced shadow effects */}
                        <filter id="beneficiaryShadow">
                          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.2"/>
                        </filter>
                      </defs>
                      
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke={governmentColors.grey[300]} 
                        opacity={0.6}
                      />
                      
                      <XAxis 
                        dataKey="category" 
                        tick={{ fontSize: 10, fill: governmentColors.navy, fontWeight: 500 }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        axisLine={{ stroke: governmentColors.grey[400] }}
                        tickLine={{ stroke: governmentColors.grey[400] }}
                      />
                      
                      <YAxis 
                        tick={{ fontSize: 10, fill: governmentColors.navy, fontWeight: 500 }}
                        axisLine={{ stroke: governmentColors.grey[400] }}
                        tickLine={{ stroke: governmentColors.grey[400] }}
                      />
                      
                      <RechartsTooltip 
                        formatter={(value) => [formatLocalizedNumber(value, currentLanguage), 'Count']}
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: `2px solid ${governmentColors.grey[200]}`,
                          borderRadius: 16,
                          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                          backdropFilter: 'blur(20px)',
                          padding: '12px 16px'
                        }}
                        labelStyle={{ 
                          color: governmentColors.navy, 
                          fontWeight: 700,
                          fontSize: '13px'
                        }}
                        cursor={{
                          fill: 'rgba(74, 144, 226, 0.1)',
                          stroke: governmentColors.primaryBlue,
                          strokeWidth: 2,
                          strokeDasharray: '5 5'
                        }}
                      />
                      
                      <Bar 
                        dataKey="count" 
                        radius={[6, 6, 0, 0]}
                        animationBegin={0}
                        animationDuration={1800}
                        animationEasing="ease-out"
                      >
                        {beneficiaryDemographics.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={`url(#beneficiaryGradient${index})`}
                            stroke={entry.color}
                            strokeWidth={2}
                            style={{
                              filter: 'url(#beneficiaryShadow)',
                              transition: 'all 0.3s ease'
                            }}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <Box sx={{ mt: 2 }}>
                    {beneficiaryDemographics.map((item, index) => (
                      <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, p: 1, bgcolor: `${item.color}08`, borderRadius: 1 }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: governmentColors.navy }}>
                          {item.category}
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: item.color }}>
                          {formatLocalizedNumber(item.count, currentLanguage)} ({formatLocalizedPercentage(item.percentage, currentLanguage)}%)
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          </Grid>

          {/* Charts Row 4: Performance Metrics & District Performance */}
          <Grid container spacing={3} sx={{ mb: 4 }} className="chart-row">
            {/* Performance Metrics with Radial Charts */}
            <Grid item xs={12} lg={7}>
              <motion.div variants={itemVariants}>
                <Card className="animated-card animated-chart chart-container" sx={{ p: 3, height: 400 }}>
                  <Typography variant="h6" className="chart-title" sx={{ fontWeight: 700, color: governmentColors.navy, mb: 3 }}>
                    🎯 {t('performanceMetricsVsTargets')}
                  </Typography>
                  <ResponsiveContainer width="100%" height={320}>
                    <RadialBarChart cx="50%" cy="50%" innerRadius="15%" outerRadius="85%" data={performanceMetrics}>
                      <defs>
                        {/* Enhanced gradients for radial bars */}
                        {performanceMetrics.map((entry, index) => (
                          <linearGradient key={`radialGradient${index}`} id={`radialGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor={entry.color} stopOpacity={1}/>
                            <stop offset="100%" stopColor={entry.color} stopOpacity={0.7}/>
                          </linearGradient>
                        ))}
                        
                        {/* Glow effect for radial bars */}
                        <filter id="radialGlow">
                          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                          <feMerge> 
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      
                      <RadialBar 
                        minAngle={15} 
                        label={{ 
                          position: 'insideStart', 
                          fill: '#fff', 
                          fontSize: 13, 
                          fontWeight: 700,
                          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }} 
                        background={{ fill: 'rgba(0,0,0,0.05)' }}
                        clockWise 
                        dataKey="score"
                        animationBegin={0}
                        animationDuration={2500}
                        animationEasing="ease-out"
                        cornerRadius={3}
                      >
                        {performanceMetrics.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={`url(#radialGradient${index})`}
                            stroke={entry.color}
                            strokeWidth={2}
                            style={{
                              filter: 'url(#radialGlow)',
                              transition: 'all 0.3s ease'
                            }}
                          />
                        ))}
                      </RadialBar>
                      
                      <RechartsTooltip 
                        formatter={(value, name) => [`${formatLocalizedPercentage(value, currentLanguage)}%`, 'Current Score']}
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: `2px solid ${governmentColors.grey[200]}`,
                          borderRadius: 16,
                          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                          backdropFilter: 'blur(20px)',
                          padding: '12px 16px'
                        }}
                        labelStyle={{ 
                          color: governmentColors.navy, 
                          fontWeight: 700,
                          fontSize: '14px'
                        }}
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </Card>
              </motion.div>
            </Grid>

            {/* District Performance */}
            <Grid item xs={12} lg={5}>
              <motion.div variants={itemVariants}>
                <Card className="animated-card" sx={{ p: 3, height: 400 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: governmentColors.navy, mb: 3 }}>
                    🏘️ {t('districtWisePerformanceAnalysis')}
                  </Typography>
                  <Box sx={{ height: 320, overflowY: 'auto' }}>
                    {districtPerformanceData.map((district, index) => (
                      <Box key={district.district} sx={{ mb: 3, p: 2, bgcolor: governmentColors.grey[50], borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: governmentColors.navy }}>
                            {district.district}
                          </Typography>
                          <Chip
                            size="small"
                            label={`${formatLocalizedPercentage(district.efficiency, currentLanguage)}%`}
                            sx={{
                              bgcolor: district.efficiency >= 75 ? governmentColors.success :
                                       district.efficiency >= 65 ? governmentColors.warning :
                                       governmentColors.error,
                              color: 'white',
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="caption" color="textSecondary">
                            {t('totalClaims')}: {formatLocalizedNumber(district.claims, currentLanguage)}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {t('approved')}: {formatLocalizedNumber(district.approved, currentLanguage)}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={district.efficiency}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: governmentColors.grey[300],
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                              bgcolor: district.efficiency >= 75 ? governmentColors.success :
                                       district.efficiency >= 65 ? governmentColors.warning :
                                       governmentColors.error,
                            },
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          </Grid>

          {/* Charts Row 5: Satellite Analytics & AI Asset Mapping */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Satellite Analytics Tracking */}
            <Grid item xs={12} lg={8}>
              <motion.div variants={itemVariants}>
                <Card className="animated-card" sx={{ p: 3, height: 400 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: governmentColors.navy, mb: 3 }}>
                    🛰️ {t('satelliteAnalyticsForestLoss')}
                  </Typography>
                  <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={satelliteAnalyticsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={governmentColors.grey[300]} />
                      <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <RechartsTooltip 
                        contentStyle={{
                          backgroundColor: governmentColors.white,
                          border: `1px solid ${governmentColors.grey[300]}`,
                          borderRadius: 8,
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="forestLoss" 
                        stroke={governmentColors.error} 
                        strokeWidth={3}
                        name={t('forestLossHa')}
                        dot={{ fill: governmentColors.error, strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="detected" 
                        stroke={governmentColors.warning} 
                        strokeWidth={3}
                        name={t('aiDetectedHa')}
                        dot={{ fill: governmentColors.warning, strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="verified" 
                        stroke={governmentColors.success} 
                        strokeWidth={3}
                        name={t('groundVerifiedHa')}
                        dot={{ fill: governmentColors.success, strokeWidth: 2, r: 4 }}
                      />
                      <Legend />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </motion.div>
            </Grid>

            {/* AI Asset Mapping Progress */}
            <Grid item xs={12} lg={4}>
              <motion.div variants={itemVariants}>
                <Card className="animated-card" sx={{ p: 3, height: 400 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: governmentColors.navy, mb: 3 }}>
                    🤖 {t('aiAssetMappingProgress')}
                  </Typography>
                  <Box sx={{ height: 320, overflowY: 'auto' }}>
                    {assetMappingData.map((asset, index) => (
                      <Box key={asset.asset} sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: governmentColors.navy }}>
                            {asset.asset}
                          </Typography>
                          <Typography variant="body2" sx={{ color: governmentColors.success, fontWeight: 600 }}>
                            {formatLocalizedPercentage(asset.accuracy, currentLanguage)}% {t('accuracy')}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(asset.verified / asset.detected) * 100}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: `${governmentColors.grey[300]}`,
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                              bgcolor: governmentColors.primaryGreen,
                            },
                          }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                          <Typography variant="caption" color="textSecondary">
                            {formatLocalizedNumber(asset.verified, currentLanguage)} {t('verified')}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {formatLocalizedNumber(asset.detected, currentLanguage)} {t('detected')}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          </Grid>

          {/* Charts Row 6: DSS Scheme Recommendations */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12}>
              <motion.div variants={itemVariants}>
                <Card className="animated-card" sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: governmentColors.navy, mb: 3 }}>
                    🎯 {t('decisionSupportSystemConvergence')}
                  </Typography>
                  <Grid container spacing={3}>
                    {dssRecommendations.map((scheme, index) => (
                      <Grid item xs={12} sm={6} md={3} key={scheme.scheme}>
                        <Box sx={{ p: 3, bgcolor: governmentColors.grey[50], borderRadius: 2, height: '100%' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: governmentColors.navy }}>
                              {scheme.scheme}
                            </Typography>
                            <Chip
                              size="small"
                              label={scheme.priority}
                              sx={{
                                bgcolor: scheme.priority === 'Critical' ? governmentColors.error :
                                         scheme.priority === 'High' ? governmentColors.warning :
                                         governmentColors.info,
                                color: 'white',
                                fontWeight: 600,
                              }}
                            />
                          </Box>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" sx={{ color: governmentColors.grey[600], mb: 0.5 }}>
                              {t('eligibleBeneficiaries')}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 700, color: governmentColors.primaryBlue }}>
                              {formatLocalizedNumber(scheme.eligibleBeneficiaries, currentLanguage)}
                            </Typography>
                          </Box>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" sx={{ color: governmentColors.grey[600], mb: 0.5 }}>
                              {t('currentlyEnrolled')}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 700, color: governmentColors.success }}>
                              {formatLocalizedNumber(scheme.enrolled, currentLanguage)}
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={(scheme.enrolled / scheme.eligibleBeneficiaries) * 100}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: governmentColors.grey[300],
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 4,
                                bgcolor: governmentColors.primaryBlue,
                              },
                            }}
                          />
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                            <Typography variant="caption" sx={{ color: governmentColors.success, fontWeight: 600 }}>
                              {formatLocalizedPercentage(((scheme.enrolled / scheme.eligibleBeneficiaries) * 100), currentLanguage)}% {t('coverage')}
                            </Typography>
                            <Chip
                              size="small"
                              label={scheme.status}
                              variant="outlined"
                              sx={{ 
                                borderColor: governmentColors.primaryBlue, 
                                color: governmentColors.primaryBlue,
                                fontWeight: 600
                              }}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </motion.div>
            </Grid>
          </Grid>

          {/* Recent Activities & Notifications */}
          <motion.div variants={itemVariants}>
            <Card className="animated-card" sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: governmentColors.navy }}>
                  📢 {t('recentActivitiesSystemUpdates')}
                </Typography>
                <Badge badgeContent={recentActivities.length} color="error">
                  <Notifications sx={{ color: governmentColors.grey[600] }} />
                </Badge>
              </Box>
              <List>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: `${activity.color}08`,
                          transform: 'translateX(4px)',
                        },
                      }}
                    >
                      <ListItemIcon>
                        <Avatar
                          sx={{
                            bgcolor: `${activity.color}20`,
                            color: activity.color,
                            width: 40,
                            height: 40,
                          }}
                        >
                          {activity.icon}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ fontWeight: 600, color: governmentColors.navy }}>
                            {activity.message}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" sx={{ color: governmentColors.grey[600] }}>
                            {activity.time}
                          </Typography>
                        }
                      />
                      <IconButton size="small">
                        <MoreVert sx={{ fontSize: 16 }} />
                      </IconButton>
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider sx={{ my: 1 }} />}
                  </React.Fragment>
                ))}
              </List>
            </Card>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Dashboard;
