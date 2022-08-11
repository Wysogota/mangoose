const { RefreshToken } = require('../models');
const { MAX_AUTH_COUNT, DEFAULT_AVATAR_PATH } = require('../constants');

module.exports.getResponse = (message, data) => ({
  message,
  data,
});

module.exports.destroyOverLimitTokens = async (user) => {
  const refreshTokensCount = await user.countRefreshTokens();

  if (refreshTokensCount >= MAX_AUTH_COUNT) {
    const destroyCount = refreshTokensCount - MAX_AUTH_COUNT + 1;

    await RefreshToken.destroy({
      where: { userId: user.id },
      limit: destroyCount,
    });
  }
};

module.exports.getTokenCookieOptions = (expiresIn = null) => ({
  sameSite: 'strict',
  expires: new Date(expiresIn * 1000),
  httpOnly: true,
});

module.exports.getAvatarUrl = async (user) => {
  const { PORT, DOMAIN } = process.env;
  const hasAvatar = Boolean(await user.getAvatar());
  const avatarPath = hasAvatar ? user.id : DEFAULT_AVATAR_PATH;
  return `http://${DOMAIN}:${PORT}/api/user/avatar/${avatarPath}`;
};
