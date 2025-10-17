const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes (using simple versions for demo)
const authRoutes = require('./routes/auth_simple');
const documentRoutes = require('./routes/documents');
const gisRoutes = require('./routes/gis');
const analyticsRoutes = require('./routes/analytics');
const analyticsGraphsRoutes = require('./routes/analytics-graphs');
const userRoutes = require('./routes/users');
const satelliteRoutes = require('./routes/satellite');
const claimsRoutes = require('./routes/claims');
const decisionSupportRoutes = require('./routes/decision-support');
const fraAtlasRoutes = require('./routes/fra-atlas');
const chatAssistantRoutes = require('./routes/chat-assistant');

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection (optional in demo; used for OCR/NER storage)
app.locals.dbConnected = false;
const mongoUri = process.env.MONGODB_URI;
if (mongoUri) {
  mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      app.locals.dbConnected = true;
      console.log('🗄️ Connected to MongoDB');
    })
    .catch((err) => {
      app.locals.dbConnected = false;
      console.warn('⚠️ MongoDB connection failed. Proceeding in demo mode without DB.', err.message);
    });
}

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://fra-atlas.gov.in' : 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/datasets', express.static(path.join(__dirname, 'datasets')));

// Serve static HTML files (including dashboard.html)
app.use(express.static(path.join(__dirname)));

// Dashboard routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Demo mode note
console.log('🚀 API running. Mock routes are enabled. DB-connected:', app.locals.dbConnected);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/gis', gisRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/analytics-graphs', analyticsGraphsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/satellite', satelliteRoutes);
app.use('/api/claims', claimsRoutes);
app.use('/api/decision-support', decisionSupportRoutes);
app.use('/api/fra-atlas', fraAtlasRoutes);
app.use('/api/chat', chatAssistantRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'FRA Atlas API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Serve React app in production (but keep dashboard routes accessible)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  // Only catch remaining routes, not dashboard routes
  app.get('/app/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
} else {
  // In development, serve React app on different routes
  app.use('/app', express.static(path.join(__dirname, 'client/build')));
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const startServer = (port) => {
  app.listen(port, () => {
    console.log(`🚀 FRA Atlas Server running on port ${port}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 Dashboard: http://localhost:${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${port} is already in use, trying ${port + 1}...`);
      startServer(port + 1); // Try the next port
    } else {
      console.error('Server error:', err);
    }
  });
};

startServer(PORT);

module.exports = app;
