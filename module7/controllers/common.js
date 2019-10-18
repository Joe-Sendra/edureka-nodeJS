const fetch = require('node-fetch');

exports.getDashboard = (req, res, next) => {
    res.render('dashboard');
}

exports.getMenu = (req, res, next) => {
    const type = req.userData.type;
    if (type === 'Admin') {
        res.render('partials/menuAdmin');
    } else {
        res.render('partials/menuNormal');
    }
}

exports.getUserCart = (req, res, next) => {
    console.log(req.userData, req.params.userID);
    if (req.userData.type === 'Admin' || req.userData.id === req.params.userID) {
        let userID = req.params.userID;
        let fetchProductInfo = fetch("http://localhost:3000/api/products");
        let fetchUserInfo = fetch("http://localhost:3000/users/"+ userID)
        let fetchUserCart = fetch("http://localhost:3000/api/cart/getCart/" + userID);

        Promise.all([fetchProductInfo,fetchUserInfo, fetchUserCart])
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(data => {
                const [products, user, cart] = data;
                res.status(200).render('authUser', {userID: userID, email: user.email, products: products.products, cart: cart.cart, errorMsg: null, successMsg: null});
            });
    } else {
        res.status(401).json({ message: 'You are not authorized!'});
    }             
}
