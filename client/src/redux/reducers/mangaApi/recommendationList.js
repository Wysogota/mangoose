import produce from 'immer';
import ACTION_TYPES from '../../actions/actionTypes';

const initialState = {
  recommendationCatalog: [],
  manga: null,
  isFetching: false,
  error: null,
};

const requestHandle = produce((draftState, action) => {
  draftState.isFetching = true;
  draftState.error = null;
});
const successHandle = produce((draftState, action) => {
  draftState.isFetching = false;
  draftState.recommendationCatalog = action.payload.data.mangaList;
});
const successMangaHandle = produce((draftState, action) => {
  draftState.isFetching = false;
  draftState.manga = action.payload.data.manga;
});
const errorHandle = produce((draftState, action) => {
  const { response: { data: { errors } } } = action.payload.error;

  draftState.isFetching = false;
  draftState.errors = errors;
});

const handlers = {
  [ACTION_TYPES.GET_MANGA_FROM_RECOMMENDATION_LIST_REQUEST]: requestHandle,
  [ACTION_TYPES.SAVE_MANGA_TO_RECOMMENDATION_LIST_REQUEST]: requestHandle,
  [ACTION_TYPES.REMOVE_MANGA_FROM_RECOMMENDATION_LIST_REQUEST]: requestHandle,
  [ACTION_TYPES.GET_RECOMMENDATION_LIST_REQUEST]: requestHandle,
  [ACTION_TYPES.GET_FULL_RECOMMENDATION_LIST_REQUEST]: requestHandle,

  [ACTION_TYPES.GET_MANGA_FROM_RECOMMENDATION_LIST_SUCCESS]: successMangaHandle,
  [ACTION_TYPES.SAVE_MANGA_TO_RECOMMENDATION_LIST_SUCCESS]: successMangaHandle,
  [ACTION_TYPES.GET_RECOMMENDATION_LIST_SUCCESS]: successHandle,
  [ACTION_TYPES.GET_FULL_RECOMMENDATION_LIST_SUCCESS]: successHandle,
  [ACTION_TYPES.REMOVE_MANGA_FROM_RECOMMENDATION_LIST_SUCCESS]: successHandle,

  [ACTION_TYPES.GET_MANGA_FROM_RECOMMENDATION_LIST_ERROR]: errorHandle,
  [ACTION_TYPES.SAVE_MANGA_TO_RECOMMENDATION_LIST_ERROR]: errorHandle,
  [ACTION_TYPES.REMOVE_MANGA_FROM_RECOMMENDATION_LIST_ERROR]: errorHandle,
  [ACTION_TYPES.GET_RECOMMENDATION_LIST_ERROR]: errorHandle,
  [ACTION_TYPES.GET_FULL_RECOMMENDATION_LIST_ERROR]: errorHandle,

  [ACTION_TYPES.CLEAR_RECOMMENDATION_LIST]: () => {
    return initialState;
  },
};

export default (state = initialState, action) => {
  const { type } = action;
  const handler = handlers[type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};