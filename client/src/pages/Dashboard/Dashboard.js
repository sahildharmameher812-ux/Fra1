import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UltraModernHomepage from './UltraModernHomepage';
import ComprehensiveDashboard from './ComprehensiveDashboard';
import BeautifulHomepage from './BeautifulHomepage';
import EnhancedDashboard from './EnhancedDashboard';

const Dashboard = () => {
  const location = useLocation();
  const [currentView, setCurrentView] = useState('modern'); // 'modern', 'comprehensive', 'homepage', or 'dashboard'
  
  // Set view based on route
  useEffect(() => {
    if (location.pathname === '/comprehensive') {
      setCurrentView('comprehensive');
    } else {
      setCurrentView('modern');
    }
  }, [location.pathname]);
  
  const handleViewChange = (view) => {
    setCurrentView(view);
  };
  
  // Use UltraModernHomepage as the primary interface
  if (currentView === 'modern') {
    return <UltraModernHomepage />;
  }
  
  if (currentView === 'comprehensive') {
    return <ComprehensiveDashboard />;
  }
  
  if (currentView === 'dashboard') {
    return <EnhancedDashboard onNavigateHome={() => handleViewChange('modern')} />;
  }
  
  return <BeautifulHomepage onNavigateToDashboard={() => handleViewChange('dashboard')} />;
};

export default Dashboard;
