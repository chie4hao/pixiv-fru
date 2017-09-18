import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import DownloadResultDialogs from '../components/DownloadResultDialogs';
/*
const getSmodeSelected = createSelector(
  state => state.HomePage.searchParams.s_mode,
  pathname => ['/', '/player', '/about'].findIndex(value => value === pathname)
);
*/
function mapStateToProps(state) {
  return {
    downloadResultText: state.main.settings.language.HomePage.downloadResult,
    downloadResult: state.HomePage.downloadResult
  };
}

function downloadResultChange(param, value) {
  return {
    type: 'HomePage/downloadResult/change',
    param,
    value
  };
}

function downloadResultObjectChange(value) {
  return {
    type: 'HomePage/downloadResult/objectChange',
    value
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ downloadResultChange, downloadResultObjectChange }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(DownloadResultDialogs);
