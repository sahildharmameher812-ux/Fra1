import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  useTheme
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ComposedChart
} from 'recharts';
import { TrendingUp, Assessment, People, Agriculture, Speed, Psychology } from '@mui/icons-material';
import './StunningDashboard.css';
import '../../dashboard-spacing-fix.css';

const StunningDashboard = () => {
  const theme = useTheme();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Beautiful color palette - Blue, White, Green, Orange
  const colors = {
    primary: '#1976d2',      // Blue
    secondary: '#4caf50',    // Green  
    accent: '#ff9800',       // Orange
    light: '#ffffff',        // White
    gradient1: '#e3f2fd',    // Light Blue
    gradient2: '#e8f5e8',    // Light Green
    gradient3: '#fff3e0'     // Light Orange
  };

  // Sample data for different chart types
  const monthlyData = [
    { month: 'Jan', claims: 4000, processed: 3500, approved: 3200, revenue: 85 },
    { month: 'Feb', claims: 3000, processed: 2800, approved: 2500, revenue: 78 },
    { month: 'Mar', claims: 5000, processed: 4800, approved: 4300, revenue: 92 },
    { month: 'Apr', claims: 4500, processed: 4200, approved: 3900, revenue: 88 },
    { month: 'May', claims: 6000, processed: 5800, approved: 5400, revenue: 95 },
    { month: 'Jun', claims: 5500, processed: 5300, approved: 5000, revenue: 91 },
  ];

  const pieData = [
    { name: 'Forest Rights', value: 35, color: colors.secondary },
    { name: 'Land Claims', value: 25, color: colors.primary },
    { name: 'Tribal Affairs', value: 20, color: colors.accent },
    { name: 'Others', value: 20, color: '#9c27b0' }
  ];

  const radarData = [
    { subject: 'Accuracy', A: 120, B: 110, fullMark: 150 },
    { subject: 'Speed', A: 98, B: 130, fullMark: 150 },
    { subject: 'Efficiency', A: 86, B: 130, fullMark: 150 },
    { subject: 'Quality', A: 99, B: 100, fullMark: 150 },
    { subject: 'Coverage', A: 85, B: 90, fullMark: 150 },
    { subject: 'Innovation', A: 65, B: 85, fullMark: 150 },
  ];

  const scatterData = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 }
  ];

  const trendData = [
    { time: '00:00', users: 120, sessions: 89, conversions: 67 },
    { time: '04:00', users: 98, sessions: 72, conversions: 54 },
    { time: '08:00', users: 180, sessions: 140, conversions: 98 },
    { time: '12:00', users: 250, sessions: 200, conversions: 145 },
    { time: '16:00', users: 320, sessions: 280, conversions: 189 },
    { time: '20:00', users: 280, sessions: 240, conversions: 167 },
  ];

  useEffect(() => {
    setTimeout(() => setAnimationComplete(true), 1000);
    // Update time less frequently to prevent constant re-renders
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute instead of every second
    return () => clearInterval(timer);
  }, []);

  const StatCard = ({ title, value, subtitle, icon, color, trend, index = 0 }) => (
    <Card sx={{
      background: `linear-gradient(135deg, ${color}08 0%, ${color}03 100%)`,
      border: `1px solid ${color}15`,
      borderRadius: '16px',
      height: 'auto',
      minHeight: '180px',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.2s ease-in-out',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        border: `1px solid ${color}25`
      }
    }}>
      <CardContent sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        padding: '24px !important'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="body2" sx={{ 
              color: color, 
              fontWeight: 600, 
              fontSize: '13px',
              mb: '8px'
            }}>
              {title}
            </Typography>
            <Typography variant="h3" sx={{ 
              fontWeight: 700, 
              fontSize: '2.2rem',
              background: `linear-gradient(135deg, ${color} 0%, ${color}90 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
              mb: 0
            }}>
              {value}
            </Typography>
          </Box>
          <Box sx={{ 
            width: 48, 
            height: 48,
            borderRadius: '12px',
            background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color
          }}>
            {icon}
          </Box>
        </Box>
        
        <Box>
          <Typography variant="body2" sx={{ 
            color: '#666', 
            fontSize: '12px',
            mb: trend ? '6px' : 0
          }}>
            {subtitle}
          </Typography>
          {trend && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TrendingUp sx={{ fontSize: 14, color: colors.secondary }} />
              <Typography variant="caption" sx={{ 
                color: colors.secondary, 
                fontWeight: 600,
                fontSize: '11px'
              }}>
                +{trend}%
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
      <Box sx={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        height: '3px',
        background: `linear-gradient(90deg, ${color}40 0%, ${color} 50%, ${color}40 100%)`,
        opacity: 0.7
      }} />
    </Card>
  );

  const ChartCard = ({ title, children, height = 350, index = 0, bgColor = 'blue' }) => {
    return (
      <Card sx={{
        borderRadius: '16px',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        overflow: 'visible',
        position: 'relative',
        width: '100%',
        height: 'auto',
        backgroundColor: '#ffffff',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          transform: 'translateY(-2px)'
        }
      }}>
      <Box sx={{ 
        padding: '24px 24px 20px 24px', 
        borderBottom: '1px solid rgba(0,0,0,0.04)'
      }}>
        <Typography variant="h6" sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          fontSize: '1.05rem',
          fontWeight: 600,
          color: '#2c3e50',
          margin: 0
        }}>
          {title}
          <Box sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: colors.secondary,
            animation: 'pulse 2s infinite'
          }} />
        </Typography>
      </Box>
      <Box sx={{ 
        padding: '20px 24px 24px 24px', 
        height: height,
        width: '100%',
        position: 'relative',
        overflow: 'visible'
      }}>
        {children}
      </Box>
    </Card>
    );
  };

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
      minHeight: '100vh',
      padding: '16px',
      fontFamily: '"Inter", "Roboto", sans-serif'
    }}>
      {/* Header Section */}
      <Box sx={{ 
        textAlign: 'center', 
        mb: '16px',
        mx: '16px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: '32px 24px',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
      }}>
        <Typography variant="h2" sx={{ 
          fontWeight: 700,
          fontSize: '2.2rem',
          background: 'linear-gradient(135deg, #1976d2 0%, #4caf50 50%, #ff9800 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
          lineHeight: 1.2
        }}>
          🌲 FRA Analytics Dashboard
        </Typography>
        <Typography variant="h6" sx={{ 
          color: '#666', 
          fontWeight: 400, 
          fontSize: '1.1rem',
          mb: 1
        }}>
          Forest Rights Atlas - Real-time Intelligence & Analytics
        </Typography>
        <Typography variant="body2" sx={{ 
          color: '#888', 
          fontSize: '0.9rem'
        }}>
          Live Data • {currentTime.toLocaleTimeString()} • SIH 2024 Winner
        </Typography>
      </Box>

      {/* KPI Stats Grid */}
      <Grid container spacing={2} sx={{ 
        mb: '16px', 
        mx: '0px',
        '& .MuiGrid-item': {
          paddingLeft: '16px !important',
          paddingRight: '16px !important',
          paddingTop: '16px !important',
          paddingBottom: '0px !important'
        }
      }}>
        <Grid item xs={12} md={2}>
          <StatCard
            title="Total Claims"
            value="24,567"
            subtitle="Forest Rights Applications"
            icon={<Assessment sx={{ fontSize: 28 }} />}
            color={colors.primary}
            trend={12.5}
            index={0}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <StatCard
            title="AI Accuracy"
            value="94.2%"
            subtitle="Machine Learning Precision"
            icon={<Psychology sx={{ fontSize: 28 }} />}
            color={colors.secondary}
            trend={8.7}
            index={1}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <StatCard
            title="Families Served"
            value="45,789"
            subtitle="Tribal Beneficiaries"
            icon={<People sx={{ fontSize: 28 }} />}
            color={colors.accent}
            trend={15.3}
            index={2}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <StatCard
            title="Land Coverage"
            value="78.4%"
            subtitle="Forest Area Mapped"
            icon={<Agriculture sx={{ fontSize: 28 }} />}
            color="#9c27b0"
            trend={22.1}
            index={3}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <StatCard
            title="Processing Speed"
            value="2.3s"
            subtitle="Average Response Time"
            icon={<Speed sx={{ fontSize: 28 }} />}
            color="#e91e63"
            trend={-18.5}
            index={4}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <StatCard
            title="Success Rate"
            value="96.8%"
            subtitle="Claim Approval Rate"
            icon={<TrendingUp sx={{ fontSize: 28 }} />}
            color="#00bcd4"
            trend={5.2}
            index={5}
          />
        </Grid>
      </Grid>

      {/* Main Charts Grid */}
      <Grid container spacing={2} sx={{ 
        mb: '16px', 
        mx: '0px',
        '& .MuiGrid-item': {
          paddingLeft: '16px !important',
          paddingRight: '16px !important',
          paddingTop: '16px !important',
          paddingBottom: '0px !important'
        }
      }}>
        {/* Area Chart */}
        <Grid item xs={12} lg={8}>
          <ChartCard title="📈 Claims Processing Trends" height={400} index={6} bgColor="blue">
            <ResponsiveContainer 
              width="100%" 
              height="100%" 
              style={{ 
                minHeight: '350px', 
                opacity: 1, 
                visibility: 'visible' 
              }}
            >
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorClaims" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={colors.primary} stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorProcessed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={colors.secondary} stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.accent} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={colors.accent} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fill: '#666', fontSize: 12 }} />
                <YAxis tick={{ fill: '#666', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }} 
                />
                <Legend />
                <Area type="monotone" dataKey="approved" stackId="1" stroke={colors.accent} fill="url(#colorApproved)" name="Approved" />
                <Area type="monotone" dataKey="processed" stackId="1" stroke={colors.secondary} fill="url(#colorProcessed)" name="Processed" />
                <Area type="monotone" dataKey="claims" stackId="1" stroke={colors.primary} fill="url(#colorClaims)" name="Total Claims" />
              </AreaChart>
              </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} lg={4}>
          <ChartCard title="🥧 Claim Distribution" height={400} index={7} bgColor="green">
            <ResponsiveContainer 
              width="100%" 
              height="100%" 
              style={{ 
                minHeight: '350px', 
                opacity: 1, 
                visibility: 'visible' 
              }}
            >
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Secondary Charts Grid */}
      <Grid container spacing={2} sx={{ 
        mb: '16px', 
        mx: '0px',
        '& .MuiGrid-item': {
          paddingLeft: '16px !important',
          paddingRight: '16px !important',
          paddingTop: '16px !important',
          paddingBottom: '0px !important'
        }
      }}>
        {/* Bar Chart */}
        <Grid item xs={12} lg={4}>
          <ChartCard title="📁 Monthly Performance" height={350} index={8} bgColor="orange">
            <ResponsiveContainer width="100%" height="100%" style={{ opacity: 1, visibility: 'visible' }}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fill: '#666', fontSize: 11 }} />
                <YAxis tick={{ fill: '#666', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }} 
                />
                <Bar dataKey="revenue" fill={colors.primary} radius={[4, 4, 0, 0]} name="Revenue %" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Radar Chart */}
        <Grid item xs={12} lg={4}>
          <ChartCard title="🎯 System Performance Radar" height={350} index={9} bgColor="purple">
            <ResponsiveContainer width="100%" height="100%" style={{ opacity: 1, visibility: 'visible' }}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e0e0e0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 11 }} />
                <PolarRadiusAxis tick={{ fill: '#666', fontSize: 10 }} />
                <Radar name="Current" dataKey="A" stroke={colors.primary} fill={colors.primary} fillOpacity={0.3} strokeWidth={2} />
                <Radar name="Target" dataKey="B" stroke={colors.secondary} fill={colors.secondary} fillOpacity={0.2} strokeWidth={2} />
                <Legend />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Line Chart */}
        <Grid item xs={12} lg={4}>
          <ChartCard title="📈 Real-time Activity" height={350} index={10} bgColor="teal">
            <ResponsiveContainer width="100%" height="100%" style={{ opacity: 1, visibility: 'visible' }}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" tick={{ fill: '#666', fontSize: 11 }} />
                <YAxis tick={{ fill: '#666', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="users" stroke={colors.primary} strokeWidth={3} dot={{ r: 4 }} name="Active Users" />
                <Line type="monotone" dataKey="sessions" stroke={colors.secondary} strokeWidth={3} dot={{ r: 4 }} name="Sessions" />
                <Line type="monotone" dataKey="conversions" stroke={colors.accent} strokeWidth={3} dot={{ r: 4 }} name="Conversions" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Advanced Charts */}
      <Grid container spacing={2} sx={{ 
        mb: '16px', 
        mx: '0px',
        '& .MuiGrid-item': {
          paddingLeft: '16px !important',
          paddingRight: '16px !important',
          paddingTop: '16px !important',
          paddingBottom: '0px !important'
        }
      }}>
        {/* Composed Chart */}
        <Grid item xs={12} lg={8}>
          <ChartCard title="🔄 Multi-metric Analysis" height={400} index={11} bgColor="pink">
            <ResponsiveContainer width="100%" height="100%" style={{ opacity: 1, visibility: 'visible' }}>
              <ComposedChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fill: '#666', fontSize: 12 }} />
                <YAxis yAxisId="left" tick={{ fill: '#666', fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: '#666', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }} 
                />
                <Legend />
                <Bar yAxisId="left" dataKey="claims" fill={colors.primary} opacity={0.7} radius={[4, 4, 0, 0]} name="Total Claims" />
                <Bar yAxisId="left" dataKey="processed" fill={colors.secondary} opacity={0.7} radius={[4, 4, 0, 0]} name="Processed" />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke={colors.accent} strokeWidth={3} dot={{ r: 5 }} name="Success Rate %" />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Scatter Chart */}
        <Grid item xs={12} lg={4}>
          <ChartCard title="🎯 Performance Scatter" height={400} index={12} bgColor="indigo">
            <ResponsiveContainer width="100%" height="100%" style={{ opacity: 1, visibility: 'visible' }}>
              <ScatterChart data={scatterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="x" type="number" domain={['dataMin', 'dataMax']} tick={{ fill: '#666', fontSize: 11 }} />
                <YAxis dataKey="y" type="number" domain={['dataMin', 'dataMax']} tick={{ fill: '#666', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }} 
                  cursor={{ strokeDasharray: '3 3' }}
                />
                <Scatter name="Performance Metrics" data={scatterData} fill={colors.primary} opacity={0.8} />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box sx={{ 
        textAlign: 'center', 
        mt: '32px', 
        mx: '16px',
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.3)'
      }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 600,
          background: 'linear-gradient(135deg, #1976d2 0%, #4caf50 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🏆 SIH 2024 Winner - Forest Rights Atlas Dashboard
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
          Powered by Advanced Analytics • Real-time Data Processing • AI-Driven Insights
        </Typography>
      </Box>
    </Box>
  );
};

export default StunningDashboard;