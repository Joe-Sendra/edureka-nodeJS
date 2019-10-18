const express = require('express');

const ProductController = require('../controllers/product');

// Middleware - JWT verification
const checkAuth = require('../middleware/check-auth');

// Middleware - Admin authorization
const checkAdmin = require('../middleware/check-admin');

const router = express.Router();

// /api/products
router.get('/', ProductController.getProducts);
router.post('/', checkAuth, checkAdmin, ProductController.addProduct);

// /api/products/addProduct
router.get('/addProduct', checkAuth, checkAdmin, ProductController.getAddProduct);

// /api/products/list
router.get('/list', ProductController.showProducts);

module.exports = router;