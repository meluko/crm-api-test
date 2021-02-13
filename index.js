'use strict';

const {server, ...config} = require('config');
const lib = require('./src/Lib')({config});
const app = require('./src')({config, lib});

const key =  lib.fs.readFileSync(lib.path.resolve(__dirname, 'keys/key.pem'));
const cert = lib.fs.readFileSync(lib.path.resolve(__dirname, 'keys/cert.pem'));

lib.https.createServer({key: key, cert: cert }, app).listen(server.port, () => {
  console.info(`Server listening at https://localhost:${server.port}`);
  console.info(app._router.stack
    .map(it => it.route)
    .filter(it => it)
    .map(it => it.path)
  );
});
