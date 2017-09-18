// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Home from '../components/Home';

function mapStateToProps(state) {
  return {
    HomePage: state.main.settings.language.HomePage,
    searchOptions: state.HomePage.searchOptions,
    downloadProcess: state.HomePage.downloadProcess,
    downloadResultOpen: state.HomePage.downloadResult.open
  };
}

function downloadResultOpen() {
  return {
    type: 'HomePage/downloadResult/change',
    param: 'open',
    value: true
  };
}

function searchOptionsChange(param, value) {
  return {
    type: 'HomePage/searchOptions/change',
    param,
    value
  };
}

function sagaSearch(searchOptions) {
  return {
    type: 'saga_search',
    searchOptions
  };
}

function allDownload() {
  return {
    type: 'saga_allDownload'
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchOptionsChange,
    sagaSearch,
    allDownload,
    downloadResultOpen }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
