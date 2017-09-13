// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import mySaga from '../sagas';
import rootReducer from '../reducers';

const history = createBrowserHistory({
  basename: window.location.pathname
});

const sagaMiddleware = createSagaMiddleware();

const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router, sagaMiddleware);

function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(mySaga);
  return store;
}

export default { configureStore, history };
