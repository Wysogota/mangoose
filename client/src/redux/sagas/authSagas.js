import { put } from 'redux-saga/effects';
import * as actionCreators from '../actions/actionCreators';
import * as API from '../../api';

export function* signInSaga(action) {
  yield put(actionCreators.signInRequest());
  try {
    const res = yield API.signIn(action.payload.options);

    yield put(actionCreators.signInSuccess(res));
  } catch (error) {
    const { response: { data: { errors } } } = error;
    yield put(actionCreators.signInError(errors));
  }
}
