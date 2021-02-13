'use strict';

const paginationFromQuery = require('../util/paginationFromQuery');

module.exports = function ({db}) {
  const {User} = db;

  const get = function (id) {
    return User.findOne({where: {id}});
  };

  const find = function(query) {
    return User.findAndCountAll({...paginationFromQuery(query)});
  };

  const create = function(userData) {
    return User.create(userData);
  };

  const update = async function (id, userData) {
    const options = {where: {id}, plain: true};
    const [affectedRows] = await User.update(userData, options);

    if (!affectedRows) {
      return null;
    }

    return {id, ...userData};
  };

  const destroy = function(id) {
    return User.destroy({where: {id}});
  };

  const getByGithubId = function (githubId) {
    return User.findOne({where: {githubId}, raw: true});
  };

  const createGithubUser = async function(userData) {
    userData = {
      name: 'User',
      surname: userData.name,
      isAdmin: false,
      githubId: userData.id,
      githubLogin: userData.login
    };
    await User.create(userData);
    return userData;
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
