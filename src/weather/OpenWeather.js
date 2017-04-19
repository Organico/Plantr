import React from 'react';
// import './App.css';
import { connect } from 'react-redux'
import { setCoordinates, setForecast } from '../Actions/WeatherActions.js';
import weatherReducer from '../reducers/WeatherReducer.js'
import CloudAnimation from './CloudAnimation'
//take off class names if using CloudAnmiation and homemade animations

const WUNDERGROUND_KEY = "b56f2c0800fdf6e4";

const ICON_SET = {
    chancesleet: "snowy",
    chancesnow: "snowy",
    clear: "sunny",
    flurries: "snowy",
    fog: "cloudy",
    hazy: "cloudy",
    rain: "rainy",
    chancerain: "rainy",
    sleet: "snowy",
    snow: "snowy",
    chanceflurries: "snowy",
    tstorms: "stormy",
    chancetstorms: "stormy",
    sunny: "sunny",
    mostlysunny: "sunny",
    partlysunny: "sunny",
    partlycloudy: "cloudy",
    mostlycloudy: "cloudy",
    cloudy: "cloudy"
};

const SUPPORTED_LANGUAGES = [
    "AF", "AL", "AR", "HY", "AZ",
    "EU", "BY", "BU", "LI", "MY",
    "CA", "CN", "TW", "CR", "CZ",
    "DK", "DV", "NL", "EN", "EO",
    "ET", "FA", "FI", "FR", "FC",
    "GZ", "DL", "KA", "GR", "GU",
    "HT", "IL", "HI", "HU", "IS",
    "IO", "ID", "IR", "IT", "JP",
    "JW", "KM", "KR", "KU", "LA",
    "LV", "LT", "ND", "MK", "MT",
    "GM", "MI", "MR", "MN", "NO",
    "OC", "PS", "GN", "PL", "BR",
    "PA", "RO", "RU", "SR", "SK",
    "SL", "SP", "SI", "SW", "CH",
    "TL", "TT", "TH", "TR", "TK",
    "UA", "UZ", "VU", "CY", "SN",
    "JI", "YI"
];

function getIcon(icon) {
    return ICON_SET[icon];
}

function getTemp (text) {
    return (text.match(/(\-?[0-9]+)/) || [])[1];
}


class Weather extends React.Component {

  constructor (props) {
      super(props);
      this.state = {};

      var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
      };

      if (navigator.geolocation) {
        console.log("THIS 23oi4uoiusndlakjsdf: ", this );
          navigator.geolocation.getCurrentPosition(pos => {
            console.log("POS.coords: ", pos.coords);
              this.setState({
                  coordinates: pos.coords
              });

              this.props.dispatchSetCoordinates(pos.coords)

              this.check();
          }, () => {
              this.check();
          }, options);
      }

      this.check();

      setInterval(() => this.check(), 10 * 60 * 1000);
  }

  check () {
      fetch("https://ipinfo.io/json")
        .then(res => res.json())
        .then(ip => {
            let lang = ip.country;
            if (!SUPPORTED_LANGUAGES.includes(lang)) {
                lang = "EN";
            }
            let crd = this.state.coordinates; //***Turns into ==> this.props.coordinates
            crd = crd || {
                latitude: +ip.loc.split(",")[0]
              , longitude: +ip.loc.split(",")[1]
            }
            const query = [crd.latitude, crd.longitude].join(",");
            const WUNDERGROUND_URL = `https://api.wunderground.com/api/${WUNDERGROUND_KEY}/forecast/lang:${lang}/q/${query}.json`;
            return fetch(WUNDERGROUND_URL)
        })
        .then(c => c.json())
        .then(forecast => {
            console.log("Forecast to be set in local state: ", forecast)
            this.setState({
                forecast: forecast
            });

            this.props.dispatchSetForecast(forecast);
        });
  }

  renderWeatherToday () {
      const today = this.state.forecast.forecast.txt_forecast.forecastday[0];
      //***Turns into this.props.forecast.forecast.txt_forecast.forecastday[0]
      const temp = getTemp(today.fcttext_metric);


      let icon = getIcon(today.icon);
      let hours = new Date().getHours();
      if ((icon === "sunny" || icon === "clear") && (hours > 20 || hours < 7)) {
          icon = "starry";
      }


      if (temp) {
          var tempElm = <div>{temp}</div>;
      }

                // <div className={`icon-big ${icon}`}>

      return (
            <div>
                <div>
                  <span>Today: </span>{today.title}
                </div>
                <div>
                  {today.fcttext_metric}
                </div>
                <div>
                  <span>[Animation goes here]</span>
                </div>
                <div>
                    <span>Temperature: {tempElm}</span>
                </div>
                <div>
                  <p> ============================ </p>
                </div>
            </div>
      );
  }

  renderDay (day, index) {
      const temp = getTemp(day.fcttext_metric);
      if (temp) {
          var tempElm = <span>{temp}</span>;
      }
                    // <div className={`icon-small ${getIcon(day.icon)}`}>

      return (
            <div key={index}>
                <div>
                  {day.title}
                </div>
                <div>
                  {day.fcttext_metric}
                </div>
                <div>
                  <span>[Animation goes here]</span>
                </div>
                <div>
                    <span>Temperature: {tempElm}</span>
                </div>
                <div>
                  <p> </p>
                </div>
            </div>
      );
  }

  renderNextDays () {
      console.log("this state right now: ", this.state)
      // console.log("this [p] right now: ", this.props)
      const nextDays = []
          , data = this.state.forecast.forecast.txt_forecast.forecastday;
          //***Turns into this.props.forecast.forecast.txt_forecast.forecastday

      console.log("TESTING EUALITY ",this.state )
      console.log("TESTING EUALITY ",this.props )

      for (var i = 2; i < data.length; i += 2) {
        nextDays.push(data[i])
      }

      return (
          <div>
            {nextDays.map((c, i) => this.renderDay(c, i))}
          </div>
      );
  }

  renderWeather () {
      if (!this.state.forecast) {
      //***Turns into if (!this.props.forecast) {
          return (
            <div>
                <p>Loading...</p>
            </div>
          );
      }
      return (
        <div>
            {this.renderWeatherToday()}
            {this.renderNextDays()}
        </div>
      );
  }

  render() {
    return (
        <div>
            <div>
                {this.renderWeather()}
            </div>
            <div>
              <CloudAnimation />
            </div>
        </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
  //garden state
  // temp_f: state.weatherReducer.temp_f,
  // temp_c: state.weatherReducer.temp_c,
  // weather_period_0: state.weatherReducer.weather_period_0,
  // weather_period_1: state.weatherReducer.weather_period_1,
  // weather_period_2: state.weatherReducer.weather_period_2,
  forecast: state.weatherReducer.forecast,
  coordinates: state.weatherReducer.coordinates
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
     dispatchUpdateWeather(weather) {
      dispatch(updateWeather(weather))
    },

    dispatchSetCoordinates(coordinates){
      dispatch(setCoordinates(coordinates))
    },

    dispatchSetForecast(forecast){
      dispatch(setForecast(forecast))
    }

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);

// export default Weather;
