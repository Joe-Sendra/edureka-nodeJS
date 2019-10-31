const express = require('express');

const AdminController = require('../controllers/controlAdmin');

// Middleware - JWT verification
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// /admin
router.get('/', checkAuth, AdminController.dashboard);

// /admin/news
router.get('/news', checkAuth, AdminController.getNewsList);

// /admin/news/add
router.get('/news/add', checkAuth, AdminController.getNewsForm);

// /admin/news/edit
router.post('/news/edit', checkAuth, AdminController.getNewsEdit);

module.exports = router;