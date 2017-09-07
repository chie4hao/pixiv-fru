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
    SettingsDrawer: {},
    open: boolean,
    onRequestClose: () => void,
    settingsChange: () => void,
    classes: {}
  }

  render() {
    const {
      settings,
      SettingsDrawer,
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
              subheader={<ListSubheader>{SettingsDrawer.downloadSettingsHeader}</ListSubheader>}
              className={classes.list}
            >
              <ListItem>
                <TextField
                  label={SettingsDrawer.PHPSESSID}
                  value={settings.PHPSESSID}
                  onChange={(event) => settingsChange('PHPSESSID', event.target.value)}
                  fullWidth
                  margin="normal"
                />
              </ListItem>
              <ListItem>
                <TextField
                  type="number"
                  label={SettingsDrawer.HtmlGetCount}
                  value={settings.HtmlGetCount}
                  className={classes.textField}
                  onChange={(event) => settingsChange('HtmlGetCount', event.target.value)}
                  margin="normal"
                />
                <div className={classes.sizeLabel} />
                <TextField
                  type="number"
                  label={SettingsDrawer.OriginalGetCount}
                  value={settings.OriginalGetCount}
                  className={classes.textField}
                  onChange={(event) => settingsChange('OriginalGetCount', event.target.value)}
                  margin="normal"
                />
              </ListItem>
              <ListItem>
                <TextField
                  type="number"
                  label={SettingsDrawer.htmlGetTimeout}
                  value={settings.htmlGetTimeout}
                  className={classes.textField}
                  onChange={(event) => settingsChange('htmlGetTimeout', event.target.value)}
                  margin="normal"
                />
                <div className={classes.sizeLabel} />
                <TextField
                  type="number"
                  label={SettingsDrawer.originalOneGetTimeOut}
                  value={settings.originalOneGetTimeOut}
                  className={classes.textField}
                  onChange={(event) => settingsChange('originalOneGetTimeOut', event.target.value)}
                  margin="normal"
                />
              </ListItem>
              <ListItem>
                <TextField
                  type="number"
                  label={SettingsDrawer.htmlGetRetransmissionCount}
                  value={settings.htmlGetRetransmissionCount}
                  className={classes.textField}
                  onChange={(event) => settingsChange('htmlGetRetransmissionCount', event.target.value)}
                  margin="normal"
                />
                <div className={classes.sizeLabel} />
                <TextField
                  type="number"
                  label={SettingsDrawer.originalOneRetransmissionCount}
                  value={settings.originalOneRetransmissionCount}
                  className={classes.textField}
                  onChange={(event) => settingsChange('originalOneRetransmissionCount', event.target.value)}
                  margin="normal"
                />
              </ListItem>
              <ListItem>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.OriginModel}
                      onChange={(event, checked) => settingsChange('OriginModel', checked)}
                    />
                }
                  label={SettingsDrawer.OriginModel}
                />
                <div className={classes.formControlLabel} />
                <div className={classes.formControlLabel} />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.mangaModel}
                      onChange={(event, checked) => settingsChange('mangaModel', checked)}
                    />
                }
                  label={SettingsDrawer.mangaModel}
                />
              </ListItem>
              <ListItem>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.playerModel}
                      onChange={(event, checked) => settingsChange('playerModel', checked)}
                    />
                }
                  label={SettingsDrawer.playerModel}
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
