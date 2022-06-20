import { combineReducers } from 'redux';
import localeReducer from './locale';
import themeReducer from './theme';
import signInReducer from './signIn';
import sidebarReducer from './sidebar';

const rootReducer = combineReducers({
  locales: localeReducer,
  themes: themeReducer,
  signIn: signInReducer,
  sidebar: sidebarReducer,
});

export default rootReducer;
