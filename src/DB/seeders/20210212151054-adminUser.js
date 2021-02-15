'use strict';

const axios = require('axios').default;
const assert = require('assert');

const GITHUB_USER = 'https://api.github.com/users';

const getGithubUserData = function (githubUserName) {
  return axios.request({url: `${GITHUB_USER}/${githubUserName}`});
};

module.exports = {
  up: async queryInterface => {
    const {GITHUB_USER} = process.env;
    assert(GITHUB_USER, 'Env var GITHUB_USER is required');
    const {data: {id, login, name}} = await getGithubUserData(GITHUB_USER);
    const userData = {
      name: 'SuperAdmin',
      surname: name,
      githubLogin: login,
      githubId: id,
      isAdmin: true
    };
    const user = await queryInterface.rawSelect('User', {where: userData}, ['id']);
    if (!user) {
      await queryInterface.bulkInsert('user', [userData], {});
    } else {
      console.info(`User ${GITHUB_USER} already exists`);
    }
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('user', null, {});
  }
};
