const $ = require('cheerio');
const querystring = require('querystring');

const PixivOption = require('./pixivOption.js');
const htmlFetch = require('./globalFetchQueue').htmlFetch();
const config = require('./config');
const illustIdToOriginal = require('./illustIdToOriginal');

class DownloadSearch {
  constructor(arg) {
    this.searchType = typeof (arg);
    if (this.searchType === 'string') {
      const params = {};
      Object.entries(config.searchParams).forEach(([k, v]) => {
        if (v !== '') params[k] = v;
      });

      const tagExists = config.tagExistsFilter.length !== 0 ? ` (${config.tagExistsFilter.join(' OR ')})` : '';
      const tagNotExists = config.tagNotExistsFilter.length !== 0 ? ` -${config.tagNotExistsFilter.join(' -')}` : '';

      params.word = `${arg}${tagExists}${tagNotExists}`;

      this.searchUrl = `https://www.pixiv.net/search.php?${querystring.stringify(params)}&p=`;
    } else if (this.searchType === 'number') {
      this.searchUrl = `https://www.pixiv.net/member_illust.php?id=${arg}&type=all&p=`;
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
    const $1 = $.load(await htmlFetch(`${this.searchUrl}1`, new PixivOption('GET', 'http://www.pixiv.net/')));
    if ($1('body').attr('class').indexOf('not-logged-in') !== -1) {
      throw new Error('Not Logged In');
    }
    const span = $1('#wrapper ._unit .count-badge');
    return span.text().match(/^\d*/)[0];
  }

  async downloadSearchStr() {
    return Promise.all(Array.from({ length: this.pageCount }).map((value, index) => {
      const page = index + 1;
      return (async () => {
        const htmlDecoded = await htmlFetch(`${this.searchUrl}${page}`, new PixivOption('GET', 'http://www.pixiv.net/'));
        const imageWork = $('#wrapper ._unit .column-search-result .image-item', htmlDecoded);
        const illustIdArray = [];

        Array.from(imageWork).forEach(imageItem => {
          const illustId = $('.work', imageItem)[0].attribs.href.match(/\d*$/)[0];
          const bookmark = $('ul .bookmark-count', imageItem)[0];
          const bookmarkCount = bookmark ? bookmark.children[1].data : 0;
          if (bookmarkCount >= config.minimumBookmark) illustIdArray.push({ illustId });
        });

        return Promise.all(illustIdArray.map(illust =>
          (async () => illustIdToOriginal(illust.illustId))()
        ));
      })();
    }));
  }

  async downloadAuthorId() {
    return Promise.all(Array.from({ length: this.pageCount }).map((value, index) => {
      const page = index + 1;
      return (async () => {
        const htmlDecoded = await htmlFetch(`${this.searchUrl}${page}`, new PixivOption('GET', 'http://www.pixiv.net/'));
        const imageWork = $('#wrapper ._unit ._image-items .image-item .work', htmlDecoded);
        return Promise.all(Array.from(imageWork).map(imageItem => {
          const illustId = imageItem.attribs.href.match(/\d*$/)[0];
          return (async () => illustIdToOriginal(illustId))();
        }));
      })();
    }));
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

const pixivDownload = arg => new DownloadSearch(arg).begin();

module.exports = { pixivDownload, pixivDownloadIllustId: illustIdToOriginal };
