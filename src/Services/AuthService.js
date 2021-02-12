'use strict';


module.exports = function (dependencies) {
  const {
    AccessToken,
    User,
  } = dependencies.db;
  const {
    githubClient
  } = dependencies.lib;

  const storeToken = function (accessToken, userData) {
    return AccessToken.create({
      userId: userData.id,
      accessToken: accessToken,
      githubId: userData.githubId
    });
  };

  const isAdminToken = async function(accessToken) {
    const options = {
      where: {
        accessToken
      },
      include: [{model: User}]
    };
    const result = await  AccessToken.findOne(options);
    return result && result.user && result.user.isAdmin;
  };

  const fetchAccessToken = function(code, state) {
    return githubClient.fetchAccessToken(code, state);
  };

  const fetchUserData = function(accessToken) {
    return githubClient.fetchUserData(accessToken)
  };

  return {
    storeToken,
    isAdminToken,
    fetchAccessToken,
    fetchUserData
  };
};
