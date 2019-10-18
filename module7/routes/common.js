const express = require('express');

const CommonController = require('../controllers/common');

// Middleware - JWT verification
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// /dashboard
router.get('/', CommonController.getDashboard);

// /dashboard/menu
router.get('/menu', checkAuth, CommonController.getMenu);

module.exports = router;