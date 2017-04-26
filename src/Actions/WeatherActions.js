// here will be our Login Action folder
export function updateWeather(weather) {
  return {
    type: 'UPDATE_WEATHER',
    weather
  }
}

// export function setCoordinates(coordinates){
//   return{
//     type: 'SET_COORDINATES',
//     coordinates
//   }
// }

export function setForecast(forecast){
  return{
    type: 'SET_FORECAST',
    forecast
  }
}

export function setCoordinates(coordinates){
  console.log('these are the coordinates in the actions: ', coordinates);
  return {type: 'SET_COORDINATES', coordinates};
}

export function setPlantHardiness(data){
  console.log('these are the data in the actions: ', data);
  return {type: 'SET_PLANT_HARDINESS', data};
}

export function setDescription(description){
  return{
    type: 'SET_DESCRIPTION',
    description
  }
}
export function setTemperature(temperature){
  return{
    type: 'SET_TEMPERATURE',
    temperature
  }
}