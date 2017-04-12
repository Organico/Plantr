// POTENTIAL FOR COMPARTMENTALIZATION - CURRENTLY LIES WITHIN GETGARDENACTION.JS
export function setGardenParameters(width, height, color){
  console.log('action: SET_GARDEN_PARAMETERS called');

  return {type: 'SET_GARDEN_PARAMETERS', width, height, color};
}

export function setGarden(dbGardenGrid){
  console.log('action: SET_GARDEN from db called');

  return {type: 'SET_GARDEN', dbGardenGrid};
}