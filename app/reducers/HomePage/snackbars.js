export const initialState = {
  open: false,
  message: ''
};

export default function snackbars(state = initialState, action) {
  switch (action.type) {
    case 'HomePage/snackbars/open':
      return {
        open: true,
        message: action.message
      };
    case 'HomePage/snackbars/close':
      return {
        open: false,
        massage: ''
      };
    default:
      return state;
  }
}
