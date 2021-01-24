'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const api = express.Router();

require('dotenv').config();

const employeesControl = require('../controllers/employees_control.js');
const statusControl = require('../controllers/status_control.js');
const timeControl = require('../controllers/time_control.js');
const usersControl = require('../controllers/users_control.js');

// Employees
api.get(
  '/worktime/employee/:id',
  middlewareRouter,
  employeesControl.getEmployee
);
api.get('/worktime/employees', middlewareRouter, employeesControl.getEmployees);
api.get('/worktime/employees', middlewareRouter, employeesControl.getEmployees);
api.post('/worktime/employee', middlewareRouter, employeesControl.postEmployee);
api.put(
  '/worktime/employee/:id',
  middlewareRouter,
  employeesControl.putEmployee
);
api.delete(
  '/worktime/employee/:id',
  middlewareRouter,
  employeesControl.deleteEmployee
);

// Time
api.post('/worktime/time', middlewareRouter, timeControl.postTimeMany);
api.put('/worktime/time/:id', middlewareRouter, timeControl.putTime);
api.delete('/worktime/time/:id', middlewareRouter, timeControl.deleteTime);
api.get(
  '/worktime/timeday/:id/:date',
  middlewareRouter,
  timeControl.getTimeDay
);
api.get(
  '/worktime/times/:id/:date_1/:date_2',
  middlewareRouter,
  timeControl.getTimes
);

// Status Server
api.get('/worktime/status', statusControl.getActiveServer);

//  Users check, token and cookie
api.post('/login', usersControl.postUsersToken);

api.get('/', function (request, response) {
  response.send('NODE AT WORK!!!');
});

// Check the TOKEN of user
function middlewareRouter(req, res, next) {
  // let tokenHeader = req.headers['authorization'].split(' ');
  // let token = tokenHeader[1];

  let token = req.cookies['csrftoken'];

  jwt.verify(token, process.env.KEY, function (err) {
    if (err) {
      res.status(401).send({
        message: 'Forbidden',
      });
    } else {
      next();
    }
  });
}

module.exports = api;
