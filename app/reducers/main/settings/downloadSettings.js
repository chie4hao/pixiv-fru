export const initialState = {
  PHPSESSID: '8318723_5b8558536e61e7f94b98feac57a2cf50',

    // 是否下载普通单图
  OriginModel: true,

    // 是否下载多图的illustId,默认true基本不需要改
  mangaModel: true,

    // 是否下载动图
  playerModel: true,

    // 最小收藏数
  minimumBookmark: 0,

    // 最大并行原画请求数量和Html请求数量,网速好可以适当调高一点,太高可能会被封IP？
  OriginalGetCount: 8,
  HtmlGetCount: 3,

    // 请求超时时间(ms)
  htmlGetTimeout: 30000,
  originalOneGetTimeOut: 30000,

    // 最大重传次数(超时或者网络错误时重传)
  htmlGetRetransmissionCount: 3,
  originalOneRetransmissionCount: 4
};

export default function downloadSettings(state = initialState, action) {
  switch (action.type) {
    case 'main/setting/downloadSettings/change':
      return Object.assign({}, state, {
        [action.param]: action.value
      });
    default:
      return state;
  }
}
