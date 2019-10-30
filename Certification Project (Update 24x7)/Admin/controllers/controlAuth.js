// User model for mongoose schema
const User = require('../models/user');

// Use token for authentication/authorization
const jwt = require('jsonwebtoken');

// Use bcrypt to verify hashed password in database
const bcrypt = require('bcryptjs');

// Used to get Secret Token
const config = require('../config');

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send({errorMsg: 'Server error fetching user'});
        if(!user) {
            return res.status(401).send({errorMsg: 'Invalid authentication credentials!'});
        } else {
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({errorMsg: 'Invalid authentication credentials!'});
            } else {
                var token = jwt.sign({ id: user._id, email: req.body.email, name: req.body.name}, config.secret, {expiresIn: 900 });
                res.status(200).json({id: user._id, email: user.email, name: user.name, token: token});
            }
        }
    })
}