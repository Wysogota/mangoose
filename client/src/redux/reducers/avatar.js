import produce from 'immer';
import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  message: null,
  avatar: null,
  isFetching: false,
  isUploaded: false,
  errors: null,
};

const handlers = {
  [ACTION_TYPES.UPLOAD_AVATAR_REQUEST]: produce((draftState, action) => {
    draftState.isFetching = true;
    draftState.isUploaded = false;
    draftState.message = null;
    draftState.errors = null;
  }),

  [ACTION_TYPES.UPLOAD_AVATAR_SUCCESS]: produce((draftState, action) => {
    draftState.isFetching = false;
    draftState.isUploaded = true;
    draftState.message = action.payload.data.message;
  }),

  [ACTION_TYPES.UPLOAD_AVATAR_ERROR]: produce((draftState, action) => {
    const { response: { data: { errors } } } = action.payload.error;

    draftState.isFetching = false;
    draftState.errors = errors;
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
