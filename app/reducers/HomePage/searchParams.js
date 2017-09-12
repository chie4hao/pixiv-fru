
export const initialState = {

      // 包含其中任意一个关键词
  // tagExistsFilter: [],
  tagExistsFilter: '',

      // 排除的关键词
  tagNotExistsFilter: 'BL 腐 漫画 講座 刀剣乱 黒子 弱虫ペダル 世界一初恋 進撃の巨人 ハイキュー 銀魂 アザゼルさん',

      // 搜索类别，0 1 illust 2 manga 3 ugoria
  type: 0,

      // 搜索'标签'或者'标题/简介','s_tag' or 's_tc' or's_tag_full'   0 s_tag 1 s_tag_full 2 s_tc
  s_mode: 0,

      // 作品，0 1 safe 2 r18
  mode: 0,

      // 排序方法，目前支持'date'(按旧排序)和'date_d'(按最新排序)
  order: true,

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
