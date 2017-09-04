import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

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

export function loginChunk(username, password) {
  return (dispatch) => {
    pixivLogin(username, password).then(a => {
      dispatch(loginChange('PHPSESSID', a));
      return 0;
    }).catch(e => {
      console.log(e);
    });
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginChange, loginChunk }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginDialogs);
