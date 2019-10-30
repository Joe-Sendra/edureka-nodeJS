const fetch = require('node-fetch');

exports.dashboard = (req, res, next) => {
    res.status(200).render('dashboard',{errorMsg: null, successMsg: null, isLoggedIn: true});
}

exports.getNewsForm = (req, res, next) => {
    res.status(200).render('newsForm');
}

exports.getNewsList = (req, res, next) => {
    try {
        // TODO remove localhost:3000 and replace with env variable
        fetch('http://localhost:3000/api/v1/news', {
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