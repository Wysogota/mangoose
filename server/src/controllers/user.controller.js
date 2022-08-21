const path = require('path');
const { User, Avatar, Role } = require('../models');
const { getResponse, getAvatarUrl } = require('../functions/controllers.fn');
const {
  STATIC_IMAGE_PATH,
  DEFAULT_AVATAR,
  PERMISSION: { RECOMMENDATION },
} = require('../constants');

const permissionsList = [RECOMMENDATION];

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
    const avatar = await getAvatarUrl(user);
    const permissions = await Role.getUserPermissions(user.roleId);

    res
      .status(200)
      .send(getResponse('User founded.', {
        user: {
          id: user.id,
          name: user.username,
          email: user.email,
          avatar,
          permissions: permissions.filter(
            (name) => permissionsList.some((perm) => perm === name)
          )
        }
      }));
  } catch (error) {
    next(error);
  }
};

module.exports.getUserAvatar = async (req, res, next) => {
  try {
    const { params: { avatarName } } = req;
    const avatar = await Avatar.findOne({ where: { name: avatarName } });

    if (avatar) {
      const image = Buffer.from(avatar.buffer, 'base64');
      res
        .status(200)
        .set({
          'Content-Type': avatar.mimetype,
          'Content-Length': image.length
        })
        .send(image);
    } else {
      res
        .status(401)
        .send(getResponse('Avatar not founded.'));
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getDefaultAvatar = async (req, res, next) => {
  try {
    res
      .status(200)
      .sendFile(path.join(__dirname, '../..', STATIC_IMAGE_PATH, DEFAULT_AVATAR));
  } catch (error) {
    next(error);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const { file, user } = req;

    const { originalname, mimetype, buffer } = file;
    const avatarData = { name: originalname, mimetype, buffer };

    const avatar = await user.getAvatar();
    avatar
      ? await avatar.update(avatarData)
      : await user.createAvatar(avatarData);

    res
      .status(200)
      .send(getResponse('Avatar Updated.'));
  } catch (error) {
    next(error);
  }
};
