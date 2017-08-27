import { combineReducers } from 'redux';
import download from './download';
import searchParams from './searchParams';

export default combineReducers({
  download,
  searchParams
});
