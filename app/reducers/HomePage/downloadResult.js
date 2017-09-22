import { combineReducers } from 'redux';

const dataInitialState = [];

const tableInitialState = {
  open: false,
  selected: [],
  order: 'asc',
  orderBy: 'name',
  message: 'sldkfj',

  page: 0,
  rowsPerPage: 5
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
    case 'HomePage/downloadResult/objectChange':
      return Object.assign({}, state, action.value);
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
