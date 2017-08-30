import container from './language/container';

export const initialState = {
  language: container.chs
};

export default function settings(state = initialState, action) {
  switch (action.type) {
    case 'main/setting/change':
      return Object.assign({}, state, {
        [action.param]: action.value
      });
    default:
      return state;
  }
}
