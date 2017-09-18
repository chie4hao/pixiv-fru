export const initialState = {
  open: false,
  data: [
    { id: 123, name: 'wocao' },
    { id: 234, name: 'sldkfj' }
  ],
  selected: [123],
  order: 'asc',
  orderBy: 'name',
  message: 'sldkfj'
};

export default function downloadResult(state = initialState, action) {
  switch (action.type) {
    case 'HomePage/downloadResult/change':
      return Object.assign({}, state, {
        [action.param]: action.value
      });
    case 'HomePage/downloadResult/objectChange':
      return Object.assign({}, state, action.value);
    default:
      return state;
  }
}
