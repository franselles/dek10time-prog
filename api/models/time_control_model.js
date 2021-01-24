'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeControlSchema = Schema(
  {
    employee_id: String,
    date: String,
    name: { type: String, uppercase: true },
    dni: { type: String, uppercase: true },
    work_shift: Number,
    start_time: String,
    end_time: String,
    hours: Number,
    max: Number
  },
  { collection: 'time_control' }
);

module.exports = mongoose.model('TimeControl', timeControlSchema);
