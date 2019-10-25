const express = require('express');

const AuthController = require('../controllers/controlAuth');

const router = express.Router();

// /api/v1/auth/login
router.post('/login', AuthController.login);

module.exports = router;