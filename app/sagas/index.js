import { all, call, put, takeLatest, take } from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';
import $ from 'cheerio';

import { htmlFetchQueue } from '../utils/pixiv/globalFetchQueue';
import PixivOption from '../utils/pixiv/pixivOption';
import illustIdToOriginal from '../utils/pixiv/illustIdToOriginal';

import pixivLogin from '../utils/pixiv/login';
import { DownloadSearch, pixivDownloadIllustId } from '../utils/pixiv/pixivAPI';

import { getState } from '../store';


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

function downloadResultChange(param, value) {
  return {
    type: 'HomePage/downloadResult/change',
    param,
    value
  };
}

function downloadResultObjectChange(value) {
  return {
    type: 'HomePage/downloadResult/objectChange',
    value
  };
}

function downloadResultAddData(value, error) {
  return {
    type: 'HomePage/downloadResult/addData',
    value,
    error
  };
}

function downloadResultSearchOnePage(totalIncrease, searchIncrease) {
  return {
    type: 'HomePage/downloadResult/searchOnePage',
    totalIncrease,
    searchIncrease
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

function* downloadIllustId(illust) {
  const result = Object.assign({}, illust);
  let error = true;
  try {
    Object.assign(result, illust, yield call(illustIdToOriginal, illust.illustId));
    if (!result.status.startsWith('Error')) {
      error = false;
    }
  } catch (e) {
    Object.assign(result, { status: e.message });
  } finally {
    yield put(downloadResultAddData(result, error));
  }
}

function* downloadPage(index) {
  const htmlDecoded = yield call([htmlFetchQueue, htmlFetchQueue.push], `${this.searchUrl}${index + 1}`, new PixivOption('GET', 'http://www.pixiv.net/'));
  const imageWork = $('#wrapper ._unit .column-search-result #js-mount-point-search-result-list', htmlDecoded);
  const dataItems = JSON.parse(imageWork[0].attribs['data-items']);
  const illustIdArray = [];

  Array.from(dataItems).forEach(dataItem => {
    const illustId = Number.parseInt(dataItem.illustId, 10);
    const bookmarkCount = Number.parseInt(dataItem.bookmarkCount, 10);
    const imageCount = Number.parseInt(dataItem.pageCount, 10);
    const authorName = dataItem.userName;
    const minimumBookmark = getState().main.settings.downloadSettings.minimumBookmark;
    if (bookmarkCount >= minimumBookmark) {
      illustIdArray.push({
        illustId,
        bookmarkCount,
        imageCount,
        authorName
      });
    }
  });

  yield put(downloadResultSearchOnePage(dataItems.length, illustIdArray.length));
  yield all(illustIdArray.map(illust => call(downloadIllustId, illust)));
}

function* downloadAuthor(page) {
  const htmlDecoded = yield call([htmlFetchQueue, htmlFetchQueue.push], `${this.searchUrl}${page + 1}`, new PixivOption('GET', 'http://www.pixiv.net/'));
  const imageWork = $('#wrapper ._unit ._image-items .image-item .work', htmlDecoded);
  const authorName = $('#wrapper .profile .user-name', htmlDecoded)[0].children[0].data;
  return yield all(Array.from(imageWork).map(imageItem => {
    const illustId = imageItem.attribs.href.match(/\d*$/)[0];
    return call(downloadIllustId, { illustId, authorName });
  }));
}

function* search(action) {
  if (action.searchOptions.type === 'string' || action.searchOptions.type === 'number') {
    const ds = new DownloadSearch(action.searchOptions);
    const imageCount = Math.min(yield call([ds, ds.fetchImageCount]), 40000);
    yield put(batchActions([snackbarsOpen(imageCount), downloadProcessChange('open', true)]));
    yield take('saga_allDownload');

    yield put({ type: 'HomePage/downloadResult/begin', processLength: imageCount });

    if (action.searchOptions.type === 'string') {
      yield all(Array.from({
        length: Math.ceil(imageCount / 40)
      }).map((value, index) => call([ds, downloadPage], index)));
    } else {
      yield all(Array.from({
        length: Math.ceil(imageCount / 20)
      }).map((value, index) => call([ds, downloadAuthor], index)));
    }

    yield put({ type: 'HomePage/downloadResult/end' });
  } else if (action.searchOptions.type === 'illustId') {
    const a = yield call(pixivDownloadIllustId, action.searchOptions.text);
    yield put(snackbarsOpen(JSON.stringify(a)));
  }
}

function* mySage() {
  yield takeLatest('saga_loginRequest', login);
  yield takeLatest('saga_search', search);
}

export default mySage;
