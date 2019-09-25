const express = require('express');
const request = require('request');

// create object and add port
const app = express();
const port = 3000;

const apiUrl = 'http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees';

app.set('views', './views');
app.set('view engine', 'ejs');


app.get('/', (req,res) => {
       
    new Promise((resolve, reject) => {
        request(apiUrl,{json: true},(err, res, body) => {
            resolve(body);
        })
    })
    .then(employeeData => {
        let employeeList = new Array;
        employeeData.forEach(employee => {
            let emp = {
                Name: employee.name,
                Id: employee.id,
                CreatedAt: employee.createdAt
            }
            employeeList.push(emp);
        })
        // res.send(employeeList);
        res.render('index',{employees: employeeList});
    });
    
    
});

// Create server to listen on port
app.listen(port,(err) => {
    console.log('server is running on port '+port);
});