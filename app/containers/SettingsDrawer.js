import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import SettingsDrawer from '../components/SettingsDrawer';
/*
const getSmodeSelected = createSelector(
  state => state.HomePage.searchParams.s_mode,
  pathname => ['/', '/player', '/about'].findIndex(value => value === pathname)
);
*/
function mapStateToProps(state) {
  return {
    settings: state.main.settings,
    SettingsDrawer: state.main.settings.language.SettingsDrawer
  };
}

function settingsChange(param, value) {
  return {
    type: 'main/setting/change',
    param,
    value
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ settingsChange }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SettingsDrawer);
