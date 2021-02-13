'use strict';

const paginationFromQuery = require('../util/paginationFromQuery');

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
      .then(user => user.reload())
      .then(user => user.dataValues);
  };

  const update = async function (id, userData) {
    const options = {where: {id}, plain: true};
    return User
      .update(userData, options)
      .then(() => get(id))
      .then(user => user && user.dataValues);
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
