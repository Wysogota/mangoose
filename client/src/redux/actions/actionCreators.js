import ACTION_TYPES from './actionTypes';

export const toggleTheme = () => ({
  type: ACTION_TYPES.TOGGLE_THEME,
});

export const showSignIn = () => ({
  type: ACTION_TYPES.SHOW_SIGN_IN,
});

export const hideSignIn = () => ({
  type: ACTION_TYPES.HIDE_SIGN_IN,
});

export const showSidebar = () => ({
  type: ACTION_TYPES.SHOW_SIDEBAR,
});

export const hideSidebar = () => ({
  type: ACTION_TYPES.HIDE_SIDEBAR,
});
