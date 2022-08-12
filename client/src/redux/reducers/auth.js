import produce from 'immer';
import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  token: null,
  message: null,
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
    const { message } = action.payload.data;

    draftState.isFetching = false;
    draftState.message = message;
  }),
  [ACTION_TYPES.SIGN_IN_SUCCESS]: produce((draftState, action) => {
    const { message, data: { token } } = action.payload.data;
    draftState.isFetching = false;

    draftState.message = message;
    draftState.token = token;
    localStorage.setItem('auth', true);
  }),
  [ACTION_TYPES.SIGN_OUT_SUCCESS]: produce((draftState, action) => {
    const { message } = action.payload.data;

    draftState.isFetching = false;
    draftState.token = null;
    draftState.message = message;
    localStorage.setItem('auth', false);
  }),
  [ACTION_TYPES.REFRESH_TOKEN_SUCCESS]: produce((draftState, action) => {
    const { message, data: { token } } = action.payload.data;

    draftState.isFetching = false;
    draftState.message = message;
    draftState.token = token;
  }),

  [ACTION_TYPES.SIGN_UP_ERROR]: errorHandle,
  [ACTION_TYPES.SIGN_IN_ERROR]: errorHandle,
  [ACTION_TYPES.SIGN_OUT_ERROR]: errorHandle,
  [ACTION_TYPES.REFRESH_TOKEN_ERROR]: errorHandle,

  [ACTION_TYPES.CLEAR_TOKEN]: produce((draftState, action) => {
    draftState.token = null;
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
