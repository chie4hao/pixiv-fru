// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import styles from './Home.css';
import SearchParamsDialogs from '../containers/SearchParamsDialogs';

class Home extends Component {
  props: {
    HomePage: {}
  }
  state = {
    searchParamsOpen: false
  };

  render() {
    // const { classes, HomePage } = this.props;
    return (
      <div>
        <Button onClick={() => this.setState({ searchParamsOpen: true })}>Open simple dialog</Button>
        <SearchParamsDialogs
          searchParamsOpen={this.state.searchParamsOpen}
          searchParamsRequestClose={() => this.setState({ searchParamsOpen: false })}
        />
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/about">to Counter</Link>
        </div>
      </div>
    );
  }
}

export default Home;
