import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import our government theme and styles
import { governmentTheme } from './theme/governmentTheme';
import './styles/governmentStyles.css';
import './styles/advancedStyles.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import ChatWidget from './components/ChatAssistant/ChatWidget';

// Pages
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import WebGISMaps from './pages/WebGISMaps';
import Analytics from './pages/Analytics';
import OCRSystem from './pages/OCRSystem';
import DSSPortal from './pages/DSSPortal';
import LoginPage from './pages/Auth/LoginPage';
import DocumentUpload from './pages/Documents/DocumentUpload';

function App() {
  return (
    <ThemeProvider theme={governmentTheme}>
      <CssBaseline />
      <LanguageProvider>
        <AuthProvider>
          <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/maps" element={
              <PublicMapsLayout />
            } />
            
            {/* Protected Routes */}
            <Route path="/*" element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            } />
          </Routes>
          
          {/* Global Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            toastClassName="government-toast"
            style={{ zIndex: 9999 }}
          />
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

// Protected App Layout Component
const AppLayout = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#FAFAFA'
      }}
    >
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          mt: '64px', // Account for fixed header
          minHeight: 'calc(100vh - 128px)' // Header + Footer space
        }}
      >
        <Routes>
          {/* Home/Dashboard Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute requiredPermission="view">
              <Dashboard />
            </ProtectedRoute>
          } />
          
          {/* Maps and GIS */}
          <Route path="/maps" element={
            <ProtectedRoute requiredPermission="view">
              <WebGISMaps />
            </ProtectedRoute>
          } />
          
          {/* Analytics - Officers and Admins only */}
          <Route path="/analytics" element={
            <ProtectedRoute requiredPermission="generate-reports">
              <Analytics />
            </ProtectedRoute>
          } />
          
          {/* OCR System */}
          <Route path="/ocr" element={
            <ProtectedRoute requiredPermission="submit">
              <OCRSystem />
            </ProtectedRoute>
          } />

          {/* FRA Document Upload */}
          <Route path="/documents" element={
            <ProtectedRoute requiredPermission="submit">
              <DocumentUpload />
            </ProtectedRoute>
          } />
          
          {/* Decision Support System */}
          <Route path="/dss" element={
            <ProtectedRoute requiredPermission="view">
              <DSSPortal />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute requiredRole="admin">
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Admin Panel</h2>
                <p>Admin-only features will be available here.</p>
              </div>
            </ProtectedRoute>
          } />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
      
      {/* Footer */}
      <Footer />
      
      {/* Chat Assistant Widget - Available on all pages */}
      <ChatWidget />
    </Box>
  );
};

// Public Maps Layout Component (No Authentication Required)
const PublicMapsLayout = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#FAFAFA'
      }}
    >
      {/* Header */}
      <Header />
      
      {/* Maps Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          mt: '64px', // Account for fixed header
          minHeight: 'calc(100vh - 128px)' // Header + Footer space
        }}
      >
        <WebGISMaps />
      </Box>
      
      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default App;
