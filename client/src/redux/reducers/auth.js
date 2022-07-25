import produce from 'immer';
import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  message: null,
  isTokenUpdated: false,
  isRegistered: false,
  isAuthorized: false,
  isFetching: false,
  errors: null,
};

const requestHandle = produce((draftState, action) => {
  draftState.isFetching = true;
  draftState.message = null;
  draftState.errors = null;
});
const errorHandle = produce((draftState, action) => {
  const { response: { data: { errors } } } = action.payload.error;

  draftState.isFetching = false;
  draftState.errors = errors;
});

const handlers = {
  [ACTION_TYPES.SIGN_UP_REQUEST]: requestHandle,
  [ACTION_TYPES.SIGN_IN_REQUEST]: requestHandle,
  [ACTION_TYPES.SIGN_OUT_REQUEST]: requestHandle,
  [ACTION_TYPES.REFRESH_TOKEN_REQUEST]: requestHandle,

  [ACTION_TYPES.SIGN_UP_SUCCESS]: produce((draftState, action) => {
    draftState.isFetching = false;
    draftState.isRegistered = true;
    draftState.message = action.payload.data.message;
  }),
  [ACTION_TYPES.SIGN_IN_SUCCESS]: produce((draftState, action) => {
    draftState.isFetching = false;
    draftState.isAuthorized = true;
    draftState.message = action.payload.data.message;
  }),
  [ACTION_TYPES.SIGN_OUT_SUCCESS]: produce((draftState, action) => {
    draftState.isFetching = false;
    draftState.isAuthorized = false;
    draftState.isRegistered = false;
    draftState.isTokenUpdated = false;
    draftState.message = action.payload.data.message;
  }),
  [ACTION_TYPES.REFRESH_TOKEN_SUCCESS]: produce((draftState, action) => {
    draftState.isFetching = false;
    draftState.isTokenUpdated = true;
    draftState.message = action.payload.data.message;
  }),

  [ACTION_TYPES.SIGN_UP_ERROR]: errorHandle,
  [ACTION_TYPES.SIGN_IN_ERROR]: errorHandle,
  [ACTION_TYPES.SIGN_OUT_ERROR]: errorHandle,
  [ACTION_TYPES.REFRESH_TOKEN_ERROR]: errorHandle,

  [ACTION_TYPES.AUTHORIZED]: produce((draftState, action) => {
    draftState.isAuthorized = true;
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
