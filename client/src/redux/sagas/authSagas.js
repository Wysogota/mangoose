import { put } from 'redux-saga/effects';
import * as actionCreators from '../actions/actionCreators';
import * as API from '../../api';

export function* signUpSaga(action) {
  yield put(actionCreators.signUpRequest());
  try {
    const { data } = yield API.signUp(action.payload.options);
    yield put(actionCreators.signUpSuccess(data));
  } catch (error) {
    yield put(actionCreators.signUpError(error));
  }
}

export function* signInSaga(action) {
  yield put(actionCreators.signInRequest());
  try {
    const { data } = yield API.signIn(action.payload.options);
    yield put(actionCreators.signInSuccess(data));
  } catch (error) {
    yield put(actionCreators.signInError(error));
  }
}

export function* signOutSaga() {
  yield put(actionCreators.signOutRequest());
  try {
    const { data } = yield API.signOut();
    yield put(actionCreators.signOutSuccess(data));
  } catch (error) {
    yield put(actionCreators.signOutError(error));
  }
}

export function* refreshTokenSaga() {
  yield put(actionCreators.refreshTokenRequest());
  try {
    const { data } = yield API.refreshToken();
    yield put(actionCreators.refreshTokenSuccess(data));
  } catch (error) {
    yield put(actionCreators.refreshTokenError(error));
  }
}
