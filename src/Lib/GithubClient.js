'use strict';



const GITHUB_ACCESS_TOKEN = 'https://github.com/login/oauth/access_token';
const GITHUB_USER = 'https://api.github.com/user';

module.exports = function (dependencies) {
  const {github:
    {clientId, clientSecret}
  } = dependencies.config;
  const {
    queryString,
    axios
  } = dependencies.lib;

  const fetchAccessToken = async function (code, state) {
    const query = {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: '',
      code,
      state
    };

    const url = `${GITHUB_ACCESS_TOKEN}?${queryString.stringify(query)}`;
    const options = {method: 'POST', url};
    const response = await axios.request(options);

    return queryString.parse(response.data).access_token;
  };

  const fetchUserData = function (access_token) {
    return axios.request({
      method: 'GET',
      url: GITHUB_USER,
      headers: {'Authorization': `token ${access_token}`},
    });
  };

  return {
    fetchUserData,
    fetchAccessToken
  };
};
