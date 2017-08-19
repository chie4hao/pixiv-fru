// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as IndexActions from '../actions/index';

const favoritesIcon = <FontIcon>favorite</FontIcon>;

function mapStateToProps(state) {
  return {
    selected: ['/', '/player', '/about'].findIndex(value => value === state.router.location.pathname)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(IndexActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(class App extends Component {
  props: {
    historyPush: () => void,
    back: () => void,
    forward: () => void,
    children: Children,
    selected: number
  };

  render() {
    const { historyPush, back, forward, children, selected } = this.props;

    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <FontIcon className="fa fa-arrow-left" onClick={back} />
            <FontIcon className="fa fa-arrow-right" onClick={forward} />
            <BottomNavigation selectedIndex={selected}>
              <BottomNavigationItem
                label="下载"
                icon={favoritesIcon}
                onClick={() => historyPush('/')}
              />
              <BottomNavigationItem
                label="动图"
                icon={favoritesIcon}
                onClick={() => historyPush('/player')}
              />
              <BottomNavigationItem
                label="关于"
                icon={favoritesIcon}
                onClick={() => historyPush('/about')}
              />
            </BottomNavigation>
          </ToolbarGroup>
          <ToolbarGroup>
            <FontIcon className="fa fa-window-minimize" />
            <FontIcon className="fa fa-window-maximize" />
            <FontIcon className="fa fa-close" />
          </ToolbarGroup>
        </Toolbar>
        {children}
      </div>
    );
  }
});
