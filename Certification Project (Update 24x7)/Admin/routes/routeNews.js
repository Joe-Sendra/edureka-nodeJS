const express = require('express');

const NewsController = require('../controllers/controlNews');

// Middleware - JWT verification
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// /api/v1/news
router.get('/', checkAuth, NewsController.getAllNews);
router.post('/', checkAuth, NewsController.addNews);

// /api/v1/news:Id
router.get('/:newsId', checkAuth, NewsController.getNewsById);
router.delete('/:newsId', checkAuth, NewsController.deleteNewsById);

module.exports = router;