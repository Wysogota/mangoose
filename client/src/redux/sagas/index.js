import { takeLatest } from 'redux-saga/effects';
import ACTION_TYPES from '../actions/actionTypes';
import { getMangaSaga, getMangaCatalogSaga } from './mangaSagas';

export default function* rootSaga() {
  yield takeLatest(ACTION_TYPES.GET_MANGA, getMangaSaga);
  yield takeLatest(ACTION_TYPES.GET_MANGA_CATALOG, getMangaCatalogSaga);
}
