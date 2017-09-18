import { combineReducers } from 'redux';
import snackbars from './snackbars';
import searchParams from './searchParams';
import searchOptions from './searchOptions';
import downloadProcess from './downloadProcess';
import downloadResult from './downloadResult';

export default combineReducers({
  snackbars,
  searchParams,
  searchOptions,
  downloadProcess,
  downloadResult
});
