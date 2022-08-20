import produce from 'immer';
import ACTION_TYPES from '../actions/actionTypes';
import themeStyles from '../../common/styles/theme.module.scss';
import CONSTANTS from '../../constants';
const { LIGHT_COLOR, DARK_COLOR, STORAGE: { THEME } } = CONSTANTS;

const createTheme = (main, inverted) => ({
  mainColor: main,
  invertedColor: inverted,
  outlineColor: 'outline-' + inverted,
  mainTheme: themeStyles[main],
  bgTheme: themeStyles[main + '_bg'],
  bgAccentTheme: themeStyles[main + '_accent_bg'],
  bgInvertedAccentTheme: themeStyles[main + '_inverted_accent_bg'],
  invertedTheme: themeStyles[inverted],
  hoveredTheme: themeStyles[main + '_hovered'],
  invertedHoveredTheme: themeStyles[main + '_inverted_hovered'],
  bgInvertedHoveredTheme: themeStyles[main + '_inverted_hovered_bg'],
  bgHoveredTheme: themeStyles[main + '_hovered_bg'],
});

const themes = [
  createTheme(LIGHT_COLOR, DARK_COLOR),
  createTheme(DARK_COLOR, LIGHT_COLOR),
];

const initialState = {
  theme: themes[localStorage.getItem(THEME)],
};

const handlers = {
  [ACTION_TYPES.TOGGLE_THEME]: produce((draftState, action) => {
    let index = themes.findIndex(theme => theme.mainColor === draftState.theme.mainColor);
    const currentTheme = ++index % 2;

    draftState.theme = themes[currentTheme];
    localStorage.setItem(THEME, currentTheme);
  }),

  [ACTION_TYPES.SET_THEME]: produce((draftState, action) => {
    const { index } = action.payload;
    draftState.theme = themes[index];
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
