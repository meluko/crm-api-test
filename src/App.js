'use strict';

const express = require('express');
const bodyParser = require('body-parser');

module.exports = function(routes) {
  const app = express();
  app.use(bodyParser.json());
  routes(app);

  return app;
};
