const { User, RefreshToken } = require('../models');
const { REFRESH_TOKEN_NAME } = require('../constants');

module.exports.getUser = async (req, res, next) => {
  try {
    const { params: { userId } } = req;
    const user = await User.findOne({
      where: { id: userId },
    });
    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.getMe = async (req, res, next) => {
  try {
    const refreshTokenValue = req.cookies[REFRESH_TOKEN_NAME];
    const refreshToken = await RefreshToken.findOne({ where: { value: refreshTokenValue } });
    const user = await refreshToken.getUser();

    res.status(200).send({
      data: {
        user: {
          name: user.username,
          email: user.email,
          avatar: user.avatar,
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
