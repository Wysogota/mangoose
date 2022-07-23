import produce from 'immer';
import ACTION_TYPES from '../../actions/actionTypes';

const initialState = {
  chapters: [],
  limit: 0,
  offset: 0,
  total: 0,
  isFetching: false,
  error: null,
};

const handlers = {
  [ACTION_TYPES.GET_CHAPTERS_REQUEST]: produce((draftState, action) => {
    draftState.isFetching = true;
    draftState.error = null;
  }),

  [ACTION_TYPES.GET_CHAPTERS_SUCCESS]: produce((draftState, action) => {
    draftState.isFetching = false;

    const { data, limit, offset, total } = action.payload.data;
    draftState.chapters = data;
    draftState.limit = limit;
    draftState.offset = offset;
    draftState.total = total;
  }),

  [ACTION_TYPES.GET_CHAPTERS_ERROR]: produce((draftState, action) => {
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