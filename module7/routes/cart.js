const express = require('express');

const CartController = require('../controllers/cart');

// Middleware - JWT verification
const checkAuth = require('../middleware/check-auth');

// Middleware - Admin authorization
const checkAdmin = require('../middleware/check-admin');

const router = express.Router();

// /api/cart/addItemCart
router.post('/addItemCart', checkAuth, CartController.addItemCart);

// /api/cart/:ownerID
router.get('/:ownerID', checkAuth, CartController.getCart);

// /api/cart/list
router.post('/list', checkAuth, CartController.showCart);

module.exports = router;