import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import ProfilePic from './ProfilePic';
import About from './About';
import RecentGardens from './RecentGardens';
import RecentPosts from './RecentPosts';
import axios from 'axios';
import { setPlantHardiness } from '../Actions/WeatherActions';
import auth from '../client.js';

class Profile extends Component {

  postUser() {
    const profile = auth.getProfile();
    console.log("HERE IS THE PROFILE:", profile)
    axios.post('/api/users', {
      username: profile.nickname,
      email: profile.email,
      profilePhoto: profile.picture,
      about: ''
    })
  }

  getHardiness() {
  let zipCode = this.props.coordinates;
  console.log("GETTING HARDINESS")
  console.log('here is the zipCode: ', this.props)
    axios.get('api/users/hardiness', {
      params: {
        zipCode: zipCode
      }
    }).then((res) => {
      console.log('res here', res.data);
      this.props.dispatchPlantHardiness(res.data);
    }).catch(err => {
      console.error('error is: ', err)
    })
  }

  componentDidMount() {
    this.getHardiness();
    this.postUser();
  }

  render() {
    return(
      <div>
        <div className="container-fluid containerStyle">
          <div className="row">
            <div className="col-md-3 profileLeft">
              <ProfilePic />
              <hr className="profileDividerLine" />
              <About />
              <hr className="profileDividerLine" />
            </div>
            <div className="col-md-6">
              <RecentPosts />
              <RecentGardens />
            </div>
          </div>
        </div>
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    gardens: state.gardens,
    coordinates: state.weatherReducer.coordinates
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchUserParameters(username, gardens) {
      dispatch(setUserParameters(username, gardens));
    },
    dispatchPlantHardiness(data) {
      dispatch(setPlantHardiness(data))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);