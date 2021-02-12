'use strict';

const _ = require('lodash');
const axios = require('axios').default;
const bodyParser = require('body-parser');
const express = require('express');
const expressJoi = require('express-joi-validation');
const fs = require('fs');
const https = require('https');
const multer = require('multer');
const path = require('path');
const queryString = require('query-string');
const {uuid} = require('uuidv4');

module.exports = {
  _,
  axios,
  bodyParser,
  express,
  expressJoi,
  fs,
  https,
  multer,
  path,
  queryString,
  uuid,
};
