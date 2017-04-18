// here will be our Login Action folder
export function updateWeather(weather) {
  return {
    type: 'UPDATE_WEATHER',
    weather
  }
}

export function setCoordinates(coordinates){
  return{
    type: 'SET_COORDINATES',
    coordinates
  }
}

export function setForecast(forecast){
  return{
    type: 'SET_FORECAST',
    forecast
  }
}
