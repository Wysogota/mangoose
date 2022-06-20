import produce from 'immer';
import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  isSidebarOpen: false,
};

const handlers = {
  [ACTION_TYPES.SHOW_SIDEBAR]: produce((draftState, action) => {
    draftState.isSidebarOpen = true;
  }),
  [ACTION_TYPES.HIDE_SIDEBAR]: produce((draftState, action) => {
    draftState.isSidebarOpen = false;
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