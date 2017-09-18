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

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';


import { withStyles } from 'material-ui/styles';

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' }
];

class ConfirmationDialog extends Component {
  props: {
    downloadResultText: {},
    downloadResult: {},
    classes: {},
    downloadResultChange: (string, string | number | boolean) => void,
    downloadResultObjectChange: () => void
  }

  createSortHandler = property => event => {
    const orderBy = property;
    let order = 'desc';

    if (this.props.downloadResult.orderBy === property && this.props.downloadResult.order === 'desc') {
      order = 'asc';
    }

    const data = this.props.downloadResult.data.sort(
      (a, b) => (order === 'desc' ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy]),
    );

    this.props.downloadResultObjectChange({ data, order, orderBy });
  };

  render() {
    const {
      downloadResultText,
      downloadResult,
      classes,
      downloadResultChange
    } = this.props;
    const numSelected = downloadResult.selected.length;

    return (
      <Dialog
        open={downloadResult.open}
        transition={Fade}
        onRequestClose={() => downloadResultChange('open', false)}
      >
        <DialogTitle>{downloadResultText.title}</DialogTitle>
        <Divider />
        <DialogContent>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell checkbox>
                    <Checkbox
                      indeterminate={numSelected > 0 && numSelected < 5}
                      checked={numSelected === 5}
                      // onChange={onSelectAllClick}
                    />
                  </TableCell>
                  {columnData.map(column => (
                    <TableCell
                      key={column.id}
                      numeric={column.numeric}
                      disablePadding={column.disablePadding}
                    >
                      <TableSortLabel
                        active={downloadResult.orderBy === column.id}
                        direction={downloadResult.order}
                        onClick={this.createSortHandler(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                    )
                  , this)}
                </TableRow>
              </TableHead>
              <TableBody>
                {downloadResult.data.map(n => {
                  // const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      // onClick={event => this.handleClick(event, n.id)}
                      // onKeyDown={event => this.handleKeyDown(event, n.id)}
                      role="checkbox"
                      // aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      // selected={isSelected}
                    >
                      <TableCell checkbox>
                        <Checkbox checked={true} />
                      </TableCell>
                      <TableCell disablePadding>{n.name}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button color="primary">
            {'lsdkfj'}
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
