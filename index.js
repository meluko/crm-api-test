'use strict';

const {server, ...config} = require('config');
const lib = require('./src/Lib')({config});
const app = require('./src')({config, lib});

const {
  port,
  keyPath,
  certPath
} = server;

const key =  lib.fs.readFileSync(lib.path.resolve(__dirname, keyPath));
const cert = lib.fs.readFileSync(lib.path.resolve(__dirname, certPath));

lib.https.createServer({key: key, cert: cert }, app).listen(port, () => {
  console.info(`Server listening at https://localhost:${port}`);
});
