const jwt = require('jsonwebtoken');

// Used to get Secret Token
const config = require('../config');

module.exports = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, config.secret);
      req.userData = { id: decodedToken.id, type: decodedToken.type };
      next();
    } else {
      throw new Error('HTTP request authorization header is not in the correct format');
    }
  } catch (error) {
    if (error.name = 'TokenExpiredError') {
      res.render('index',{errorMsg: 'Your session has ended, please log in to continue', successMsg: null});
    } else {
      console.log(error);
    }
    res.status(401).json({ message: 'You are not authenticated!'});
  }

};