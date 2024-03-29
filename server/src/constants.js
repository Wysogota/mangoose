module.exports = {
  STATIC_IMAGE_PATH: '/static/images/',
  DEFAULT_AVATAR: 'default-avatar.png',
  MAX_AUTH_COUNT: 3,
  REFRESH_TOKEN_NAME: 'r',
  MANGA_LIST_NAMES: {
    READING: 'reading',
    PLANNING: 'planning',
    COMPLETED: 'completed',
    STOPPED: 'stopped',
  },
  SORT_LIST: {
    RELEVANCE: {
      name: 'best match',
      type: 'relevance',
    },
  },
  SORT_DIRECTION: {
    ASC: 'asc',
    DESC: 'desc',
  },
  AUTHORS: [
    'author', 'artist'
  ],
  DEFAULT_AVATAR_PATH: 'default',
  ROLES: {
    ADMIN: 'Admin',
    MODERATOR: 'Moderator',
    USER: 'User',
  },
  PERMISSION: {
    ADMIN_PANEL: 'Admin Panel',
    EDIT: 'Edit',
    DELETE: 'Delete',
    CREATE: 'Create',
    SHOW: 'Show',
    RECOMMENDATION: 'Recommendation',
  }
};