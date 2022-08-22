export default {
  WEBSITE_NAME: 'Mangoose',
  DEFAULT_LOCALE: 'en',
  ALT_LOCALE: 'ja',
  STATIC_IMAGE_PATH: '/static/images/',
  STATIC_ICON_PATH: '/static/icons/',
  MANGADEX_ICON: 'mangadex.svg',
  LOGO_DARK: 'logo-dark.png',
  LOGO_LIGHT: 'logo.png',
  NOT_REGISTERED_AVATAR_LIGHT: 'not-registered-avatar-light.png',
  NOT_REGISTERED_AVATAR_DARK: 'not-registered-avatar-dark.png',
  DEFAULT_POSTER: 'default-poster.jpg',
  LIGHT_COLOR: 'light',
  DARK_COLOR: 'dark',
  breakpoints: {
    md: 768,
    lg: 992,
    xl: 1200,
  },
  PAGES: {
    HOME: {
      name: 'Home',
      path: '/',
    },
    CATALOG: {
      name: 'Catalog',
      path: '/catalog',
    },
    SIGN_UP: {
      name: 'Sign Up',
      path: '/signup',
    },
    TITLE: {
      name: 'Title',
      path: '/title',
    },
    CHAPTER_READER: {
      name: 'Reader',
      path: '/chapter',
    },
    PROFILE: {
      name: 'Profile',
      path: '/profile',
    },
    SETTINGS: {
      name: 'Settings',
      path: '/settings',
    },
    NEWS: {
      name: 'News',
      path: '/news',
    },
    PAGE_NOT_FOUNDED: {
      name: 'Page Not Found'
    }
  },
  TITLE_TABS: {
    INFO: 'info',
    CHAPTERS: 'chapters',
    RELATED: 'related',
    COMMENTS: 'commets',
    USER_MANGA_LISTS: 'lists',
    MANAGE: 'manage',
  },
  PARAM_NAME: {
    TAB: 'tab',
    PAGE: 'page',
    FILTER: {
      TITLE: 'title',
      TAGS: 'includedTags',
      SORT: 'order',
      AUTHOR: 'author',
      ARTIST: 'artist',
    }
  },
  SORT_LIST: {
    RELEVANCE: {
      name: 'best match',
      type: 'relevance',
    },
    LAST_UPLOAD_CHAPTER: {
      name: 'upload chapter',
      type: 'latestUploadedChapter',
    },
    TITLE: {
      name: 'title',
      type: 'title',
    },
    RATING: {
      name: 'rating',
      type: 'rating',
    },
    FOLLOWED_COUNT: {
      name: 'followed count',
      type: 'followedCount',
    },
    CREATED_AT: {
      name: 'created at',
      type: 'createdAt',
    },
    YEAR: {
      name: 'year',
      type: 'year',
    },
  },
  SORT_DIRECTION: {
    ASC: 'asc',
    DESC: 'desc',
  },
  AUTHORS: [
    'author', 'artist',
  ],
  RELATED_FILTER: ['doujinshi', 'based_on'],
  MANGA_LIST_NAMES: {
    READING: 'reading',
    PLANNING: 'planning',
    COMPLETED: 'completed',
    STOPPED: 'stopped',
  },
  RECOMMENDATION_LIST: 'recommendation',
  DEFAULT_SAVE_BUTTON_VALUE: 'Save to list',
  MANGA_COVER_SIZES: {
    RAW: 'raw',
    SMALL: '256',
    MEDIUM: '512',
  },
  PERMISSION: {
    RECOMMENDATION: 'Recommendation',
  },
  STORAGE: {
    AUTH: 'auth',
    THEME: 'theme',
  },
  PAGINATION_PAGES_COUNT: 5,
  DEFAULT_INFO_ITEM: '¯\\_(ツ)_/¯',

  DEFAULT_NEW_CHAPTERS: (count) => new Array(count).fill(null).map((_, i) => ({
    id: i,
    chapter: 'Cras justo odio',
    manga: 'Attack on titan',
    date: '23 june 2022',
  })),
  DEFAULT_NEWS: (count) => new Array(count).fill(null).map((_, i) => ({
    id: i,
    title: 'Dapibus ac facilisis in',
    date: '23 june 2022',
  })),
};