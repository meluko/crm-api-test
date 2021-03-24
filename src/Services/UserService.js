'use strict';

const paginationFromQuery = require('../Util/paginationFromQuery');

module.exports = function ({db}) {
  const {User} = db;

  const get = function (id) {
    return User.findOne({where: {id}});
  };

  const find = function (query) {
    return User.findAndCountAll({...paginationFromQuery(query)});
  };

  const create = function (userData) {
    return User
      .create(userData)
      .then(user => user.reload());
  };

  const update = async function (user, userData) {
    return user && user
      .update(userData)
      .then(it => it.reload());
  };

  const destroy = function (id) {
    return User.destroy({where: {id}});
  };

  const getByGithubId = function (githubId) {
    return User.findOne({where: {githubId}, raw: true});
  };

  const createGithubUser = function (userData) {
    userData = {
      name: 'User',
      surname: userData.name,
      isAdmin: false,
      githubId: userData.id,
      githubLogin: userData.login
    };
    return User
      .create(userData)
      .then(user => user.reload())
      .then(user => user.dataValues);
  };

  return {
    get,
    find,
    create,
    update,
    destroy,
    getByGithubId,
    createGithubUser,
  };
};
