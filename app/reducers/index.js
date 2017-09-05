// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { enableBatching } from 'redux-batched-actions';
import counter from './counter';
import main from './main';
import HomePage from './HomePage';

const actionHandler = (reducer, reg) => (state = reducer(undefined, {}), action) => {
  if (action.type.match(reg)) {
    return reducer(state, action);
  }
  return state;
};

const rootReducer = enableBatching(combineReducers({
  counter: actionHandler(counter, /COUNTER$/),
  router: actionHandler(router, /^@@router/),
  main: actionHandler(main, /^main/),
  HomePage: actionHandler(HomePage, /^HomePage/)
}));

export default rootReducer;
