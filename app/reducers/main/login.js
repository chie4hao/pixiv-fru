export const initialState = {
  username: 'w310930920@gmail.com',
  password: '1q2w3e4r',
  captchaOpen: false,
  captchaSrc: '',
  captcha: '',
  PHPSESSID: ''
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case 'main/login/change':
      return Object.assign({}, state, {
        [action.param]: action.value
      });
    case 'main/login/objectChange':
      return Object.assign({}, state, action.obj);
    default:
      return state;
  }
}
