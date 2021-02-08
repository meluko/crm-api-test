'use strict';
const express = require('express');


const app = express();

const tokenAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.match(/Bearer (.+)/);

  if (!token) {
    res.status(401);
    return next('Unauthorized');
  }

  next()
};

app.get('/api/v1/customer/:customerId', tokenAuth, function (req, res) {
  res.status(200).json({name: 'john'});
});


module.exports = app;
