const createHttpError = require('http-errors');
const { decode } = require('jsonwebtoken');
const { User, RefreshToken } = require('../models');
const { getAccessToken, getRefreshToken } = require('../jwt');
const { destroyOverLimitTokens, getTokenCookieOptions, getResponse } = require('../functions/controllers.fn');
const { REFRESH_TOKEN_NAME, ACCESS_TOKEN_NAME } = require('../constants');

module.exports.signIn = async (req, res, next) => {
  try {
    const { body: { email, password } } = req;

    const user = await User.findOne({ where: { email } });

    if (user && await user.comparePassword(password)) {
      await destroyOverLimitTokens(user);

      const accessToken = await getAccessToken(user);
      const refreshToken = await getRefreshToken(user);

      await user.createRefreshToken({
        value: refreshToken,
        expiresIn: decode(refreshToken).exp,
      });

      res
        .cookie(ACCESS_TOKEN_NAME, accessToken, getTokenCookieOptions(decode(accessToken).exp))
        .cookie(REFRESH_TOKEN_NAME, refreshToken, getTokenCookieOptions(decode(refreshToken).exp))
        .status(200)
        .send(getResponse(OK, 'Logged in.'));
    } else {
      next(createHttpError(401, 'Incorrect data.'));
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
        .clearCookie(ACCESS_TOKEN_NAME, getTokenCookieOptions())
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
      .send(getResponse('Signed up.'));
  } catch (error) {
    next(error);
  }
};

module.exports.refresh = async (req, res, next) => {
  try {
    const { body: { email, tokens: { refresh: refreshToken } } } = req;
    const user = await User.findOne({ where: { email } });

    if (await RefreshToken.isTokenExists(refreshToken, user.id)) {
      const accessToken = await getAccessToken(user);

      res
        .cookie(ACCESS_TOKEN_NAME, accessToken, getTokenCookieOptions(decode(accessToken).exp))
        .status(200)
        .send(getResponse('Updated access token.'));
    } else {
      next(createHttpError(401, 'Incorrect data.'));
    }

  } catch (error) {
    next(error);
  }
};