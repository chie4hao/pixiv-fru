// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Home from '../components/Home';

function mapStateToProps(state) {
  return {
    HomePage: state.main.settings.language.HomePage
  };
}
/*
function mapDispatchToProps(dispatch) {
  return bindActionCreators(IndexActions, dispatch);
}
*/

export default connect(mapStateToProps)(Home);
