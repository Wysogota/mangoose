import { put } from 'redux-saga/effects';
import * as actionCreators from '../actions/actionCreators';
import * as API from '../../api';

export function* getMangaSaga(action) {
  yield put(actionCreators.getMangaRequest());
  try {
    const { data: { data } } = yield API.getManga(action.payload.options);
    yield put(actionCreators.getMangaSuccess(data));
  } catch (error) {
    yield put(actionCreators.getMangaError({ error }));
  }
}

export function* getMangaCatalogSaga(action) {
  yield put(actionCreators.getMangaCatalogRequest());
  try {
    const { data: { data } } = yield API.getMangaCatalog(action.payload.options);
    yield put(actionCreators.getMangaCatalogSuccess(data));
  } catch (error) {
    yield put(actionCreators.getMangaCatalogError({ error }));
  }
}

export function* getMangaCoversSaga(action) {
  yield put(actionCreators.getMangaCoversRequest());
  try {
    const { data: { data } } = yield API.getMangaCovers(action.payload.options);
    yield put(actionCreators.getMangaCoversSuccess(data));
  } catch (error) {
    yield put(actionCreators.getMangaCoversError({ error }));
  }
}

export function* getChapterSaga(action) {
  yield put(actionCreators.getChapterRequest());
  try {
    const { data: { data } } = yield API.getChapter(action.payload.options);
    yield put(actionCreators.getChapterSuccess(data));
  } catch (error) {
    yield put(actionCreators.getChapterError({ error }));
  }
}
export function* getChaptersSaga(action) {
  yield put(actionCreators.getChaptersRequest());
  try {
    const { data: { data } } = yield API.getChapters(action.payload.options);
    yield put(actionCreators.getChaptersSuccess(data));
  } catch (error) {
    yield put(actionCreators.getChaptersError({ error }));
  }
}

export function* getChapterPagesSaga(action) {
  yield put(actionCreators.getChapterPagesRequest());
  try {
    const { data: { data } } = yield API.getChapterPages(action.payload.options);
    yield put(actionCreators.getChapterPagesSuccess(data));
  } catch (error) {
    yield put(actionCreators.getChapterPagesError({ error }));
  }
}

export function* getNextChapterIdSaga(action) {
  yield put(actionCreators.getNextChapterIdRequest());
  try {
    const { data: { data } } = yield API.getNextChapterId(action.payload.options);
    yield put(actionCreators.getNextChapterIdSuccess(data));
  } catch (error) {
    yield put(actionCreators.getNextChapterIdError({ error }));
  }
}

export function* getFirstChapterIdSaga(action) {
  yield put(actionCreators.getFirstChapterIdRequest());
  try {
    const { data: { data } } = yield API.getFirstChapterId(action.payload.options);
    yield put(actionCreators.getFirstChapterIdSuccess(data));
  } catch (error) {
    yield put(actionCreators.getFirstChapterIdError({ error }));
  }
}
