const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/module9data';

function connect() {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
        .then((res, err) => {
            if (err) return reject(err);
            resolve();
        })
    });
}

function close() {
    return mongoose.disconnect();
}

module.exports = {connect, close};