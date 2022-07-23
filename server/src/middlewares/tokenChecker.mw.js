const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const { ACCESS_TOKEN_NAME } = require('../constants');

module.exports = (req, res, next) => {
  const accessToken = req.cookies[ACCESS_TOKEN_NAME];

  if (accessToken) {
    const { ACCESS_TOKEN_SECRET } = process.env;

    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) next(createHttpError(401, 'Unauthorized access.'));
      next();
    });
  } else {
    next(createHttpError(204, 'No token provided.'));
  }
};