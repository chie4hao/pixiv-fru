import React, { Component } from 'react';

import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import TextField from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import Collapse from 'material-ui/transitions/Collapse';
import { htmlFetchQueue, originalFetchQueue } from '../utils/pixiv/globalFetchQueue';

class SettingsDrawer extends Component {
  props: {
    settings: {},
    settingsDrawer: {},
    open: boolean,
    onRequestClose: () => void,
    downloadSettingsChange: () => void,
    classes: {}
  }

  handleSave = () => {
    localStorage.settings = JSON.stringify(this.props.settings);
  }

  render() {
    const {
      settings,
      settingsDrawer,
      open,
      onRequestClose,
      downloadSettingsChange,
      classes
    } = this.props;
    return (
      <div>
        <Drawer
          anchor="right"
          open={open}
          onRequestClose={onRequestClose}
          // onClick={onRequestClose}
        >
          <div>
            <List
              subheader={<ListSubheader>{settingsDrawer.downloadSettingsHeader}</ListSubheader>}
              className={classes.list}
            >
              <ListItem>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.downloadSettings.proxyOpen}
                      onChange={(event, checked) => downloadSettingsChange('proxyOpen', checked)}
                    />
                }
                  label={settingsDrawer.proxyOpen}
                />
              </ListItem>
              <Collapse in={settings.downloadSettings.proxyOpen} transitionDuration="auto" unmountOnExit>
                <ListItem className={classes.nested}>
                  <TextField
                    label={settingsDrawer.proxyHost}
                    value={settings.downloadSettings.proxyHost}
                    className={classes.textField}
                    onChange={(event) => {
                      downloadSettingsChange('proxyHost', event.target.value);
                    }}
                    margin="normal"
                  />
                  <div className={classes.sizeLabel} />
                  <TextField
                    type="number"
                    label={settingsDrawer.proxyPort}
                    value={settings.downloadSettings.proxyPort}
                    className={classes.textField}
                    onChange={(event) => {
                      downloadSettingsChange('proxyPort', event.target.value);
                    }}
                    margin="normal"
                  />
                </ListItem>
              </Collapse>
              <ListItem>
                <TextField
                  label={settingsDrawer.PHPSESSID}
                  value={settings.downloadSettings.PHPSESSID}
                  onChange={(event) => downloadSettingsChange('PHPSESSID', event.target.value)}
                  fullWidth
                  margin="normal"
                />
              </ListItem>
              <ListItem>
                <TextField
                  type="number"
                  label={settingsDrawer.HtmlGetCount}
                  value={settings.downloadSettings.HtmlGetCount}
                  className={classes.textField}
                  onChange={(event) => {
                    downloadSettingsChange('HtmlGetCount', event.target.value);
                  }}
                  margin="normal"
                />
                <div className={classes.sizeLabel} />
                <TextField
                  type="number"
                  label={settingsDrawer.OriginalGetCount}
                  value={settings.downloadSettings.OriginalGetCount}
                  className={classes.textField}
                  onChange={(event) => downloadSettingsChange('OriginalGetCount', event.target.value)}
                  margin="normal"
                />
              </ListItem>
              <ListItem>
                <TextField
                  type="number"
                  label={settingsDrawer.htmlGetTimeout}
                  value={settings.downloadSettings.htmlGetTimeout}
                  className={classes.textField}
                  onChange={(event) => downloadSettingsChange('htmlGetTimeout', event.target.value)}
                  margin="normal"
                />
                <div className={classes.sizeLabel} />
                <TextField
                  type="number"
                  label={settingsDrawer.originalOneGetTimeOut}
                  value={settings.downloadSettings.originalOneGetTimeOut}
                  className={classes.textField}
                  onChange={(event) => downloadSettingsChange('originalOneGetTimeOut', event.target.value)}
                  margin="normal"
                />
              </ListItem>
              <ListItem>
                <TextField
                  type="number"
                  label={settingsDrawer.htmlGetRetransmissionCount}
                  value={settings.downloadSettings.htmlGetRetransmissionCount}
                  className={classes.textField}
                  onChange={(event) => downloadSettingsChange('htmlGetRetransmissionCount', event.target.value)}
                  margin="normal"
                />
                <div className={classes.sizeLabel} />
                <TextField
                  type="number"
                  label={settingsDrawer.originalOneRetransmissionCount}
                  value={settings.downloadSettings.originalOneRetransmissionCount}
                  className={classes.textField}
                  onChange={(event) => downloadSettingsChange('originalOneRetransmissionCount', event.target.value)}
                  margin="normal"
                />
              </ListItem>
              <ListItem>
                <TextField
                  type="number"
                  label={settingsDrawer.minimumBookmark}
                  value={settings.downloadSettings.minimumBookmark}
                  className={classes.textField}
                  onChange={(event) => downloadSettingsChange('minimumBookmark', event.target.value)}
                  margin="normal"
                />
              </ListItem>
              <ListItem>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.downloadSettings.OriginModel}
                      onChange={(event, checked) => downloadSettingsChange('OriginModel', checked)}
                    />
                }
                  label={settingsDrawer.OriginModel}
                />
                <div className={classes.formControlLabel} />
                <div className={classes.formControlLabel} />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.downloadSettings.mangaModel}
                      onChange={(event, checked) => downloadSettingsChange('mangaModel', checked)}
                    />
                }
                  label={settingsDrawer.mangaModel}
                />
              </ListItem>
              <ListItem>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.downloadSettings.playerModel}
                      onChange={(event, checked) => downloadSettingsChange('playerModel', checked)}
                    />
                }
                  label={settingsDrawer.playerModel}
                />
              </ListItem>
              <ListItem>
                <Button raised onClick={this.handleSave} color="primary">
                  {settingsDrawer.localStorageSave}
                </Button>
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}

const muiStyles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
  },
  tagField: {
  },
  sizeField: {
    width: 150
  },
  formControlLabel: {
    width: 20
  },
  sizeLabel: {
    width: 18
  },
  list: {
    width: 450,
    flex: 'initial',
  }
});

export default withStyles(muiStyles)(SettingsDrawer);
