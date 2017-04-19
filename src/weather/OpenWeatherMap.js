import axios from 'axios';

const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?&appid=b625bae7d54136d7e2d33c6a3f383f9e&units=metric';


  export function getTemp(location) {
    var encodedLocation = encodeURIComponent(location);
    console.log("Encoded Location: ", encodedLocation)

    var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;
    console.log("requestUrl : ", requestUrl)

    return axios.get(requestUrl).then(
      function(res) {
        if (res.data.cod && res.data.message){
          throw new Error(res.data.message);
        } else {
          console.log("return data from axios request: ", res.data)
          return res.data.main.temp;
        }
      },
      function(res) {
        throw new Error(res.data.message);
      }
    );
  }

  export function getCoordinates(location) {
    var encodedLocation = encodeURIComponent(location);
    console.log("Encoded Location: ", encodedLocation)

    var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;
    console.log("requestUrl : ", requestUrl)

    return axios.get(requestUrl).then(
      function(res) {
        if (res.data.cod && res.data.message){
          throw new Error(res.data.message);
        } else {
          console.log("return data from axios request: ", res.data)
          return res.data.coord;
        }
      },
      function(res) {
        throw new Error(res.data.message);
      }
    );
  }

  export function getWeatherDescription(location) {
    var encodedLocation = encodeURIComponent(location);
    console.log("Encoded Location: ", encodedLocation)

    var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;
    console.log("requestUrl : ", requestUrl)

    return axios.get(requestUrl).then(
      function(res) {
        if (res.data.cod && res.data.message){
          throw new Error(res.data.message);
        } else {
          console.log("return data from axios request: ", res.data)
          return res.data.weather[0].description;
        }
      },
      function(res) {
        throw new Error(res.data.message);
      }
    );
  }

