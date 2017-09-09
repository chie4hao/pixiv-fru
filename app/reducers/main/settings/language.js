import container from '../language/container';

export const initialState = container.chs;

export default function settings(state = initialState, action) {
  switch (action.type) {
    case 'main/setting/language/change':
      return container[action.value];
    default:
      return state;
  }
}
