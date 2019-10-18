const User = require('../models/user');

exports.getUser = (req, res, next) => {
    if (req.userData.type === 'Admin' || req.userData.id === req.params.user) {
        User.findOne({_id: req.params.user}, (err, user)=>{
            if(err) return res.status(500).send("Error: Can not fetch user");
            res.status(200).send(user);
        });
    } else {
        res.status(401).json({ message: 'You are not authorized!'});
    }
};

exports.getUsers = (req, res, next) => {
    User.find({}, { password: 0, type: 0, __v: 0 }, (err, users)=>{
        if (err) return res.status(500).send("Can not fetch users");
        res.status(200).send({users});
    });
};

exports.addUser = (req, res, next) => {
    res.render('partials/addUser',{errorMsg: null, successMsg: null});
}

exports.registerUser = (req, res, next) => {
    res.render('register',{errorMsg: null, successMsg: null});
}

exports.showUsers = (req, res, next) => {
    User.find({}, { password: 0, type: 0, __v: 0 }, (err, users)=>{
        if (err) return res.status(500).send("Can not fetch users");
        res.status(200).render('partials/user', {users: users, errorMsg: null, successMsg: null});
    });
};