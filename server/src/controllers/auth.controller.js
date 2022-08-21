const createHttpError = require('http-errors');
const { decode } = require('jsonwebtoken');
const { User, RefreshToken } = require('../models');
const { getAccessToken, getRefreshToken } = require('../functions/jwt.fn');
const { destroyOverLimitTokens, getTokenCookieOptions, getResponse } = require('../functions/controllers.fn');
const { REFRESH_TOKEN_NAME } = require('../constants');

module.exports.signIn = async (req, res, next) => {
  try {
    const { body: { email, password, ua } } = req;

    const user = await User.findOne({ where: { email } });

    if (user && await user.comparePassword(password)) {
      await destroyOverLimitTokens(user);

      const accessToken = await getAccessToken({ email, username: user.username });
      const refreshToken = await getRefreshToken({ email, ua, username: user.username });

      const accessExp = decode(accessToken).exp;
      const refreshExp = decode(refreshToken).exp;

      await user.createRefreshToken({
        value: refreshToken,
        expiresIn: refreshExp,
        ua,
      });

      res
        .cookie(REFRESH_TOKEN_NAME, refreshToken, getTokenCookieOptions(refreshExp))
        .status(200)
        .send(getResponse('Logged in.', { token: accessToken, expiresIn: accessExp }));
    } else {
      next(createHttpError(401, 'Incorrect provided login data.'));
    }

  } catch (error) {
    next(error);
  }
};

module.exports.signOut = async (req, res, next) => {
  try {
    const refreshToken = req.cookies[REFRESH_TOKEN_NAME];

    const isTokenDestroyed = await RefreshToken.destroy({ where: { value: refreshToken } });
    if (isTokenDestroyed) {
      res
        .clearCookie(REFRESH_TOKEN_NAME, getTokenCookieOptions())
        .status(200)
        .send(getResponse('Logged out.'));
    } else {
      next(createHttpError(401, 'Incorrect provided token.'));
    }
  } catch (error) {
    next(error);
  }
};

module.exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    await User.create(body);
    res
      .status(200)
      .send(getResponse('Signed up successfully!'));
  } catch (error) {
    next(error);
  }
};

module.exports.refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies[REFRESH_TOKEN_NAME];
    const isTokenExists = await RefreshToken.isTokenExists(refreshToken);

    if (isTokenExists) {
      const email = decode(refreshToken).email;
      const user = await User.findOne({ where: { email } });
      const accessToken = await getAccessToken({ email, username: user.username });
      const accessExp = decode(accessToken).exp;

      res
        .status(200)
        .send(getResponse('Updated access token.', { token: accessToken, expiresIn: accessExp }));
    } else {
      next(createHttpError(401, 'Incorrect provided token.'));
    }

  } catch (error) {
    next(error);
  }
};