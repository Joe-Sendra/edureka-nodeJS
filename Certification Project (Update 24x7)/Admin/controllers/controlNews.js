// User model for mongoose schema
const News = require('../models/news');


exports.getAllNews = (req, res, next) => {
    News.find({}, (err, newsData)=>{
        if (err) return res.status(500).send("Can not fetch news");
        res.status(200).send({newsData});
    });
}

exports.addNews = (req, res, next) => {  
    News.create({
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        imageUrl: req.body.urlToImage,
        publishDate: req.body.publishedAt
    },(err, newsItem)=>{
        if (err) return res.status(500).send({errorMsg: err, successMsg: null});
        let testDate = new Date(newsItem.publishDate);
        console.log(newsItem.publishDate, testDate, testDate.getUTCDate(), newsItem.publishDate.getUTCDate());
        console.log(newsItem.publishDate.toUTCString(), testDate.toUTCString());
        res.status(201).send({ message: "News item created successfully", data: newsItem});
    });
}

exports.showNews = (req, res, next) => {
    try {
        News.find({}, (err, newsList)=>{
            if (err) return res.status(500).send("Can not fetch news");
            res.status(200).render('newsList.ejs', {newsList: newsList, errorMsg: null, successMsg: null});
        });   
    } catch (error) {
        console.log(error);
    }
};

exports.deleteNewsById = (req, res, next) => {
    try {
        News.deleteOne({_id: req.body.newsId}, (err, result)=>{
            if (err) console.log(err);
            console.log(result);
            if (result.deletedCount === 1) {
                res.status(200);
            }
        });
    } catch (error) {
        console.log(error);
    }
};