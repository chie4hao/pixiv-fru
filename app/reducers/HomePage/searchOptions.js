export const initialState = {
  text: '',
  type: 'string'
};

export default function searchOptions(state = initialState, action) {
  switch (action.type) {
    case 'HomePage/searchOptions/change':
      return Object.assign({}, state, {
        [action.param]: action.value
      });
    default:
      return state;
  }
}
