import produce from 'immer';
import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  isAuthorized: false,
  isFetching: false,
  errors: null,
  status: null,
};

const requestHandle = produce((draftState, action) => {
  draftState.isFetching = true;
  draftState.errors = null;
});
const errorHandle = produce((draftState, action) => {
  draftState.isFetching = false;
  draftState.errors = action.payload.errors;
});

const handlers = {
  [ACTION_TYPES.SIGN_UP_REQUEST]: requestHandle,
  [ACTION_TYPES.SIGN_IN_REQUEST]: requestHandle,
  [ACTION_TYPES.SIGN_OUT_REQUEST]: requestHandle,

  [ACTION_TYPES.SIGN_UP_SUCCESS]: produce((draftState, action) => {
    draftState.isFetching = false;
  }),
  [ACTION_TYPES.SIGN_IN_SUCCESS]: produce((draftState, action) => {
    draftState.isFetching = false;
    draftState.isAuthorized = true;
    draftState.status = action.payload.data.status;
  }),
  [ACTION_TYPES.SIGN_OUT_SUCCESS]: produce((draftState, action) => {
    draftState.isFetching = false;
    draftState.isAuthorized = false;
  }),

  [ACTION_TYPES.SIGN_UP_ERROR]: errorHandle,
  [ACTION_TYPES.SIGN_IN_ERROR]: errorHandle,
  [ACTION_TYPES.SIGN_OUT_ERROR]: errorHandle,
};

export default (state = initialState, action) => {
  const { type } = action;
  const handler = handlers[type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};
