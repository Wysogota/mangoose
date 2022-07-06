import produce from 'immer';
import ACTION_TYPES from '../../actions/actionTypes';

const initialState = {
  chapterPages: [],
  isFetching: false,
  error: null,
};

const handlers = {
  [ACTION_TYPES.GET_CHAPTER_PAGES_REQUEST]: produce((draftState, action) => {
    draftState.isFetching = true;
    draftState.error = null;
  }),

  [ACTION_TYPES.GET_CHAPTER_PAGES_SUCCESS]: produce((draftState, action) => {
    draftState.isFetching = false;
    draftState.chapterPages = action.payload.data;
  }),

  [ACTION_TYPES.GET_CHAPTER_PAGES_ERROR]: produce((draftState, action) => {
    draftState.isFetching = false;
    draftState.error = action.payload.error;
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