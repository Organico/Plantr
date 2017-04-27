export function setGardenParameters(width, height, color){
  console.log('action: SET_GARDEN_PARAMETERS called');

  return {type: 'SET_GARDEN_PARAMETERS', width, height, color};
}

export function setGarden(dbGardenGrid){
  console.log('action: SET_GARDEN from db called');

  return {type: 'SET_GARDEN', dbGardenGrid};
}

export function getGardenFromDropdown(gardenIndex) {
  console.log('action: getGardenFromDropdown');
  return { type: 'GET_GARDEN_FROM_DROPDOWN', gardenIndex};
}
export function getPlantsFromDropdown(gardenIndex) {
  console.log('action: getPlantsFromDropdown');
  return { type: 'GET_PLANTS_FROM_DROPDOWN', gardenIndex};
}

export function getAllGardens(dbGardenGrids){
  console.log('action: GET_ALL_GARDENS from db called');
  console.log("DB garden grids: ", dbGardenGrids);

  return {type: 'GET_ALL_GARDENS', dbGardenGrids};
}

export function getPlants(dbPlantGrids){
  console.log('action: GET_ALL_PLANTS from db called');
  console.log("DB Plant grids: ", dbPlantGrids);
  console.log("ROAAARRRRR")

  return {type: 'GET_PLANTS', dbPlantGrids};
}

export function setDropdown(dbDropdownOptions) {
  console.log('action: setDropdown options');
  return { type: 'SET_DROPDOWN_OPTIONS', dbDropdownOptions};
}

export function setSeedPacket(packet) {
  console.log('action: seeePacket');
  return { type: 'SET_SEED_PACKET', packet};
}

export function addToShelf(shelfObject) {
  console.log('action: adding to shelf ', shelfObject);
  return { type: 'ADD_TO_SHELF', shelfObject};
}

export function setGrowthGraph(graph) {
  console.log('action: adding to shelf');
  return { type: 'SET_GROWTH_GRAPH', graph};
}

export function setSuggestedGarden(suggestedGarden) {
  console.log('action: adding to shelf');
  return { type: 'SET_SUGGESTED_GARDEN', suggestedGarden};
}

export function setSuggestedPlants(suggestedPlants) {
  console.log('action: adding to shelf');
  return { type: 'SET_SUGGESTED_PLANTS', suggestedPlants};
}


export function toggleSquare(x,y){
  console.log('action: toggleSquare called');
  return {type: 'TOGGLE_SQUARE', x, y};
}

export function setTile(name){
  console.log('action: set tile called');
  return {type: 'SET_TILE', name};
}

export function setWidth(width){
  return {type: 'SET_WIDTH', width};
}

export function setHeight(height){
  return {type: 'SET_HEIGHT', height};
}
/*PLANT GRID*/
export function addPlantToPlantGrid(plant){
  console.log('action: addPlantToPlantGrid');
  return { type: 'ADD_PLANT_TO_PLANT_GRID', plant}
}


export function undo() {
  console.log('UNDO CALLED');
  return { type: 'UNDO'};
}

export function redo() {
  console.log('REDO CALLED');
  return { type: 'REDO'};
}

export function clear() {
  console.log('CLEAR CALLED');
  return { type: 'CLEAR'};
}

export function tryThis() {
  console.log('TRYCALLED');
  return { type: 'TRY_THIS'};
}

export function toggleVR() {
  console.log('toggleVR CALLED');
  return { type: 'TOGGLE_VR'};
}
