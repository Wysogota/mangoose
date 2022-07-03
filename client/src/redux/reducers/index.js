import { combineReducers } from 'redux';
import localeReducer from './locale';
import themeReducer from './theme';
import signInReducer from './signIn';
import sidebarReducer from './sidebar';
import authReducer from './auth';
import carouselReducer from './carousels';
import mangaReducer from './mangaApi/manga';
import mangaCatalogReducer from './mangaApi/mangaCatalog';
import coverReducer from './mangaApi/cover';

const rootReducer = combineReducers({
  locales: localeReducer,
  themes: themeReducer,
  signIn: signInReducer,
  sidebar: sidebarReducer,
  auth: authReducer,
  carousels: carouselReducer,
  manga: mangaReducer,
  mangaCatalog: mangaCatalogReducer,
  cover: coverReducer,
});

export default rootReducer;
