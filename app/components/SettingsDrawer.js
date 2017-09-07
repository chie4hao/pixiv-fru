import React, { Component } from 'react';

import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import TextField from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';

class SettingsDrawer extends Component {
  props: {
    settings: {},
    settingsDrawer: {},
    open: boolean,
    onRequestClose: () => void,
    settingsChange: () => void,
    classes: {}
  }

  render() {
    const {
      settings,
      settingsDrawer,
      open,
      onRequestClose,
      settingsChange,
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
                <TextField
                  label={settingsDrawer.PHPSESSID}
                  value={settings.downloadSettings.PHPSESSID}
                  onChange={(event) => settingsChange('PHPSESSID', event.target.value)}
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
                  onChange={(event) => settingsChange('HtmlGetCount', event.target.value)}
                  margin="normal"
                />
                <div className={classes.sizeLabel} />
                <TextField
                  type="number"
                  label={settingsDrawer.OriginalGetCount}
                  value={settings.downloadSettings.OriginalGetCount}
                  className={classes.textField}
                  onChange={(event) => settingsChange('OriginalGetCount', event.target.value)}
                  margin="normal"
                />
              </ListItem>
              <ListItem>
                <TextField
                  type="number"
                  label={settingsDrawer.htmlGetTimeout}
                  value={settings.downloadSettings.htmlGetTimeout}
                  className={classes.textField}
                  onChange={(event) => settingsChange('htmlGetTimeout', event.target.value)}
                  margin="normal"
                />
                <div className={classes.sizeLabel} />
                <TextField
                  type="number"
                  label={settingsDrawer.originalOneGetTimeOut}
                  value={settings.downloadSettings.originalOneGetTimeOut}
                  className={classes.textField}
                  onChange={(event) => settingsChange('originalOneGetTimeOut', event.target.value)}
                  margin="normal"
                />
              </ListItem>
              <ListItem>
                <TextField
                  type="number"
                  label={settingsDrawer.htmlGetRetransmissionCount}
                  value={settings.downloadSettings.htmlGetRetransmissionCount}
                  className={classes.textField}
                  onChange={(event) => settingsChange('htmlGetRetransmissionCount', event.target.value)}
                  margin="normal"
                />
                <div className={classes.sizeLabel} />
                <TextField
                  type="number"
                  label={settingsDrawer.originalOneRetransmissionCount}
                  value={settings.downloadSettings.originalOneRetransmissionCount}
                  className={classes.textField}
                  onChange={(event) => settingsChange('originalOneRetransmissionCount', event.target.value)}
                  margin="normal"
                />
              </ListItem>
              <ListItem>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.downloadSettings.OriginModel}
                      onChange={(event, checked) => settingsChange('OriginModel', checked)}
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
                      onChange={(event, checked) => settingsChange('mangaModel', checked)}
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
                      onChange={(event, checked) => settingsChange('playerModel', checked)}
                    />
                }
                  label={settingsDrawer.playerModel}
                />
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
