const fetch = require('node-fetch');

// Has environment variables
const config = require('../config');

exports.dashboard = (req, res, next) => {
    res.status(200).render('dashboard',{errorMsg: null, successMsg: null, isLoggedIn: true});
}

exports.getNewsForm = (req, res, next) => {
    res.status(200).render('newsForm');
}

exports.getNewsList = (req, res, next) => {
    try {
        const API_URL = `${config.api_host}:${config.port}/api/v1/news`;
        fetch(API_URL, {
            headers: {"authorization": "Bearer " + req.userData.token}
        })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                res.status(500).send('Server error retrieving news data');
            };
        })
        .then(data => {
            return res.status(200).render('newsList.ejs', {newsList: data.newsData, errorMsg: null, successMsg: null});
        })
        .catch(err => console.log('Error caught in fetch: ', err));
 
    } catch (error) {
        console.log(error);
    }    
}

exports.getNewsEdit = (req, res, next) => {
    try {
        const API_URL = `${config.api_host}:${config.port}/api/v1/news/`;
        fetch(API_URL + req.body.newsId, {
            headers: {"authorization": "Bearer " + req.userData.token}
        })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                res.status(500).send('Server error retrieving news data');
            };
        })
        .then(data => {
            return res.status(200).render('newsFormEdit', {news: data, errorMsg: null, successMsg: null});
        })
        .catch(err => console.log('Error caught in fetch: ', err));
    } catch (error) {
        console.log(error);
    }
}