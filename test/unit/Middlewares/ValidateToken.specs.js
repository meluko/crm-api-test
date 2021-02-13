'use strict';

const sinon = require('sinon');
const {expect} = require('../../util/chai');

const services = {authService: {}};
const ValidateToken = require('../../../src/Middlewares/ValidateToken');
const validateToken = ValidateToken({services});

describe('ValidateToken', function () {

  it('Should return 401 if there is no Authorization header', function () {
    const req = {
      headers: {}
    };
    const res = {
      sendStatus: sinon.stub()
    };
    validateToken(req, res, {});

    expect(res.sendStatus.callCount).to.be.equal(1);
    expect(res.sendStatus.getCall(0).args[0]).to.be.equal(401);
  });

  it('Should return 401 if Authorization header has wrong format', async function () {
    const req = {
      headers: {
        authorization: 'NOBEARER'
      }
    };
    const res = {
      sendStatus: sinon.stub()
    };
    await validateToken(req, res, {});

    expect(res.sendStatus.callCount).to.be.equal(1);
    expect(res.sendStatus.getCall(0).args[0]).to.be.equal(401);
  });

  it('Should return 401 if token is not valid', async function () {
    services.authService.isValidToken = () => false;
    const req = {
      headers: {
        authorization: 'Bearer INVALIDOTKEN'
      }
    };
    const res = {
      sendStatus: sinon.stub()
    };
    await validateToken(req, res, {});

    expect(res.sendStatus.callCount).to.be.equal(1);
    expect(res.sendStatus.getCall(0).args[0]).to.be.equal(401);
  });

  it('Should call next if token is valid', async function () {
    services.authService.isValidToken = () => true;
    const req = {
      headers: {
        authorization: 'Bearer VALIDOTKEN'
      }
    };
    const res = {
      sendStatus: () => {}
    };
    const next = sinon.stub();
    await validateToken(req, res, next);

    expect(next.callCount).to.be.equal(1);
  });

  it('Should set valid token to request', async function () {
    services.authService.isValidToken = () => true;
    const req = {
      headers: {
        authorization: 'Bearer VALIDOTKEN'
      }
    };
    const res = {
      sendStatus: () => {}
    };
    const next = sinon.stub();
    await validateToken(req, res, next);

    expect(req.token).to.be.equal('VALIDOTKEN');
  });

});

