const express = require('express');

const ApiController = require('../controllers/apiController');

const router = express.Router();

// /api/v1/weather
router.post('/v1/weather', ApiController.getWeatherByCoordinates);

// /api/v1/news
router.get('/v1/news', ApiController.getNews);

module.exports = router;