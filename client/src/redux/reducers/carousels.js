import produce from 'immer';
import ACTION_TYPES from '../actions/actionTypes';

const carousel = {
  isOpen: true,
  mangaCatalog: [],
  isFetching: false,
  error: null,
};

const initialState = new Array(3).fill(carousel);

const handlers = {
  [ACTION_TYPES.TOGGLE_CAROUSEL]: produce((draftState, action) => {
    const { order } = action.payload;
    draftState[order].isOpen = !draftState[order].isOpen;
  }),

  [ACTION_TYPES.GET_CAROUSEL_CATALOG_REQUEST]: produce((draftState, action) => {
    const { order } = action.payload;
    draftState[order].isFetching = true;
    draftState[order].error = null;
  }),

  [ACTION_TYPES.GET_CAROUSEL_CATALOG_SUCCESS]: produce((draftState, action) => {
    const { order, data: { mangaList } } = action.payload;
    draftState[order].isFetching = false;
    draftState[order].mangaCatalog = mangaList;
  }),

  [ACTION_TYPES.GET_CAROUSEL_CATALOG_ERROR]: produce((draftState, action) => {
    const { error, order } = action.payload;
    draftState[order].isFetching = false;
    draftState[order].error = error;
  }),
};

export default (state = initialState, action) => {
  const { type } = action;
  const handler = handlers[type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};
