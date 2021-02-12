'use strict';

const openid = require('express-openid-connect');
const jwt_decode = require('jwt-decode');

const {
  claimCheck,
} = require('express-openid-connect');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const App = require('./App');
const Routes = require('./Routes');
const schemas = require('./schemas');
const Middlewares = require('./Middlewares');
const AppMiddlewares = require('./Middlewares/AppMiddlewares');
const Controllers = require('./Controllers');
const DB = require('./DB');
const models = require('./DB/models');
const Services = require('./Services');

module.exports = function (config) {
  const db = DB(config.database, models);
  const services = Services({db, config});
  const controllers = Controllers({services});
  const middlewares = Middlewares({jwt, jwks});
  const routes = Routes({middlewares, controllers, schemas});

  const appMiddlewares = AppMiddlewares(config)({bodyParser, openid});
  const app = App(appMiddlewares, routes);

  return app;
};
