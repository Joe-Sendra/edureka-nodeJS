// User model for mongoose schema
const News = require('../models/news');


exports.getAllNews = (req, res, next) => {
    News.find({}, (err, newsData)=>{
        if (err) return res.status(500).send("Can not fetch news");
        res.status(200).send({newsData});
    });
}

exports.addNews = (req, res, next) => {  
    console.log(req.body);
    News.create({
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        imageUrl: req.body.urlToImage,
        publishDate: req.body.publishedAt
    },(err, newsItem)=>{
        if (err) return res.status(500).send({errorMsg: err, successMsg: null});
        let testDate = new Date(newsItem.publishDate);
        res.status(201).send({ message: "News item created successfully", data: newsItem});
    });
}

exports.deleteNewsById = (req, res, next) => {
    try {
        News.deleteOne({_id: req.params.newsId}, (err, result)=>{
            if (err) return res.status(500).send("Server Error, Can not delete news");
            console.log(result);
            if (result.deletedCount === 1) {
                res.status(200).send("Successfully deleted news");
            } else {
                res.status(500).send("Can not delete requested news _id");
            }

        });
    } catch (error) {
        console.log(error);
    }
};

exports.getNewsById = (req, res, next) => {
    try {
        News.findById(req.params.newsId, (err, result) => {
            if (err) return res.status(500).send("Can not fetch news");
            console.log(result);
            res.status(200).send(result);
        });
    } catch (error) {
        console.log(error);
    }
};