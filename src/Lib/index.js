'use strict';

const _ = require('lodash');
const axios = require('axios').default;
const bodyParser = require('body-parser');
const express = require('express');
const expressBunyanLogger = require('express-bunyan-logger');
const expressJoi = require('express-joi-validation');
const fs = require('fs');
const httpContext = require('express-http-context');
const https = require('https');
const multer = require('multer');
const path = require('path');
const queryString = require('query-string');
const uuid = require('uuid');

const GithubClient = require('./GithubClient');

module.exports = function (dependencies) {
  const lib = {
    _,
    axios,
    bodyParser,
    express,
    expressBunyanLogger,
    expressJoi,
    fs,
    https,
    httpContext,
    multer,
    path,
    queryString,
    uuid
  };
  return {
    ...lib,
    githubClient: GithubClient({...dependencies, lib})
  };
};
