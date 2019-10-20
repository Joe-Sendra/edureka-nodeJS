const express = require('express');

const UserController = require('../controllers/user');

// Middleware - JWT verification
const checkAuth = require('../middleware/check-auth');

// Middleware - Admin authorization
const checkAdmin = require('../middleware/check-admin');

const router = express.Router();

// /users
router.get('/', checkAuth, checkAdmin, UserController.getUsers);

// /users/addUser
router.get('/addUser', checkAuth, checkAdmin, UserController.addUser);

// /users/list
router.get('/list', checkAuth, checkAdmin, UserController.showUsers);

// /users/register
router.get('/register', UserController.registerUser);

// /users/:user._id
router.get('/:user', checkAuth, UserController.getUser);

module.exports = router;