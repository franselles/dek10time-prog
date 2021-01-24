'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = Schema(
  {
    state: String,
  },
  { collection: 'users' }
);

module.exports = mongoose.model('Users', usersSchema);
