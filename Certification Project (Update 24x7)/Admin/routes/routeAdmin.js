const express = require('express');

const AdminController = require('../controllers/controlAdmin');

// Middleware - JWT verification
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// /admin
router.get('/', checkAuth, AdminController.dashboard);

// /admin/news
router.get('/news', checkAuth, AdminController.getNewsList);

// // /admin/newsForm
router.get('/news/add', checkAuth, AdminController.getNewsForm);

module.exports = router;