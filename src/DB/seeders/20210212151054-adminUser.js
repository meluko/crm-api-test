'use strict';

const axios = require('axios').default;
const GITHUB_USER = 'https://api.github.com/users';

const getGithubUserData = function (githubUserName) {
  return axios.request({url: `${GITHUB_USER}/${githubUserName}`});
};

module.exports = {
  up: async queryInterface => {
    const {data: {id, login, name}} = await getGithubUserData(process.env.GITHUB_USER);
    await queryInterface.bulkInsert('user', [{
      name: 'SuperAdmin',
      surname: name,
      githubLogin: login,
      githubId: id,
      isAdmin: true
    }], {});
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('user', null, {});
  }
};
