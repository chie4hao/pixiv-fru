import $ from 'cheerio';

import PixivOption from './pixivOption';
import { getState } from '../../store';
import { htmlFetchQueue, originalFetchQueue } from './globalFetchQueue';

const illustIdOriginal = async (illustId) => {
  const mediumUrl = `https://www.pixiv.net/member_illust.php?mode=medium&illust_id=${illustId}`;
  const wrapper = $('#wrapper', await htmlFetchQueue.push(mediumUrl, new PixivOption('GET', 'http://www.pixiv.net/')));

  const worksDisplay = $('.works_display', wrapper);

  if ($('img', worksDisplay).length === 0) throw new Error('Not Logged In');

  // a old method to filter, use urlSearchParams instead
  /*
  const tagsArray = $('.work-tags dl dd ul li .text', wrapper);

  let tagsStr = '';
  Array.prototype.forEach.call(tagsArray, a => {
    tagsStr += ` ${a.children[0].data}`;
  });

  if (config.tagExistsFilter.some(a => tagsStr.indexOf(a) === -1)
    || config.tagNotExistsFilter.some(b => tagsStr.indexOf(b) !== -1)) return `${illustId} 已过滤`;
  */

  const name = $('.title', wrapper)[0].children[0].data;
  const filepath = './app/utils/pixiv/resources/';

  const config = getState().main.settings.downloadSettings;

  if ($('.player', worksDisplay).length !== 0) {
    if (!config.playerModel) return `${illustId} a player 已过滤`;

    const ugoiraUrl = `https://www.pixiv.net/member_illust.php?mode=ugoira_view&illust_id=${illustId}`;
    const ugoiraText = await htmlFetchQueue.push(ugoiraUrl, new PixivOption('GET', mediumUrl));
    const a = ugoiraText.match(/https:\\\/\\\/.+\\\/img-zip-ugoira\\\/img.+zip/)[0].replace(/\\/g, '');
    return originalFetchQueue.push(a, new PixivOption('GET', ugoiraUrl), `${filepath}${illustId}_${name}.zip`);
  } else if ($('a', worksDisplay).length !== 0) {
    // 漫画模式
    if (!config.mangaModel) return `${illustId} manga 已过滤`;

    const mangaUrl = `https://www.pixiv.net/member_illust.php?mode=manga&illust_id=${illustId}`;
    const mangaText = await htmlFetchQueue.push(mangaUrl, new PixivOption('GET', mediumUrl));
    // const count = $('.page-menu .total', mangaText).text();
    const urlList = Array.prototype.map.call($('#main .manga .item-container a', mangaText), a => `https://www.pixiv.net${a.attribs.href}`);
    return Promise.all(urlList.map((mangaOriginal =>
      (async () => {
        const mangaOriginalUrl = $('img', await htmlFetchQueue.push(mangaOriginal, new PixivOption('GET', mangaUrl))).attr('src');
        // 这句不安全
        const mangaOriginalType = mangaOriginalUrl.match(/_p\d*\.\w*$/)[0];
        const filename = `${illustId}_${name}${mangaOriginalType}`.replace(/\\|\/|\?|\*|:|"|<|>|\|/g, '');
        return originalFetchQueue.push(mangaOriginalUrl, new PixivOption('GET', mangaOriginal), filepath + filename);
      })()
    )));
  }
  // 单图

  if (!config.OriginModel) return `${illustId} originImage 已过滤`;
  const imageUrl = $('._illust_modal img', wrapper).attr('data-src');
  const imageType = imageUrl.match(/\.\w*$/)[0];
  const filename = `${illustId}_${name}${imageType}`.replace(/\\|\/|\?|\*|:|"|<|>|\|/g, '');
  return originalFetchQueue.push(imageUrl, new PixivOption('GET', mediumUrl), filepath + filename);
};

export default illustIdOriginal;

// illustIdOriginal(42050112).then(a => console.log(a)).catch(e => console.log(e));
