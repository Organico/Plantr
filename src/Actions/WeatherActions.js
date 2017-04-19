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
  return{
    type: 'SET_COORDINATES',
    coordinates
  }
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