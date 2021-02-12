'use stict';

module.exports = config => dependencies => {
  const {
    openid,
    bodyParser
  } = dependencies;

    /*
  const authConfig = {
    ...config.auth,
    authorizationParams: {
      response_type: 'code',
      audience: 'https://localhost:8088',
      scope: 'openid profile read:customer create:customer',
    }
  };
     */

  return {
    auth: openid.auth(config.auth),
    jsonBodyParser: bodyParser.json()
  };
};
