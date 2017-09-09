import { combineReducers } from 'redux';
import language, { initialState as initialLanguage } from './language';
import downloadSettings, { initialState as initialDownloadSettings } from './downloadSettings';

export const initialState = {
  language: initialLanguage,
  downloadSettings: initialDownloadSettings
};

export default combineReducers({
  language,
  downloadSettings
});
