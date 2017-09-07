// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { DownloadSearch } from '../utils/pixiv/pixivAPI';

import Home from '../components/Home';

function mapStateToProps(state) {
  return {
    HomePage: state.main.settings.language.HomePage,
    searchOptions: state.HomePage.searchOptions
  };
}

function searchOptionsChange(text) {
  return {
    type: 'HomePage/searchOptions/change',
    text
  };
}

function DownloadSearchChunk(searchText, type) {
  return (dispatch, getState) => {
    const state = getState();
    const searchParams = state.HomePage.searchParams;
    const downloadSettings = state.main.settings.downloadSettings;
    console.log(searchParams, downloadSettings);
    if (type === 'string') {
      const d = new DownloadSearch(searchText, searchParams, downloadSettings);
    }
  };
  /*
  return (dispatch, getState) => {
    pixivLogin(username, password).then(a => {
      dispatch(batchActions([loginChange('PHPSESSID', a), snackbarsOpen(`登录成功，获得PHPSESSID：${a}`), loginChange('open', false)]));
      return 0;
    }).catch(e => {
      dispatch(snackbarsOpen(e.message));
    });
  }; */
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchOptionsChange, DownloadSearchChunk }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
