const express = require('express');
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://127.0.0.1:27017/module5data');
const order = require('./models/ordermodel');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(express.static(__dirname+'/public'));
console.log(__dirname+'/public');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    order.find().then(orders => {
        res.render('index.ejs', {orders: orders});
    }); 
});

app.get('/add', (req, res) => {
    res.render('admin', {errorMsg:'',successMsg:''});
});

app.post('/addData', (req, res) => {
    order.create(req.body, (err, data) => {
        if(err)
            res.status(500).render('admin', {errorMsg: 'Something went wrong ' + err,successMsg:''});
        else
            res.status(200).render('admin',{errorMsg:'',successMsg: 'Order successfully added'});
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
    res.status(200).send(req.body);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});