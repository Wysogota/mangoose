const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const jwtSign = promisify(jwt.sign);

module.exports.getAccessToken = async (options) => {
  const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_TIME } = process.env;

  return await jwtSign(
    options,
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_TIME,
    }
  );
};

module.exports.getRefreshToken = async (options) => {
  const { REFRESH_TOKEN_SECRET, REFRESH_TOKEN_TIME } = process.env;

  return await jwtSign(
    options,
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_TIME
    }
  );
};