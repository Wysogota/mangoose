const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const jwtSign = promisify(jwt.sign);

module.exports.getAccessToken = async (user) => {
  const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_TIME } = process.env;

  return await jwtSign(
    {
      username: user.username,
      email: user.email,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_TIME,
    }
  );
};

module.exports.getRefreshToken = async (user) => {
  const { REFRESH_TOKEN_SECRET, REFRESH_TOKEN_TIME } = process.env;

  return await jwtSign(
    {
      username: user.username,
      email: user.email,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_TIME
    }
  );
};