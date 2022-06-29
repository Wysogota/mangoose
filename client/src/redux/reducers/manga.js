import produce from 'immer';
import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  manga: null,
  mangaCatalog: [],
  isFetching: false,
  error: null,
};

const requestHandler = produce((draftState, action) => {
  draftState.isFetching = true;
  draftState.error = null;
});
const errorHandler = produce((draftState, action) => {
  draftState.isFetching = false;
  draftState.error = action.payload.error;
});

const handlers = {
  [ACTION_TYPES.GET_MANGA_REQUEST]: requestHandler,
  [ACTION_TYPES.GET_MANGA_CATALOG_REQUEST]: requestHandler,

  [ACTION_TYPES.GET_MANGA_SUCCESS]: produce((draftState, action) => {
    draftState.isFetching = false;
    draftState.manga = action.payload.data;
  }),
  [ACTION_TYPES.GET_MANGA_CATALOG_SUCCESS]: produce((draftState, action) => {
    draftState.isFetching = false;
    draftState.mangaCatalog = action.payload.data;

  }),

  [ACTION_TYPES.GET_MANGA_ERROR]: errorHandler,
  [ACTION_TYPES.GET_MANGA_CATALOG_ERROR]: errorHandler,
};

export default (state = initialState, action) => {
  const { type } = action;
  const handler = handlers[type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};