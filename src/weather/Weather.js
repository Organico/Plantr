import React from 'react';
import { connect } from 'react-redux'
import { setCoordinates, setDescription, setTemperature } from '../Actions/WeatherActions.js';
import weatherReducer from '../reducers/WeatherReducer.js'

import {getTemp, getCoordinates, getWeatherDescription} from './OpenWeatherMap'
import axios from 'axios'

class WeatherTest extends React.Component {

  constructor(props){
    super(props)

  }

  getTempData(requestUrl){
    var temperature;
    var that = this;
    axios.get(requestUrl).then(
      function(res) {
        if (res.data.cod && res.data.message){
          throw new Error(res.data.message);
        } else {
          // console.log("return data from axios request: ", res.data)
          // console.log("this when the axios  data from axios request: ", this)
          // console.log("that when the axios  data from axios request: ", that)
          temperature = res.data.main.temp;
          return res.data.main.temp;
        }
      },
      function(res) {
        throw new Error(res.data.message);
      }
    ).then(
      function(){
        // console.log("this in the second then .... ", this)
        // console.log("that in the second then .|||... ", that)
        // console.log("test in the second then .... ", temperature)
        // console.log("props in the second then ||... ", that.props)
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
          // console.log("return data from axios request setDecription: ", res.data)
          // console.log("this when the axios  data from axios request: ", this)
          description = res.data.weather[0].description;
          return res.data.weather[0].description;
        }
      },
      function(res) {
        throw new Error(res.data.message);
      }
    ).then(
      function(){
        // console.log("this in the second then .... ", this)
        // console.log("that in the second then .|||... ", that)
        // console.log("test in the second then .... ", description)
        // console.log("props in the second then ||... ", that.props)
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
          // console.log("this when the axios  data from axios request: ", this)
          coordinates = res.data.coord;
          return res.data.coord;
        }
      },
      function(res) {
        throw new Error(res.data.message);
      }
    ).then(
      function(){
        // console.log("this in the second then .... ", this)
        // console.log("that in the second then .|||... ", that)
        // console.log("test in the second then .... ", coordinates)
        // console.log("props in the second then ||... ", that.props)
        that.props.dispatchSetCoordinates(coordinates)
    });
  }


  getForecastedWeatherData(location){
    // http://api.openweathermap.org/data/2.5/forecast?appid=b625bae7d54136d7e2d33c6a3f383f9e&units=metric&q=San%20Francisco

    //change url to "forecast" instead of weather
    //returns a list of weather forecasts for 3 hour intervales for five days
      //needs to have a function to increment by 3 hours in timestamp form
    //same format as getWeatherdata so maybe reformat functions to not be so specific

  }

  getWeatherData(location){
    const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?&appid=b625bae7d54136d7e2d33c6a3f383f9e&units=metric';

    var encodedLocation = encodeURIComponent(location);
    console.log("Encoded Location: ", encodedLocation)

    var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;
    console.log("requestUrl : ", requestUrl)

    this.getTempData(requestUrl);
    this.getDescriptionData(requestUrl);
    this.getCoordinatesData(requestUrl);
  }

  componentDidMount(){
    this.getWeatherData("San Francisco");
  }

  render() {

    // function renderMessage () {
    //   if (isLoading) {
    //     return <h3 className="text-center">fetching weather...</h3>;
    //   } else if (temp && location) {
    //     return <WeatherMessage location={location} temp={temp}/>;
    //   }
    // }

    // function renderError () {
    //   if (typeof errorMessage === 'string') {
    //     return (
    //       <ErrorModal message={errorMessage}/>
    //     );
    //   }
    // }

    return(
      <div>
        <h1>Get Weather</h1>
        <div><p>{this.props.temperature} </p></div>
        <div><p>{this.props.description} </p></div>
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



