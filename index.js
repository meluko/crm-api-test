'use strict';

const {server, ...config} = require('config');
const app = require('./src')(config);

app.listen(server.port, () => {
  console.info(`Server listening at port ${server.port}`);
});
