export function setGardenParameters(width, height, color){
  return {type: 'SET_GARDEN_PARAMETERS', width, height, color};
}

export function setGarden(dbGardenGrid){
  return {type: 'SET_GARDEN', dbGardenGrid};
}

export function getGardenFromDropdown(gardenIndex) {
  return {type: 'GET_GARDEN_FROM_DROPDOWN', gardenIndex};
}
export function getPlantsFromDropdown(gardenIndex) {
  return {type: 'GET_PLANTS_FROM_DROPDOWN', gardenIndex};
}

export function getAllGardens(dbGardenGrids){
  return {type: 'GET_ALL_GARDENS', dbGardenGrids};
}

export function getPlants(dbPlantGrids){
  return {type: 'GET_PLANTS', dbPlantGrids};
}

export function setDropdown(dbDropdownOptions) {
  return {type: 'SET_DROPDOWN_OPTIONS', dbDropdownOptions};
}

export function setSeedPacket(packet) {
  return {type: 'SET_SEED_PACKET', packet};
}

export function addToShelf(shelfObject) {
  return {type: 'ADD_TO_SHELF', shelfObject};
}

export function setGrowthGraph(graph) {
  return {type: 'SET_GROWTH_GRAPH', graph};
}

export function setSuggestedGarden(suggestedGarden) {
  return {type: 'SET_SUGGESTED_GARDEN', suggestedGarden};
}

export function setSuggestedPlants(suggestedPlants) {
  return {type: 'SET_SUGGESTED_PLANTS', suggestedPlants};
}

export function toggleSquare(x,y){
  return {type: 'TOGGLE_SQUARE', x, y};
}

export function setTile(name){
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
  return {type: 'ADD_PLANT_TO_PLANT_GRID', plant}
}

export function undo() {
  return {type: 'UNDO'};
}

export function redo() {
  return {type: 'REDO'};
}

export function clear() {
  return {type: 'CLEAR'} ;
}

export function tryThis() {
  return {type: 'TRY_THIS'};
}

export function toggleVR() {
  return {type: 'TOGGLE_VR'};
}

export function setDropdownStatus(dropdownStatus) {
  return {type: 'SET_DROPDOWN_STATUS', dropdownStatus};
}
