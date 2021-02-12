'use strict';

const express = require('express');

module.exports = function (appMiddlewares, routes) {
  const app = express();
  app.set('trust proxy', true);
  Object
    .values(appMiddlewares)
    .forEach(middleware => app.use(middleware));
  routes(app);

  return app;
};
