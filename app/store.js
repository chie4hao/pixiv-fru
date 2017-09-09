import { configureStore, history } from './store/configureStore';
import './utils/config';
import { initialState as initialLogin } from './reducers/main/login';
import { initialState as initialSnackbars } from './reducers/HomePage/snackbars';
import { initialState as searchOptions } from './reducers/HomePage/searchOptions';

export default configureStore({
  main: {
    settings: JSON.parse(localStorage.settings),
    login: initialLogin
  },
  HomePage: {
    searchParams: JSON.parse(localStorage.searchParams),
    snackbars: initialSnackbars,
    searchOptions
  }
});
