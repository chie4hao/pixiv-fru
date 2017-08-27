

export const initialState = {

      // 包含其中任意一个关键词
  // tagExistsFilter: [],
  tagExistsFilter: '',

      // 排除的关键词
  tagNotExistsFilter: 'BL 腐 漫画 講座 刀剣乱 松 黒子 弱虫ペダル 世界一初恋 進撃の巨人 ハイキュー 銀魂 アザゼルさん',

      // 搜索'标签'或者'标题/简介','s_tag' or 's_tc' or's_tag_full'
  s_mode: 0,

      // 排序方法，目前支持'date'(按旧排序)和'date_d'(按最新排序)
  order: true,

      // 是否只下载R18？！！ '1' or ''
  r18: false,

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
};

export default function searchParams(state = initialState, action) {
  switch (action.type) {
    case 'HomePage/searchParams/change':
      return Object.assign({}, state, {
        [action.param]: action.value
      });
    default:
      return state;
  }
}
