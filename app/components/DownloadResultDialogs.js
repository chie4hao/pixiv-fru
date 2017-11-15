import React, { Component } from 'react';

import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';
import Grow from 'material-ui/transitions/Grow';
import Fade from 'material-ui/transitions/Fade';
import Collapse from 'material-ui/transitions//Collapse';
import { LinearProgress } from 'material-ui/Progress';
import Tooltip from 'material-ui/Tooltip';

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
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';

import { withStyles } from 'material-ui/styles';

const columnData = [
  { id: 'illustId', numeric: false, disablePadding: false },
  { id: 'type', numeric: true, disablePadding: true, },
  { id: 'bookmarkCount', numeric: true, disablePadding: false },
  { id: 'imageCount', numeric: true, disablePadding: true },
  { id: 'authorName', numeric: true, disablePadding: false },
  { id: 'name', numeric: true, disablePadding: true },
  { id: 'status', numeric: true, disablePadding: false },
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

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      return this.props.downloadResultChange('selected', this.props.resultData.map(n => n.illustId));
    }
    this.props.downloadResultChange('selected', []);
  }

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
        className={classes.dialog}
      >
        <DialogTitle>{downloadResultText.title}</DialogTitle>
        <Divider />
        <DialogContent>
          <Paper className={classes.paper}>
            <div className={classes.tyContainer}>
              <Typography type="caption"> {downloadResultText.successCount}: {successCount}</Typography>
              <div style={{ width: '20px' }} />
              <Typography color="accent"> {downloadResultText.errorCount}: {errorCount}</Typography>
              <div style={{ width: '20px' }} />
              <Typography> {downloadResultText.searchCount}: {searchCount}</Typography>
              <div style={{ width: '20px' }} />
              <Typography color="secondary">{downloadResultText.totalCount}: {totalCount}</Typography>
              <div style={{ width: '20px' }} />
              <Typography color="secondary">{downloadResultText.processLength}: {processLength}</Typography>
            </div>
            {processLength !== 0 ? <LinearProgress color="accent" mode="buffer" value={((successCount * 100) / searchCount) * (totalCount / processLength)} valueBuffer={(totalCount * 100) / processLength} /> : <LinearProgress mode="determinate" value={100} />}

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={numSelected > 0 && numSelected < resultData.length}
                      checked={numSelected === resultData.length}
                      onChange={this.handleSelectAllClick}
                    />
                  </TableCell>
                  {columnData.map(column => (
                    <TableCell
                      key={column.id}
                      numeric={column.numeric}
                      padding={column.disablePadding ? 'none' : 'default'}
                      // compact={column.compact}
                    >
                      <Tooltip title="Sort" placement="bottom-end" enterDelay={300}>
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={order}
                          onClick={this.createSortHandler(column.id)}
                        >
                          {downloadResultText[column.id]}
                        </TableSortLabel>
                      </Tooltip>
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
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell>{n.illustId}</TableCell>
                      <TableCell padding="none" numeric>{n.type}</TableCell>
                      <TableCell numeric>{n.bookmarkCount}</TableCell>
                      <TableCell padding="none" numeric>{n.imageCount}</TableCell>
                      <TableCell numeric>{n.authorName}</TableCell>
                      <TableCell padding="none" numeric>{n.name}</TableCell>
                      <TableCell numeric>{n.status}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={resultData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={(event, value) => downloadResultChange('page', value)}
                    onChangeRowsPerPage={(event) => downloadResultChange('rowsPerPage', event.target.value)}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        </DialogContent>
        <Divider />
        {/* <DialogActions>
          <Button color="primary">
            {'lsdkfj'}
          </Button>
        </DialogActions> */}
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
