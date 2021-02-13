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

  const storeToken = function (accessToken, userData) {
    const params = {
      userId: userData.id,
      accessToken: accessToken,
      githubId: userData.githubId,
      expiresAt: Date.now() + tokenTTL
    };
    return AccessToken.create(params);
  };

  const isValidToken = async function (accessToken) {
    const token = await AccessToken.findOne({where: {accessToken}, raw: true});

    return !!(token && token.expiresAt.getTime() > Date.now());
  };

  const isAdminToken = async function (accessToken) {
    const options = {
      where: {
        accessToken
      },
      include: [{model: User}]
    };
    const data = await AccessToken.findOne(options);
    return data && data.user && data.user.isAdmin;
  };

  const fetchAccessToken = function (code, state) {
    return githubClient.fetchAccessToken(code, state);
  };

  const fetchUserData = function (accessToken) {
    return githubClient.fetchUserData(accessToken);
  };

  return {
    storeToken,
    isValidToken,
    isAdminToken,
    fetchAccessToken,
    fetchUserData
  };
};
