import produce from 'immer';
import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  isDarkTheme: false,
  theme: "light"
};

const handlers = {
  [ACTION_TYPES.TOGGLE_THEME]: produce((draftState, action) => {
    draftState.isDarkTheme = !draftState.isDarkTheme;
    draftState.theme = draftState.isDarkTheme ? "light" : "dark";
  }),
};

export default function themeReducer(state = initialState, action) {
  const { type } = action;
  const handler = handlers[type];
  if (handler) {
    return handler(state, action);
  }
  return state;
}
