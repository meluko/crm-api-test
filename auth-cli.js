#!/usr/bin/env node
'use stict';

const axios = require('axios').default;
const config = require('config');

const {
  clientID,
  clientSecret,
  issuerBaseURL
} = config.auth;

const options = {
  method: 'POST',
  url: `${issuerBaseURL}/oauth/token`,
  headers: {'content-type': 'application/json'},
  data: {
    "client_id": clientID,
    "client_secret": clientSecret,
    "grant_type": "client_credentials",
    state: "ACTIVE",
    ...config.cli
  }
};

axios.request(options).then(function (response) {
  console.info(`You authenticated successfully!
Add the following header to your API calls:

Authorization: Bearer ${response.data.access_token}
`);
}).catch(function (error) {
  console.error(error);
});
