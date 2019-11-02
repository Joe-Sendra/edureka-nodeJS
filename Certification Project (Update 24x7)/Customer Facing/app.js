// TODO when online: npm install nodemon express body-parser ejs
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

// Required for paths on frontend
app.use(express.static(__dirname+'/public'));

// Use ejs as the template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// TODO Import Routes

// Middleware for application/json
app.use(bodyParser.json());

// Middleware for URL encoded
app.use(express.urlencoded({ extended: true }));

// TODO Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, ()=>console.log(`Server running on port ${port}`));