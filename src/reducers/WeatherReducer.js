// const makeImage = function(urlsrc) {
//   var newImage = new Image();
//   newImage.src = urlsrc;
//   return newImage;
// };

// console.log(makeImage('https://c1.staticflickr.com/3/2909/33168957064_a7ef238410_o.png'));
const initialWeatherState = {
  //garden state
  // temp_f: 0,
  // temp_c: 0,
  // weather_period_0: [],
  // weather_period_1: [],
  // weather_period_2: []

  coordinates: {},
  description: '',
  temperature: 0,
};

const updateWeather = (state, action) => {
  console.log('(before) state: ', state);
  const newState = {};
  const {
    temp_f, temp_c,
    weather_period_0,
    weather_period_1,
    weather_period_2
  } = state

  var newWeather = action.weather;

  Object.assign(newState, state, newWeather);
  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
}


const setDropdown = (state, action) => {

  const newState = {};
  const {gardenDropdown} = state;

  var newGardenDropdown = action.dbDropdownOptions
  Object.assign(newState, state, {gardenDropdown: newGardenDropdown});

  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);

  return newState;
}

// const setCoordinates = (state, action) => {
//   console.log("In WeatherReducer - setCoordinates state: ", state)
//   console.log("In WeatherReducer - setCoordinates action: ", action)
//   console.log('(before) state: ', state);

//   const newState = {};
//   // const {
//   //   temp_f, temp_c,
//   //   weather_period_0,
//   //   weather_period_1,
//   //   weather_period_2
//   // } = state
//   const {
//     coordinates,
//   } = state

//   var newCoordinates = action;

//   Object.assign(newState, state, {coordinates: newCoordinates});
//   console.log('(before) state: ', state);
//   console.log('(after) state: ', newState);
//   return newState
// }

const setForecast = (state, action) => {
  console.log("In WeatherReducer - setForecast state: ", state)
  console.log("In WeatherReducer - setForecast action: ", action)
  console.log('(before) state: ', state);

  const newState = {};
  // const {
  //   temp_f, temp_c,
  //   weather_period_0,
  //   weather_period_1,
  //   weather_period_2
  // } = state
  const {
    forecast,
  } = state

  var newForecast = action.forecast;

  Object.assign(newState, state, {forecast: newForecast});
  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
  return newState

}

const setCoordinates = (state, action) => {
  console.log("In WeatherReducer - setCoordinates state: ", state)
  console.log("In WeatherReducer - setCoordinates action: ", action)
  console.log('(before) state: ', state);

  const newState = {};
  // const {
  //   temp_f, temp_c,
  //   weather_period_0,
  //   weather_period_1,
  //   weather_period_2
  // } = state
  const {
    coordinates,
  } = state

  var newCoordinates = action;

  Object.assign(newState, state, {coordinates: newCoordinates});
  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
  return newState
}

const setDescription = (state, action) => {
  console.log("In WeatherReducer - setDescription state: ", state)
  console.log("In WeatherReducer - setDescription action: ", action)
  console.log('(before) state: ', state);

  const newState = {};
  // const {
  //   temp_f, temp_c,
  //   weather_period_0,
  //   weather_period_1,
  //   weather_period_2
  // } = state
  const {
    description,
  } = state

  var newDescription = action.description;

  Object.assign(newState, state, {description: newDescription});
  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
  return newState
}

const setTemperature = (state, action) => {
  console.log("In WeatherReducer - setTemperature state: ", state)
  console.log("In WeatherReducer - setTemperature action: ", action)
  console.log('(before) state: ', state);

  const newState = {};
  // const {
  //   temp_f, temp_c,
  //   weather_period_0,
  //   weather_period_1,
  //   weather_period_2
  // } = state
  const {
    temperature,
  } = state

  var newTemperature = action.temperature;

  Object.assign(newState, state, {temperature: newTemperature});
  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
  return newState
}

function weatherReducer(state = initialWeatherState, action) {
  console.log('WeatherReducer.js - Reducer called');
  console.log('current action: ', action);
  switch (action.type) {
  case 'UPDATE_WEATHER':
    return updateWeather(state, action);
  // case 'SET_COORDINATES':
  //   return setCoordinates(state, action);
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