import produce from 'immer';
import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  isSignInShown: false,
  isSidebarOpen: false,
  isSearchbarOpen: false,
};

const handlers = {
  [ACTION_TYPES.SHOW_SIGN_IN]: produce((draftState, action) => {
    draftState.isSignInShown = true;
  }),
  [ACTION_TYPES.HIDE_SIGN_IN]: produce((draftState, action) => {
    draftState.isSignInShown = false;
  }),
  
  [ACTION_TYPES.SHOW_SIDEBAR]: produce((draftState, action) => {
    draftState.isSidebarOpen = true;
  }),
  [ACTION_TYPES.HIDE_SIDEBAR]: produce((draftState, action) => {
    draftState.isSidebarOpen = false;
  }),

  [ACTION_TYPES.SHOW_SEARCHBAR]: produce((draftState, action) => {
    draftState.isSearchbarOpen = true;
  }),
  [ACTION_TYPES.HIDE_SEARCHBAR]: produce((draftState, action) => {
    draftState.isSearchbarOpen = false;
  }),
};

export default function sidebarReducer(state = initialState, action) {
  const { type } = action;
  const handler = handlers[type];
  if (handler) {
    return handler(state, action);
  }
  return state;
}