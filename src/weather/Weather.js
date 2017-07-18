import React from 'react';
import { connect } from 'react-redux'
import { setCoordinates, setDescription, setTemperature } from '../Actions/WeatherActions.js';
import weatherReducer from '../reducers/WeatherReducer.js'

import {getTemp, getCoordinates, getWeatherDescription} from './OpenWeatherMap'
import axios from 'axios'
import CloudAnimation from './CloudAnimation'

var loc;

class WeatherTest extends React.Component {
  constructor(props){
    super(props)
  }

  getLocation() {
    $.get("http://ipinfo.io", function(response) {
    let city = response.city.toString();
    let state = response.region.toString();
    loc = city +", " + state;
    return loc;
    }, "jsonp").then(res => {
      this.getWeatherData(loc);
    }).catch(err => {
      console.err("error found in weather.js", err);
    });
  }



  getTempData(requestUrl){
    var temperature;
    var that = this;
    axios.get(requestUrl).then(
      function(res) {
        if (res.data.cod && res.data.message){
          throw new Error(res.data.message);
        } else {
          temperature = res.data.main.temp;
          return res.data.main.temp;
        }
      },
      function(res) {
        throw new Error(res.data.message);
      }
    ).then(
      function(){
        that.props.dispatchSetTemperature(temperature)
    });
  }

  getDescriptionData(requestUrl){
    var description;
    var that = this;
    axios.get(requestUrl).then(
      function(res) {
        if (res.data.cod && res.data.message){
          throw new Error(res.data.message);
        } else {
          description = res.data.weather[0].description;
          return res.data.weather[0].description;
        }
      },
      function(res) {
        throw new Error(res.data.message);
      }
    ).then(
      function(){
        that.props.dispatchSetDescription(description)
    });
  }

  getCoordinatesData(requestUrl){
    var coordinates;
    var that = this;
    axios.get(requestUrl).then(
      function(res) {
        if (res.data.cod && res.data.message){
          throw new Error(res.data.message);
        } else {
          console.log("return data from axios request prefilter: ", res.data)
          coordinates = res.data.coord;
          return res.data.coord;
        }
      },
      function(res) {
        throw new Error(res.data.message);
      }
    ).then(
      function(){
        that.props.dispatchSetCoordinates(coordinates)
    });
  }


  getForecastedWeatherData(location){
  }

  getWeatherData(location){
    const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?&appid=b625bae7d54136d7e2d33c6a3f383f9e&units=metric';
    var encodedLocation = encodeURIComponent(location);
    var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;
    this.getTempData(requestUrl);
    this.getDescriptionData(requestUrl);
    this.getCoordinatesData(requestUrl);
  }

  componentDidMount(){
    this.getLocation();
  }

  render() {
    return(
      <div>
        <div> {Math.round(((this.props.temperature * 9) / 5) + 32)}°F - {this.props.description}</div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    coordinates: state.weatherReducer.coordinates,
    description: state.weatherReducer.description,
    temperature: state.weatherReducer.temperature,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    dispatchSetDescription(description){
      dispatch(setDescription(description))
    },
    dispatchSetCoordinates(coordinates){
      dispatch(setCoordinates(coordinates))
    },
    dispatchSetTemperature(temperature){
      dispatch(setTemperature(temperature))
    }

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherTest);



