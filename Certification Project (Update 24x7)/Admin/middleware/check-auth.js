const jwt = require('jsonwebtoken');

// Used to get Secret Token
const config = require('../config');

module.exports = (req, res, next) => {
  if (req.headers.authorization || req.query.token) {
    try {
      const token = (req.query.token) ? req.query.token : req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, config.secret);
      req.userData = { id: decodedToken.id, email: decodedToken.email, token: token };
      next();
    } catch (error) {
      res.status(401).render('index', {errorMsg: 'You are not authenticated!', successMsg: null, isLoggedIn: false});
    } 
  } else {
    res.status(500).json({ message: 'Server error, you are not authenticated!'});
  }

};