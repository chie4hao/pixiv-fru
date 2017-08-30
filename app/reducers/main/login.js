export const initialState = {
  username: 'lsdkfj',
  password: 'lskdjfl',
  phpSession: '23452345'
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case 'main/login/change':
      return Object.assign({}, state, {
        [action.param]: action.value
      });
    default:
      return state;
  }
}
