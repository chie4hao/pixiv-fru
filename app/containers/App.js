// @flow
import React, { Component } from 'react';
import type { Children } from 'react';

import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
// import Button from 'material-ui/Button';
import Tabs, { Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';
import Typography from 'material-ui/Typography';
import Fade from 'material-ui/transitions/Fade';

import LoginDialogs from './LoginDialogs';
import SettingsDrawer from './SettingsDrawer';
import * as IndexActions from '../actions/index';

// const favoritesIcon = <FontIcon>favorite</FontIcon>;

const getSelected = createSelector(
  state => state.router.location.pathname,
  pathname => ['/', '/about'].findIndex(value => value === pathname)
);

function mapStateToProps(state) {
  return {
    selected: getSelected(state),
    titleName: state.main.settings.language.title,
    snackbars: state.HomePage.snackbars,
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(IndexActions, dispatch);
}

const downloadIcon = <Icon className="fa fa-download" />;
const aboutIcon = <Icon className="fa fa-user" />;

export default connect(mapStateToProps, mapDispatchToProps)(class App extends Component {
  props: {
    historyPush: () => void,
    back: () => void,
    forward: () => void,
    children: Children,
    selected: number,
    titleName: {},
    snackbars: {},
    snackbarsClose: () => void,
    snackbarsOpen: (string) => void,
    loginChange: (string, boolean) => void
  };

  state = {
    settingDrawerOpen: false
  };

  handleSettingDrawerClose = () => {
    this.setState({ settingDrawerOpen: false });
  };

  render() {
    const {
      historyPush,
      back,
      forward,
      children,
      selected,
      titleName,
      snackbars,
      snackbarsClose,
      snackbarsOpen,
      loginChange
    } = this.props;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={snackbars.open}
          // autoHideDuration={4e3}
          onRequestClose={snackbarsClose}
          transition={Fade}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{snackbars.message}</span>}
          /* action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={snackbarsClose}
            >
              <Icon className="fa fa-close" />
            </IconButton>
          ]} */
        />
        <SettingsDrawer
          open={this.state.settingDrawerOpen}
          onRequestClose={this.handleSettingDrawerClose}
        />
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton color="default">
              <Icon className="fa fa-arrow-left" onClick={back} />
            </IconButton>
            <IconButton color="default">
              <Icon className="fa fa-arrow-right" onClick={forward} />
            </IconButton> */}
            {/* <Typography type="title" color="inherit">
              Title
            </Typography> */}
            <Tabs
              value={selected}
              onChange={() => {}}
              fullWidth
            >
              <Tab
                label={titleName.download}
                icon={downloadIcon}
                onClick={() => selected !== 0 && historyPush('/')}
              />
              {/* <Tab
                label={titleName.player}
                icon={favoritesIcon}
                onClick={() => selected !== 1 && historyPush('/player')}
              /> */}
              <Tab
                label={titleName.about}
                icon={aboutIcon}
                onClick={() => selected !== 1 && historyPush('/about')}
              />
            </Tabs>
            <IconButton
              style={{ marginRight: 40, right: 100, position: 'absolute' }}
              color="default"
            >
              <Icon className="fa fa-gear" onClick={() => this.setState({ settingDrawerOpen: true })} />
            </IconButton>
            <Button
              style={{ marginRight: 40, right: 0, position: 'absolute' }}
              onClick={() => loginChange('open', true)}
            >
              {titleName.login}
            </Button>
            <LoginDialogs />
          </Toolbar>
        </AppBar>
        {children}
      </div>
    );
  }
});
