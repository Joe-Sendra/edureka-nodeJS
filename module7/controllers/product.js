const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.find({}, (err, products)=>{
        if (err) return res.status(500).send("Can not fetch products");
        //res.status(200).render('product', {products: products});
        res.status(200).send({products});
    });
};

exports.addProduct = (req, res, next) => {
    console.log(req.body);
    Product.create({
        product: req.body.product,
        data: {
            size: req.body.size,
            color: req.body.color,
            description: req.body.description
        },
        price: req.body.price
    }, (err, product)=>{
        if (err) return res.status(500).send("Error: Can not add product");
        res.status(201).render('partials/addProduct.ejs',{errorMsg: null, successMsg: 'Product successfully added'});
    });
};

exports.getAddProduct = (req, res, next) => {
    res.render('partials/addProduct',{errorMsg: null, successMsg: null});
};

exports.showProducts = (req, res, next) => {
    Product.find({}, (err, products)=>{
        if (err) return res.status(500).send("Can not fetch products");
        res.status(200).render('partials/product', {products: products, errorMsg: null, successMsg: null});
    });
};
