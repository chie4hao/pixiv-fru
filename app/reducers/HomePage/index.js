import { combineReducers } from 'redux';
import snackbars from './snackbars';
import searchParams from './searchParams';
import searchOptions from './searchOptions';

export default combineReducers({
  snackbars,
  searchParams,
  searchOptions
});
