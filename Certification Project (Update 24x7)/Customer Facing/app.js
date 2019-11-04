// TODO when online: npm install nodemon express body-parser ejs
// use express framework
const express = require('express');
const app = express();

const chatServer = require('./chatServer');

// Has environment variables
const config = require('./config');

// port that the nodeJS server will be listening on
const port = config.port;

// Middleware used to parse the request data
const bodyParser = require('body-parser');

// Middleware for application/json
app.use(bodyParser.json());

// Required for paths on frontend
app.use(express.static(__dirname+'/public'));

// Use ejs as the template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// TODO Import Routes
const emailRoutes = require('./routes/emailRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Middleware for application/json
app.use(bodyParser.json());

// Middleware for URL encoded
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => res.render('index')); // Homepage
app.get('/sports', (req, res) => res.render('sports')); // Sports Page
app.get('/contact', (req, res) => res.render('contact',{ errorMsg: null, successMsg: null })); // Contact Us Page
app.get('/about', (req, res) => res.render('about')); // About Us Page
app.use('/api', apiRoutes);
app.use('/sendOrderEmail', emailRoutes);

app.listen(port, ()=>console.log(`Main server running on port ${port}`));