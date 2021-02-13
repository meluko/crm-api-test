'use strict';

const GITHUB_AUTHORIZE = 'https://github.com/login/oauth/authorize';

module.exports = function (dependencies) {
  const {
    userService,
    authService
  } = dependencies.services;
  const {github: {clientId}} = dependencies.config;
  const {
    uuid,
    queryString
  } = dependencies.lib;

  const buildBaseUrl = function (req) {
    return `${req.secure ? 'https' : 'http'}://${req.headers.host}`;
  };

  const login = function (req, res) {
    const query = {
      client_id: clientId,
      redirect_uri: `${buildBaseUrl(req)}/auth/callback`,
      state: uuid.v4()
    };

    res.redirect(302, `${GITHUB_AUTHORIZE}?${queryString.stringify(query)}`);
  };

  const callback = async function (req, res) {
    const {code, state} = req.query;

    const access_token = await authService.fetchAccessToken(code, state);
    const {data} = await authService.fetchUserData(access_token);
    let user = await userService.getByGithubId(data.id);
    let template;
    if (!user) {
      user = await userService.createGithubUser(data);
      template = 'user-created.html';
    } else {
      template = 'present-token.html';
    }
    await authService.create(access_token, user);
    return res.render(template, { access_token, ...user});
  };

  return {
    login,
    callback
  };

};
