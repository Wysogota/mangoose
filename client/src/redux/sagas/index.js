import { takeLatest } from 'redux-saga/effects';
import ACTION_TYPES from '../actions/actionTypes';
import {
  getMangaSaga, getMangaCatalogSaga, getMangaCoversSaga,
  getChapterSaga, getChaptersSaga, getChapterPagesSaga
} from './mangaSagas';

export default function* rootSaga() {
  yield takeLatest(ACTION_TYPES.GET_MANGA, getMangaSaga);
  yield takeLatest(ACTION_TYPES.GET_MANGA_CATALOG, getMangaCatalogSaga);
  yield takeLatest(ACTION_TYPES.GET_MANGA_COVERS, getMangaCoversSaga);
  yield takeLatest(ACTION_TYPES.GET_CHAPTER, getChapterSaga);
  yield takeLatest(ACTION_TYPES.GET_CHAPTERS, getChaptersSaga);
  yield takeLatest(ACTION_TYPES.GET_CHAPTER_PAGES, getChapterPagesSaga);
}
