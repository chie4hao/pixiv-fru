import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';
import './utils/config';
import { initialState as initialLogin } from './reducers/main/login';
import { initialState as initialSnackbars } from './reducers/HomePage/snackbars';

const store = configureStore({
  main: {
    settings: JSON.parse(localStorage.settings),
    login: initialLogin
  },
  HomePage: {
    searchParams: JSON.parse(localStorage.searchParams),
    snackbars: initialSnackbars
  }
});

window.dispatch = store.dispatch;

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
