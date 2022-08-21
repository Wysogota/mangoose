import produce from 'immer';
import ACTION_TYPES from '../../actions/actionTypes';

const manga = {
  mangaCatalog: [],
  total: 0,
  isFetching: false,
  error: null,
};

const initialState = {
  list: null,
  listIds: {},
  listCatalogs: {
    stopped: manga,
    reading: manga,
    planning: manga,
    completed: manga,
  },
  isFetching: false,
  error: null,
};

const requestHandle = produce((draftState, action) => {
  draftState.isFetching = true;
  draftState.error = null;
});
const successHandle = produce((draftState, action) => {
  draftState.isFetching = false;
  draftState.listIds = action.payload.data.lists;
});
const errorHandle = produce((draftState, action) => {
  const { response: { data: { errors } } } = action.payload.error;

  draftState.isFetching = false;
  draftState.errors = errors;
});

const handlers = {
  [ACTION_TYPES.GET_LIST_REQUEST]: requestHandle,
  [ACTION_TYPES.GET_MANGA_LISTS_REQUEST]: requestHandle,
  [ACTION_TYPES.SAVE_MANGA_TO_LIST_REQUEST]: requestHandle,
  [ACTION_TYPES.REMOVE_MANGA_FROM_LIST_REQUEST]: requestHandle,

  [ACTION_TYPES.GET_LIST_SUCCESS]: produce((draftState, action) => {
    draftState.isFetching = false;
    draftState.list = action.payload.data?.list || '';
  }),
  [ACTION_TYPES.GET_MANGA_LISTS_SUCCESS]: successHandle,
  [ACTION_TYPES.SAVE_MANGA_TO_LIST_SUCCESS]: successHandle,
  [ACTION_TYPES.REMOVE_MANGA_FROM_LIST_SUCCESS]: successHandle,

  [ACTION_TYPES.GET_LIST_ERROR]: errorHandle,
  [ACTION_TYPES.GET_MANGA_LISTS_ERROR]: errorHandle,
  [ACTION_TYPES.SAVE_MANGA_TO_LIST_ERROR]: errorHandle,
  [ACTION_TYPES.REMOVE_MANGA_FROM_LIST_ERROR]: errorHandle,

  [ACTION_TYPES.GET_MANGA_CATALOG_FROM_LIST_REQUEST]: produce((draftState, action) => {
    const { listName } = action.payload;
    draftState.listCatalogs[listName].isFetching = true;
    draftState.listCatalogs[listName].error = null;
  }),

  [ACTION_TYPES.GET_MANGA_CATALOG_FROM_LIST_SUCCESS]: produce((draftState, action) => {
    const { listName, data: { mangaList, total } } = action.payload;
    draftState.listCatalogs[listName].isFetching = false;
    draftState.listCatalogs[listName].mangaCatalog = mangaList;
    draftState.listCatalogs[listName].total = total;
  }),

  [ACTION_TYPES.GET_MANGA_CATALOG_FROM_LIST_ERROR]: produce((draftState, action) => {
    const { error, listName } = action.payload;
    draftState.listCatalogs[listName].isFetching = false;
    draftState.listCatalogs[listName].error = error;
  }),

  [ACTION_TYPES.CLEAR_MANGA_LISTS]: () => {
    return initialState;
  },
};

export default (state = initialState, action) => {
  const { type } = action;
  const handler = handlers[type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};