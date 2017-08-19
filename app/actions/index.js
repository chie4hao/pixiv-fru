import { push, goBack, goForward } from 'react-router-redux';

export function back() {
  return goBack();
}

export function forward() {
  return goForward();
}

export function historyPush(pathname) {
  return (dispatch, getState) => {
    if (getState().router.location.pathname !== pathname) {
      dispatch(push(pathname));
    }
  };
}
