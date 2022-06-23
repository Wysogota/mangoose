import { combineReducers } from 'redux';
import localeReducer from './locale';
import themeReducer from './theme';
import signInReducer from './signIn';
import sidebarReducer from './sidebar';
import authReducer from './auth';
import carouselReducer from './carousels';

const rootReducer = combineReducers({
  locales: localeReducer,
  themes: themeReducer,
  signIn: signInReducer,
  sidebar: sidebarReducer,
  auth: authReducer,
  carousels: carouselReducer,
});

export default rootReducer;
