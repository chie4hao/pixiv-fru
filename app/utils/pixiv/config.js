module.exports = {
    // 此项为必需,请根据自己浏览器Cookie中的PHPSESSID更改,不更改或者不正确的PHPSESSID程序无法工作
  PHPSESSID: '8318723_1a36078b83740ddafc97692da1456100',

    // 是否下载普通单图
  OriginModel: true,

    // 是否下载多图的illustId,默认true基本不需要改
  mangaModel: true,

    // 是否下载动图
  playerModel: true,

  minimumBookmark: 0,

    // 包含其中任意一个关键词
  tagExistsFilter: [],

    // 排除的关键词
  tagNotExistsFilter: ['BL', '腐', '漫画', '講座', '刀剣乱', '松', '黒子', '弱虫ペダル', '世界一初恋', '進撃の巨人', 'ハイキュー', '銀魂', 'アザゼルさん'],
  // tagNotExistsFilter: [],

    // 最大并行原画请求数量和Html请求数量,网速好可以适当调高一点,太高可能会被封IP？
  OriginalGetCount: 8,
  HtmlGetCount: 3,

    // 请求超时时间(ms)
  htmlGetTimeout: 30000,
  originalOneGetTimeOut: 30000,

    // 最大重传次数(超时或者网络错误时重传)
  htmlGetRetransmissionCount: 3,
  originalOneRetransmissionCount: 4,

  searchParams: {
    // 搜索'标签'或者'标题/简介','s_tag' or 's_tc' or's_tag_full'
    s_mode: 's_tag',

    // 排序方法，目前支持'date'(按旧排序)和'date_d'(按最新排序)
    order: 'date_d',

    // 是否只下载R18？！！ '1' or ''
    r18: '',

    // 最小宽度
    wlt: '',

    // 最小高度
    hlt: '',

    // 最大宽度
    wgt: '',

    // 最大高度
    hgt: '',

    // 图片长宽比例
    ratio: '',

    // 使用工具
    tool: '',

    // 筛选起止时间
    scd: '',

    // 结束时间
    ecd: ''
  }
};
