import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Demo user accounts with enhanced roles and permissions
const DEMO_USERS = {
  'admin@fra.gov.in': {
    id: '1',
    email: 'admin@fra.gov.in',
    name: 'Dr. Rajesh Kumar',
    role: 'admin',
    designation: 'System Administrator',
    department: 'Ministry of Tribal Affairs',
    state: 'New Delhi',
    avatar: '/api/placeholder/100/100?text=RK',
    permissions: ['all'],
    lastLogin: new Date().toISOString(),
    stats: {
      totalClaims: 16847,
      approvedClaims: 12456,
      pendingReviews: 89,
      systemUptime: '99.8%'
    }
  },
  'officer@fra.gov.in': {
    id: '2',
    email: 'officer@fra.gov.in',
    name: 'Mrs. Priya Sharma',
    role: 'officer',
    designation: 'Senior Forest Rights Officer',
    department: 'State Forest Department',
    state: 'Madhya Pradesh',
    avatar: '/api/placeholder/100/100?text=PS',
    permissions: ['view', 'edit', 'approve', 'generate-reports'],
    lastLogin: new Date().toISOString(),
    stats: {
      assignedClaims: 1247,
      approvedToday: 23,
      pendingReview: 156,
      efficiency: '94.2%'
    }
  },
  'user@fra.gov.in': {
    id: '3',
    email: 'user@fra.gov.in',
    name: 'Shri Arjun Munda',
    role: 'user',
    designation: 'Tribal Community Representative',
    department: 'Gram Panchayat Committee',
    state: 'Odisha',
    avatar: '/api/placeholder/100/100?text=AM',
    permissions: ['view', 'submit', 'track'],
    lastLogin: new Date().toISOString(),
    stats: {
      submittedClaims: 8,
      approvedClaims: 5,
      pendingClaims: 2,
      communitySize: 245
    }
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('fraUser');
        const sessionExpiry = localStorage.getItem('fraSessionExpiry');
        
        if (storedUser && sessionExpiry) {
          const expiryTime = new Date(sessionExpiry);
          const now = new Date();
          
          if (now < expiryTime) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
          } else {
            // Session expired
            localStorage.removeItem('fraUser');
            localStorage.removeItem('fraSessionExpiry');
            toast.info('Session expired. Please log in again.');
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        localStorage.removeItem('fraUser');
        localStorage.removeItem('fraSessionExpiry');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    console.log('🔐 Login attempt:', email, password); // Debug log
    
    try {
      setLoading(true);
      setAuthError(null);
      
      console.log('📋 Available users:', Object.keys(DEMO_USERS)); // Debug log
      
      const userData = DEMO_USERS[email.toLowerCase().trim()];
      console.log('👤 Found user data:', userData ? 'YES' : 'NO'); // Debug log
      
      if (userData && password.trim() === 'demo123') {
        console.log('✅ Authentication successful'); // Debug log
        
        // Update last login
        const updatedUser = {
          ...userData,
          lastLogin: new Date().toISOString()
        };
        
        setUser(updatedUser);
        
        // Set session expiry (24 hours from now)
        const expiryTime = new Date();
        expiryTime.setHours(expiryTime.getHours() + 24);
        
        localStorage.setItem('fraUser', JSON.stringify(updatedUser));
        localStorage.setItem('fraSessionExpiry', expiryTime.toISOString());
        
        // Simplified toast without complex options
        try {
          toast.success(`Welcome ${updatedUser.name}! 🌟`);
        } catch (toastError) {
          console.warn('Toast failed:', toastError);
        }
        
        return updatedUser;
      } else {
        console.log('❌ Invalid credentials'); // Debug log
        throw new Error('Invalid email or password. Use demo123 as password.');
      }
    } catch (error) {
      console.error('🚨 Login error:', error);
      const errorMessage = error.message || 'Login failed. Please try again.';
      setAuthError(errorMessage);
      
      try {
        toast.error(errorMessage);
      } catch (toastError) {
        console.warn('Toast error failed:', toastError);
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('🚪 Logging out user'); // Debug log
    setUser(null);
    setAuthError(null);
    localStorage.removeItem('fraUser');
    localStorage.removeItem('fraSessionExpiry');
    
    try {
      toast.success('Logged out successfully! 👋');
    } catch (toastError) {
      console.warn('Logout toast failed:', toastError);
    }
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    return user.permissions?.includes('all') || user.permissions?.includes(permission);
  };

  const isRole = (role) => {
    return user?.role === role;
  };

  const getWelcomeMessage = () => {
    if (!user) return '';
    const hour = new Date().getHours();
    let greeting = 'Good evening';
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 18) greeting = 'Good afternoon';
    
    return `${greeting}, ${user.name}`;
  };

  const value = {
    user,
    loading,
    authError,
    login,
    logout,
    hasPermission,
    isRole,
    getWelcomeMessage,
    isAuthenticated: !!user,
    demoUsers: DEMO_USERS
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
