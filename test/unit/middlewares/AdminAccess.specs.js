'use strict';

const sinon = require('sinon');
const {expect} = require('../../util/chai');

const services = {authService: {}};
const AdminAccess = require('../../../src/Middlewares/AdminAccess');
const httpContext = {get: () => {}};
const adminAccess = AdminAccess({services, lib: {httpContext}});

describe('AdminAccess', function () {

  it('Should return 403 if token is owned by a non admin user', async function () {
    services.authService.isAdminToken = () => false;
    const req = {token: 'NONADMINUSERTOKEN'};
    const res = {
      sendStatus: sinon.stub()
    };
    await adminAccess(req, res, {});

    expect(res.sendStatus.callCount).to.be.equal(1);
    expect(res.sendStatus.getCall(0).args[0]).to.be.equal(403);
  });

  it('Should call next if token is owned by an admin user', async function () {
    services.authService.isAdminToken = () => true;
    const req = {token: 'NONADMINUSERTOKEN'};
    const res = {
      sendStatus: () => {}
    };
    const next = sinon.stub();
    await adminAccess(req, res, next);

    expect(next.callCount).to.be.equal(1);
  });

});

