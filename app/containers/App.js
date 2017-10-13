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

import LoginDialogs from './LoginDialogs';
import SettingsDrawer from './SettingsDrawer';
import * as IndexActions from '../actions/index';

// const favoritesIcon = <FontIcon>favorite</FontIcon>;

const getSelected = createSelector(
  state => state.router.location.pathname,
  pathname => ['/', '/player', '/about'].findIndex(value => value === pathname)
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

const favoritesIcon = <Icon className="fa fa-arrow-left" />;

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

  componentDidMount() {
    if (document.readyState === 'complete' || document.readyState === 'interactive') installTitlebar();
    else document.addEventListener('DOMContentLoaded', installTitlebar);
  }

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
        <div id="electron-titlebar" style={{ position: 'static', height: '29px', backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
        {/* <Button onClick={() => snackbarsOpen('sdlfkj')}>
          xianshi
        </Button> */}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={snackbars.open}
          autoHideDuration={4e3}
          onRequestClose={snackbarsClose}
          transition={<Slide direction="up" />}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{snackbars.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={snackbarsClose}
            >
              <Icon className="fa fa-close" />
            </IconButton>
          ]}
        />
        <SettingsDrawer
          open={this.state.settingDrawerOpen}
          onRequestClose={this.handleSettingDrawerClose}
        />
        <AppBar id="asdf" position="static">
          <Toolbar>
            {/* <IconButton color="default">
              <Icon className="fa fa-arrow-left" onClick={back} />
            </IconButton>
            <IconButton color="default">
              <Icon className="fa fa-arrow-right" onClick={forward} />
            </IconButton> */}
            <Tabs value={selected} onChange={() => {}} >
              <Tab
                label={titleName.download}
                icon={favoritesIcon}
                onClick={() => selected !== 0 && historyPush('/')}
              />
              <Tab
                label={titleName.player}
                icon={favoritesIcon}
                onClick={() => selected !== 1 && historyPush('/player')}
              />
              <Tab
                label={titleName.about}
                icon={favoritesIcon}
                onClick={() => selected !== 2 && historyPush('/about')}
              />
            </Tabs>
            <IconButton color="default">
              <Icon className="fa fa-gear" onClick={() => this.setState({ settingDrawerOpen: true })} />
            </IconButton>
            <Button onClick={() => loginChange('open', true)}>
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

function installTitlebar() {
  const titlebar = document.getElementById('electron-titlebar');

  const container = document.createElement('div');
  container.style.position = 'relative';
  titlebar.parentNode.replaceChild(container, titlebar);
  container.appendChild(titlebar);

  const content = document.createElement('div');
  content.style.width = '100%';
  content.style.height = '100%';
  content.style.position = 'absolute';

  while (titlebar.firstChild) content.appendChild(titlebar.firstChild);
  titlebar.appendChild(content);

  const platform = titlebar.getAttribute('platform') || process.platform;
  document.body.parentNode.setAttribute('electron-titlebar-platform', platform);

  const w = require('electron').remote.getCurrentWindow();
  if (!w.isResizable() || !w.isMaximizable()) titlebar.classList.add('no-maximize');
  if (!w.isMinimizable()) titlebar.classList.add('no-minimize');

  const path = require('path'),
    url = require('url');
  const basedir = path.resolve(path.dirname(require.resolve('./App')), 'titlebar');

  function createButton(type) {
    function createImage(type, display) {
      if (typeof display !== 'string') display = '';
      const img = document.createElement('img');
      img.style.display = display;
      img.className = `button-img-${type}`;

      let src;
      if (platform === 'linux') src = path.resolve(basedir, `${type}.svg`);
      else if (platform === 'win32') src = path.resolve(basedir, `caption-buttons.svg#${type}`);

      img.setAttribute('src', url.resolve('file://', src));
      return img;
    }
    const div = document.createElement('div');
    div.className = `button button-${type}`;

    if (type === 'maximize') {
      div.appendChild(createImage('maximize'));
      div.appendChild(createImage('restore', 'none'));
    } else div.appendChild(createImage(type));

    return div;
  }

  for (const x of ['close', 'minimize', 'maximize']) titlebar.appendChild(createButton(x));

    // register events
  for (const elem of document.querySelectorAll('#electron-titlebar > .button, #electron-titlebar > .button img')) {
    elem.addEventListener('dragstart', (e) => { e.preventDefault(); });
  }

  function showOrHide(elem, show) {
    if (show === true) elem.style.display = '';
    else elem.style.display = 'none';
  }

  let buttomImgMaximize = document.querySelector('#electron-titlebar > .button .button-img-maximize'),
    buttomImgRestore = document.querySelector('#electron-titlebar > .button .button-img-restore');

  w.on('maximize', () => {
    showOrHide(buttomImgMaximize, false);
    showOrHide(buttomImgRestore, true);
  });

  w.on('unmaximize', () => {
    showOrHide(buttomImgMaximize, true);
    showOrHide(buttomImgRestore, false);
  });

    // workaround for the .button is still :hover after maximize window
  for (const elem of document.querySelectorAll('#electron-titlebar > .button')) {
    elem.addEventListener('mouseover', () => {
      elem.classList.add('hover');
    });
    elem.addEventListener('mouseout', () => {
      elem.classList.remove('hover');
    });
  }

  const buttonClose = document.querySelector('#electron-titlebar > .button-close');
  if (buttonClose) {
    buttonClose.addEventListener('click', () => {
      w.close();
    });
  }

  const butonMinimize = document.querySelector('#electron-titlebar > .button-minimize');
  if (butonMinimize) {
    butonMinimize.addEventListener('click', () => {
      w.minimize();
    });
  }

  const butonMaximize = document.querySelector('#electron-titlebar > .button-maximize');
  if (butonMaximize) {
    butonMaximize.addEventListener('click', () => {
      if (!w.isMaximized()) w.maximize();
      else w.unmaximize();
    });
  }

  const link = document.createElement('link');
  link.href = path.resolve(basedir, 'titlebar.css');
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}
