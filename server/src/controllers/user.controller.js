const { User, RefreshToken } = require('../models');
const { getResponse } = require('../functions/controllers.fn');
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
    const user = await User.findOne({ where: { email: req.decodedEmail } })

    if (user) {
      res
        .status(200)
        .send(getResponse('User founded.', {
          user: {
            name: user.username,
            email: user.email,
            avatar: user.avatar,
          }
        }));
    } else {
      res
        .status(401)
        .send(getResponse('User not founded.'));
    }

  } catch (error) {
    next(error);
  }
};
