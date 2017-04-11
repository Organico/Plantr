export function setSearchTerm(searchTerm) {
  console.log('action: SearchTerm called');
  return { type: 'SET_SEARCH_TERM', searchTerm };
}

export function movePiece(location){
  console.log('action: movePiece called');
  return {type: 'MOVE_PIECE', location}
}

export function setWidth(width){
  console.log('action: setWidth called');
  return {type: 'SET_WIDTH', width}
}

export function setHeight(height){
  console.log('action: setHeight called');
  return {type: 'SET_HEIGHT', height}
}

export function setGardenParameters(width, height, color){
  console.log('action: SET_GARDEN_PARAMETERS called');

  return {type: 'SET_GARDEN_PARAMETERS', width, height, color}
}

export function setGarden(dbGardenGrid){
  console.log('action: SET_GARDEN from db called');

  return {type: 'SET_GARDEN', dbGardenGrid};
}

export function getAllGardens(dbGardenGrids){
  console.log('action: GET_ALL_GARDENS from db called');
  console.log("DB garden grids: ", dbGardenGrids);

  return {type: 'GET_ALL_GARDENS', dbGardenGrids};
}

export function setUserParameters(username, gardens){
  console.log('action: SET_USER_PARAMETERS called');

  return {type: 'SET_USER_PARAMETERS', username, gardens}
}

export function toggleSquare(x,y){
  console.log('action: toggleSquare called');
  return {type: 'TOGGLE_SQUARE', x, y};
}

export function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

export function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}