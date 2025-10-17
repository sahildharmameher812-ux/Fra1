import React, { useState, useEffect } from 'react';
import '../../styles/modern-animations.css';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Container,
  Paper,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  LinearProgress,
  CircularProgress,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  TrendingUp,
  TrendingDown,
  Analytics,
  Assessment,
  Speed,
  PieChart,
  BarChart,
  ShowChart,
  Timeline,
  DataUsage,
  Insights,
  FilterList,
  Refresh,
  Download,
  Share,
  Fullscreen,
  ExpandMore,
  LocationOn,
  People,
  Agriculture,
  Work,
  Home,
  School,
  LocalHospital,
  Nature,
  Forest,
  Satellite,
  DocumentScanner,
  Psychology,
  Security,
  CloudUpload,
  SmartToy,
  Verified,
  Warning,
  CheckCircle,
  Error,
  Info
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Chart components
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Legend,
  ScatterChart,
  Scatter,
  Treemap,
  FunnelChart,
  Funnel,
  LabelList
} from 'recharts';

const ComprehensiveDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedState, setSelectedState] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('6months');
  const [realTimeMode, setRealTimeMode] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Government of India Color Scheme
  const colors = {
    saffron: '#FF9933',
    white: '#FFFFFF',
    green: '#138808',
    navy: '#000080',
    primaryGreen: '#2E7D32',
    secondaryBlue: '#1565C0',
    accentOrange: '#FF7043',
    lightBackground: '#F8F9FA',
    cardBackground: 'rgba(255, 255, 255, 0.95)',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3'
  };

  // Chart colors
  const chartColors = [colors.primaryGreen, colors.secondaryBlue, colors.saffron, colors.accentOrange, colors.success, colors.warning];

  // Comprehensive Analytics Data
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalClaims: 2847,
      approvedClaims: 1293,
      pendingReview: 425,
      rejectedClaims: 129,
      hectaresGranted: 15680,
      tribalFamilies: 8934,
      documentsProcessed: 12456,
      aiAccuracy: 94.7,
      systemUptime: 99.8,
      processingTime: 12.3,
      satisfactionRate: 87.5,
      schemeIntegration: 89.2
    },
    stateWise: [
      { state: 'Madhya Pradesh', claims: 1247, approved: 687, pending: 234, area: 6847, families: 3924 },
      { state: 'Odisha', claims: 823, approved: 456, pending: 123, area: 4532, families: 2847 },
      { state: 'Telangana', claims: 456, approved: 234, pending: 87, area: 2847, families: 1456 },
      { state: 'Tripura', claims: 321, approved: 216, pending: 45, area: 1454, families: 707 }
    ],
    monthlyTrends: [
      { month: 'Jan', submitted: 245, approved: 189, rejected: 23, processing: 33 },
      { month: 'Feb', submitted: 267, approved: 201, rejected: 18, processing: 48 },
      { month: 'Mar', submitted: 298, approved: 234, rejected: 15, processing: 49 },
      { month: 'Apr', submitted: 324, approved: 267, rejected: 22, processing: 35 },
      { month: 'May', submitted: 356, approved: 289, rejected: 19, processing: 48 },
      { month: 'Jun', submitted: 389, approved: 312, rejected: 16, processing: 61 }
    ],
    claimTypes: [
      { name: 'Individual Forest Rights (IFR)', value: 1456, color: colors.primaryGreen },
      { name: 'Community Forest Rights (CFR)', value: 892, color: colors.secondaryBlue },
      { name: 'Community Rights (CR)', value: 499, color: colors.saffron }
    ],
    processingStages: [
      { stage: 'Application Received', count: 2847, percentage: 100, color: colors.info },
      { stage: 'Document Verification', count: 2234, percentage: 78.5, color: colors.warning },
      { stage: 'Field Investigation', count: 1876, percentage: 65.9, color: colors.accentOrange },
      { stage: 'Committee Review', count: 1456, percentage: 51.1, color: colors.secondaryBlue },
      { stage: 'Final Approval', count: 1293, percentage: 45.4, color: colors.success }
    ],
    aiMetrics: [
      { metric: 'OCR Accuracy', value: 94.7, target: 95, color: colors.secondaryBlue },
      { metric: 'Document Classification', value: 92.3, target: 90, color: colors.primaryGreen },
      { metric: 'Entity Recognition', value: 89.6, target: 85, color: colors.saffron },
      { metric: 'Fraud Detection', value: 96.8, target: 95, color: colors.error },
      { metric: 'Processing Speed', value: 87.4, target: 80, color: colors.warning }
    ],
    satelliteData: [
      { parameter: 'Forest Cover', current: 78.5, previous: 76.2, change: 2.3, trend: 'up' },
      { parameter: 'Deforestation Rate', current: 0.24, previous: 0.31, change: -0.07, trend: 'down' },
      { parameter: 'Agricultural Land', current: 12.8, previous: 12.1, change: 0.7, trend: 'up' },
      { parameter: 'Water Bodies', current: 3.2, previous: 3.4, change: -0.2, trend: 'down' },
      { parameter: 'Settlement Area', current: 2.1, previous: 1.9, change: 0.2, trend: 'up' }
    ],
    governmentSchemes: [
      { name: 'PM-KISAN', integrated: 2847, eligible: 3200, coverage: 89, amount: 1708200 },
      { name: 'MGNREGA', integrated: 1923, eligible: 2400, coverage: 80, amount: 4807500 },
      { name: 'PM Awas Yojana', integrated: 1456, eligible: 2000, coverage: 73, amount: 174720000 },
      { name: 'Ayushman Bharat', integrated: 5672, eligible: 6500, coverage: 87, amount: 0 }
    ],
    performanceMetrics: [
      { kpi: 'Application Processing Time', value: 12.3, unit: 'days', target: 15, status: 'good' },
      { kpi: 'Approval Rate', value: 45.4, unit: '%', target: 40, status: 'excellent' },
      { kpi: 'User Satisfaction', value: 87.5, unit: '%', target: 85, status: 'good' },
      { kpi: 'System Availability', value: 99.8, unit: '%', target: 99, status: 'excellent' },
      { kpi: 'Data Accuracy', value: 94.7, unit: '%', target: 95, status: 'good' },
      { kpi: 'Response Time', value: 0.23, unit: 'sec', target: 0.5, status: 'excellent' }
    ]
  });

  // Real-time updates
  useEffect(() => {
    if (realTimeMode) {
      const interval = setInterval(() => {
        setAnalyticsData(prev => ({
          ...prev,
          overview: {
            ...prev.overview,
            totalClaims: prev.overview.totalClaims + Math.floor(Math.random() * 3),
            approvedClaims: prev.overview.approvedClaims + Math.floor(Math.random() * 2),
            pendingReview: Math.max(0, prev.overview.pendingReview + Math.floor(Math.random() * 5) - 2),
            aiAccuracy: Math.min(99.9, prev.overview.aiAccuracy + (Math.random() - 0.5) * 0.1)
          }
        }));
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [realTimeMode]);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  // Overview Dashboard
  const OverviewDashboard = () => (
    <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        {/* Key Performance Indicators */}
        <motion.div variants={itemVariants}>
          <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            { label: 'Total Claims', value: analyticsData.overview.totalClaims.toLocaleString(), icon: '📊', color: colors.primaryGreen, change: '+5.2%' },
            { label: 'Approval Rate', value: `${((analyticsData.overview.approvedClaims / analyticsData.overview.totalClaims) * 100).toFixed(1)}%`, icon: '✅', color: colors.success, change: '+2.1%' },
            { label: 'Processing Time', value: `${analyticsData.overview.processingTime} days`, icon: '⏱️', color: colors.warning, change: '-1.3%' },
            { label: 'AI Accuracy', value: `${analyticsData.overview.aiAccuracy.toFixed(1)}%`, icon: '🤖', color: colors.secondaryBlue, change: '+0.8%' }
          ].map((kpi, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card elevation={0} sx={{ p: 3, borderRadius: 3, border: `2px solid ${kpi.color}20`, background: `linear-gradient(135deg, ${kpi.color}10 0%, ${kpi.color}05 100%)` }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Avatar sx={{ bgcolor: kpi.color, width: 50, height: 50, fontSize: '1.2rem' }}>{kpi.icon}</Avatar>
                  <Chip label={kpi.change} size="small" sx={{ bgcolor: kpi.change.startsWith('+') ? colors.success : colors.error, color: 'white' }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: colors.navy, mb: 1 }}>{kpi.value}</Typography>
                <Typography variant="body2" sx={{ color: colors.navy, opacity: 0.7 }}>{kpi.label}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Charts Section */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {/* Monthly Trends */}
        <Grid item xs={12} lg={8}>
          <motion.div variants={itemVariants}>
            <Card elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${colors.primaryGreen}20` }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: colors.navy, mb: 3 }}>📈 Claims Processing Trends</Typography>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={analyticsData.monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis dataKey="month" stroke={colors.navy} />
                  <YAxis stroke={colors.navy} />
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E0E0E0' }} />
                  <Legend />
                  <Bar dataKey="submitted" fill={colors.secondaryBlue} name="Submitted" />
                  <Bar dataKey="approved" fill={colors.success} name="Approved" />
                  <Line type="monotone" dataKey="processing" stroke={colors.warning} strokeWidth={3} name="Processing" />
                </ComposedChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Grid>

        {/* Claim Types Distribution */}
        <Grid item xs={12} lg={4}>
          <motion.div variants={itemVariants}>
            <Card elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${colors.secondaryBlue}20` }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: colors.navy, mb: 3 }}>🥧 Claim Types Distribution</Typography>
              <ResponsiveContainer width="100%" height={400}>
                <RechartsPieChart>
                  <Pie
                    data={analyticsData.claimTypes}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name.split(' ')[0]}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {analyticsData.claimTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Processing Pipeline */}
      <motion.div variants={itemVariants}>
        <Card elevation={0} sx={{ p: 4, borderRadius: 3, border: `1px solid ${colors.saffron}20`, mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: colors.navy, mb: 3 }}>🔄 Processing Pipeline</Typography>
          <Grid container spacing={3}>
            {analyticsData.processingStages.map((stage, index) => (
              <Grid item xs={12} md={2.4} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar sx={{ bgcolor: stage.color, width: 60, height: 60, margin: '0 auto 12px', fontSize: '1.5rem' }}>
                    {index + 1}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: colors.navy, mb: 1 }}>
                    {stage.count.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.navy, opacity: 0.7, mb: 2 }}>
                    {stage.stage}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={stage.percentage}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: `${stage.color}20`,
                      '& .MuiLinearProgress-bar': { bgcolor: stage.color }
                    }}
                  />
                  <Typography variant="caption" sx={{ color: stage.color, fontWeight: 600 }}>
                    {stage.percentage.toFixed(1)}%
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
      </motion.div>
      </motion.div>
    </Box>
  );

  // State-wise Analytics
  const StateAnalytics = () => (
    <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Grid container spacing={4}>
        {/* State Performance Comparison */}
        <Grid item xs={12} lg={8}>
          <motion.div variants={itemVariants}>
            <Card elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${colors.primaryGreen}20` }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: colors.navy, mb: 3 }}>🗺️ State-wise Performance</Typography>
              <ResponsiveContainer width="100%" height={400}>
                <RechartsBarChart data={analyticsData.stateWise}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="state" stroke={colors.navy} />
                  <YAxis stroke={colors.navy} />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="claims" fill={colors.secondaryBlue} name="Total Claims" />
                  <Bar dataKey="approved" fill={colors.success} name="Approved" />
                  <Bar dataKey="pending" fill={colors.warning} name="Pending" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Grid>

        {/* State Rankings */}
        <Grid item xs={12} lg={4}>
          <motion.div variants={itemVariants}>
            <Card elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${colors.secondaryBlue}20` }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: colors.navy, mb: 3 }}>🏆 State Rankings</Typography>
              <List>
                {analyticsData.stateWise
                  .sort((a, b) => (b.approved / b.claims) - (a.approved / a.claims))
                  .map((state, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: chartColors[index], width: 32, height: 32, fontSize: '0.8rem' }}>
                          #{index + 1}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={state.state}
                        secondary={`${((state.approved / state.claims) * 100).toFixed(1)}% approval rate`}
                      />
                      <Chip
                        label={`${state.families.toLocaleString()} families`}
                        size="small"
                        sx={{ bgcolor: `${chartColors[index]}20`, color: chartColors[index] }}
                      />
                    </ListItem>
                  ))}
              </List>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
      </motion.div>
    </Box>
  );

  // AI & Technology Dashboard
  const TechnologyDashboard = () => (
    <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Grid container spacing={4}>
        {/* AI Metrics Radar Chart */}
        <Grid item xs={12} lg={6}>
          <motion.div variants={itemVariants}>
            <Card elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${colors.secondaryBlue}20` }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: colors.navy, mb: 3 }}>🤖 AI Performance Metrics</Typography>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={analyticsData.aiMetrics}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar name="Current" dataKey="value" stroke={colors.secondaryBlue} fill={colors.secondaryBlue} fillOpacity={0.3} strokeWidth={2} />
                  <Radar name="Target" dataKey="target" stroke={colors.success} strokeDasharray="5 5" fill="transparent" strokeWidth={2} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Grid>

        {/* Satellite Data Analysis */}
        <Grid item xs={12} lg={6}>
          <motion.div variants={itemVariants}>
            <Card elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${colors.saffron}20` }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: colors.navy, mb: 3 }}>🛰️ Satellite Data Analysis</Typography>
              <Grid container spacing={2}>
                {analyticsData.satelliteData.map((param, index) => (
                  <Grid item xs={12} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderRadius: 2, bgcolor: `${colors.lightBackground}` }}>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: colors.navy }}>
                          {param.parameter}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primaryGreen }}>
                          {param.current}%
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {param.trend === 'up' ? <TrendingUp sx={{ color: colors.success }} /> : <TrendingDown sx={{ color: colors.error }} />}
                          <Typography variant="body2" sx={{ color: param.trend === 'up' ? colors.success : colors.error, fontWeight: 600 }}>
                            {param.change > 0 ? '+' : ''}{param.change}%
                          </Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: colors.navy, opacity: 0.6 }}>
                          vs previous year
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
      </motion.div>
    </Box>
  );

  // Schemes Integration Dashboard
  const SchemesIntegrationDashboard = () => (
    <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Grid container spacing={4}>
        {analyticsData.governmentSchemes.map((scheme, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <motion.div variants={itemVariants}>
              <Card elevation={0} sx={{ p: 3, borderRadius: 3, border: `2px solid ${chartColors[index]}20`, background: `linear-gradient(135deg, ${chartColors[index]}10 0%, ${chartColors[index]}05 100%)` }}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: chartColors[index], width: 60, height: 60, margin: '0 auto 12px' }}>
                    {[<Agriculture />, <Work />, <Home />, <LocalHospital />][index]}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: colors.navy, mb: 1 }}>
                    {scheme.name}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: colors.navy, opacity: 0.7 }}>
                      Coverage
                    </Typography>
                    <Typography variant="body2" sx={{ color: chartColors[index], fontWeight: 600 }}>
                      {scheme.coverage}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={scheme.coverage}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: `${chartColors[index]}20`,
                      '& .MuiLinearProgress-bar': { bgcolor: chartColors[index] }
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption" sx={{ color: colors.navy, opacity: 0.7 }}>
                    Integrated
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: chartColors[index] }}>
                    {scheme.integrated.toLocaleString()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ color: colors.navy, opacity: 0.7 }}>
                    Total Eligible
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: colors.navy }}>
                    {scheme.eligible.toLocaleString()}
                  </Typography>
                </Box>

                {scheme.amount > 0 && (
                  <Box sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: `${chartColors[index]}15` }}>
                    <Typography variant="caption" sx={{ color: colors.navy, opacity: 0.7 }}>
                      Total Amount Disbursed
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: chartColors[index] }}>
                      ₹{(scheme.amount / 10000000).toFixed(1)}Cr
                    </Typography>
                  </Box>
                )}
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      </motion.div>
    </Box>
  );

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      height: '100vh',
      width: '100vw',
      background: `linear-gradient(135deg, ${colors.white} 0%, rgba(255, 153, 51, 0.03) 100%)`, 
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      padding: 0
    }}>
      {/* Header */}
      <Box sx={{ 
        background: `linear-gradient(135deg, ${colors.saffron} 0%, ${colors.secondaryBlue} 100%)`,
        color: colors.white,
        p: { xs: 2, md: 3 },
        borderBottom: `4px solid ${colors.green}`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: colors.white, color: colors.primaryGreen, width: 56, height: 56, boxShadow: 3 }}>
              <DashboardIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: colors.white, mb: 0.5 }}>
                Comprehensive Analytics Dashboard
              </Typography>
              <Typography variant="body1" sx={{ color: colors.white, opacity: 0.9, fontSize: '1.1rem' }}>
                AI-Powered FRA Atlas - Real-time Monitoring & Insights
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <FormControlLabel
              control={<Switch checked={realTimeMode} onChange={(e) => setRealTimeMode(e.target.checked)} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: colors.white }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: colors.green } }} />}
              label="Real-time"
              sx={{ color: colors.white, fontSize: '1rem' }}
            />
            <IconButton 
              onClick={handleRefresh} 
              disabled={refreshing} 
              sx={{ 
                color: colors.white, 
                bgcolor: 'rgba(255,255,255,0.1)', 
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                borderRadius: 2
              }}
            >
              {refreshing ? <CircularProgress size={24} sx={{ color: colors.white }} /> : <Refresh />}
            </IconButton>
            <Button 
              variant="outlined" 
              startIcon={<Download />} 
              sx={{ 
                borderColor: colors.white, 
                color: colors.white, 
                px: 3, 
                py: 1.5,
                '&:hover': { 
                  borderColor: colors.green, 
                  bgcolor: colors.green 
                }
              }}
            >
              Export
            </Button>
          </Box>
        </Box>

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
          <FormControl 
            size="medium" 
            sx={{ 
              minWidth: 180,
              '& .MuiOutlinedInput-root': { 
                bgcolor: 'rgba(255,255,255,0.1)', 
                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                '&:hover fieldset': { borderColor: colors.white },
                '&.Mui-focused fieldset': { borderColor: colors.white }
              },
              '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
              '& .MuiSelect-select': { color: colors.white }
            }}
          >
            <InputLabel sx={{ color: 'rgba(255,255,255,0.8)' }}>State</InputLabel>
            <Select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} label="State">
              <MenuItem value="all">All States</MenuItem>
              <MenuItem value="mp">Madhya Pradesh</MenuItem>
              <MenuItem value="od">Odisha</MenuItem>
              <MenuItem value="tg">Telangana</MenuItem>
              <MenuItem value="tr">Tripura</MenuItem>
            </Select>
          </FormControl>

          <FormControl 
            size="medium" 
            sx={{ 
              minWidth: 180,
              '& .MuiOutlinedInput-root': { 
                bgcolor: 'rgba(255,255,255,0.1)', 
                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                '&:hover fieldset': { borderColor: colors.white },
                '&.Mui-focused fieldset': { borderColor: colors.white }
              },
              '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
              '& .MuiSelect-select': { color: colors.white }
            }}
          >
            <InputLabel sx={{ color: 'rgba(255,255,255,0.8)' }}>Time Range</InputLabel>
            <Select value={selectedTimeRange} onChange={(e) => setSelectedTimeRange(e.target.value)} label="Time Range">
              <MenuItem value="1month">Last Month</MenuItem>
              <MenuItem value="3months">Last 3 Months</MenuItem>
              <MenuItem value="6months">Last 6 Months</MenuItem>
              <MenuItem value="1year">Last Year</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Navigation Tabs */}
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          sx={{ 
            borderBottom: 1, 
            borderColor: 'rgba(255,255,255,0.2)',
            '& .MuiTab-root': {
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 600,
              fontSize: '1rem',
              minHeight: 64,
              px: 3,
              '&.Mui-selected': {
                color: colors.white,
                bgcolor: 'rgba(255,255,255,0.1)'
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: colors.white,
              height: 3
            }
          }}
        >
          <Tab label="Overview" icon={<Assessment sx={{ fontSize: 24 }} />} />
          <Tab label="State Analytics" icon={<LocationOn sx={{ fontSize: 24 }} />} />
          <Tab label="AI & Technology" icon={<SmartToy sx={{ fontSize: 24 }} />} />
          <Tab label="Schemes Integration" icon={<Psychology sx={{ fontSize: 24 }} />} />
        </Tabs>
      </Box>

      {/* Dashboard Content */}
      <Box sx={{ flex: 1, overflow: 'auto', height: 'calc(100vh - 240px)' }}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab} 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            style={{ height: '100%' }}
          >
            {activeTab === 0 && <OverviewDashboard />}
            {activeTab === 1 && <StateAnalytics />}
            {activeTab === 2 && <TechnologyDashboard />}
            {activeTab === 3 && <SchemesIntegrationDashboard />}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default ComprehensiveDashboard;