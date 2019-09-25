const fs = require('fs');
// require express
const express = require('express');
// create object and add port
const app = express();
const port = 3000;

const fetch = require('node-fetch');
// const util = require('util');

app.get('/employee/', (req,res) => {
    fs.readFile('employees.json',(err, employees) => {
        if(err){
            throw err;
        }else {
            employeesJson = JSON.parse(employees);
            res.send(employeesJson);
        }
    })
});

app.get('/employee/:id', (req,res) => {
    const employeeId = req.params.id;
    fs.readFile('employees.json',(err, employees) => {
        if(err){
            throw err;
        }else {
            employeeJson = JSON.parse(employees);
            for(var myKey in employeeJson) {
               if (employeeJson[myKey]._id === employeeId) {
                   res.send(employeeJson[myKey]);
               }
            }            
        }
    })
});

app.get('/project/', (req,res) => {
    fs.readFile('projects.json',(err, projects) => {
        if(err){
            throw err;
        }else {
            projectsJson = JSON.parse(projects);
            res.send(projectsJson);
        }
    })
});

app.get('/project/:id', (req,res) => {
    const projectId = req.params.id;
    fs.readFile('projects.json',(err, projects) => {
        if(err){
            throw err;
        }else {
            projectJson = JSON.parse(projects);
            for(var myKey in projectJson) {
               if (projectJson[myKey]._id === projectId) {
                   res.send(projectJson[myKey]);
               }
            }            
        }
    })
});

app.get('/getemployeedetails', (req,res) => {
    
    Promise.all([
        fetch('http://localhost:3000/employee'),
        fetch('http://localhost:3000/project')
    ])
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(data => res.send(data));
    });

// Create server to listen on port
app.listen(port,(err) => {
    console.log('server is running on port '+port);
});