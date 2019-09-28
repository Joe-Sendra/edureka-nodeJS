const express = require('express');
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://127.0.0.1:27017/module5data');
const user = require('./models/usermodel');
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
    res.render('index.ejs');
})

app.get('/add', (req, res) => {
    res.render('admin');
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});