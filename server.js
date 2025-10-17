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

// Security middleware - DISABLE Helmet CSP for Vercel (handled by _headers file)
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(compression());

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? [
    'https://fra1-2cmv.vercel.app',
    'https://fra1-2cmv-sahildharmameher812-7747s-projects.vercel.app',
    'https://fra1-xw6u-gywhhsxcz-sahildharmameher812-7747s-projects.vercel.app',
    'https://fra-atlas.gov.in'
  ] : 'http://localhost:3000',
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

// Legacy dashboard route (keep for backward compatibility)
app.get('/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/legacy', (req, res) => {
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

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  // Catch all remaining routes and serve React app
  app.get('*', (req, res) => {
    // Don't serve React for API routes
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ message: 'API route not found' });
    }
    // Don't serve React for legacy dashboard
    if (req.path === '/dashboard.html' || req.path === '/legacy') {
      return res.sendFile(path.join(__dirname, 'dashboard.html'));
    }
    // Serve React app for all other routes
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
} else {
  // In development, serve React app
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api/') && req.path !== '/dashboard.html' && req.path !== '/legacy') {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    }
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
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
