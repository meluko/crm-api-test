'use strict';

const {server, ...config} = require('config');
const lib = require('./src/Lib')({config});
const {
  buildAppDependencies,
  buildApp
} = require('./src');

const {
  port
} = server;

buildApp(buildAppDependencies(({config, lib}))).listen(port, () => {
  console.info(`Server listening at http://localhost:${port}`);
});
