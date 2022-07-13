import produce from 'immer';
import ACTION_TYPES from '../../actions/actionTypes';

const initialState = {
  inputValue: '',
  mangaSearch: [],
  limit: 0,
  offset: 0,
  total: 0,
  isFetching: false,
  error: null,
};

const handlers = {
  [ACTION_TYPES.GET_MANGA_SEARCH_REQUEST]: produce((draftState, action) => {
    draftState.isFetching = true;
    draftState.error = null;
  }),

  [ACTION_TYPES.GET_MANGA_SEARCH_SUCCESS]: produce((draftState, action) => {
    draftState.isFetching = false;

    draftState.mangaSearch = action.payload.data.mangaList;
    draftState.limit = action.payload.data.limit;
    draftState.offset = action.payload.data.offset;
    draftState.total = action.payload.data.total;
  }),

  [ACTION_TYPES.GET_MANGA_SEARCH_ERROR]: produce((draftState, action) => {
    draftState.isFetching = false;
    draftState.error = action.payload.error;
  }),

  [ACTION_TYPES.SET_SEARCH_VALUE]: produce((draftState, action) => {
    draftState.inputValue = action.payload.data;
  }),

  [ACTION_TYPES.CLEAR_MANGA_SEARCH]: (() => {
    return initialState;
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