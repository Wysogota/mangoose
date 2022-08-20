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


export const toggleCarousel = (order) => ({
  type: ACTION_TYPES.TOGGLE_CAROUSEL,
  payload: { order },
});
export const getCarouselCatalog = (options, order) => ({
  type: ACTION_TYPES.GET_CAROUSEL_CATALOG,
  payload: { options, order },
});
export const getCarouselCatalogRequest = (order) => ({
  type: ACTION_TYPES.GET_CAROUSEL_CATALOG_REQUEST,
  payload: { order },
});
export const getCarouselCatalogSuccess = (data, order) => ({
  type: ACTION_TYPES.GET_CAROUSEL_CATALOG_SUCCESS,
  payload: { data, order },
});
export const getCarouselCatalogError = (error, order) => ({
  type: ACTION_TYPES.GET_CAROUSEL_CATALOG_ERROR,
  payload: { error, order },
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
export const clearMangaCatalog = () => ({
  type: ACTION_TYPES.CLEAR_MANGA_CATALOG,
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

export const getMe = (options) => ({
  type: ACTION_TYPES.GET_ME,
  payload: { options },
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
export const signInError = (error) => ({
  type: ACTION_TYPES.SIGN_IN_ERROR,
  payload: { error },
});

export const signOut = () => ({
  type: ACTION_TYPES.SIGN_OUT,
});
export const signOutRequest = () => ({
  type: ACTION_TYPES.SIGN_OUT_REQUEST,
});
export const signOutSuccess = (data) => ({
  type: ACTION_TYPES.SIGN_OUT_SUCCESS,
  payload: { data },
});
export const signOutError = (error) => ({
  type: ACTION_TYPES.SIGN_OUT_ERROR,
  payload: { error },
});

export const signUp = (options) => ({
  type: ACTION_TYPES.SIGN_UP,
  payload: { options },
});
export const signUpRequest = () => ({
  type: ACTION_TYPES.SIGN_UP_REQUEST,
});
export const signUpSuccess = (data) => ({
  type: ACTION_TYPES.SIGN_UP_SUCCESS,
  payload: { data },
});
export const signUpError = (error) => ({
  type: ACTION_TYPES.SIGN_UP_ERROR,
  payload: { error },
});

export const refreshToken = () => ({
  type: ACTION_TYPES.REFRESH_TOKEN,
});
export const refreshTokenRequest = () => ({
  type: ACTION_TYPES.REFRESH_TOKEN_REQUEST,
});
export const refreshTokenSuccess = (data) => ({
  type: ACTION_TYPES.REFRESH_TOKEN_SUCCESS,
  payload: { data },
});
export const refreshTokenError = (error) => ({
  type: ACTION_TYPES.REFRESH_TOKEN_ERROR,
  payload: { error },
});

export const resetAuth = () => ({
  type: ACTION_TYPES.RESET_AUTH,
});
export const checkAuth = () => ({
  type: ACTION_TYPES.CHECK_AUTH,
});

export const getMangaLists = (options) => ({
  type: ACTION_TYPES.GET_MANGA_LISTS,
  payload: { options },
});
export const getMangaListsRequest = () => ({
  type: ACTION_TYPES.GET_MANGA_LISTS_REQUEST,
});
export const getMangaListsSuccess = (data) => ({
  type: ACTION_TYPES.GET_MANGA_LISTS_SUCCESS,
  payload: { data },
});
export const getMangaListsError = (error) => ({
  type: ACTION_TYPES.GET_MANGA_LISTS_ERROR,
  payload: { error },
});

export const saveMangaToList = (options) => ({
  type: ACTION_TYPES.SAVE_MANGA_TO_LIST,
  payload: { options },
});
export const saveMangaToListRequest = () => ({
  type: ACTION_TYPES.SAVE_MANGA_TO_LIST_REQUEST,
});
export const saveMangaToListSuccess = (data) => ({
  type: ACTION_TYPES.SAVE_MANGA_TO_LIST_SUCCESS,
  payload: { data },
});
export const saveMangaToListError = (error) => ({
  type: ACTION_TYPES.SAVE_MANGA_TO_LIST_ERROR,
  payload: { error },
});

export const removeMangaFromList = (options) => ({
  type: ACTION_TYPES.REMOVE_MANGA_FROM_LIST,
  payload: { options },
});
export const removeMangaFromListRequest = () => ({
  type: ACTION_TYPES.REMOVE_MANGA_FROM_LIST_REQUEST,
});
export const removeMangaFromListSuccess = (data) => ({
  type: ACTION_TYPES.REMOVE_MANGA_FROM_LIST_SUCCESS,
  payload: { data },
});
export const removeMangaFromListError = (error) => ({
  type: ACTION_TYPES.REMOVE_MANGA_FROM_LIST_ERROR,
  payload: { error },
});

export const getList = (options) => ({
  type: ACTION_TYPES.GET_LIST,
  payload: { options },
});
export const getListRequest = () => ({
  type: ACTION_TYPES.GET_LIST_REQUEST,
});
export const getListSuccess = (data) => ({
  type: ACTION_TYPES.GET_LIST_SUCCESS,
  payload: { data },
});
export const getListError = (error) => ({
  type: ACTION_TYPES.GET_LIST_ERROR,
  payload: { error },
});

export const getMangaCatalogFromList = (options, listName) => ({
  type: ACTION_TYPES.GET_MANGA_CATALOG_FROM_LIST,
  payload: { options, listName },
});
export const getMangaCatalogFromListRequest = (listName) => ({
  type: ACTION_TYPES.GET_MANGA_CATALOG_FROM_LIST_REQUEST,
  payload: { listName },
});
export const getMangaCatalogFromListSuccess = (data, listName) => ({
  type: ACTION_TYPES.GET_MANGA_CATALOG_FROM_LIST_SUCCESS,
  payload: { data, listName },
});
export const getMangaCatalogFromListError = (error, listName) => ({
  type: ACTION_TYPES.GET_MANGA_CATALOG_FROM_LIST_ERROR,
  payload: { error, listName },
});

export const getFullRecommendationList = (options) => ({
  type: ACTION_TYPES.GET_FULL_RECOMMENDATION_LIST,
  payload: { options },
});
export const getFullRecommendationListRequest = () => ({
  type: ACTION_TYPES.GET_FULL_RECOMMENDATION_LIST_REQUEST,
});
export const getFullRecommendationListSuccess = (data) => ({
  type: ACTION_TYPES.GET_FULL_RECOMMENDATION_LIST_SUCCESS,
  payload: { data },
});
export const getFullRecommendationListError = (error) => ({
  type: ACTION_TYPES.GET_FULL_RECOMMENDATION_LIST_ERROR,
  payload: { error },
});

export const getRecommendationList = (options) => ({
  type: ACTION_TYPES.GET_RECOMMENDATION_LIST,
  payload: { options },
});
export const getRecommendationListRequest = () => ({
  type: ACTION_TYPES.GET_RECOMMENDATION_LIST_REQUEST,
});
export const getRecommendationListSuccess = (data) => ({
  type: ACTION_TYPES.GET_RECOMMENDATION_LIST_SUCCESS,
  payload: { data },
});
export const getRecommendationListError = (error) => ({
  type: ACTION_TYPES.GET_RECOMMENDATION_LIST_ERROR,
  payload: { error },
});

export const getMangaFromRecommendationList = (options) => ({
  type: ACTION_TYPES.GET_MANGA_FROM_RECOMMENDATION_LIST,
  payload: { options },
});
export const getMangaFromRecommendationListRequest = () => ({
  type: ACTION_TYPES.GET_MANGA_FROM_RECOMMENDATION_LIST_REQUEST,
});
export const getMangaFromRecommendationListSuccess = (data) => ({
  type: ACTION_TYPES.GET_MANGA_FROM_RECOMMENDATION_LIST_SUCCESS,
  payload: { data },
});
export const getMangaFromRecommendationListError = (error) => ({
  type: ACTION_TYPES.GET_MANGA_FROM_RECOMMENDATION_LIST_ERROR,
  payload: { error },
});

export const saveMangaToRecommendationList = (options) => ({
  type: ACTION_TYPES.SAVE_MANGA_TO_RECOMMENDATION_LIST,
  payload: { options },
});
export const saveMangaToRecommendationListRequest = () => ({
  type: ACTION_TYPES.SAVE_MANGA_TO_RECOMMENDATION_LIST_REQUEST,
});
export const saveMangaToRecommendationListSuccess = (data) => ({
  type: ACTION_TYPES.SAVE_MANGA_TO_RECOMMENDATION_LIST_SUCCESS,
  payload: { data },
});
export const saveMangaToRecommendationListError = (error) => ({
  type: ACTION_TYPES.SAVE_MANGA_TO_RECOMMENDATION_LIST_ERROR,
  payload: { error },
});

export const removeMangaFromRecommendationList = (options) => ({
  type: ACTION_TYPES.REMOVE_MANGA_FROM_RECOMMENDATION_LIST,
  payload: { options },
});
export const removeMangaFromRecommendationListRequest = () => ({
  type: ACTION_TYPES.REMOVE_MANGA_FROM_RECOMMENDATION_LIST_REQUEST,
});
export const removeMangaFromRecommendationListSuccess = (data) => ({
  type: ACTION_TYPES.REMOVE_MANGA_FROM_RECOMMENDATION_LIST_SUCCESS,
  payload: { data },
});
export const removeMangaFromRecommendationListError = (error) => ({
  type: ACTION_TYPES.REMOVE_MANGA_FROM_RECOMMENDATION_LIST_ERROR,
  payload: { error },
});

export const uploadAvatar = (options, token) => ({
  type: ACTION_TYPES.UPLOAD_AVATAR,
  payload: { options, token },
});
export const uploadAvatarRequest = () => ({
  type: ACTION_TYPES.UPLOAD_AVATAR_REQUEST,
});
export const uploadAvatarSuccess = (data) => ({
  type: ACTION_TYPES.UPLOAD_AVATAR_SUCCESS,
  payload: { data },
});
export const uploadAvatarError = (error) => ({
  type: ACTION_TYPES.UPLOAD_AVATAR_ERROR,
  payload: { error },
});
