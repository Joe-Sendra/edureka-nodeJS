const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const Task = require('./db/models/task.js').Task;

app.use(bodyParser.json());


app.delete('/tasks/:id', (req, res) => {
    Task.deleteOne({"_id": req.params.id})
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err));
});

app.delete('/tasks', (req, res) => {
    if (req.query.id) {
        Task.deleteOne({"_id": req.query.id})
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(400).send(err));
    } else {
        Task.deleteMany({})
        .then((result) => res.status(200))
        .catch((err) => res.status(400).send(err));
    }
});

app.get('/tasks', (req, res) => {
    if (req.query.id) {
        Task.find({_id : req.query.id})
        .then((tasks) => res.status(200).send(tasks))
        .catch((err) => res.status(400).send(err));
    } else {
        Task.find()
        .then((tasks) => res.status(200).send(tasks))
        .catch((err) => res.status(400).send(err));
    }
});

app.get('/tasks/:id', (req, res) => {
    Task.find({"_id": req.params.id})
    .then((task) => res.status(200).send(task))
    .catch((err) => res.status(400).send(err));
});

app.patch('/tasks/:id', (req, res) => {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        try {
            Task.updateOne({ _id: req.params.id}, {$set: req.body}).then(result => {
                if (result.n > 0) {
                  res.status(200).send(result);
                } else {
                  res.status(401).send(result);
                }
            });    
        } catch (err) {
            //console.error(err);
            res.status(500).send(err);
        } 
    } else {
        res.status(401).send({message: 'Not a valid task id'});
    }   
});

app.post('/tasks', (req, res) => {
    const body = req.body;
    const task = new Task({
        name: body.name,
        text: body.text
    });
    task.save(task)
        .then((task) => res.status(201).send(task))
        .catch((err) => res.status(400).send(err));
});

module.exports = app;