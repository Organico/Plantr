const initialWeatherState = {
  zone: '',
  coordinates: '',
  description: '',
  temperature: [],
};

const updateWeather = (state, action) => {
  let newState = {};
  let {
    temp_f, temp_c,
    weather_period_0,
    weather_period_1,
    weather_period_2
  } = state;
  let newWeather = action.weather;
  Object.assign(newState, state, newWeather);
  return newState; //Added by Ariel post-thesis
}

const setDropdown = (state, action) => {
  let newState = {};
  let {gardenDropdown} = state;
  let newGardenDropdown = action.dbDropdownOptions;
  Object.assign(newState, state, {gardenDropdown: newGardenDropdown});
  return newState;
}

const setForecast = (state, action) => {
  let newState = {};
  let { forecast } = state;
  let newForecast = action.forecast;
  Object.assign(newState, state, {forecast: newForecast});
  return newState;
}

const setCoordinates = (state, action) => {
  let newState = {};
  let { coordinates } = state
  Object.assign(newState, state, {coordinates: action.coordinates});
  return newState
}

const setPlantHardiness = (state, action) => {
  let newState = {};
  let { zone } = state;
  let newArray = action.data.temperature_range.split(' to ');
  newArray[0] = +newArray[0];
  newArray[1] = +newArray[1];
  Object.assign(newState, state, {zone: action.data.zone, temperature: newArray });
  return newState;
}

const setDescription = (state, action) => {
  let newState = {};
  let { description } = state;
  let newDescription = action.description;
  Object.assign(newState, state, {description: newDescription});
  return newState;
}

const setTemperature = (state, action) => {
  let newState = {};
  let { temperature } = state;
  let newTemperature = action.temperature;
  Object.assign(newState, state, {temperature: newTemperature});
  return newState;
}

function weatherReducer(state = initialWeatherState, action) {
  switch (action.type) {
  case 'UPDATE_WEATHER':
    return updateWeather(state, action);
  case 'SET_PLANT_HARDINESS':
    return setPlantHardiness(state, action);
  case 'SET_FORECAST':
    return setForecast(state, action);
  case 'SET_DROPDOWN_OPTIONS':
    return setDropdown(state, action);
  case 'SET_COORDINATES':
    return setCoordinates(state, action);
  case 'SET_DESCRIPTION':
    return setDescription(state, action);
  case 'SET_TEMPERATURE':
    return setTemperature(state, action);
  default:
    return state;
  }
}

export default weatherReducer;