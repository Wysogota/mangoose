import produce from 'immer';
import ACTION_TYPES from '../actions/actionTypes';
import themeStyles from '../../common/styles/theme.module.scss';
import CONSTANTS from '../../constants';

const createTheme = (main, inverted) => ({
  mainColor: main,
  invertedColor: inverted,
  outlineColor: 'outline-' + inverted,
  mainTheme: themeStyles[main],
  bgTheme: themeStyles[main + '_bg'],
  bgAccentTheme: themeStyles[main + '_accent_bg'],
  invertedTheme: themeStyles[inverted],
  hoveredTheme: themeStyles[main + '_hovered'],
  invertedHoveredTheme: themeStyles[main + '_inverted_hovered'],
  bgInvertedHoveredTheme: themeStyles[main + '_inverted_hovered_bg'],
});

const themes = [
  createTheme(CONSTANTS.LIGHT_COLOR, CONSTANTS.DARK_COLOR),
  createTheme(CONSTANTS.DARK_COLOR, CONSTANTS.LIGHT_COLOR),
];

const initialState = {
  theme: themes[0],
};

const handlers = {
  [ACTION_TYPES.TOGGLE_THEME]: produce((draftState, action) => {
    let index = themes.findIndex(theme => theme.mainColor === draftState.theme.mainColor);
    draftState.theme = themes[++index % 2];
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
