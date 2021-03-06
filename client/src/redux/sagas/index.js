import { takeLatest } from 'redux-saga/effects';
import ACTION_TYPES from '../actions/actionTypes';
import {
  getMangaSaga, getMangaCatalogSaga, getMangaSearchSaga,
  getMangaCoversSaga, getChapterSaga, getChaptersSaga,
  getChapterPagesSaga, getNextChapterIdSaga, getFirstChapterIdSaga,
  getTagListSaga, getMangaListsSaga, saveMangaToListSaga, removeMangaFromListSaga, getListSaga
} from './mangaSagas';
import { signInSaga, signOutSaga, signUpSaga, refreshTokenSaga } from './authSagas';
import { getMeSaga } from './userSaga';

export default function* rootSaga() {
  yield takeLatest(ACTION_TYPES.GET_MANGA, getMangaSaga);
  yield takeLatest(ACTION_TYPES.GET_MANGA_CATALOG, getMangaCatalogSaga);
  yield takeLatest(ACTION_TYPES.GET_MANGA_SEARCH, getMangaSearchSaga);
  yield takeLatest(ACTION_TYPES.GET_MANGA_COVERS, getMangaCoversSaga);
  yield takeLatest(ACTION_TYPES.GET_CHAPTER, getChapterSaga);
  yield takeLatest(ACTION_TYPES.GET_CHAPTERS, getChaptersSaga);
  yield takeLatest(ACTION_TYPES.GET_CHAPTER_PAGES, getChapterPagesSaga);
  yield takeLatest(ACTION_TYPES.GET_NEXT_CHAPTER_ID, getNextChapterIdSaga);
  yield takeLatest(ACTION_TYPES.GET_FIRST_CHAPTER_ID, getFirstChapterIdSaga);
  yield takeLatest(ACTION_TYPES.GET_TAG_LIST, getTagListSaga);

  yield takeLatest(ACTION_TYPES.SIGN_UP, signUpSaga);
  yield takeLatest(ACTION_TYPES.SIGN_IN, signInSaga);
  yield takeLatest(ACTION_TYPES.SIGN_OUT, signOutSaga);
  yield takeLatest(ACTION_TYPES.REFRESH_TOKEN, refreshTokenSaga);

  yield takeLatest(ACTION_TYPES.GET_ME, getMeSaga);

  yield takeLatest(ACTION_TYPES.GET_LIST, getListSaga);
  yield takeLatest(ACTION_TYPES.GET_MANGA_LISTS, getMangaListsSaga);
  yield takeLatest(ACTION_TYPES.SAVE_MANGA_TO_LIST, saveMangaToListSaga);
  yield takeLatest(ACTION_TYPES.REMOVE_MANGA_FROM_LIST, removeMangaFromListSaga);
}
