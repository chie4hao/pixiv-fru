/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import App from './containers/App';
import HomePage from './containers/HomePage';
import About from './components/AboutPage';
// import CounterPage from './containers/CounterPage';

const mapStateToProps = state => ({
  location: state.router.location
});

const ConnectedSwitch = connect(mapStateToProps)(Switch);

export default () => (
  <App>
    <ConnectedSwitch>
      <Route path="/about" component={About} />
      <Route path="/" component={HomePage} />
    </ConnectedSwitch>
  </App>
);
