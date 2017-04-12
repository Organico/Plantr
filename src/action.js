// export function setGardenParameters(width, height, color){
//   console.log('action: SET_GARDEN_PARAMETERS called');

//   return {type: 'SET_GARDEN_PARAMETERS', width, height, color};
// }

// export function setGarden(dbGardenGrid){
//   console.log('action: SET_GARDEN from db called');

//   return {type: 'SET_GARDEN', dbGardenGrid};
// }

// export function getGardenFromDropdown(gardenIndex) {
//   console.log('action: getGardenFromDropdown');
//   return { type: 'GET_GARDEN_FROM_DROPDOWN', gardenIndex};
// }
// export function getPlantsFromDropdown(gardenIndex) {
//   console.log('action: getPlantsFromDropdown');
//   return { type: 'GET_PLANTS_FROM_DROPDOWN', gardenIndex};
// }

// export function getAllGardens(dbGardenGrids){
//   console.log('action: GET_ALL_GARDENS from db called');
//   console.log("DB garden grids: ", dbGardenGrids);

//   return {type: 'GET_ALL_GARDENS', dbGardenGrids};
// }

// export function getAllPlants(dbPlantGrids){
//   console.log('action: GET_ALL_PLANTS from db called');
//   console.log("DB Plant grids: ", dbPlantGrids);

//   return {type: 'GET_ALL_PLANTS', dbPlantGrids};
// }

// export function setUserParameters(username, gardens){
//   console.log('action: SET_USER_PARAMETERS called');

//   return {type: 'SET_USER_PARAMETERS', username, gardens}
// }

// export function toggleSquare(x,y){
//   console.log('action: toggleSquare called');
//   return {type: 'TOGGLE_SQUARE', x, y};
// }

// export function setDropdown(dbDropdownOptions) {
//   console.log('action: setDropdown options');
//   return { type: 'SET_DROPDOWN_OPTIONS', dbDropdownOptions};
// }

// export function addPlantToPlantGrid(plant){
//   console.log('action: addPlantToPlantGrid');
//   return { type: 'ADD_PLANT_TO_PLANT_GRID', plant}
// }

// export function requestLogin(creds) {
//   return {
//     type: 'LOGIN_REQUEST',
//     isFetching: true,
//     isAuthenticated: false,
//     creds
//   }
// }

// export function receiveLogin(user) {
//   return {
//     type: 'LOGIN_SUCCESS',
//     isFetching: false,
//     isAuthenticated: true,
//     id_token: user.id_token
//   };
// }

// export function loginError(message) {
//   return {
//     type: 'LOGIN_FAILURE',
//     isFetching: false,
//     isAuthenticated: false,
//     message
//   };
// }