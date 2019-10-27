const express = require('express');

const AdminController = require('../controllers/controlAdmin');

// Middleware - JWT verification
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// /admin
router.get('/', AdminController.dashboard);

// /admin/newsForm
router.get('/newsForm', checkAuth, AdminController.getNewsForm);

// /admin/newsList
router.get('/newsList', AdminController.getNewsList);

module.exports = router;