// @flow
import React, { Component } from 'react';
import type { Children } from 'react';

import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
// import Button from 'material-ui/Button';
import Tabs, { Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

import * as IndexActions from '../actions/index';

// const favoritesIcon = <FontIcon>favorite</FontIcon>;

const getSelected = createSelector(
  state => state.router.location.pathname,
  pathname => ['/', '/player', '/about'].findIndex(value => value === pathname)
);

function mapStateToProps(state) {
  return {
    selected: getSelected(state),
    titleName: state.language.title
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(IndexActions, dispatch);
}

const favoritesIcon = <Icon className="fa fa-arrow-left" />;

export default connect(mapStateToProps, mapDispatchToProps)(class App extends Component {
  props: {
    historyPush: () => void,
    back: () => void,
    forward: () => void,
    children: Children,
    selected: number,
    titleName: object
  };
  render() {
    const { historyPush, back, forward, children, selected, titleName } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="default">
              <Icon className="fa fa-arrow-left" onClick={back} />
            </IconButton>
            <IconButton color="default">
              <Icon className="fa fa-arrow-right" onClick={forward} />
            </IconButton>
            <Tabs value={selected} onChange={() => {}} >
              <Tab
                label={titleName.download}
                icon={favoritesIcon}
                onClick={() => historyPush('/')}
              />
              <Tab
                label={titleName.player}
                icon={favoritesIcon}
                onClick={() => historyPush('/player')}
              />
              <Tab
                label={titleName.about}
                icon={favoritesIcon}
                onClick={() => historyPush('/about')}
              />
            </Tabs>
            {/* <IconButton color="default">
              <Icon className="fa fa-window-minimize" />
            </IconButton>
            <IconButton color="default">
              <Icon className="fa fa-window-maximize" />
            </IconButton>
            <IconButton color="default">
              <Icon className="fa fa-close" />
            </IconButton> */}
          </Toolbar>
        </AppBar>
        {children}
      </div>
    );
  }
});
