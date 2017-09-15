export const initialState = {
  open: false,
  message: 'sldkfj'
};

export default function downloadProcess(state = initialState, action) {
  switch (action.type) {
    case 'HomePage/downloadProcess/change':
      return Object.assign({}, state, {
        [action.param]: action.value
      });
    default:
      return state;
  }
}
