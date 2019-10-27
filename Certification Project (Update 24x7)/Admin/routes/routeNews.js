const express = require('express');

const NewsController = require('../controllers/controlNews');

// Middleware - JWT verification
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// /admin/news
router.get('/', NewsController.getAllNews);
router.post('/', checkAuth, NewsController.addNews);
router.delete('/', checkAuth, NewsController.deleteNewsById);

router.get('/list', NewsController.showNews);

module.exports = router;