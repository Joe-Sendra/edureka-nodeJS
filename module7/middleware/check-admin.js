module.exports = (req, res, next) => {
    try {
        if (req.userData.type === 'Admin') {
            next();
        } else {
            res.status(401).json({ message: 'You are not authorized!'}); 
        }
    } catch (error) {
      res.status(401).json({ error: error});
    }
};