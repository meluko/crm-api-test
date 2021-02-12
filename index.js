'use strict';

const https = require('https');
const fs = require('fs');
const {resolve} = require('path');

const {server, ...config} = require('config');
const app = require('./src')(config);

const key =  fs.readFileSync(resolve(__dirname, 'keys/key.pem'));
const cert = fs.readFileSync(resolve(__dirname, 'keys/cert.pem'));

https.createServer({key: key, cert: cert }, app).listen(server.port, () => {
  console.info(`Server listening at https://localhost:${server.port}`);
});
