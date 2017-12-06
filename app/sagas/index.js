import { all, call, put, takeLatest, take, cancel, fork } from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';
import $ from 'cheerio';
import HttpsProxyAgent from 'https-proxy-agent';

import { htmlFetchQueue } from '../utils/pixiv/globalFetchQueue';
import PixivOption from '../utils/pixiv/pixivOption';
import illustIdToOriginal from '../utils/pixiv/illustIdToOriginal';
import { DownloadSearch } from '../utils/pixiv/pixivAPI';

import pixivLogin from '../utils/pixiv/login';

import { getState } from '../store';

function snackbarsOpen(message) {
  return {
    type: 'HomePage/snackbars/open',
    message
  };
}

function snackbarsClose() {
  return {
    type: 'HomePage/snackbars/close'
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

const delay = time => new Promise(resolve => {
  setTimeout(() => {
    resolve();
  }, time);
});

function* snackbarsAnimate(text) {
  let i = 0;
  while (true) {
    yield put(snackbarsOpen(`${text}${'.'.repeat(i)}`));
    yield call(delay, 300);
    i = (i + 1) % 6;
  }
}

function* snackbarsDelayClose() {
  yield call(delay, 4e3);
  yield put(snackbarsClose());
}

const snackbarsDelay = (() => {
  let lastTime = Date.now();
  let task;
  return function* (text) {
    const now = Date.now();
    if (now - lastTime < 4e3 && task) {
      yield cancel(task);
    }
    lastTime = Date.now();
    yield put(snackbarsOpen(`${text}`));
    task = yield call(snackbarsDelayClose);
  };
})();

function* login(action) {
  let loginTask;
  try {
    loginTask = yield fork(snackbarsAnimate, '登录中');
    const a = yield call(pixivLogin, action.username, action.password);

    if (loginTask) {
      yield cancel(loginTask);
    }

    yield fork(snackbarsDelay, `登录成功，获得PHPSESSID：${a}`);

    yield put(batchActions([
      loginChange('PHPSESSID', a),
      // snackbarsOpen(`登录成功，获得PHPSESSID：${a}`),
      loginChange('open', false),
      downloadSettingsChange('PHPSESSID', a)
    ]));
  } catch (e) {
    if (loginTask) {
      yield cancel(loginTask);
    }
    yield fork(snackbarsDelay, e.message);
  }
}

function* downloadIllustId(illust) {
  const result = Object.assign({}, illust);
  let error = true;
  try {
    Object.assign(result, yield call(illustIdToOriginal, illust.illustId), illust);
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
  const imageWork = $('#wrapper ._unit #js-mount-point-search-result-list', htmlDecoded);
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
  let searchTask;
  let imageCount;
  if (action.searchOptions.type === 'string' || action.searchOptions.type === 'number') {
    const ds = new DownloadSearch(action.searchOptions);
    try {
      searchTask = yield fork(snackbarsAnimate, '搜索中');

      imageCount = yield call([ds, ds.fetchImageCount]);
      if (searchTask) {
        yield cancel(searchTask);
      }
      yield fork(snackbarsDelay, `共找到图片${imageCount}个`);
      // yield put(batchActions([snackbarsOpen(imageCount), downloadProcessChange('open', true)]));
      yield put(downloadProcessChange('open', true));
    } catch (e) {
      if (searchTask) {
        yield cancel(searchTask);
      }
      yield fork(snackbarsDelay, e.message);
    }

    yield take('saga_allDownload');

    yield put(downloadResultChange('open', false));

    imageCount = Math.min(imageCount, 40000);
    yield put(batchActions([downloadResultChange('open', true), { type: 'HomePage/downloadResult/begin', processLength: imageCount }]));

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
    const a = yield call(illustIdToOriginal, action.searchOptions.text);
    yield put(snackbarsOpen(JSON.stringify(a)));
  }
}

function* mySage() {
  yield takeLatest('saga_loginRequest', login);
  yield takeLatest('saga_search', search);
}

export default mySage;
