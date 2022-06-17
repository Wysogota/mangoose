import { combineReducers } from 'redux';
import localeReducer from './locale';
import themeReducer from './theme';

const rootReducer = combineReducers({
  locales: localeReducer,
  themes: themeReducer,
});

export default rootReducer;
