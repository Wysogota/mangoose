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

export function* getChaptersSaga(action) {
  yield put(actionCreators.getChaptersRequest());
  try {
    const { data: { data } } = yield API.getChapters(action.payload.options);
    yield put(actionCreators.getChaptersSuccess(data));
  } catch (error) {
    yield put(actionCreators.getChaptersError({ error }));
  }
}
