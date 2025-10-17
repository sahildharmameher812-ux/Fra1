import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Chip,
  Avatar,
  LinearProgress,
  IconButton,
  Tooltip,
  Fade,
  Zoom,
  Slide,
  Collapse,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tab,
  Tabs,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField
} from '@mui/material';
import {
  TrendingUp,
  Assessment,
  PieChart,
  BarChart,
  Timeline,
  Download,
  FilterList,
  Refresh,
  ExpandMore,
  Visibility,
  Speed,
  LocationOn,
  People,
  Forest,
  Agriculture,
  WaterDrop,
  Home,
  School,
  LocalHospital
} from '@mui/icons-material';
import { governmentColors } from '../theme/governmentTheme';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const Analytics = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedState, setSelectedState] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('6m');
  const [expandedCard, setExpandedCard] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);

  // Mock data for demo
  const mockData = {
    overview: {
      totalClaims: 15678,
      approvedClaims: 11234,
      pendingClaims: 3456,
      rejectedClaims: 988,
      approvalRate: 71.6,
      avgProcessingTime: 44.2
    },
    stateData: [
      { name: 'Madhya Pradesh', claims: 6789, approved: 4567, pending: 1456, rejected: 766, efficiency: 94.2 },
      { name: 'Tripura', claims: 4567, approved: 3456, pending: 892, rejected: 219, efficiency: 89.7 },
      { name: 'Odisha', claims: 2789, approved: 2123, pending: 456, rejected: 210, efficiency: 92.8 },
      { name: 'Telangana', claims: 1533, approved: 1088, pending: 321, rejected: 124, efficiency: 88.5 }
    ],
    assetMapping: {
      totalArea: 569103.1,
      forestCover: 342567.8,
      agricultureLand: 156789.2,
      waterBodies: 45234.6,
      settlements: 24511.5
    },
    cssSchemes: {
      pmKisan: { eligible: 8965, enrolled: 7234 },
      jalJeevan: { eligible: 12456, enrolled: 9876 },
      mgnrega: { eligible: 15234, enrolled: 12987 },
      housing: { eligible: 6789, enrolled: 4532 }
    }
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setAnalyticsData(mockData);
      setLoading(false);
    }, 1500);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color, trend }) => (
    <motion.div variants={cardVariants}>
      <Card
        sx={{
          background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${color}30`,
          borderRadius: 3,
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: `0 20px 40px ${color}20`,
            border: `1px solid ${color}50`,
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${color}, ${color}80)`,
            borderRadius: '12px 12px 0 0'
          }
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              sx={{
                background: `linear-gradient(135deg, ${color}, ${color}CC)`,
                width: 56,
                height: 56,
                mr: 2,
                boxShadow: `0 8px 20px ${color}40`
              }}
            >
              <Icon sx={{ fontSize: 28 }} />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: governmentColors.navy, mb: 0.5 }}>
                {value?.toLocaleString() || '0'}
              </Typography>
              <Typography variant="body2" sx={{ color: governmentColors.grey[600], fontWeight: 500 }}>
                {title}
              </Typography>
            </Box>
            {trend && (
              <Chip
                label={`+${trend}%`}
                size="small"
                sx={{
                  background: `linear-gradient(135deg, ${governmentColors.success}, ${governmentColors.success}CC)`,
                  color: 'white',
                  fontWeight: 600
                }}
              />
            )}
          </Box>
          {subtitle && (
            <Typography variant="body2" sx={{ color: governmentColors.grey[500] }}>
              {subtitle}
            </Typography>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  const StatePerformanceCard = ({ state, index }) => (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.1, type: "spring" }}
    >
      <Card
        sx={{
          mb: 2,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 3,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateX(8px)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: governmentColors.navy }}>
              {state.name}
            </Typography>
            <Chip
              label={`${state.efficiency}% Efficiency`}
              sx={{
                background: state.efficiency > 90 ? governmentColors.success : 
                           state.efficiency > 80 ? governmentColors.warning : governmentColors.error,
                color: 'white',
                fontWeight: 600
              }}
            />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography variant="body2" color="textSecondary">Total Claims</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{state.claims.toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" color="textSecondary">Approved</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: governmentColors.success }}>
                {state.approved.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" color="textSecondary">Pending</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: governmentColors.warning }}>
                {state.pending.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" color="textSecondary">Rejected</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: governmentColors.error }}>
                {state.rejected.toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <LinearProgress
              variant="determinate"
              value={(state.approved / state.claims) * 100}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: governmentColors.grey[200],
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  background: `linear-gradient(90deg, ${governmentColors.success}, ${governmentColors.primaryGreen})`
                }
              }}
            />
            <Typography variant="caption" sx={{ mt: 1, display: 'block', textAlign: 'right' }}>
              {((state.approved / state.claims) * 100).toFixed(1)}% Approval Rate
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  const LoadingScreen = () => (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${governmentColors.primaryBlue}10, ${governmentColors.primaryGreen}10)`,
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Assessment sx={{ fontSize: 80, color: governmentColors.primaryBlue, mb: 2 }} />
      </motion.div>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>Loading Analytics...</Typography>
      <LinearProgress sx={{ width: 200, borderRadius: 2 }} />
    </Box>
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${governmentColors.lightBlue} 0%, ${governmentColors.lightGreen} 50%, ${governmentColors.lightOrange} 100%)`,
        py: 4
      }}
    >
      <Container maxWidth="xl">
        {/* Header Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(135deg, ${governmentColors.navy}, ${governmentColors.primaryBlue})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              📊 Analytics & Reports Dashboard
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: governmentColors.grey[600],
                maxWidth: 800,
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Comprehensive insights into FRA implementation, asset mapping, and CSS schemes integration
              across Madhya Pradesh, Tripura, Odisha, and Telangana
            </Typography>
          </Box>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Paper
            sx={{
              p: 3,
              mb: 4,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 3
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>State</InputLabel>
                  <Select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                    <MenuItem value="all">All States</MenuItem>
                    <MenuItem value="mp">Madhya Pradesh</MenuItem>
                    <MenuItem value="tr">Tripura</MenuItem>
                    <MenuItem value="od">Odisha</MenuItem>
                    <MenuItem value="tg">Telangana</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Timeframe</InputLabel>
                  <Select value={selectedTimeframe} onChange={(e) => setSelectedTimeframe(e.target.value)}>
                    <MenuItem value="1m">Last Month</MenuItem>
                    <MenuItem value="3m">Last 3 Months</MenuItem>
                    <MenuItem value="6m">Last 6 Months</MenuItem>
                    <MenuItem value="1y">Last Year</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<FilterList />}
                    sx={{ flex: 1 }}
                  >
                    Filters
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                    sx={{ flex: 1 }}
                  >
                    Export
                  </Button>
                  <IconButton
                    sx={{
                      background: governmentColors.primaryBlue,
                      color: 'white',
                      '&:hover': { background: governmentColors.secondaryBlue }
                    }}
                  >
                    <Refresh />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* Overview Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={Assessment}
                title="Total Claims"
                value={analyticsData.overview.totalClaims}
                subtitle="Across all states"
                color={governmentColors.primaryBlue}
                trend={12.5}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={TrendingUp}
                title="Approved Claims"
                value={analyticsData.overview.approvedClaims}
                subtitle={`${analyticsData.overview.approvalRate}% approval rate`}
                color={governmentColors.success}
                trend={8.3}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={Timeline}
                title="Pending Claims"
                value={analyticsData.overview.pendingClaims}
                subtitle="Under review"
                color={governmentColors.warning}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={Speed}
                title="Avg Processing"
                value={analyticsData.overview.avgProcessingTime}
                subtitle="Days per claim"
                color={governmentColors.primaryGreen}
                trend={-15.2}
              />
            </Grid>
          </Grid>
        </motion.div>

        {/* Main Content Tabs */}
        <Paper
          sx={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 3,
            overflow: 'hidden'
          }}
        >
          <Tabs
            value={selectedTab}
            onChange={(e, newValue) => setSelectedTab(newValue)}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                fontWeight: 600,
                fontSize: '1rem',
                textTransform: 'none'
              }
            }}
          >
            <Tab label="State Performance" icon={<LocationOn />} iconPosition="start" />
            <Tab label="Asset Mapping" icon={<Visibility />} iconPosition="start" />
            <Tab label="CSS Schemes" icon={<People />} iconPosition="start" />
            <Tab label="Reports" icon={<Assessment />} iconPosition="start" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {/* State Performance Tab */}
            {selectedTab === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                  State-wise FRA Implementation Performance
                </Typography>
                {analyticsData.stateData.map((state, index) => (
                  <StatePerformanceCard key={state.name} state={state} index={index} />
                ))}
              </motion.div>
            )}

            {/* Asset Mapping Tab */}
            {selectedTab === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                  AI-Powered Asset Mapping Insights
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <StatCard
                      icon={Forest}
                      title="Forest Cover"
                      value={`${(analyticsData.assetMapping.forestCover / 1000).toFixed(1)}K`}
                      subtitle="Hectares mapped"
                      color={governmentColors.primaryGreen}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StatCard
                      icon={Agriculture}
                      title="Agricultural Land"
                      value={`${(analyticsData.assetMapping.agricultureLand / 1000).toFixed(1)}K`}
                      subtitle="Hectares identified"
                      color={governmentColors.warning}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StatCard
                      icon={WaterDrop}
                      title="Water Bodies"
                      value={`${(analyticsData.assetMapping.waterBodies / 1000).toFixed(1)}K`}
                      subtitle="Ponds, rivers, streams"
                      color={governmentColors.info}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StatCard
                      icon={Home}
                      title="Settlements"
                      value={`${(analyticsData.assetMapping.settlements / 1000).toFixed(1)}K`}
                      subtitle="Tribal settlements"
                      color={governmentColors.primaryOrange}
                    />
                  </Grid>
                </Grid>
              </motion.div>
            )}

            {/* CSS Schemes Tab */}
            {selectedTab === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                  Central Sector Schemes Integration
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2, borderRadius: 3 }}>
                      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <Agriculture sx={{ mr: 1, color: governmentColors.primaryGreen }} />
                        PM-KISAN Scheme
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(analyticsData.cssSchemes.pmKisan.enrolled / analyticsData.cssSchemes.pmKisan.eligible) * 100}
                        sx={{ mb: 1, height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="body2">
                        {analyticsData.cssSchemes.pmKisan.enrolled.toLocaleString()} enrolled out of {analyticsData.cssSchemes.pmKisan.eligible.toLocaleString()} eligible
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2, borderRadius: 3 }}>
                      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <WaterDrop sx={{ mr: 1, color: governmentColors.info }} />
                        Jal Jeevan Mission
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(analyticsData.cssSchemes.jalJeevan.enrolled / analyticsData.cssSchemes.jalJeevan.eligible) * 100}
                        sx={{ mb: 1, height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="body2">
                        {analyticsData.cssSchemes.jalJeevan.enrolled.toLocaleString()} enrolled out of {analyticsData.cssSchemes.jalJeevan.eligible.toLocaleString()} eligible
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2, borderRadius: 3 }}>
                      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <People sx={{ mr: 1, color: governmentColors.warning }} />
                        MGNREGA
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(analyticsData.cssSchemes.mgnrega.enrolled / analyticsData.cssSchemes.mgnrega.eligible) * 100}
                        sx={{ mb: 1, height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="body2">
                        {analyticsData.cssSchemes.mgnrega.enrolled.toLocaleString()} enrolled out of {analyticsData.cssSchemes.mgnrega.eligible.toLocaleString()} eligible
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2, borderRadius: 3 }}>
                      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <Home sx={{ mr: 1, color: governmentColors.primaryOrange }} />
                        Housing Scheme
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(analyticsData.cssSchemes.housing.enrolled / analyticsData.cssSchemes.housing.eligible) * 100}
                        sx={{ mb: 1, height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="body2">
                        {analyticsData.cssSchemes.housing.enrolled.toLocaleString()} enrolled out of {analyticsData.cssSchemes.housing.eligible.toLocaleString()} eligible
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>
              </motion.div>
            )}

            {/* Reports Tab */}
            {selectedTab === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                  Generate Custom Reports
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Card
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)'
                        }
                      }}
                    >
                      <PieChart sx={{ fontSize: 48, color: governmentColors.primaryBlue, mb: 2 }} />
                      <Typography variant="h6" sx={{ mb: 1 }}>FRA Status Report</Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        Comprehensive analysis of claims status
                      </Typography>
                      <Button variant="contained" fullWidth>
                        Generate Report
                      </Button>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)'
                        }
                      }}
                    >
                      <BarChart sx={{ fontSize: 48, color: governmentColors.primaryGreen, mb: 2 }} />
                      <Typography variant="h6" sx={{ mb: 1 }}>Performance Analysis</Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        State-wise efficiency metrics
                      </Typography>
                      <Button variant="contained" fullWidth>
                        Generate Report
                      </Button>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)'
                        }
                      }}
                    >
                      <Assessment sx={{ fontSize: 48, color: governmentColors.warning, mb: 2 }} />
                      <Typography variant="h6" sx={{ mb: 1 }}>Asset Mapping</Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        AI-powered asset analysis
                      </Typography>
                      <Button variant="contained" fullWidth>
                        Generate Report
                      </Button>
                    </Card>
                  </Grid>
                </Grid>
              </motion.div>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Analytics;
