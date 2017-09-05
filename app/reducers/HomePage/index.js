import { combineReducers } from 'redux';
import snackbars from './snackbars';
import searchParams from './searchParams';

export default combineReducers({
  snackbars,
  searchParams
});
