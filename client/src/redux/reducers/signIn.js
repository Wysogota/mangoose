import produce from 'immer';
import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  isSignInShown: false,
};

const handlers = {
  [ACTION_TYPES.SHOW_SIGN_IN]: produce((draftState, action) => {
    draftState.isSignInShown = true;
  }),
  [ACTION_TYPES.HIDE_SIGN_IN]: produce((draftState, action) => {
    draftState.isSignInShown = false;
  }),
};

export default function taskReducer(state = initialState, action) {
  const { type } = action;
  const handler = handlers[type];
  if (handler) {
    return handler(state, action);
  }
  return state;
}