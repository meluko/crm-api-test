'use strict';

const {expect} = require('../../util/chai');
const paginationFromQuery = require('../../../src/util/paginationFromQuery');

describe('paginationFromQuery', function () {

  describe('Pagination params', function () {

    it('Should contain default offset (0) if no offset provided', function () {
      const params = paginationFromQuery({});

      expect(params.offset).to.be.equal(0);
    });

    it('Should contain offset from offset parameter', function () {
      const params = paginationFromQuery({offset: '50'});

      expect(params).to.be.shallowDeepEqual({offset: 50});
    });

    it('Should contain default limit (10) if no limit provided', function () {
      const params = paginationFromQuery({});

      expect(params.limit).to.be.equal(10);
    });

    it('Should contain limit from limit parameter', function () {
      const params = paginationFromQuery({limit: '25'});

      expect(params).to.be.shallowDeepEqual({limit: 25});
    });

    it('Should contain empty order parameter if no order provided', function () {
      const params = paginationFromQuery({});

      expect(params.order).to.be.deep.equal([]);
    });

    it('Should contain order parameter as a order config', function () {
      const params = paginationFromQuery({order: ['id:ASC', 'name:DESC']});

      expect(params.order).to.be.deep.equal([['id', 'ASC'], ['name', 'DESC']]);
    });

    it('Should trim exctra spaces', function () {
      const params = paginationFromQuery({order: [' id: ASC', 'name: DESC ']});

      expect(params.order).to.be.deep.equal([['id', 'ASC'], ['name', 'DESC']]);
    });

  });

});
