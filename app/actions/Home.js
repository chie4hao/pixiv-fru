import { push } from 'react-router-redux';

export function historyPush(url) {
  return (dispatch) => {
    dispatch(push(url));
  };
}
