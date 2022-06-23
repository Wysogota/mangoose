import produce from 'immer';
import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  isOpenPopularCarousel: true,
  isOpenNewCarousel: false,
  isOpenHotNewCarousel: false,
};

const handlers = {
  [ACTION_TYPES.TOGGLE_POPULAR_CAROUSEL]: produce((draftState, action) => {
    draftState.isOpenPopularCarousel = !draftState.isOpenPopularCarousel;
  }),
  [ACTION_TYPES.TOGGLE_NEW_CAROUSEL]: produce((draftState, action) => {
    draftState.isOpenNewCarousel = !draftState.isOpenNewCarousel;
  }),
  [ACTION_TYPES.TOGGLE_HOT_NEW_CAROUSEL]: produce((draftState, action) => {
    draftState.isOpenHotNewCarousel = !draftState.isOpenHotNewCarousel;
  }),
};

export default (state = initialState, action) => {
  const { type } = action;
  const handler = handlers[type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};
