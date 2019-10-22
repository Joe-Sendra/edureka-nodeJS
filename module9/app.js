const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const Task = require('./db/models/task.js').Task;

app.use(bodyParser.json());

app.get('/tasks', (req, res) => {
    Task.find()
    .then((tasks) => res.status(200).send(tasks))
    .catch((err) => res.status(400).send(err));
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