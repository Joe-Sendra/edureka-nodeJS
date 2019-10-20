const express = require('express');

const AuthController = require('../controllers/auth');

const router = express.Router();

// /api/auth
router.get('/', AuthController.login);

// /api/auth/register
router.post('/register', AuthController.register);

// /api/auth/login
router.post('/login', AuthController.authUser);

module.exports = router;