import About from './About';
import auth from '../client.js';
import axios from 'axios';
import { connect } from 'react-redux';
import ProfilePic from './ProfilePic';
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import RecentGardens from './RecentGardens';
import RecentPosts from './RecentPosts';
import { setPlantHardiness } from '../Actions/WeatherActions';

class Profile extends Component {
  profile() {
    return auth.getProfile();
  }

  getHardiness() {
    let zipCode = this.props.coordinates;
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

  postUser() {
    const profile = this.profile();
    axios.post('/api/users', {
      username: profile.nickname,
      email: profile.email,
      profilePhoto: profile.picture,
      about: ''
    })
  }

  componentDidMount() {
    this.getHardiness();
    this.postUser();
  }

  render() {
    const profile = this.profile();
    return(
      <div>
        <div className="container-fluid containerStyle">
          <div className="row">
            <div className="col-md-3 profileLeft">
              <ProfilePic profile={profile} />
              <hr className="profileDividerLine" />
              <About profile={profile} />
              <hr className="profileDividerLine" />
            </div>
            <div className="col-md-6">
              <RecentPosts profile={profile} />
              <RecentGardens profile={profile} />
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
