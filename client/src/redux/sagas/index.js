import { takeLatest } from 'redux-saga/effects';
import ACTION_TYPES from '../actions/actionTypes';
import { getMangaSaga } from './mangaSagas';

export default function* rootSaga() {
  yield takeLatest(ACTION_TYPES.GET_MANGA_REQUEST, getMangaSaga);
}
