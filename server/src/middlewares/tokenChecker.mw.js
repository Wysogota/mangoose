const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');

module.exports = (req, res, next) => {
  const accessToken = req.headers['x-access-token'];

  if (accessToken) {
    const { ACCESS_TOKEN_SECRET } = process.env;

    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) next(createHttpError(401, 'Unauthorized access.'));
      next();
    });
  } else {
    next(createHttpError(403, 'No token provided.'));
  }
};