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

// Use ejs as the template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Import Routes
const authRoutes = require('./routes/routeAuth');
const userRoutes = require('./routes/routeUser');

// Routes
app.get('/', (req, res) => res.render('index')); // Landing Page
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(port, ()=>console.log(`Server running on port ${port}`));