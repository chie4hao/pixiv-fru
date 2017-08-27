// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import language from './language';
import HomePage from './HomePage';

const actionHandler = (reducer, reg) => (state = reducer(undefined, {}), action) => {
  if (action.type.match(reg)) {
    return reducer(state, action);
  }
  return state;
};

const rootReducer = combineReducers({
  counter: actionHandler(counter, /COUNTER$/),
  router: actionHandler(router, /^@@router/),
  language: actionHandler(language, /^language/),
  HomePage: actionHandler(HomePage, /^HomePage/)
});

export default rootReducer;
