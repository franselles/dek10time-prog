'use strict';

const TimeControl = require('../models/time_control_model');

function postTimeMany(req, res) {
  TimeControl.insertMany(req.body, function (err, docStored) {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err}`,
      });

    res.status(200).send(docStored._id);
  });
}

function postTime(req, res) {
  const data = new TimeControl();

  data.employee_id = req.body.employee_id;
  data.date = req.body.date;
  data.name = req.body.name;
  data.dni = req.body.dni;
  data.work_shift = req.body.work_shift;
  data.start_time = req.body.start_time;
  data.end_time = req.body.end_time;
  data.hours = req.body.hours;
  data.max = req.body.max;

  data.save((err, docStored) => {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err} `,
      });

    res.status(200).send(docStored._id);
  });
}

function putTime(req, res) {
  const id = req.params.id;
  const update = req.body;

  TimeControl.findByIdAndUpdate(id, update).exec((err, docStored) => {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err}`,
      });

    res.status(200).send(docStored);
  });
}

function getTimeDay(req, res) {
  let id = req.params.id;
  let date = req.params.date;

  TimeControl.findOne({ employee_id: id, date: date }).exec((err, doc) => {
    if (err)
      return res.status(500).send({
        message: `Error al realizar la petición: ${err}`,
      });
    if (!doc)
      return res.status(404).send({
        message: 'No existe',
      });

    res.status(200).send(doc);
  });
}

function deleteTime(req, res) {
  const id = req.params.id;

  TimeControl.findByIdAndRemove(id).exec((err, docStored) => {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err} `,
      });

    res.status(200).send(docStored);
  });
}

function getTimes(req, res) {
  let id = req.params.id;
  let date_1 = req.params.date_1;
  let date_2 = req.params.date_2;

  let filter;

  if (id === 'all') {
    filter = {
      date: {
        $gte: date_1,
        $lte: date_2,
      },
    };
  } else {
    filter = {
      employee_id: id,
      date: {
        $gte: date_1,
        $lte: date_2,
      },
    };
  }

  TimeControl.find(filter)
    .sort({ name: 1, start_time: 1 })
    .exec((err, doc) => {
      if (err)
        return res.status(500).send({
          message: `Error al realizar la petición: ${err}`,
        });
      if (!doc)
        return res.status(404).send({
          message: 'No existe',
        });

      res.status(200).send(doc);
    });
}

module.exports = {
  postTimeMany,
  getTimeDay,
  getTimes,
  postTime,
  putTime,
  deleteTime,
};
