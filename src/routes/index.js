const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./authRoutes');

// Mount routes
router.use('/auth', authRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
