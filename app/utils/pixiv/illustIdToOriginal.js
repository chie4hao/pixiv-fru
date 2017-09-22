import $ from 'cheerio';

import PixivOption from './pixivOption';
import { getState } from '../../store';
import { htmlFetchQueue, originalFetchQueue } from './globalFetchQueue';

const illustIdOriginal = async (illustId) => {
  const mediumUrl = `https://www.pixiv.net/member_illust.php?mode=medium&illust_id=${illustId}`;
  const wrapper = $('#wrapper', await htmlFetchQueue.push(mediumUrl, new PixivOption('GET', 'http://www.pixiv.net/')));

  const worksDisplay = $('.works_display', wrapper);

  if ($('img', worksDisplay).length === 0) throw new Error('Not Logged In');

  const name = $('.title', wrapper)[0].children[0].data;
  const filepath = './app/utils/pixiv/resources/';

  const config = getState().main.settings.downloadSettings;
  const bookmarkCount = Number.parseInt($('.work-info dl .rated-count', wrapper)[0].children[0].data, 10);

  if ($('.player', worksDisplay).length !== 0) {
    if (!config.playerModel) return { name, status: '已过滤', type: 'ugoira', bookmarkCount, imageCount: 1 };

    const ugoiraUrl = `https://www.pixiv.net/member_illust.php?mode=ugoira_view&illust_id=${illustId}`;
    const ugoiraText = await htmlFetchQueue.push(ugoiraUrl, new PixivOption('GET', mediumUrl));
    const a = ugoiraText.match(/https:\\\/\\\/.+\\\/img-zip-ugoira\\\/img.+zip/)[0].replace(/\\/g, '');
    const status = await originalFetchQueue.push(a, new PixivOption('GET', ugoiraUrl), `${filepath}${illustId}_${name}.zip`);

    return {
      name,
      status,
      type: 'ugoria',
      bookmarkCount,
      imageCount: 1
    };
  } else if ($('a', worksDisplay).length !== 0) {
    // 漫画模式
    const mangaUrl = `https://www.pixiv.net/member_illust.php?mode=manga&illust_id=${illustId}`;
    const mangaText = await htmlFetchQueue.push(mangaUrl, new PixivOption('GET', mediumUrl));
    // const count = $('.page-menu .total', mangaText).text();
    // 65047449 not run, debug tomorrow
    const urlList = Array.prototype.map.call($('#main .manga .item-container a', mangaText), a => `https://www.pixiv.net${a.attribs.href}`);

    if (!config.mangaModel) return { name, status: '已过滤', type: 'manga', bookmarkCount, imageCount: urlList.length };

    const allResult = await Promise.all(urlList.map((mangaOriginal =>
      (async () => {
        const mangaOriginalUrl = $('img', await htmlFetchQueue.push(mangaOriginal, new PixivOption('GET', mangaUrl))).attr('src');
        // 这句不安全
        const mangaOriginalType = mangaOriginalUrl.match(/_p\d*\.\w*$/)[0];
        const filename = `${illustId}_${name}${mangaOriginalType}`.replace(/\\|\/|\?|\*|:|"|<|>|\|/g, '');
        return originalFetchQueue.push(mangaOriginalUrl, new PixivOption('GET', mangaOriginal), filepath + filename);
      })()
    )));
    const result = allResult.filter(a => a !== '成功' && a !== '已存在').join(' ');

    return {
      name,
      status: result !== '' ? result : '全部成功',
      type: 'manga',
      bookmarkCount,
      imageCount: urlList.length
    };
  }
  // 单图

  if (!config.OriginModel) return { name, status: '已过滤', type: 'illustrations', bookmarkCount, imageCount: 1 };
  const imageUrl = $('._illust_modal img', wrapper).attr('data-src');
  const imageType = imageUrl.match(/\.\w*$/)[0];
  const filename = `${illustId}_${name}${imageType}`.replace(/\\|\/|\?|\*|:|"|<|>|\|/g, '');
  const status = await originalFetchQueue.push(imageUrl, new PixivOption('GET', mediumUrl), filepath + filename);

  return {
    name,
    status,
    type: 'illustrations',
    bookmarkCount,
    imageCount: 1
  };
};

export default illustIdOriginal;

// illustIdOriginal(42050112).then(a => console.log(a)).catch(e => console.log(e));
