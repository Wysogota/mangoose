import ACTION_TYPES from './actionTypes';

export const toggleTheme = () => ({
  type: ACTION_TYPES.TOGGLE_THEME,
});

export const showSignIn = () => ({
  type: ACTION_TYPES.SHOW_SIGN_IN,
});

export const hideSignIn = () => ({
  type: ACTION_TYPES.HIDE_SIGN_IN,
});

export const showSidebar = () => ({
  type: ACTION_TYPES.SHOW_SIDEBAR,
});

export const hideSidebar = () => ({
  type: ACTION_TYPES.HIDE_SIDEBAR,
});

export const togglePopularCarousel = () => ({
  type: ACTION_TYPES.TOGGLE_POPULAR_CAROUSEL,
});

export const toggleNewCarousel = () => ({
  type: ACTION_TYPES.TOGGLE_NEW_CAROUSEL,
});

export const toggleHotNewCarousel = () => ({
  type: ACTION_TYPES.TOGGLE_HOT_NEW_CAROUSEL,
});



export const getManga = (mangaId) => ({
  type: ACTION_TYPES.GET_MANGA,
  payload: { mangaId }
});
export const getMangaRequest = () => ({
  type: ACTION_TYPES.GET_MANGA_REQUEST,
});
export const getMangaSuccess = (data) => ({
  type: ACTION_TYPES.GET_MANGA_SUCCESS,
  payload: { data },
});
export const getMangaError = (data) => ({
  type: ACTION_TYPES.GET_MANGA_ERROR,
  payload: { data },
});


export const getMangaCatalog = (options) => ({
  type: ACTION_TYPES.GET_MANGA_CATALOG,
  payload: { options }
});
export const getMangaCatalogRequest = () => ({
  type: ACTION_TYPES.GET_MANGA_CATALOG_REQUEST,
});
export const getMangaCatalogSuccess = (data) => ({
  type: ACTION_TYPES.GET_MANGA_CATALOG_SUCCESS,
  payload: { data },
});
export const getMangaCatalogError = (data) => ({
  type: ACTION_TYPES.GET_MANGA_CATALOG_ERROR,
  payload: { data },
});
