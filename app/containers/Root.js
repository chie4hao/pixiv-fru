// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
// import createPalette from 'material-ui/styles/palette';
// import createTypography from 'material-ui/styles/typography';
// import injectTapEventPlugin from 'react-tap-event-plugin';

import Routes from '../routes';

// injectTapEventPlugin();
const theme = () => createMuiTheme({
  palette: {
    type: 'light'
  },
  typography: {
    fontFamily:
      '-apple-system,system-ui,BlinkMacSystemFont,' +
      '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
  }
  /*
  overrides: {
    MuiList: {
      root: {
        width: '100%'
      }
    }
  } */
});


type RootType = {
  store: {},
  history: {}
};

export default function Root({ store, history }: RootType) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <Routes />
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
}
