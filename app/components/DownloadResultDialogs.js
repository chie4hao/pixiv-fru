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
import { LinearProgress } from 'material-ui/Progress';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
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
  { id: 'illustId', numeric: false, disablePadding: false, compact: false },
  { id: 'type', numeric: true, disablePadding: true, compact: true },
  { id: 'bookmarkCount', numeric: true, disablePadding: true, compact: true },
  { id: 'imageCount', numeric: true, disablePadding: true, compact: true },
  { id: 'authorName', numeric: true, disablePadding: true, compact: true },
  { id: 'name', numeric: true, disablePadding: true, compact: true },
  { id: 'status', numeric: true, disablePadding: true, compact: true },
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

    const {
      open,
      selected,
      order,
      orderBy,
      page,
      rowsPerPage,
      processLength,
      successCount,
      errorCount,
      totalCount,
      searchCount
    } = tableState;

    const numSelected = selected.length;
    return (
      <Dialog
        open={open}
        transition={Fade}
        onRequestClose={() => downloadResultChange('open', false)}
        maxWidth={'md'}
        className={classes.dialog}
      >
        <DialogTitle>{downloadResultText.title}</DialogTitle>
        <Divider />
        <DialogContent>
          <Paper className={classes.paper}>
            <div className={classes.tyContainer}>
              <Typography type="caption"> {downloadResultText.successCount}: {successCount} </Typography>
              <Typography color="accent"> {downloadResultText.errorCount}: {errorCount} </Typography>
              <Typography> {downloadResultText.searchCount}: {searchCount} </Typography>
              <Typography color="secondary"> {downloadResultText.totalCount}: {totalCount} {downloadResultText.processLength}: {processLength}</Typography>
            </div>
            {processLength !== 0 ? <LinearProgress color="accent" mode="buffer" value={((successCount * 100) / searchCount) * (totalCount / processLength)} valueBuffer={(totalCount * 100) / processLength} /> : <LinearProgress mode="determinate" value={100} />}

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell checkbox>
                    <Checkbox
                      indeterminate={numSelected > 0 && numSelected < resultData.length}
                      checked={numSelected === resultData.length}
                      // onChange={onSelectAllClick}
                    />
                  </TableCell>
                  {columnData.map(column => (
                    <TableCell
                      key={column.id}
                      numeric={column.numeric}
                      disablePadding={column.disablePadding}
                      compact={column.compact}
                    >
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={order}
                        onClick={this.createSortHandler(column.id)}
                      >
                        {downloadResultText[column.id]}
                      </TableSortLabel>
                    </TableCell>
                    )
                  , this)}
                </TableRow>
              </TableHead>
              <TableBody>
                {resultData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map(n => {
                  const isSelected = this.isSelected(n.illustId);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.illustId)}
                      // onKeyDown={event => this.handleKeyDown(event, n.illustId)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.illustId}
                      selected={isSelected}
                    >
                      <TableCell checkbox>
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell>{n.illustId}</TableCell>
                      <TableCell compact disablePadding numeric>{n.type}</TableCell>
                      <TableCell compact disablePadding numeric>{n.bookmarkCount}</TableCell>
                      <TableCell compact disablePadding numeric>{n.imageCount}</TableCell>
                      <TableCell compact disablePadding numeric>{n.authorName}</TableCell>
                      <TableCell compact disablePadding numeric>{n.name}</TableCell>
                      <TableCell compact disablePadding numeric>{n.status}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TablePagination
                  count={resultData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={(event, value) => downloadResultChange('page', value)}
                  onChangeRowsPerPage={(event) => downloadResultChange('rowsPerPage', event.target.value)}
                />
              </TableFooter>
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

  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },

  dialog: {
    maxWidth: 1000
  },

  dialogContent: {
  },
  tyContainer: {
    height: 64,
    justifyContent: 'center',
    display: 'flex',
    position: 'relative',
    alignItems: 'center'
  }
});

export default withStyles(muiStyles)(ConfirmationDialog);
