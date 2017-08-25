// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/theme';
import createPalette from 'material-ui/styles/palette';
import createTypography from 'material-ui/styles/typography';
// import injectTapEventPlugin from 'react-tap-event-plugin';

import Routes from '../routes';

// injectTapEventPlugin();
const theme = () => {
  const palette = createPalette({
    type: 'dark', // Switching the dark mode on is a single property value change.
  });
  const typography = createTypography(palette, {
    // System font
    fontFamily:
      '-apple-system,system-ui,BlinkMacSystemFont,' +
      '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
  });
  return createMuiTheme({
    palette,
    typography,
    /*
    overrides: {
      MuiAppBar: {
        root: {
          height: 100
        }
      }
    } */
  });
};

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
