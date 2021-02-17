'use strict';

module.exports = appDependencies => async (token, isAdmin = false) => {
  const userData = {
    name: `name_${token}`,
    surname: `surname_${token}`,
    isAdmin
  };
  const user = await appDependencies.services.userService.create(userData);
  const accessTokenData = {
    id: user.id,
    githubId: 0
  };
  await appDependencies.services.authService.create(token, accessTokenData);
};
