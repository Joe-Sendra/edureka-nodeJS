exports.dashboard = (req, res, next) => {
    res.status(200).render('dashboard',{errorMsg: null, successMsg: null, isLoggedIn: true});
}

exports.getNewsForm = (req, res, next) => {
    res.status(200).render('newsForm');
}

exports.getNewsList = (req, res, next) => {
    res.redirect('/admin/news/list');
}