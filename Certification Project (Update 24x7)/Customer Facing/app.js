// TODO when online: npm install nodemon express body-parser ejs
// use express framework
const express = require('express');
const app = express();

//Include node-fetch used to call api
const fetch = require('node-fetch');

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

// Routes
app.get('/', (req, res) => res.render('index')); // Homepage
app.get('/sports', (req, res) => res.render('sports')); // Sports Page
app.get('/contact', (req, res) => res.render('contact')); // Contact Us Page
app.get('/about', (req, res) => res.render('about')); // About Us Page

// TODO move to seperate route file
app.post('/api/v1/weather', (req, res) => {
    
    if (req.body.lat && req.body.lon) {
        const url = `${config.weather_api_url}lat=${req.body.lat}&lon=${req.body.lon}&units=imperial&appid=${config.weather_api_key}`;
        fetch(url)
            .then(response => response.json())
            .then(results => {
                console.log(results);
                const weatherData = {
                    weather: results.weather[0].description,
                    iconUrl: `http://openweathermap.org/img/wn/${results.weather[0].icon}@2x.png`,
                    temperature: `${results.main.temp}°F`,
                    city: results.name
                };
                res.status(200).send({ weatherData });   
            })
            .catch(err => {
                console.log('Caught error in api fetch: ', err);
                res.status(500).send({message: 'Server error'});
            }
        );
    } else {
        res.status(400).send({message: 'Not a valid lat, lon provided'});
    }
});

app.listen(port, ()=>console.log(`Server running on port ${port}`));