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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});