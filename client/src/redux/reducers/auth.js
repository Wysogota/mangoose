import produce from 'immer';
import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  isAuthorized: false,
};

const handlers = {
};

export default (state = initialState, action) => {
  const { type } = action;
  const handler = handlers[type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};
