'use strict';

const {expect} = require('../util/chai');
const request = require('supertest');
const {app} = require('../util/BuildApp');

describe('Auth endpoints', function () {

  describe('GET ​/auth/login', function () {

    it('Should return redirect to github premises', function (done) {
      request(app)
        .get('/auth/login')
        .expect(302, (err, res) => {
          expect(res.headers.location).to.match(/^https:\/\/github.com\/login\/oauth\/authorize.+$/);
          done();
        });
    });

  });

});







