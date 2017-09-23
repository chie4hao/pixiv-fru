import { combineReducers } from 'redux';

const dataInitialState = [{
  illustId: 64757031,
  bookmarkCount: 0,
  imageCount: 1,
  authorName: 'HongRTN',
  name: 'qwer',
  status: '已存在',
  type: 'illustrations'
},
{
  illustId: 64063359,
  bookmarkCount: 3,
  imageCount: 1,
  authorName: 'ASDFG',
  name: '無題',
  status: '已存在',
  type: 'illustrations'
},
{
  illustId: 64514705,
  bookmarkCount: 0,
  imageCount: 1,
  authorName: 'ndh',
  name: '무제',
  status: '已存在',
  type: 'illustrations'
},
{
  illustId: 64040483,
  bookmarkCount: 0,
  imageCount: 1,
  authorName: 'ASDFG',
  name: '摸鱼',
  status: '已存在',
  type: 'illustrations'
},
{
  illustId: 63428170,
  bookmarkCount: 0,
  imageCount: 1,
  authorName: 'ASDFG',
  name: 'Qwer Kun',
  status: '已存在',
  type: 'illustrations'
},
{
  illustId: 58043855,
  bookmarkCount: 11,
  imageCount: 1,
  authorName: 'qwerterio',
  name: 'When you hit the joke just right',
  status: '已存在',
  type: 'illustrations'
},
{
  illustId: 56110089,
  bookmarkCount: 0,
  imageCount: 1,
  authorName: 'lylove15107',
  name: '無題',
  status: '已存在',
  type: 'illustrations'
},
{
  illustId: 51276298,
  bookmarkCount: 0,
  imageCount: 1,
  authorName: 'ZFy-Maples',
  name: 'e67f62',
  status: '已存在',
  type: 'illustrations'
},
{
  illustId: 46146939,
  bookmarkCount: 0,
  imageCount: 1,
  authorName: 'aiuiomi',
  name: 'ほんの少しの写真）',
  status: '已存在',
  type: 'illustrations'
},
{
  illustId: 45428748,
  bookmarkCount: 1,
  imageCount: 1,
  authorName: 'missile',
  name: '無題',
  status: '已存在',
  type: 'illustrations'
},
{
  illustId: 40052991,
  bookmarkCount: 1,
  imageCount: 1,
  authorName: '七尾',
  name: 'ぼう',
  status: '已存在',
  type: 'illustrations'
},
{
  illustId: 37702557,
  bookmarkCount: 2,
  imageCount: 1,
  authorName: 'suryong',
  name: '朝比奈みくる <ガシャポン>',
  status: '已存在',
  type: 'illustrations'
},
{
  illustId: 27145820,
  bookmarkCount: 0,
  imageCount: 1,
  authorName: 'Alex Nevzorov',
  name: '23456dkjhngbfdsfgntiuytwsadsfbgh',
  status: '已存在',
  type: 'illustrations'
},
{
  illustId: 19505067,
  bookmarkCount: 4,
  imageCount: 1,
  authorName: 'むてんか',
  name: '低燃費おじいさん',
  status: '已存在',
  type: 'illustrations'
},
{
  illustId: 10312052,
  bookmarkCount: 7,
  imageCount: 1,
  authorName: 'BiTa',
  name: 'gdyutg',
  status: '已存在',
  type: 'illustrations'
},
{
  illustId: 1215763,
  bookmarkCount: 4,
  imageCount: 1,
  authorName: 'corto',
  name: '1',
  status: '已存在',
  type: 'illustrations'
},
{
  illustId: 55531687,
  bookmarkCount: 4,
  imageCount: 1,
  authorName: '量子きのこ',
  name: 'スマホが流行った今だからこそできる後悔',
  status: '已存在',
  type: 'ugoria'
},
{
  illustId: 1177558,
  bookmarkCount: 11,
  imageCount: 1,
  authorName: '血の生贄',
  name: '無題',
  status: '已存在',
  type: 'illustrations'
},
{
  illustId: 53043002,
  bookmarkCount: 9,
  imageCount: 22,
  authorName: 'zxc6713',
  name: 'いろいろ',
  status: '全部成功',
  type: 'manga'
},
{
  illustId: 50727058,
  bookmarkCount: 0,
  imageCount: 2,
  authorName: 'qwerterio',
  name: 'remorse',
  status: '全部成功',
  type: 'manga'
}];

const tableInitialState = {
  open: false,
  selected: [],
  order: 'asc',
  orderBy: 'illustId',
  message: 'sldkfj',

  page: 0,
  rowsPerPage: 5,

  processLength: 0,

  successCount: 0,
  errorCount: 0,
  totalCount: 0,
  searchCount: 0
};

function resultData(state = dataInitialState, action) {
  switch (action.type) {
    case 'HomePage/downloadResult/addData':
      if (state.some(a => a.illustId === action.value.illustId)) return state;
      return [...state, action.value];
    case 'HomePage/downloadResult/sortTable': {
      return (action.order === 'desc')
        ? state.sort((a, b) => (b[action.orderBy] > a[action.orderBy] ? 1 : -1))
        : state.sort((a, b) => (a[action.orderBy] > b[action.orderBy] ? 1 : -1));
    }
    default:
      return state;
  }
}

function tableState(state = tableInitialState, action) {
  switch (action.type) {
    case 'HomePage/downloadResult/change':
      return Object.assign({}, state, {
        [action.param]: action.value
      });
    case 'HomePage/downloadResult/addData':
      return Object.assign({}, state, action.error ? {
        errorCount: state.errorCount + 1
      } : {
        successCount: state.successCount + 1
      });
    case 'HomePage/downloadResult/searchOnePage':
      return Object.assign({}, state, {
        totalCount: state.totalCount + action.totalIncrease,
        searchCount: state.searchCount + action.searchIncrease
      });
    case 'HomePage/downloadResult/objectChange':
      return Object.assign({}, state, action.value);
    case 'HomePage/downloadResult/begin':
      return Object.assign({}, state, {
        processLength: action.processLength,
        successCount: 0,
        errorCount: 0,
        totalCount: 0,
        searchCount: 0
      });
    case 'HomePage/downloadResult/end':
      return Object.assign({}, state, {
        processLength: 0,
        successCount: 0,
        errorCount: 0,
        totalCount: 0,
        searchCount: 0
      });
    case 'HomePage/downloadResult/sortTable':
      return Object.assign({}, state, { order: action.order, orderBy: action.orderBy });
    default:
      return state;
  }
}

export default combineReducers({ resultData, tableState });

export const initialState = {
  resultData: dataInitialState,
  tableState: tableInitialState
};
