// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { push } from 'react-router-redux';

import styles from './Home.css';

export default class Home extends Component {
  props: {
    historyPush: () => void
  };

  render() {
    const { historyPush } = this.props;
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <RaisedButton onClick={() => {historyPush('/counter')}}
            label={'Add'} backgroundColor={'red'} />
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    );
  }
}
