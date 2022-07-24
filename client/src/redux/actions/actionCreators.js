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

export const showSearchbar = () => ({
  type: ACTION_TYPES.SHOW_SEARCHBAR,
});

export const hideSearchbar = () => ({
  type: ACTION_TYPES.HIDE_SEARCHBAR,
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

export const getMangaSearch = (options) => ({
  type: ACTION_TYPES.GET_MANGA_SEARCH,
  payload: { options }
});
export const getMangaSearchRequest = () => ({
  type: ACTION_TYPES.GET_MANGA_SEARCH_REQUEST,
});
export const getMangaSearchSuccess = (data) => ({
  type: ACTION_TYPES.GET_MANGA_SEARCH_SUCCESS,
  payload: { data },
});
export const getMangaSearchError = (data) => ({
  type: ACTION_TYPES.GET_MANGA_SEARCH_ERROR,
  payload: { data },
});
export const clearMangaSearch = () => ({
  type: ACTION_TYPES.CLEAR_MANGA_SEARCH,
});
export const setSearchValue = (data) => ({
  type: ACTION_TYPES.SET_SEARCH_VALUE,
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

export const getNextChapterId = (options) => ({
  type: ACTION_TYPES.GET_NEXT_CHAPTER_ID,
  payload: { options }
});
export const getNextChapterIdRequest = () => ({
  type: ACTION_TYPES.GET_NEXT_CHAPTER_ID_REQUEST,
});
export const getNextChapterIdSuccess = (data) => ({
  type: ACTION_TYPES.GET_NEXT_CHAPTER_ID_SUCCESS,
  payload: { data },
});
export const getNextChapterIdError = (data) => ({
  type: ACTION_TYPES.GET_NEXT_CHAPTER_ID_ERROR,
  payload: { data },
});

export const getFirstChapterId = (options) => ({
  type: ACTION_TYPES.GET_FIRST_CHAPTER_ID,
  payload: { options }
});
export const getFirstChapterIdRequest = () => ({
  type: ACTION_TYPES.GET_FIRST_CHAPTER_ID_REQUEST,
});
export const getFirstChapterIdSuccess = (data) => ({
  type: ACTION_TYPES.GET_FIRST_CHAPTER_ID_SUCCESS,
  payload: { data },
});
export const getFirstChapterIdError = (data) => ({
  type: ACTION_TYPES.GET_FIRST_CHAPTER_ID_ERROR,
  payload: { data },
});

export const getTagList = () => ({
  type: ACTION_TYPES.GET_TAG_LIST,
});
export const getTagListRequest = () => ({
  type: ACTION_TYPES.GET_TAG_LIST_REQUEST,
});
export const getTagListSuccess = (data) => ({
  type: ACTION_TYPES.GET_TAG_LIST_SUCCESS,
  payload: { data },
});
export const getTagListError = (data) => ({
  type: ACTION_TYPES.GET_TAG_LIST_ERROR,
  payload: { data },
});

export const getMe = () => ({
  type: ACTION_TYPES.GET_ME,
});
export const getMeRequest = () => ({
  type: ACTION_TYPES.GET_ME_REQUEST,
});
export const getMeSuccess = (data) => ({
  type: ACTION_TYPES.GET_ME_SUCCESS,
  payload: { data },
});
export const getMeError = (data) => ({
  type: ACTION_TYPES.GET_ME_ERROR,
  payload: { data },
});


export const signIn = (options) => ({
  type: ACTION_TYPES.SIGN_IN,
  payload: { options },
});
export const signInRequest = () => ({
  type: ACTION_TYPES.SIGN_IN_REQUEST,
});
export const signInSuccess = (data) => ({
  type: ACTION_TYPES.SIGN_IN_SUCCESS,
  payload: { data },
});
export const signInError = (data) => ({
  type: ACTION_TYPES.SIGN_IN_ERROR,
  payload: { data },
});
export const setAuthorized = () => ({
  type: ACTION_TYPES.AUTHORIZED,
});

export const signOut = () => ({
  type: ACTION_TYPES.SIGN_OUT,
});
export const signOutRequest = () => ({
  type: ACTION_TYPES.SIGN_OUT_REQUEST,
});
export const signOutSuccess = () => ({
  type: ACTION_TYPES.SIGN_OUT_SUCCESS,
});
export const signOutError = (data) => ({
  type: ACTION_TYPES.SIGN_OUT_ERROR,
  payload: { data },
});



