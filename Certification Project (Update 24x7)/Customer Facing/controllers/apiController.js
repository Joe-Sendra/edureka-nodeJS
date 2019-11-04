// Has environment variables
const config = require('../config');

//Include node-fetch used to call api
const fetch = require('node-fetch');

exports.getWeatherByCoordinates = (req, res, next) => {
    if (req.body.lat && req.body.lon) {
        const url = `${config.weather_api_url}lat=${req.body.lat}&lon=${req.body.lon}&units=imperial&appid=${config.weather_api_key}`;
        fetch(url)
            .then(response => response.json())
            .then(results => {
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
}

exports.getNews = (req, res, next) => {
    const url = `${config.news_api_host}:${config.news_api_port}/api/v1/news`;
    fetch(url)
        .then(response => response.json())
        .then(results => {
            let allNews = results.newsData;
            allNews.sort((a, b) => {
                a = new Date(a.publishDate);
                b = new Date(b.publishDate);
                return a>b ? -1 : a<b ? 1 : 0;
            });
            let top3news = allNews.splice(0,3);
            res.status(200).send({status: "success", news: top3news});
        })
        .catch(err => {
            res.status(500).send({status: "fail", message : "Server error fetching news"});
        }
    );
}