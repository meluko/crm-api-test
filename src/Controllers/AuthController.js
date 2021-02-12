'use strict';

const GITHUB_AUTHORIZE = 'https://github.com/login/oauth/authorize';
const GITHUB_ACCESS_TOKEN = 'https://github.com/login/oauth/access_token';
const GITHUB_USER = 'https://api.github.com/user';

module.exports = function (dependencies) {
  const {userService} = dependencies.services;
  const {github: {client_id, client_secret}} = dependencies.config;
  const {
    uuid,
    queryString,
    axios
  } = dependencies.lib;

  const buildBaseUrl = function (req) {
    return `${req.secure ? 'https' : 'http'}://${req.headers.host}`;
  };

  const login = function (req, res) {
    const query = {
      client_id,
      redirect_uri: `${buildBaseUrl(req)}/auth/callback`,
      state: uuid()
    };

    res.redirect(302, `${GITHUB_AUTHORIZE}?${queryString.stringify(query)}`);
  };

  const fetchAccessToken = async function (code, state) {
    const query = {
      client_id,
      client_secret,
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

  const callback = async function (req, res) {
    const {code, state} = req.query;

    const access_token = await fetchAccessToken(code, state);
    const {data} = await fetchUserData(access_token);
    let user = await userService.getByGithubId(data.id);
    if (!user) {
      user = await userService.createGithubUser(data);
      return res.render('user-created.html', { access_token, ...user});
    }
    res.render('present-token.html', { access_token, ...user});
  };

  return {
    login,
    callback
  };

};
