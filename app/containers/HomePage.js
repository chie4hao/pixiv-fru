// @flow
// import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as HomeActions from '../actions/Home';

/* export default class HomePage extends Component {
  render() {
    return (
      <Home />
    );
  }
}*/

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(HomeActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
