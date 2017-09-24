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
    case 'HomePage/downloadResult/begin':
      return [];
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
