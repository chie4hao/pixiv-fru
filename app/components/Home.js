// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { FormlLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';

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
          onChange={(event) => searchOptionsChange('text', event.target.value)}
        />
        <FormControl component="fieldset" required>
          <RadioGroup
            row
            aria-label="gender"
            name="gender"
            value={searchOptions.type}
            onChange={(event, value) => searchOptionsChange('type', value)}
          >
            <FormControlLabel value="string" control={<Radio />} label={HomePage.searchType.string} />
            <FormControlLabel value="number" control={<Radio />} label={HomePage.searchType.number} />
            <FormControlLabel value="illustId" control={<Radio />} label={HomePage.searchType.illustId} />
          </RadioGroup>
        </FormControl>
        <Button onClick={() => DownloadSearchChunk(searchOptions)}>
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
