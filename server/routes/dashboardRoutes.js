const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const adminAuth = require('../middleware/adminAuth');

// Public route for incrementing visitor count
router.post('/visitor', dashboardController.incrementVisitor);

// Admin route for getting dashboard stats
router.post('/stats', adminAuth, dashboardController.getDashboardStats);

module.exports = router;
