const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res, next)=>{
    res.status(200).render('index');
});

app.listen(3000, 'localhost', ()=>{
    console.log('Listening on port 3000...');
});