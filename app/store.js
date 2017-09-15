import { configureStore } from './store/configureStore';
import './utils/config';
import { initialState as initialLogin } from './reducers/main/login';
import { initialState as initialSnackbars } from './reducers/HomePage/snackbars';
import { initialState as searchOptions } from './reducers/HomePage/searchOptions';
import { initialState as downloadProcess } from './reducers/HomePage/downloadProcess';

const store = configureStore({
  main: {
    settings: JSON.parse(localStorage.settings),
    login: initialLogin
  },
  HomePage: {
    searchParams: JSON.parse(localStorage.searchParams),
    snackbars: initialSnackbars,
    searchOptions,
    downloadProcess
  }
});

const getState = store.getState;
const dispatch = store.dispatch;

export default store;
export { getState, dispatch };
