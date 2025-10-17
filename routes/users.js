const express = require('express');
const router = express.Router();

const simpleAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });
  next();
};

router.get('/', simpleAuth, async (req, res) => {
  try {
    res.json({ message: 'User management coming soon' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
