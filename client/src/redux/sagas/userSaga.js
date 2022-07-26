import { put } from 'redux-saga/effects';
import * as actionCreators from '../actions/actionCreators';
import * as API from '../../api';

export function* getMeSaga(action) {
  yield put(actionCreators.getMeRequest());
  try {
    const { data: { data } } = yield API.getMe(action.payload.options);
    yield put(actionCreators.getMeSuccess(data));
  } catch (error) {
    yield put(actionCreators.getMeError(error));
    return;
  }
}