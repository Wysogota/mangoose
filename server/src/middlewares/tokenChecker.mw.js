const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const { User } = require('../models');

module.exports = (req, res, next) => {
  const accessToken = req.body.token || req.headers.authorization.split(' ')[1];

  if (accessToken) {
    const { ACCESS_TOKEN_SECRET } = process.env;

    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, async (err, decoded) => {
      try {
        req.user = await User.findOne({ where: { email: decoded.email } });
        next();
      } catch (error) {
        next(createHttpError(401, 'Unauthorized access.'));
      }
    });
  } else {
    next(createHttpError(403, 'No token provided.'));
  }
};