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
import chapterReducer from './mangaApi/chapter';
import chaptersReducer from './mangaApi/chapters';
import chapterPagesReducer from './mangaApi/chapterPages';
import nextChapterIdReducer from './mangaApi/nextChapterId';
import firstChapterIdReducer from './mangaApi/firstChapterId';

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
  chapter: chapterReducer,
  chapters: chaptersReducer,
  chapterPages: chapterPagesReducer,
  nextChapterId: nextChapterIdReducer,
  firstChapterId: firstChapterIdReducer,
});

export default rootReducer;
