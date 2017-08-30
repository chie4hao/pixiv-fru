import { combineReducers } from 'redux';
import login from './login';
import settings from './settings';

export default combineReducers({
  login,
  settings
});
