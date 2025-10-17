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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  Divider,
  Badge,
  CircularProgress
} from '@mui/material';
import {
  Psychology,
  TrendingUp,
  Lightbulb,
  Analytics,
  Assessment,
  Settings,
  PlayArrow,
  AutoAwesome,
  Insights,
  ExpandMore,
  CheckCircle,
  Warning,
  Info,
  Star,
  Schedule,
  LocationOn,
  People,
  Agriculture,
  WaterDrop,
  Home,
  School,
  LocalHospital,
  MonetizationOn,
  Speed,
  Science,
  Memory,
  SmartToy,
  Gradient
} from '@mui/icons-material';
import { governmentColors } from '../theme/governmentTheme';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const DSSPortal = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedVillage, setSelectedVillage] = useState('');
  const [selectedSchemes, setSelectedSchemes] = useState([]);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Mock data for demonstration
  const mockVillages = [
    { id: 'v1', name: 'Shivpuri Village', state: 'Madhya Pradesh', population: 1250, fraHolders: 234 },
    { id: 'v2', name: 'Kamalpur Village', state: 'Tripura', population: 890, fraHolders: 156 },
    { id: 'v3', name: 'Boudh Village', state: 'Odisha', population: 1890, fraHolders: 445 },
    { id: 'v4', name: 'Adilabad Village', state: 'Telangana', population: 2340, fraHolders: 567 }
  ];

  const availableSchemes = [
    { id: 'pmkisan', name: 'PM-KISAN', category: 'Agriculture', icon: Agriculture, color: governmentColors.primaryGreen },
    { id: 'jaljeevan', name: 'Jal Jeevan Mission', category: 'Water', icon: WaterDrop, color: governmentColors.info },
    { id: 'mgnrega', name: 'MGNREGA', category: 'Employment', icon: People, color: governmentColors.warning },
    { id: 'housing', name: 'Housing Scheme', category: 'Infrastructure', icon: Home, color: governmentColors.primaryOrange },
    { id: 'education', name: 'Education Support', category: 'Social', icon: School, color: governmentColors.primaryBlue },
    { id: 'health', name: 'Health Scheme', category: 'Healthcare', icon: LocalHospital, color: governmentColors.error }
  ];

  const mockRecommendations = [
    {
      scheme: 'pmkisan',
      priority: 'High',
      eligibleBeneficiaries: 187,
      potentialImpact: 92,
      budget: '₹22.4 Lakh',
      timeline: '3 months',
      aiConfidence: 94
    },
    {
      scheme: 'jaljeevan',
      priority: 'Critical',
      eligibleBeneficiaries: 234,
      potentialImpact: 87,
      budget: '₹45.6 Lakh',
      timeline: '6 months',
      aiConfidence: 89
    },
    {
      scheme: 'housing',
      priority: 'Medium',
      eligibleBeneficiaries: 67,
      potentialImpact: 78,
      budget: '₹1.2 Crore',
      timeline: '12 months',
      aiConfidence: 85
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const handleVillageSelect = (villageId) => {
    setSelectedVillage(villageId);
    setActiveStep(1);
  };

  const handleRunAnalysis = () => {
    setAiProcessing(true);
    setActiveStep(2);
    
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setAnalysisComplete(true);
      setAiProcessing(false);
      setActiveStep(3);
    }, 3000);
  };

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

  const AIProcessingCard = () => (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        sx={{
          p: 4,
          textAlign: 'center',
          background: `linear-gradient(135deg, ${governmentColors.primaryBlue}15, ${governmentColors.primaryGreen}15)`,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${governmentColors.primaryBlue}30`,
          borderRadius: 4
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ display: 'inline-block', marginBottom: '16px' }}
        >
          <SmartToy sx={{ fontSize: 64, color: governmentColors.primaryBlue }} />
        </motion.div>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          AI Engine Processing...
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: governmentColors.grey[600] }}>
          Analyzing village data, asset mapping, and scheme eligibility
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body2">Neural Network Analysis</Typography>
          <Typography variant="body2" color="primary">87%</Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={87}
          sx={{
            height: 8,
            borderRadius: 4,
            mb: 2,
            background: governmentColors.grey[200],
            '& .MuiLinearProgress-bar': {
              background: `linear-gradient(90deg, ${governmentColors.primaryBlue}, ${governmentColors.primaryGreen})`
            }
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={24} />
            <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>Data Mining</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={24} />
            <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>Pattern Recognition</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={24} />
            <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>Optimization</Typography>
          </Box>
        </Box>
      </Card>
    </motion.div>
  );

  const RecommendationCard = ({ recommendation, index }) => {
    const scheme = availableSchemes.find(s => s.id === recommendation.scheme);
    const priorityColor = 
      recommendation.priority === 'Critical' ? governmentColors.error :
      recommendation.priority === 'High' ? governmentColors.warning :
      governmentColors.success;

    return (
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: index * 0.2, type: "spring" }}
      >
        <Card
          sx={{
            mb: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px) scale(1.02)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${scheme?.color}, ${scheme?.color}80)`
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  sx={{
                    background: `linear-gradient(135deg, ${scheme?.color}, ${scheme?.color}CC)`,
                    mr: 2,
                    width: 48,
                    height: 48
                  }}
                >
                  {scheme && <scheme.icon />}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {scheme?.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {scheme?.category}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip
                  label={recommendation.priority}
                  size="small"
                  sx={{
                    background: priorityColor,
                    color: 'white',
                    fontWeight: 600
                  }}
                />
                <Chip
                  label={`${recommendation.aiConfidence}% AI Confidence`}
                  size="small"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              </Box>
            </Box>
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="textSecondary">Beneficiaries</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: governmentColors.primaryBlue }}>
                  {recommendation.eligibleBeneficiaries}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="textSecondary">Impact Score</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: governmentColors.success }}>
                  {recommendation.potentialImpact}%
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="textSecondary">Budget</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: governmentColors.warning }}>
                  {recommendation.budget}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="textSecondary">Timeline</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: governmentColors.primaryGreen }}>
                  {recommendation.timeline}
                </Typography>
              </Grid>
            </Grid>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>Implementation Feasibility</Typography>
              <LinearProgress
                variant="determinate"
                value={recommendation.potentialImpact}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  background: governmentColors.grey[200],
                  '& .MuiLinearProgress-bar': {
                    background: `linear-gradient(90deg, ${scheme?.color}, ${scheme?.color}80)`
                  }
                }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button
                variant="contained"
                size="small"
                sx={{
                  background: `linear-gradient(135deg, ${scheme?.color}, ${scheme?.color}CC)`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${scheme?.color}DD, ${scheme?.color}AA)`
                  }
                }}
              >
                Approve
              </Button>
              <Button variant="outlined" size="small">
                View Details
              </Button>
              <Button variant="text" size="small">
                Modify
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

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
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Psychology sx={{ fontSize: 80, color: governmentColors.primaryBlue, mb: 2 }} />
      </motion.div>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>Initializing AI Engine...</Typography>
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
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
              }}
            >
              <Psychology sx={{ fontSize: '3rem', color: governmentColors.primaryBlue }} />
              AI-Powered Decision Support System
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: governmentColors.grey[600],
                maxWidth: 900,
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Intelligent scheme layering, policy recommendations, and resource optimization 
              powered by advanced AI algorithms and real-time data analysis
            </Typography>
          </Box>
        </motion.div>

        {/* AI Features Banner */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Paper
            sx={{
              p: 3,
              mb: 4,
              background: `linear-gradient(135deg, ${governmentColors.primaryBlue}15, ${governmentColors.primaryGreen}15)`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${governmentColors.primaryBlue}30`,
              borderRadius: 3
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ background: governmentColors.success, mr: 2 }}>
                    <Memory />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Neural Networks</Typography>
                    <Typography variant="body2" color="textSecondary">Deep Learning Models</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ background: governmentColors.warning, mr: 2 }}>
                    <Science />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Predictive Analytics</Typography>
                    <Typography variant="body2" color="textSecondary">Outcome Forecasting</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ background: governmentColors.info, mr: 2 }}>
                    <AutoAwesome />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Smart Optimization</Typography>
                    <Typography variant="body2" color="textSecondary">Resource Allocation</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ background: governmentColors.error, mr: 2 }}>
                    <Insights />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Real-time Insights</Typography>
                    <Typography variant="body2" color="textSecondary">Live Recommendations</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* Main Process Stepper */}
        <Paper
          sx={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 3,
            p: 3,
            mb: 4
          }}
        >
          <Stepper activeStep={activeStep} orientation="horizontal" sx={{ mb: 4 }}>
            <Step>
              <StepLabel>Select Village</StepLabel>
            </Step>
            <Step>
              <StepLabel>Configure Parameters</StepLabel>
            </Step>
            <Step>
              <StepLabel>AI Analysis</StepLabel>
            </Step>
            <Step>
              <StepLabel>Recommendations</StepLabel>
            </Step>
          </Stepper>

          {/* Step Content */}
          {activeStep === 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Select Target Village for Analysis
              </Typography>
              <Grid container spacing={3}>
                {mockVillages.map((village, index) => (
                  <Grid item xs={12} sm={6} md={3} key={village.id}>
                    <motion.div variants={cardVariants}>
                      <Card
                        sx={{
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          border: selectedVillage === village.id ? `2px solid ${governmentColors.primaryBlue}` : '1px solid rgba(0, 0, 0, 0.1)',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)'
                          }
                        }}
                        onClick={() => handleVillageSelect(village.id)}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Avatar sx={{ background: governmentColors.primaryGreen, mr: 2 }}>
                              <LocationOn />
                            </Avatar>
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {village.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {village.state}
                              </Typography>
                            </Box>
                          </Box>
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <Typography variant="caption" color="textSecondary">Population</Typography>
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {village.population.toLocaleString()}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="caption" color="textSecondary">FRA Holders</Typography>
                              <Typography variant="body1" sx={{ fontWeight: 600, color: governmentColors.primaryBlue }}>
                                {village.fraHolders}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          )}

          {/* Configuration Step */}
          {activeStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Configure Analysis Parameters
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Available Schemes</Typography>
                    <List>
                      {availableSchemes.map((scheme) => (
                        <ListItemButton key={scheme.id} sx={{ borderRadius: 2, mb: 1 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ background: scheme.color }}>
                              <scheme.icon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={scheme.name}
                            secondary={scheme.category}
                          />
                          <Switch defaultChecked />
                        </ListItemButton>
                      ))}
                    </List>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ mb: 3 }}>AI Model Settings</Typography>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body1" sx={{ mb: 1 }}>Priority Weight</Typography>
                      <Slider
                        defaultValue={75}
                        marks
                        min={0}
                        max={100}
                        valueLabelDisplay="on"
                      />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body1" sx={{ mb: 1 }}>Budget Constraint (Crores)</Typography>
                      <TextField
                        fullWidth
                        type="number"
                        defaultValue="5"
                        variant="outlined"
                      />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <FormControl fullWidth>
                        <InputLabel>Analysis Depth</InputLabel>
                        <Select defaultValue="comprehensive">
                          <MenuItem value="basic">Basic Analysis</MenuItem>
                          <MenuItem value="standard">Standard Analysis</MenuItem>
                          <MenuItem value="comprehensive">Comprehensive Analysis</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      startIcon={<PlayArrow />}
                      onClick={handleRunAnalysis}
                      sx={{
                        background: `linear-gradient(135deg, ${governmentColors.primaryBlue}, ${governmentColors.primaryGreen})`,
                        py: 1.5,
                        fontSize: '1.1rem'
                      }}
                    >
                      Run AI Analysis
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            </motion.div>
          )}

          {/* AI Processing Step */}
          {activeStep === 2 && aiProcessing && (
            <AIProcessingCard />
          )}

          {/* Recommendations Step */}
          {activeStep === 3 && analysisComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  AI-Generated Recommendations
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip 
                    label="High Confidence" 
                    color="success" 
                    icon={<CheckCircle />} 
                  />
                  <Chip 
                    label="3 Priority Schemes" 
                    color="primary" 
                    icon={<Star />} 
                  />
                </Box>
              </Box>
              {recommendations.map((rec, index) => (
                <RecommendationCard key={rec.scheme} recommendation={rec} index={index} />
              ))}
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    mr: 2,
                    background: `linear-gradient(135deg, ${governmentColors.success}, ${governmentColors.primaryGreen})`
                  }}
                >
                  Approve All Recommendations
                </Button>
                <Button variant="outlined" size="large">
                  Export Report
                </Button>
              </Box>
            </motion.div>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default DSSPortal;
