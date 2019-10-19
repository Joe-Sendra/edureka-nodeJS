const Cart = require('../models/cart');

exports.addItemCart = (req, res, next) => {
    console.log(req.body);
    if (req.userData.type === 'Admin' || req.userData.id === req.body.cartOwner) {
        // Check to see if cart exists
        Cart.findOne({ owner: req.body.cartOwner }, (err, cart) => {
            // If cart exists then append
            if (cart) {        
                Cart.update({ owner: req.body.cartOwner },{$addToSet: {cart: req.body.productAdded}}, (err, DBresponse)=>{                
                    if (err) return res.status(500).send("Error: Can not update cart");
                    res.status(200).send("Cart updated successfully");
                });
                
            } else {
                // If cart does not exist then create
                Cart.create({
                    owner: req.body.cartOwner,
                    cart: req.body.productAdded
                }, (err, cart)=>{
                    if (err) return res.status(500).send("Error: Can not create cart");
                    res.status(201).send("Cart successfully created");
                });
            }
        });
    } else {
        res.status(401).json({ message: 'You are not authorized!'});
    }    
};

exports.getCart = (req, res, next) => {
    if (req.userData.type === 'Admin' || req.userData.id === req.params.cartID) {
        Cart.findOne({owner: req.params.ownerID}, (err, cart)=>{
            if (err) return res.status(500).send("Error: Can not fetch cart");
        })
        .populate('cart')
        .exec()
        .then(cart => {        
            res.status(200).send({cart});
        });
    } else {
        console.log("userData: ", req.userData);
        console.log("params: ", req.params);
        res.status(401).json({ message: 'You are not authorized!'});
    }         
};

// TODO clean up code to work for both normal and admin users (from dashboard load or button click)
exports.showCart = (req, res, next) => {
    try {
        if (req.userData.type === 'Admin' || req.userData.id === req.body.ownerID) {
            Cart.findOne({owner: req.body.ownerID}, (err, cart)=>{
                if (err) return res.status(500).render('partials/cart', {cart: null, errorMsg: 'Can not fetch cart!', successMsg: null});
            })
            .populate('cart')
            .exec()
            .then(cart => {
                if (cart) {
                    res.status(200).render('partials/cart', {cart: cart.cart, errorMsg: null, successMsg: null});
                } else {
                    res.status(200).render('partials/cart', {cart: null, errorMsg: null, successMsg: null});
                }
            });    
        } else {
            res.status(401).render('partials/cart', {cart: null, errorMsg: 'You are not authorized!', successMsg: null})
        }
    } catch (error) {
        console.log(error);
    }

};