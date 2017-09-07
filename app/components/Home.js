// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

import styles from './Home.css';
import SearchParamsDialogs from '../containers/SearchParamsDialogs';

class Home extends Component {
  props: {
    HomePage: {},
    searchOptions: {},
    searchOptionsChange: () => void,
    DownloadSearchChunk: () => void
  }
  state = {
    searchParamsOpen: false
  };

  render() {
    const { HomePage, searchOptions, searchOptionsChange, DownloadSearchChunk } = this.props;
    return (
      <div>
        <Button onClick={() => this.setState({ searchParamsOpen: true })}>
          Open simple dialog
        </Button>
        <SearchParamsDialogs
          searchParamsOpen={this.state.searchParamsOpen}
          searchParamsRequestClose={() => this.setState({ searchParamsOpen: false })}
        />
        <TextField
          label={HomePage.searchTextField}
          value={searchOptions.text}
          margin="normal"
          onChange={(event) => searchOptionsChange(event.target.value)}
        />
        <Button onClick={() => DownloadSearchChunk(searchOptions.text, 'string')}>
          ddddd
        </Button>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/about">to Counter</Link>
        </div>
      </div>
    );
  }
}

export default Home;
