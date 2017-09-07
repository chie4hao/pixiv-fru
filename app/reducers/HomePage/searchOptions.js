export const initialState = {
  text: '東方'
};

export default function searchOptions(state = initialState, action) {
  switch (action.type) {
    case 'HomePage/searchOptions/change':
      return {
        text: action.text
      };
    default:
      return state;
  }
}
