'use strict';

const queryString = require('querystring');
const sinon = require('sinon');
const {expect} = require('../../util/chai');

const GithubClient = require('../../../src/Lib/GithubClient');

const clientId = 'MYCLIENTID';
const clientSecret = 'MYCLIENTSECRET';
const config = {
  github: {
    clientId,
    clientSecret
  }
};

describe('GithubClient', function () {

  describe('fetchUserData', function () {

    it('Should call axios request with expected params', function () {
      const axios = {
        request: sinon.stub()
      };
      const githubClient = GithubClient({lib: {axios, queryString}, config});

      githubClient.fetchUserData('MYACCESSTOKEN');

      expect(axios.request.callCount).to.be.equal(1);
      expect(axios.request.getCall(0).args[0]).to.be.deep.equal({
        method: 'GET',
        url: 'https://api.github.com/user',
        headers: {
          Authorization: 'token MYACCESSTOKEN'
        }
      });
    });

  });

  describe('fetchAccessToken', function () {

    it('Should call axios request with expected params', function () {
      const code = 'code';
      const state = 'state';
      const axios = {
        request: sinon.stub()
      };
      const githubClient = GithubClient({lib: {axios, queryString}, config});

      githubClient.fetchAccessToken(code, state);

      const url = 'https://github.com/login/oauth/access_token';
      const expectedParams = {
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: '/',
        code,
        state
      };
      expect(axios.request.callCount).to.be.equal(1);
      expect(axios.request.getCall(0).args[0]).to.be.deep.equal({
        method: 'POST',
        url: `${url}?${queryString.stringify(expectedParams)}`
      });
    });

    it('Should return access token', async function () {
      const axios = {
        request: sinon.stub().returns({
          data: 'access_token=ACCESSTOKEN'
        })
      };
      const githubClient = GithubClient({lib: {axios, queryString}, config});

      const accessToken = await githubClient.fetchAccessToken('code', 'state');

      expect(accessToken).to.be.equal('ACCESSTOKEN');
    });

  });

});

