const express = require('express');

const EmailController = require('../controllers/emailController');

const router = express.Router();

router.post('/', EmailController.sendContactQueryEmail);

module.exports = router;