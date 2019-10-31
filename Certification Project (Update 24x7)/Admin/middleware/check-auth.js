const jwt = require('jsonwebtoken');

// Used to get Secret Token
const config = require('../config');

module.exports = (req, res, next) => {
  if (req.headers.authorization || req.query.token) {
    try {
      // const token = req.headers.authorization.split(' ')[1];
      const token = (req.query.token) ? req.query.token : req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, config.secret);
      req.userData = { id: decodedToken.id, email: decodedToken.email, token: token };
      next();
    } catch (error) {
      // TODO redirect to login page with message
      // TODO areas consuming the api will need to handle 401 error since login html will be rendered
      res.status(401).render('index', {errorMsg: 'You are not authenticated!', successMsg: null, isLoggedIn: false});
      // res.status(401).json({ message: 'You are not authenticated!'});
    } 
  } else {
    res.status(500).json({ message: 'Server error, you are not authenticated!'});
  }

};