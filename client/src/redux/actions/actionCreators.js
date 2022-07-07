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



export const getManga = (options) => ({
  type: ACTION_TYPES.GET_MANGA,
  payload: { options }
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

export const getMangaCovers = (options) => ({
  type: ACTION_TYPES.GET_MANGA_COVERS,
  payload: { options }
});
export const getMangaCoversRequest = () => ({
  type: ACTION_TYPES.GET_MANGA_COVERS_REQUEST,
});
export const getMangaCoversSuccess = (data) => ({
  type: ACTION_TYPES.GET_MANGA_COVERS_SUCCESS,
  payload: { data },
});
export const getMangaCoversError = (data) => ({
  type: ACTION_TYPES.GET_MANGA_COVERS_ERROR,
  payload: { data },
});

export const getChapters = (options) => ({
  type: ACTION_TYPES.GET_CHAPTERS,
  payload: { options }
});
export const getChaptersRequest = () => ({
  type: ACTION_TYPES.GET_CHAPTERS_REQUEST,
});
export const getChaptersSuccess = (data) => ({
  type: ACTION_TYPES.GET_CHAPTERS_SUCCESS,
  payload: { data },
});
export const getChaptersError = (data) => ({
  type: ACTION_TYPES.GET_CHAPTERS_ERROR,
  payload: { data },
});

export const getChapter = (options) => ({
  type: ACTION_TYPES.GET_CHAPTER,
  payload: { options }
});
export const getChapterRequest = () => ({
  type: ACTION_TYPES.GET_CHAPTER_REQUEST,
});
export const getChapterSuccess = (data) => ({
  type: ACTION_TYPES.GET_CHAPTER_SUCCESS,
  payload: { data },
});
export const getChapterError = (data) => ({
  type: ACTION_TYPES.GET_CHAPTER_ERROR,
  payload: { data },
});

export const getChapterPages = (options) => ({
  type: ACTION_TYPES.GET_CHAPTER_PAGES,
  payload: { options }
});
export const getChapterPagesRequest = () => ({
  type: ACTION_TYPES.GET_CHAPTER_PAGES_REQUEST,
});
export const getChapterPagesSuccess = (data) => ({
  type: ACTION_TYPES.GET_CHAPTER_PAGES_SUCCESS,
  payload: { data },
});
export const getChapterPagesError = (data) => ({
  type: ACTION_TYPES.GET_CHAPTER_PAGES_ERROR,
  payload: { data },
});
