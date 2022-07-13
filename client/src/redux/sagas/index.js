import { takeLatest } from 'redux-saga/effects';
import ACTION_TYPES from '../actions/actionTypes';
import {
  getMangaSaga, getMangaCatalogSaga, getMangaSearchSaga,
  getMangaCoversSaga, getChapterSaga, getChaptersSaga,
  getChapterPagesSaga, getNextChapterIdSaga, getFirstChapterIdSaga,
} from './mangaSagas';

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
}
