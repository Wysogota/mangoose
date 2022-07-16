export default {
  WEBSITE_NAME: 'Mangoose',
  DEFAULT_LOCALE: 'en',
  STATIC_IMAGE_PATH: '/static/images/',
  LOGO_DARK: "logo-dark.png",
  LOGO_LIGHT: "logo.png",
  DEFAULT_AVATAR: "default-avatar.png",
  NOT_REGISTERED_AVATAR_LIGHT: "not-registered-avatar-light.png",
  NOT_REGISTERED_AVATAR_DARK: "not-registered-avatar-dark.png",
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
  },
  TITLE_TABS: {
    INFO: 'info',
    CHAPTERS: 'chapters',
    RELATED: 'related',
    COMMENTS: 'commets',
  },
  PARAM_NAME: {
    TAB: 'tab',
    PAGE: 'page',
    FILTER: {
      TITLE: 'title',
      TAGS: 'includedTags',
      ORDER: 'order',
      AUTHOR: 'author',
      ARTIST: 'artist',
    }
  },
  RELATED_FILTER: ['doujinshi', 'based_on'],
};