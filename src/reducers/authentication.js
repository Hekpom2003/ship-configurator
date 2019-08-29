const initialState = {
  auth: true,
  token: 'qwe',
  login: 'Login',

};

export default function authentication(state = initialState, action) {
  return { ...state };
}