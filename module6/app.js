const express = require('express');
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://127.0.0.1:27017/module6data');
const bug = require('./models/bugModel');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;


app.use(express.static(__dirname+'/public'));
console.log(__dirname+'/public');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    bug.find().then(bugs => {
        res.render('index.ejs', {bugs: bugs, errorMsg:'', successMsg:''});
    }); 
});

app.get('/add', (req, res) => {
    res.render('bugAdd', {errorMsg:'',successMsg:''});
});

app.post('/addBug', (req, res) => {
    bug.create(req.body, (err, data) => {
        if(err)
            res.status(500).send({errorMsg: 'Something went wrong ' + err, successMsg: null});
        else
            res.status(200).send({errorMsg: null, successMsg: 'Bug successfully added'});
    });
});

app.get('/bugs', (req, res) => {
    bug.find((err, data) => {
        if(err)
            res.status(500).send(err);
        else
            res.status(200).send(data);        
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});