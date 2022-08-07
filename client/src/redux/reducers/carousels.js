import produce from 'immer';
import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  carousel1: {
    isOpen: true,
    mangaCatalog: [],
    isFetching: false,
    error: null,
  },
  carousel2: {
    isOpen: true,
    mangaCatalog: [],
    isFetching: false,
    error: null,
  },
  carousel3: {
    isOpen: true,
    mangaCatalog: [],
    isFetching: false,
    error: null,
  },
};

const toggleCarouselHandle = (order) => produce((draftState, action) => {
  draftState[`carousel${order}`].isOpen = !draftState[`carousel${order}`].isOpen;
});
const requestHandle = (order) => produce((draftState, action) => {
  draftState[`carousel${order}`].isFetching = true;
  draftState[`carousel${order}`].error = null;
});
const successHandle = (order) => produce((draftState, action) => {
  draftState[`carousel${order}`].isFetching = false;
  draftState[`carousel${order}`].mangaCatalog = action.payload.data.mangaList;
});
const errorHandle = (order) => produce((draftState, action) => {
  draftState[`carousel${order}`].isFetching = false;
  draftState[`carousel${order}`].error = action.payload.error;
});

const handlers = {
  [ACTION_TYPES.TOGGLE_CAROUSEL_1]: toggleCarouselHandle(1),
  [ACTION_TYPES.TOGGLE_CAROUSEL_2]: toggleCarouselHandle(2),
  [ACTION_TYPES.TOGGLE_CAROUSEL_3]: toggleCarouselHandle(3),

  [ACTION_TYPES.GET_CAROUSEL_CATALOG_REQUEST_1]: requestHandle(1),
  [ACTION_TYPES.GET_CAROUSEL_CATALOG_REQUEST_2]: requestHandle(2),
  [ACTION_TYPES.GET_CAROUSEL_CATALOG_REQUEST_3]: requestHandle(3),

  [ACTION_TYPES.GET_CAROUSEL_CATALOG_SUCCESS_1]: successHandle(1),
  [ACTION_TYPES.GET_CAROUSEL_CATALOG_SUCCESS_2]: successHandle(2),
  [ACTION_TYPES.GET_CAROUSEL_CATALOG_SUCCESS_3]: successHandle(3),

  [ACTION_TYPES.GET_CAROUSEL_CATALOG_ERROR_1]: errorHandle(1),
  [ACTION_TYPES.GET_CAROUSEL_CATALOG_ERROR_2]: errorHandle(2),
  [ACTION_TYPES.GET_CAROUSEL_CATALOG_ERROR_3]: errorHandle(3),

};

export default (state = initialState, action) => {
  const { type } = action;
  const handler = handlers[type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};
