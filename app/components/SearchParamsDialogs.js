import React, { Component } from 'react';

import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import TextField from 'material-ui/TextField';
import Menu, { MenuItem } from 'material-ui/Menu';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';
import Grow from 'material-ui/transitions/Grow';
import Fade from 'material-ui/transitions/Fade';
import Collapse from 'material-ui/transitions//Collapse';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';

class ConfirmationDialog extends Component {
  props: {
    HomePage: {},
    searchParams: {},
    searchParamsOpen: boolean,
    searchParamsRequestClose: () => void,
    classes: {},
    searchParamsChange: (string, value) => void
  }
  state = {
    anchorEl: undefined,
    open: false,
  };

  handleChange = name => (event, checked) => {
    this.setState({ [name]: checked });
  };

  handleClickListItem = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    localStorage.searchParams = JSON.stringify(this.props.searchParams);
  }

  render() {
    const {
      HomePage,
      searchParams,
      classes,
      searchParamsOpen,
      searchParamsRequestClose,
      searchParamsChange
    } = this.props;
    return (
      <Dialog
        open={searchParamsOpen}
        transition={Fade}
        onRequestClose={searchParamsRequestClose}
      >
        <DialogTitle>{HomePage.searchParams}</DialogTitle>
        <Divider />
        <DialogContent>
          <List>
            <ListItem
              button
              aria-haspopup="true"
              aria-controls="lock-menu"
              aria-label={HomePage.searchTarget.name}
              onClick={this.handleClickListItem}
            >
              <ListItemText
                primary={HomePage.searchTarget.name}
                secondary={HomePage.searchTarget.attribs[searchParams.s_mode]}
              />
            </ListItem>
            <Menu
              anchorEl={this.state.anchorEl}
              open={this.state.open}
              onRequestClose={this.handleRequestClose}
            >
              {HomePage.searchTarget.attribs.map((option, index) =>
            (<MenuItem
              key={option}
              selected={index === searchParams.s_mode}
              onClick={() => { searchParamsChange('s_mode', index); this.handleRequestClose(); }}
            >
              {option}
            </MenuItem>)
          )}
            </Menu>
          </List>
          <Divider />
          <List>
            <ListItem>
              <FormControlLabel
                control={
                  <Switch
                    checked={searchParams.order}
                    onChange={(event, checked) => searchParamsChange('order', checked)}
                  />
                }
                label={HomePage.order[Number(searchParams.order)]}
              />
              <div className={classes.formControlLabel} />
              <div className={classes.formControlLabel} />
              <FormControlLabel
                control={
                  <Switch
                    checked={searchParams.r18}
                    onChange={(event, checked) => searchParamsChange('r18', checked)}
                  />
                }
                label={HomePage.R18Only}
              />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              <TextField
                label={HomePage.scd}
                type="date"
                value={searchParams.scd}
                className={classes.textField}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => searchParamsChange('scd', event.target.value)}
              />
              <div className={classes.formControlLabel} />
              <TextField
                label={HomePage.ecd}
                type="date"
                value={searchParams.ecd}
                className={classes.textField}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => searchParamsChange('ecd', event.target.value)}
              />
            </ListItem>
            <ListItem>
              <TextField
                label={HomePage.tagExistsFilter}
                className={classes.tagField}
                value={searchParams.tagExistsFilter}
                placeholder="Placeholder"
                onChange={(event) => searchParamsChange('tagExistsFilter', event.target.value)}
              // helperText="Full width!"
                fullWidth
                margin="normal"
              />
            </ListItem>
            <ListItem>
              <TextField
                label={HomePage.tagNotExistsFilter}
                className={classes.tagField}
                value={searchParams.tagNotExistsFilter}
                placeholder="Placeholder"
                onChange={(event) => searchParamsChange('tagNotExistsFilter', event.target.value)}
              // helperText="Full width!"
                fullWidth
                margin="normal"
              />
            </ListItem>
            <ListItem>
              <TextField
                label={HomePage.tool}
                value={searchParams.tool}
                className={classes.textField}
                margin="normal"
                onChange={(event) => searchParamsChange('tool', event.target.value)}
              />
              <div className={classes.formControlLabel} />
              <TextField
                type="number"
                label={HomePage.ratio}
                value={searchParams.ratio}
                className={classes.textField}
                margin="normal"
                onChange={(event) => searchParamsChange('ratio', event.target.value)}
              />
            </ListItem>
            <ListItem>
              <TextField
                type="number"
                label={HomePage.wlt}
                value={searchParams.wlt}
                className={classes.sizeField}
                margin="normal"
                onChange={(event) => searchParamsChange('wlt', event.target.value)}
              />
              <div className={classes.sizeLabel} />
              <TextField
                type="number"
                label={HomePage.hlt}
                value={searchParams.hlt}
                className={classes.sizeField}
                margin="normal"
                onChange={(event) => searchParamsChange('hlt', event.target.value)}
              />
              <div className={classes.sizeLabel} />
              <TextField
                type="number"
                label={HomePage.wgt}
                value={searchParams.wgt}
                className={classes.sizeField}
                margin="normal"
                onChange={(event) => searchParamsChange('wgt', event.target.value)}
              />
              <div className={classes.sizeLabel} />
              <TextField
                type="number"
                label={HomePage.hgt}
                value={searchParams.hgt}
                className={classes.sizeField}
                margin="normal"
                onChange={(event) => searchParamsChange('hgt', event.target.value)}
              />
            </ListItem>
          </List>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={this.handleSave} color="primary">
            {HomePage.localStorageSave}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const muiStyles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 300,
  },
  tagField: {
  },
  sizeField: {
    width: 150
  },
  formControlLabel: {
    width: 60
  },
  sizeLabel: {
    width: 20
  },
});

export default withStyles(muiStyles)(ConfirmationDialog);
