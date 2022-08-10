const { User, Avatar } = require('../models');
const { getResponse } = require('../functions/controllers.fn');

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
    const { user } = req;
    if (user) {
      res
        .status(200)
        .send(getResponse('User founded.', {
          user: {
            id: user.id,
            name: user.username,
            email: user.email,
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

module.exports.getUserAvatar = async (req, res, next) => {
  try {
    const { params: { userId } } = req;
    const avatar = await Avatar.findOne({ where: { userId } });

    if (avatar) {
      const image = Buffer.from(avatar.buffer, 'base64');
      res
        .status(200)
        .set({
          'Content-Type': avatar.mimetype,
          'Content-Length': avatar.size
        })
        .send(image);
    } else {
      res
        .status(401)
        .send(getResponse('User not founded.'));
    }
  } catch (error) {
    next(error);
  }
};

module.exports.saveAvatar = async (req, res, next) => {
  try {
    const { file, user } = req;

    const { originalname: name, encoding, mimetype, buffer, size } = file;
    await user.createAvatar({ name, encoding, mimetype, buffer, size });

    res
      .status(200)
      .send(getResponse('Avatar Updated.'));
  } catch (error) {
    next(error);
  }
};
