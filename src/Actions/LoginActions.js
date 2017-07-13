// here will be our Login Action folder
export function requestLogin(creds) {
  return {
    type: 'LOGIN_REQUEST',
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

export function receiveLogin(user) {
  console.log('IN THE ACTION LOGIN SUCCESS')
  return {
    type: 'LOGIN_SUCCESS',
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  };
}

export function loginError(message) {
  return {
    type: 'LOGIN_FAILURE',
    isFetching: false,
    isAuthenticated: false,
    message
  };
}
