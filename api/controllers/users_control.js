'use strict';

const jwt = require('jsonwebtoken');
const Users = require('../models/users_model');
require('dotenv').config();

const secure = require('./secure');

function postUsersToken(req, res, next) {
  // const user = req.body.user;
  const password = req.body.password;

  Users.find({ password }).exec((err, doc) => {
    if (err)
      return res.status(500).send({
        message: `Error al realizar la petición: ${err}`,
      });
    if (!doc)
      return res.status(404).send({
        message: 'No existe',
      });

    if (doc.length > 0) {
      const tokenData = {
        user: doc[0].toObject().user,
        password: doc[0].toObject().password,
        date: Date.now(),
        // ANY DATA
      };

      // Create TOKEN
      const token = jwt.sign(tokenData, process.env.KEY, {
        expiresIn: 60 * 60, // expires in 60 minutes
      });

      // Send the COOKIE with the token called 'mitok'
      res
        .cookie('csrftoken', token, {
          maxAge: 3600000,
          httpOnly: true,
          secure: secure,
        })
        .send({ message: doc });
      next();
    } else {
      res.status(404).send({ error: 'Not found' });
      next();
    }
  });
}

module.exports = { postUsersToken };
