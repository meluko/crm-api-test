'use strict';

const config = require('config');
const Lib = require('../../src/Lib');
const lib = Lib({config});
const {
  buildAppDependencies,
  buildApp
} = require('../../src');

lib.expressBunyanLogger = () => (req, res, next) => next();
const appDependencies = buildAppDependencies({config, lib});
const app = buildApp(appDependencies);

module.exports = {app, appDependencies};
