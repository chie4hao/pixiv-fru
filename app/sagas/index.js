import { call, put, takeLatest } from 'redux-saga/effects';
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

function* login(action) {
  try {
    const a = yield call(pixivLogin, action.username, action.password);
    yield put(batchActions([loginChange('PHPSESSID', a), snackbarsOpen(`登录成功，获得PHPSESSID：${a}`), loginChange('open', false)]));
  } catch (e) {
    yield put(snackbarsOpen(e.message));
  }
}
/*
function DownloadSearchChunk(searchOptions) {
  return (dispatch) => {
    if (searchOptions.type === 'string') {

      const a = new DownloadSearch(searchOptions);
      a.fetchImageCount().then(b => console.log(b)).catch(e => { throw e; });


      pixivDownload(searchOptions).then(a => console.log(a))
        .catch(e => { throw e; });
    } else if (searchOptions.type === 'illustId') {
      pixivDownloadIllustId(searchOptions.text).then(a => console.log(a))
        .catch(e => { throw e; });
    }
  };
}
*/
function* search(action) {
  console.log(action);
  if (action.searchOptions.type === 'string') {
    const a = new DownloadSearch(action.searchOptions);
    console.log(a);
    const b = yield call([a, a.fetchImageCount]);
    yield put(snackbarsOpen(b.toString()));
  }
}

function* mySage() {
  yield takeLatest('saga_loginRequest', login);
  yield takeLatest('saga_search', search);
  yield takeLatest('saga_loginReque111st', login);
}

export default mySage;
