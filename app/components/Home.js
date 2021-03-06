// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { FormlLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Input, { InputLabel } from 'material-ui/Input';
import Grid from 'material-ui/Grid';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

import styles from './Home.css';
import SearchParamsDialogs from '../containers/SearchParamsDialogs';
import DownloadResultDialogs from '../containers/DownloadResultDialogs';

class Home extends Component {
  props: {
    HomePage: {},
    searchOptions: {},
    downloadProcess: {},
    downloadResultOpen: () => void,
    searchOptionsChange: () => void,
    sagaSearch: () => void,
    allDownload: () => void,
    classes: {}
  }

  state = {
    searchParamsOpen: false
  };

  render() {
    const {
      HomePage,
      searchOptions,
      downloadProcess,
      downloadResultOpen,
      searchOptionsChange,
      sagaSearch,
      allDownload,
      classes
    } = this.props;

    return (
      <Grid
        container
        className={classes.main}
        alignItems="center"
        direction="row"
        justify="center"
        spacing={0}
      >
        <Grid
          container
          className={classes.searchContainer}
          alignItems="center"
          direction="row"
          justify="center"
          spacing={16}
        >
          <div className={styles.pixivIcon} />
          <Grid item xs={12}>
            <FormControl className={classes.searchForm}>
              <InputLabel htmlFor="name-simple">{HomePage.searchTextField}</InputLabel>
              <Input
                value={searchOptions.text}
                onChange={(event) => searchOptionsChange('text', event.target.value)}
              />
            </FormControl>
            <FormControl className={classes.searchType}>
              <InputLabel htmlFor="name-error">{HomePage.searchType.title}</InputLabel>
              <Select
                value={searchOptions.type}
                onChange={(event) => searchOptionsChange('type', event.target.value)}
                input={<Input id="name-error" />}
              >
                <MenuItem value="string">{HomePage.searchType.string}</MenuItem>
                <MenuItem value="number">{HomePage.searchType.number}</MenuItem>
                <MenuItem value="illustId">{HomePage.searchType.illustId}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* <Grid item xs={6}>
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
              </Grid> */}
          <SearchParamsDialogs
            searchParamsOpen={this.state.searchParamsOpen}
            searchParamsRequestClose={() => this.setState({ searchParamsOpen: false })}
          />
          <DownloadResultDialogs />
          {downloadProcess.open ? <Grid item xs={4} /> : <Grid item xs={6} />
          }
          <Grid item xs={2}>
            <Button raised onClick={() => this.setState({ searchParamsOpen: true })}>
              {HomePage.searchParams.title}
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button raised onClick={() => sagaSearch(searchOptions)} color="primary">
              {HomePage.searchStart}
            </Button>
          </Grid>
          {downloadProcess.open ? <Grid item xs={2}>
            <Button raised disabled={!downloadProcess.open} onClick={allDownload} color="accent">
              {HomePage.downloadStart}
            </Button>
          </Grid> : null
          }
          <Grid item xs={2}>
            <Button raised onClick={downloadResultOpen}>
              {HomePage.downloadResult.title}
            </Button>
          </Grid>
        </Grid>

        { /* downloadProcess.open ?
          <Button disabled={!downloadProcess.open} onClick={allDownload}>{HomePage.downloadStart}</Button> : null */ }
        {/* <div className={styles.container} data-tid="container">
            <h2>Home</h2>
            <Link to="/about">to Counter</Link>
          </div> */}
      </Grid>
    );
  }
}

const muiStyles = theme => ({
  main: {
    height: 'calc(100vh - 72px)',
    flexGrow: 1,
    textAlign: 'center'
  },
  searchContainer: {
    height: 150,
    width: 700
  },
  searchForm: {
    width: 500,
    marginRight: 12,
  },
  searchType: {
    width: 150,
    marginLeft: 12
  },
  textField: {
    width: 250
  }
});

export default withStyles(muiStyles)(Home);
