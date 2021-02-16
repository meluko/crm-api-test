'use strict';

const {server, ...config} = require('config');
const lib = require('./src/Lib')({config});
const app = require('./src')({config, lib});

const {
  port
} = server;

app.listen(port, () => {
  console.info(`Server listening at https://localhost:${port}`);
});
