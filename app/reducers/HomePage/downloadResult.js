import { combineReducers } from 'redux';

const dataInitialState = [
];

const tableInitialState = {
  open: false,
  selected: [],
  order: 'desc',
  orderBy: 'name',
  message: 'sldkfj'
};

function resultData(state = dataInitialState, action) {
  switch (action.type) {
    case 'HomePage/downloadResult/addData':
      if (state.some(a => a.illustId === action.value.illustId)) return state;
      return [...state, action.value];
    case 'HomePage/downloadResult/sortTable':
      return state.sort(
        (a, b) => (action.order === 'desc' ? b[action.orderBy] > a[action.orderBy] : a[action.orderBy] > b[action.orderBy]),
      );
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
