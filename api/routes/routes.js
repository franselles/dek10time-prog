'use strict';

const express = require('express');
const api = express.Router();

const employeesControl = require('../controllers/employees_control.js');
const statusControl = require('../controllers/status_control.js');
const timeControl = require('../controllers/time_control.js');

// Employees
api.get('/worktime/employee/:id', employeesControl.getEmployee);
api.get('/worktime/employees', employeesControl.getEmployees);
api.post('/worktime/employee', employeesControl.postEmployee);
api.put('/worktime/employee/:id', employeesControl.putEmployee);
api.delete('/worktime/employee/:id', employeesControl.deleteEmployee);

// Status Server
api.get('/worktime/status', statusControl.getActiveServer);

// Time
api.post('/worktime/time', timeControl.postTimeMany);
api.put('/worktime/time/:id', timeControl.putTime);
api.delete('/worktime/time/:id', timeControl.deleteTime);
api.get('/worktime/timeday/:id/:date', timeControl.getTimeDay);
api.get('/worktime/times/:id/:date_1/:date_2', timeControl.getTimes);

api.get('/', function(request, response) {
  response.send('NODE AT WORK!!!');
});

module.exports = api;
