// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { DownloadSearch, pixivDownload, pixivDownloadIllustId } from '../utils/pixiv/pixivAPI';

import Home from '../components/Home';

function mapStateToProps(state) {
  return {
    HomePage: state.main.settings.language.HomePage,
    searchOptions: state.HomePage.searchOptions
  };
}

function searchOptionsChange(param, value) {
  return {
    type: 'HomePage/searchOptions/change',
    param,
    value
  };
}

function DownloadSearchChunk(searchOptions) {
  return (dispatch) => {
    if (searchOptions.type === 'string') {
      /*
      const a = new DownloadSearch(searchOptions);
      a.fetchImageCount().then(b => console.log(b)).catch(e => { throw e; });
      */

      pixivDownload(searchOptions).then(a => console.log(a))
      .catch(e => { throw e; });

    } else if (searchOptions.type === 'illustId') {
      pixivDownloadIllustId(searchOptions.text).then(a => console.log(a))
        .catch(e => { throw e; });
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
