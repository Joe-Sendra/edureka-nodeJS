// User model for mongoose schema
const User = require('../models/user');

// Use bcrypt to hash password before saving to database
const bcrypt = require('bcryptjs');

exports.getAllUsers = (req, res, next) => {
    User.find({}, (err, users)=>{
        if (err) return res.status(500).send("Can not fetch users");
        res.status(200).send({users});
    });
}

exports.addUser = (req, res, next) => {
    // Hash the password before adding to the database
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);    
    User.create({
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name
    },(err, user)=>{
        if (err) return res.status(500).send("Error: Can not register user.")
        res.status(201).json({
            message : "User successfully registered",
            id: user._id
        });
    })
}