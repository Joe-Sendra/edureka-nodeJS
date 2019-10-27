// use express framework
const express = require('express');
const app = express();

// Has environment variables
const config = require('./config');

// port that the nodeJS server will be listening on
const port = config.port;

// Middleware used to parse the request data
const bodyParser = require('body-parser');

// Middleware for application/json
app.use(bodyParser.json());

// Connect DB to nodeJS server
const mongoose = require('mongoose');
const db = mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
 });

// Required for paths on frontend
app.use(express.static(__dirname+'/public'));

// Use ejs as the template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Import Routes
const adminRoutes = require('./routes/routeAdmin');
const authRoutes = require('./routes/routeAuth');
const newsRoutes = require('./routes/routeNews');
const userRoutes = require('./routes/routeUser');

// Middleware for application/json
app.use(bodyParser.json());

// Middleware for URL encoded
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    if (req.body.successMsg) {
        console.log('should show successfully registered message')
        res.render('index', {errorMsg: null, successMsg: req.body.successMsg, isLoggedIn: false}); // Landing Page
    } else {
        res.render('index', {errorMsg: null, successMsg: null, isLoggedIn: false}); // Landing Page
    }
});
app.use('/admin', adminRoutes);
app.use('/admin/news', newsRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(port, ()=>console.log(`Server running on port ${port}`));