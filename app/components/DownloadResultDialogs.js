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
  { id: 'illustId', numeric: false, disablePadding: true, label: 'illustId' },
  { id: 'name', numeric: true, disablePadding: false, label: 'name' },
  { id: 'type', numeric: true, disablePadding: false, label: 'type' },
  { id: 'authorName', numeric: true, disablePadding: false, label: 'authorName' },
  { id: 'bookmarkCount', numeric: true, disablePadding: false, label: 'bookmarkCount' },
  { id: 'imageCount', numeric: true, disablePadding: false, label: 'imageCount' },
  { id: 'status', numeric: true, disablePadding: false, label: 'status' },
];

class ConfirmationDialog extends Component {
  props: {
    downloadResultText: {},
    resultData: [],
    tableState: { selected: [], order: string, orderBy: string },
    classes: {},
    downloadResultChange: (string, string | number | boolean) => void,
    // downloadResultObjectChange: () => void,
    sortTable: () => void
  }

  createSortHandler = property => () => {
    let order = 'desc';
    if (this.props.tableState.orderBy === property && this.props.tableState.order === 'desc') {
      order = 'asc';
    }

    return this.props.sortTable(property, order);

    /*
    this.props.downloadResultObjectChange({
      data: data.sort(
        (a, b) => (order === 'desc' ? b[property] > a[property] : a[property] > b[property]),
      ),
      order,
      orderBy: property
    });
    */
  };

  handleClick = (event, id) => {
    const { selected } = this.props.tableState;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    return this.props.downloadResultChange('selected', newSelected);
  };

  isSelected = id => this.props.tableState.selected.indexOf(id) !== -1;

  render() {
    const {
      downloadResultText,
      resultData,
      tableState,
      classes,
      downloadResultChange
    } = this.props;

    const numSelected = tableState.selected.length;
    return (
      <Dialog
        open={tableState.open}
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
                      indeterminate={numSelected > 0 && numSelected < 2}
                      checked={numSelected === 2}
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
                        active={tableState.orderBy === column.id}
                        direction={tableState.order}
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
                {resultData.map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      // onKeyDown={event => this.handleKeyDown(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.illustId}
                      selected={isSelected}
                    >
                      <TableCell checkbox>
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell disablePadding>{n.illustId}</TableCell>
                      <TableCell>{n.name}</TableCell>
                      <TableCell>{n.type}</TableCell>
                      <TableCell>{n.authorName}</TableCell>
                      <TableCell>{n.bookmarkCount}</TableCell>
                      <TableCell>{n.imageCount}</TableCell>
                      <TableCell>{n.status}</TableCell>
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
