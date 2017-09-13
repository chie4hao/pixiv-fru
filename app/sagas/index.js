import { call, put, takeLatest } from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';
import pixivLogin from '../utils/pixiv/login';

function snackbarsOpen(message) {
  return {
    type: 'HomePage/snackbars/open',
    message
  };
}

function loginChange(a, b) {
  return {
    type: 'main/login/change',
    param: a,
    value: b
  };
}

function* login(action) {
  try {
    const a = yield call(pixivLogin, action.username, action.password);
    yield put(batchActions([loginChange('PHPSESSID', a), snackbarsOpen(`登录成功，获得PHPSESSID：${a}`), loginChange('open', false)]));
  } catch (e) {
    yield put(snackbarsOpen(e.message));
  }
}

function* mySage() {
  yield takeLatest('saga_loginRequest', login);
}

export default mySage;
