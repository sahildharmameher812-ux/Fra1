const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Mock user data for demo
const mockUsers = [
  {
    id: 1,
    name: 'FRA Admin',
    email: 'admin@fra.gov.in',
    password: 'demo123',
    role: 'admin',
    state: 'All',
    district: 'All',
    permissions: ['read', 'write', 'delete', 'admin', 'analytics', 'approval']
  },
  {
    id: 2,
    name: 'State Officer',
    email: 'officer@fra.gov.in',
    password: 'demo123',
    role: 'state_officer',
    state: 'Madhya Pradesh',
    district: 'Bhopal',
    permissions: ['read', 'write', 'analytics', 'approval']
  },
  {
    id: 3,
    name: 'FRA Beneficiary',
    email: 'beneficiary@fra.gov.in',
    password: 'demo123',
    role: 'beneficiary',
    state: 'Tripura',
    district: 'West Tripura',
    permissions: ['read']
  }
];

// Simple auth middleware for demo
const simpleAuth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fra_atlas_demo_secret');
    const user = mockUsers.find(u => u.id === decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid.' });
    }

    req.user = {
      userId: user.id,
      role: user.role,
      permissions: user.permissions,
      state: user.state,
      district: user.district
    };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Token is not valid.' });
  }
};

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email and password
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'fra_atlas_demo_secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        state: user.state,
        district: user.district,
        permissions: user.permissions
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get current user profile
router.get('/profile', simpleAuth, async (req, res) => {
  try {
    const user = mockUsers.find(u => u.id === req.user.userId);
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        state: user.state,
        district: user.district,
        permissions: user.permissions,
        lastLogin: new Date(),
        createdAt: new Date()
      }
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
});

// Logout user
router.post('/logout', simpleAuth, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
