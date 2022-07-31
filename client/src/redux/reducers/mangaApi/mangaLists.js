import produce from 'immer';
import ACTION_TYPES from '../../actions/actionTypes';

const initialState = {
  list: null,
  lists: {},
  isFetching: false,
  error: null,
};

const requestHandle = produce((draftState, action) => {
  draftState.isFetching = true;
  draftState.error = null;
});
const successHandle = produce((draftState, action) => {
  draftState.isFetching = false;
  draftState.lists = action.payload.data.lists;
});
const errorHandle = produce((draftState, action) => {
  const { response: { data: { errors } } } = action.payload.error;

  draftState.isFetching = false;
  draftState.errors = errors;
});

const handlers = {
  [ACTION_TYPES.GET_LIST_REQUEST]: requestHandle,
  [ACTION_TYPES.GET_MANGA_LISTS_REQUEST]: requestHandle,
  [ACTION_TYPES.SAVE_MANGA_TO_LIST_REQUEST]: requestHandle,
  [ACTION_TYPES.REMOVE_MANGA_FROM_LIST_REQUEST]: requestHandle,

  [ACTION_TYPES.GET_LIST_SUCCESS]: produce((draftState, action) => {
    draftState.isFetching = false;
    draftState.list = action.payload.data?.list || '';
  }),
  [ACTION_TYPES.GET_MANGA_LISTS_SUCCESS]: successHandle,
  [ACTION_TYPES.SAVE_MANGA_TO_LIST_SUCCESS]: successHandle,
  [ACTION_TYPES.REMOVE_MANGA_FROM_LIST_SUCCESS]: successHandle,

  [ACTION_TYPES.GET_LIST_ERROR]: errorHandle,
  [ACTION_TYPES.GET_MANGA_LISTS_ERROR]: errorHandle,
  [ACTION_TYPES.SAVE_MANGA_TO_LIST_ERROR]: errorHandle,
  [ACTION_TYPES.REMOVE_MANGA_FROM_LIST_ERROR]: errorHandle,
};

export default (state = initialState, action) => {
  const { type } = action;
  const handler = handlers[type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};