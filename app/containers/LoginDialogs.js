import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { batchActions } from 'redux-batched-actions';

import LoginDialogs from '../components/LoginDialogs';
import pixivLogin from '../utils/pixiv/login';
/*
const getSmodeSelected = createSelector(
  state => state.HomePage.searchParams.s_mode,
  pathname => ['/', '/player', '/about'].findIndex(value => value === pathname)
);
*/
function mapStateToProps(state) {
  return {
    title: state.main.settings.language.title,
    login: state.main.login
  };
}

function loginChange(a, b) {
  return {
    type: 'main/login/change',
    param: a,
    value: b
  };
}

function loginSagas(username, password) {
  return {
    type: 'saga_loginRequest',
    username,
    password
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginChange, loginSagas }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginDialogs);
