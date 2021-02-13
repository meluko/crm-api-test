'use strict';


module.exports = function (dependencies) {
  const {
    AccessToken,
    User,
  } = dependencies.db;
  const {
    githubClient
  } = dependencies.lib;
  const {
    auth: {tokenTTL}
  } = dependencies.config;

  const create = (accessToken, userData) => {
    const params = {
      userId: userData.id,
      accessToken: accessToken,
      githubId: userData.githubId,
      expiresAt: Date.now() + tokenTTL
    };
    return AccessToken.create(params);
  };

  const get = function(accessToken) {
    const options = {
      where: {
        accessToken
      },
      include: [{model: User}]
    };
    return AccessToken.findOne(options);
  };

  const isValidToken = function (accessToken) {
    return !!(accessToken && accessToken.expiresAt.getTime() > Date.now());
  };

  const isAdminToken = function (accessToken) {
    return accessToken && accessToken.user && accessToken.user.isAdmin;
  };

  const fetchAccessToken = function (code, state) {
    return githubClient.fetchAccessToken(code, state);
  };

  const fetchUserData = function (accessToken) {
    return githubClient.fetchUserData(accessToken);
  };

  return {
    create,
    get,
    isValidToken,
    isAdminToken,
    fetchAccessToken,
    fetchUserData
  };
};
