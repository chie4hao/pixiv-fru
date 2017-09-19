import $ from 'cheerio';
import querystring from 'querystring';
import { getState, dispatch } from '../../store';
import { htmlFetchQueue } from './globalFetchQueue';
import PixivOption from './pixivOption';
import illustIdToOriginal from './illustIdToOriginal';

class DownloadSearch {

  constructor(searchOptions) {
    this.searchType = searchOptions.type;
    const searchParams = getState().HomePage.searchParams;

    if (this.searchType === 'string') {
      const params = {};

      if (searchParams.type !== 0) params.type = ['', 'illust', 'manga', 'ugoira'][searchParams.type];

      params.s_mode = ['s_tag', 's_tag_full', 's_tc'][searchParams.s_mode];

      if (searchParams.mode === 1) params.mode = 'safe';
      if (searchParams.mode === 2) params.mode = 'r18';

      params.order = searchParams.order ? 'date_d' : 'date';

      ['wlt', 'hlt', 'wgt', 'hgt', 'ratio', 'tool', 'scd', 'ecd'].forEach(a => {
        if (searchParams[a] !== '') params[a] = searchParams[a];
      });

      const tagExistsArray = searchParams.tagExistsFilter.split(' ');
      const tagNotExistsArray = searchParams.tagNotExistsFilter.split(' ');

      const tagExists = tagExistsArray[0] !== '' ? ` (${tagExistsArray.join(' OR ')})` : '';
      const tagNotExists = tagNotExistsArray[0] !== '' ? ` -${tagNotExistsArray.join(' -')}` : '';

      params.word = `${searchOptions.text}${tagExists}${tagNotExists}`;

      this.searchUrl = `https://www.pixiv.net/search.php?${querystring.stringify(params)}&p=`;
    } else if (this.searchType === 'number') {
      this.searchUrl = `https://www.pixiv.net/member_illust.php?id=${searchOptions.text}&type=all&p=`;
    } else throw new TypeError(`The arg type '${this.searchType}' unaccepted`);
  }

  // old method to fetch pageCount
  /*
  async searchStrMaximumPage(begin, end) {
    if (begin === end) return begin;
    const currentPage = Math.floor((begin + end) / 2);
    const unit = $('#wrapper ._unit', await htmlFetch(`${this.searchUrl}${currentPage}`, new PixivOption('GET', 'http://www.pixiv.net/')));
    const imageWorkCount = $('.column-search-result .image-item .work', unit).length;
    if (imageWorkCount === 40) {
      const pager = $('.column-order-menu .pager-container ul li a', unit);
      const currentMaxpage = Math.max(...Array.prototype.map.call(pager, a => a.children[0].data));
      if (currentMaxpage - currentPage < 4) return Math.max(currentMaxpage, currentPage);
      return this.searchStrMaximumPage(currentMaxpage, end);
    } else if (imageWorkCount === 0) {
      if (currentPage <= 1) return 0;
      return this.searchStrMaximumPage(begin, currentPage - 1);
    }
    return currentPage;
  }

  async authorIdMaxinumPage(currentPage) {
    const htmlDecoded = await htmlFetch(`${this.searchUrl}${currentPage}`, new PixivOption('GET', 'http://www.pixiv.net/'));
    const pager = $('#wrapper .column-order-menu .pager-container ul li a', htmlDecoded);
    if (pager.length === 0) {
      if (currentPage === 1 && $('#wrapper .layout-column-2 .image-item', htmlDecoded).length !== 0)
        return 1;
      return 0;
    }
    const currentMaxpage = Math.max(...Array.prototype.map.call(pager, a => a.children[0].data));
    if (currentMaxpage - currentPage < 4) return Math.max(currentMaxpage, currentPage);
    return this.authorIdMaxinumPage(currentMaxpage);
  }
  */

  async fetchImageCount() {
    const $1 = $.load(await htmlFetchQueue.push(`${this.searchUrl}1`, new PixivOption('GET', 'http://www.pixiv.net/')));
    if ($1('body').attr('class').indexOf('not-logged-in') !== -1) {
      throw new Error('fetchImageCount ERROR: Not Logged In');
    }

    if (this.searchType === 'number') {
      this.authorName = $1('#wrapper .layout-a .profile .username').text;
    }

    const span = $1('#wrapper ._unit .count-badge');
    return span.text().match(/^\d*/)[0];
  }

  async downloadSearchStr() {
    return Promise.all(Array.from({
      length: this.pageCount > 1000 ? 1000 : this.pageCount
    }).map((value, index) =>
      (async () => {
        const htmlDecoded = await htmlFetchQueue.push(`${this.searchUrl}${index + 1}`, new PixivOption('GET', 'http://www.pixiv.net/'));
        const imageWork = $('#wrapper ._unit .column-search-result #js-mount-point-search-result-list', htmlDecoded);

        const dataItems = JSON.parse(imageWork[0].attribs['data-items']);
        const illustIdArray = [];
        Array.from(dataItems).forEach(dataItem => {
          const illustId = dataItem.illustId;
          const bookmarkCount = dataItem.bookmarkCount;
          const imageCount = dataItem.pageCount;
          const authorName = dataItem.userName;
          const minimumBookmark = getState().main.settings.downloadSettings.minimumBookmark;
          if (bookmarkCount >= minimumBookmark) {
            illustIdArray.push({ illustId,
              bookmarkCount,
              imageCount,
              authorName
            });
          }
        });
        return Promise.all(illustIdArray.map(illust =>
          (async () => {
            const result = await illustIdToOriginal(illust.illustId);
            // if (result.status !== '已存在') {
              dispatch({
                type: 'HomePage/downloadResult/addData', value: Object.assign({}, illust, result)
              });
            // }
            return 0;
          })()
        ));
      })()
    ));
  }

  async downloadAuthorId() {
    return Promise.all(Array.from({ length: this.pageCount }).map((value, index) => {
      const page = index + 1;
      return (async () => {
        const htmlDecoded = await htmlFetchQueue.push(`${this.searchUrl}${page}`, new PixivOption('GET', 'http://www.pixiv.net/'));
        const imageWork = $('#wrapper ._unit ._image-items .image-item .work', htmlDecoded);
        return Promise.all(Array.from(imageWork).map(imageItem => {
          const illustId = imageItem.attribs.href.match(/\d*$/)[0];
          return (async () => illustIdToOriginal(illustId))();
        }));
      })();
    }));
  }

  async downloadAll() {
    switch (this.searchType) {
      case 'string':
        this.pageCount = Math.ceil(this.imageCount / 40);
        return this.downloadSearchStr();
      case 'number':
        this.pageCount = Math.ceil(this.imageCount / 20);
        return this.downloadAuthorId();
      default:
        return 0;
    }
  }

  async begin() {
    const imageCount = await this.fetchImageCount();
    switch (this.searchType) {
      case 'string':
        this.pageCount = Math.ceil(imageCount / 40);
        return this.downloadSearchStr();
      case 'number':
        this.pageCount = Math.ceil(imageCount / 20);
        return this.downloadAuthorId();
      default:
        return 0;
    }
  }
}

const pixivDownload = searchOptions => new DownloadSearch(searchOptions).begin();

export { pixivDownload, illustIdToOriginal as pixivDownloadIllustId, DownloadSearch };
