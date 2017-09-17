import { push, goBack, goForward } from 'react-router-redux';

export function back() {
  return goBack();
}

export function forward() {
  return goForward();
}

export function historyPush(pathname) {
  return push(pathname);
}

export function snackbarsClose() {
  return {
    type: 'HomePage/snackbars/close'
  };
}

export function snackbarsOpen(message) {
  return {
    type: 'HomePage/snackbars/open',
    message
  };
}

export function loginChange(a, b) {
  return {
    type: 'main/login/change',
    param: a,
    value: b
  };
}
