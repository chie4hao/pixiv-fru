import container from './language/container';

export default function language(state = container.english, action) {
  switch (action.type) {
    case 'language/CHANGE':
      return container[action.language];
    default:
      return state;
  }
}
