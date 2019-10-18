const express = require('express');
const app = express();

// port that the nodeJS server will be listening on
const port = 3000;

// Middleware used to parse the request data
const bodyParser = require('body-parser');

// Required for paths on frontend
app.use(express.static(__dirname+'/public'));

// Connect DB to nodeJS server
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://127.0.0.1:27017/module7data', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
 })
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

// Use ejs as the template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Import our routes
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const commonRoutes = require('./routes/common');

// Middleware for application/json
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => res.redirect('/api/auth'));
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/dashboard', commonRoutes);
app.use('/users', userRoutes);

app.listen(port, ()=>console.log(`Server running on port ${port}`));

