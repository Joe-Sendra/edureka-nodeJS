const express = require('express');
const fetch = require('node-fetch');

// TODO see if bodyParser is actually used
const bodyParser = require('body-parser');

const app = express();

const API_URL = 'https://api.github.com/users';

// Required for paths on frontend
app.use(express.static(__dirname+'/public'));

app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    res.status(200).render('index');
});

app.get('/api/v1/:gitUsername', (req, res, next) => {
    const gitUsername = req.params.gitUsername;
    fetch(`${API_URL}/${gitUsername}`)
    .then(response => response.json())
    .then(gitUserData => {
        res.status(200).json(gitUserData)
      console.log(gitUserData)
    })
    .catch(err => console.log(err));

});

app.listen(3000, 'localhost', ()=>{
    console.log('Listening on port 3000...');
});