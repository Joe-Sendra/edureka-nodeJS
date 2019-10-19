const TOKEN_EXPIRATION_IN = 60 * 15; // Number of seconds that new JWT is valid before expiring

const bcrypt = require('bcryptjs');

const User = require('../models/user');

const jwt = require('jsonwebtoken');

// Used to get Secret Token
const config = require('../config');

exports.login = (req, res, next) => {
    res.render('index.ejs',{errorMsg: null, successMsg: null});
}

// Login User
exports.authUser = (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send('Error: Can not login');
        if (!user) {
            res.status(401).send('Invalid authentication credentials!');
        } else {
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null});
            var token = jwt.sign({ id: user._id, type: user.type}, config.secret, {expiresIn: TOKEN_EXPIRATION_IN });
            res.json({id: user._id, token: token});
        }
    });
};

// Register User
exports.register =(req, res, next) => {
    // Hash the password before adding to the database
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    let type;
    if (!req.body.type) {
        type = "Normal";
    } else {
        type = req.body.type;
    }
    User.create({
        email: req.body.email,
        password: hashedPassword,
        type: type
    },(err, user)=>{
        if (err) return res.status(500).send("Error: Can not register user.")
        if (req.body.isAdminAddUser){
            res.render('partials/addUser',{errorMsg: null, successMsg: 'User successfully added'});
        }
        res.render('index',{errorMsg: null, successMsg: 'User successfully registered, please log in'});
    })
}