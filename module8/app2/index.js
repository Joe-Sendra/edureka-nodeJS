const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');

const PORT = process.env.PORT || 3000;
const REDIS_PORT = process.env.PORT || 6379;

const API_URL = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=';

const client = redis.createClient(REDIS_PORT);

const app = express();

// Set response
function setResponse(responseData) {
    return `<h2>${responseData.country} Info</h2> <p>${JSON.stringify(responseData.data)}</p>`;
};

async function getCountryInfo(req, res, next) {
    try {
        console.log('Fetching Data...');
        const { countryName } = req.params;
        
        const response = await fetch(API_URL + countryName);

        const data = await response.json();
        
        if (data.parse) {
            responseData = { country: data.parse.title, data: JSON.stringify(data.parse.text)};
        } else {
            responseData = { country: countryName, data: 'No info found'};
        }

        // Set data to Redis
        client.setex(countryName, 3600, responseData.data);
        console.log('Data not cached, sending fetched data');
        res.send(setResponse(responseData));

    } catch (err) {
        console.error(err);
        res.status(500);
    }
};

// Cache middleware
function cache(req, res, next) {
    const { countryName } = req.params;

    client.get(countryName, (err, data) => {
        if (err) throw err;

        if(data != null) {
            responseData = { country: countryName, data: data };
            console.log('Sending cached data');
            res.send(setResponse(responseData));
        } else {
            next();
        }
    });
}

app.get('/countries/:countryName', cache, getCountryInfo);

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});
