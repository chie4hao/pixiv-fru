import { call, put, takeLatest, take } from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';
import pixivLogin from '../utils/pixiv/login';
import { DownloadSearch, pixivDownload, pixivDownloadIllustId } from '../utils/pixiv/pixivAPI';

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

function downloadProcessChange(a, b) {
  return {
    type: 'HomePage/downloadProcess/change',
    param: a,
    value: b
  };
}

function downloadSettingsChange(param, value) {
  return {
    type: 'main/setting/downloadSettings/change',
    param,
    value
  };
}


function* login(action) {
  try {
    const a = yield call(pixivLogin, action.username, action.password);
    yield put(batchActions([
      loginChange('PHPSESSID', a),
      snackbarsOpen(`登录成功，获得PHPSESSID：${a}`),
      loginChange('open', false),
      downloadSettingsChange('PHPSESSID', '')
    ]));
  } catch (e) {
    yield put(snackbarsOpen(e.message));
  }
}

function* search(action) {
  if (action.searchOptions.type === 'string' || action.searchOptions.type === 'number') {
    const ds = new DownloadSearch(action.searchOptions);
    const imageCount = yield call([ds, ds.fetchImageCount]);
    yield put(batchActions([snackbarsOpen(imageCount), downloadProcessChange('open', true)]));
    yield take('saga_allDownload');
    ds.imageCount = imageCount;
    const result = yield call([ds, ds.downloadAll]);
    console.log(result);
  } else if (action.searchOptions.type === 'illustId') {
    const a = yield call(pixivDownloadIllustId, action.searchOptions.text);
    yield put(snackbarsOpen(a.toString()));
  }
}

function* mySage() {
  yield takeLatest('saga_loginRequest', login);
  yield takeLatest('saga_search', search);
}

export default mySage;
