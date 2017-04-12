const initialUserState = {
  username: '',
  gardens: [],
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false
}

const userProfile = (state, action) => {
  console.log('(before) state: ', state);
  const newState = {};
  const {username, gardens} = state;
  Object.assign(newState, state, {username: action.username, gardens: action.gardens});
  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);

  return newState
}

function userReducer(state = initialUserState, action) {
  console.log('userProfileReducer.js - Reducer called');
  console.log('current action: ', action);
  switch (action.type) {
  case 'LOGIN_REQUEST':
    return Object.assign({}, state, {
      isFetching: true,
      isAuthenticated: false,
      user: action.creds
    });
  case 'LOGIN_SUCCESS':
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: true,
      errorMessage: ''
    });
  case 'LOGIN_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: false,
      errorMessage: action.message
    });
  case 'LOGOUT_SUCCESS':
    return Object.assign({}, state, {
      isFetching: true,
      isAuthenticated: false
    });
  default:
    return state;
  }
}

export default userReducer;