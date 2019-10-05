const express = require('express');
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://127.0.0.1:27017/module5data');
const order = require('./models/ordermodel');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(express.static(__dirname+'/public'));
console.log(__dirname+'/public');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    order.find().then(orders => {
        res.render('index.ejs', {orders: orders, errorMsg:'', successMsg:''});
    }); 
});

app.get('/add', (req, res) => {
    res.render('admin', {errorMsg:'',successMsg:''});
});

app.post('/addData', (req, res) => {
    order.create(req.body, (err, data) => {
        if(err)
            res.status(500).send({errorMsg: 'Something went wrong ' + err, successMsg: null});
        else
            res.status(200).send({errorMsg: null, successMsg: 'Order successfully added'});
    });
});

app.get('/orders', (req, res) => {
    order.find((err, data) => {
        if(err)
            res.status(500).send(err);
        else
            res.status(200).send(data);        
    });
});

app.get('/orders/:id', (req, res) => {
    order.findById(req.params.id).then(order => {
        if (order) {
            res.status(200).json(
              {
                _id: order._id,
                email: order.email,
                address: order.address,
                itemSize: order.itemSize,
                itemQty: order.itemQty,
                date: order.date
              }
            );
        } else {
        res.status(404).json({message: 'Order not found!'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Fetching order failed!',
            error: err
        });
    });
});

app.post('/sendOrderEmail', (req, res) => {
    const msg = {
        to: req.body.order.email,
        from: 'module5@example.com',
        subject: 'Order: ' + req.body.order._id,
        //text: `Order#: `
        html: `
            <li><strong>Order#: </strong>${req.body.order._id}</li>
            <li><strong>Address: </strong>${req.body.order.address}</li>
            <li><strong>Item Size: </strong>${req.body.order.itemSize}</li>
            <li><strong>Item Quantity: </strong>${req.body.order.itemQty}</li>
            <li><strong>Shipping Status: </strong>${req.body.order.status}</li>
        `
    };
    try {
        sgMail.send(msg);
        res.send({ errorMsg: null, successMsg: 'Order successfully emailed' })
    } catch (err) {
        res.status(500).render('index', {orders: null, errorMsg: 'Something went wrong ' + err,successMsg:''});
    }
        
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});