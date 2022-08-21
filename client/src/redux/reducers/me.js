import produce from 'immer';
import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  me: {},
  isFetching: false,
  errors: null,
};

const handlers = {
  [ACTION_TYPES.GET_ME_REQUEST]: produce((draftState, action) => {
    draftState.isFetching = true;
    draftState.errors = null;
  }),

  [ACTION_TYPES.GET_ME_SUCCESS]: produce((draftState, action) => {
    draftState.isFetching = false;
    draftState.me = action.payload.data.user;
  }),

  [ACTION_TYPES.GET_ME_ERROR]: produce((draftState, action) => {
    draftState.isFetching = false;
    draftState.errors = action.payload.data;
  }),

  [ACTION_TYPES.CLEAR_ME]: () => {
    return initialState;
  },
};

export default (state = initialState, action) => {
  const { type } = action;
  const handler = handlers[type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};
