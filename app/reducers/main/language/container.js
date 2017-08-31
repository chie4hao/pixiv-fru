const container = {
  english: {
    title: {
      download: 'download',
      player: 'player',
      about: 'about'
    }
  },

  chs: {
    title: {
      download: '下载',
      player: '动图',
      about: '关于',
      login: '登录',
      loginDialogs: {
        username: '用户名',
        password: '密码',
        captcha: '验证码',
        close: '关闭'
      }
    },
    HomePage: {
      searchParams: '搜索选项',
      searchTarget: {
        name: '搜索对象',
        attribs: ['标签（部分一致）', '标签（完全一致）', '标题／简介']
      },
      order: ['按旧排序', '按最新排序'],
      tagExistsFilter: '包含其中任意一个关键词',
      tagNotExistsFilter: '排除的关键词',
      R18Only: '仅限R-18',
      scd: '起止时间',
      ecd: '结束时间',
      ratio: '长宽比',

      wlt: '最小宽度',
      hlt: '最小高度',
      wgt: '最大宽度',
      hgt: '最大高度',

      tool: '工具',

      localStorageSave: '保存配置在本地存储中'
    }
  }
};

export default container;