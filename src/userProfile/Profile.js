import About from './About';
import { addAbout } from '../Actions/UserActions';
import axios from 'axios';
import { connect } from 'react-redux';
import FriendsList from './FriendsList.js'
import ProfilePic from './ProfilePic';
import React, { Component } from 'react';
import RecentGardens from './RecentGardens';
import RecentPosts from './RecentPosts';
import { setPlantHardiness } from '../Actions/WeatherActions';

class Profile extends Component {
  getHardiness() {
    let zipCode = this.props.coordinates;
    axios.get('api/users/hardiness', {
      params: {
        zipCode: zipCode
      }
    }).then((res) => {
      this.props.dispatchPlantHardiness(res.data);
    }).catch((err) => {
      console.error('error in ProfileJS: ', err)
    })
  }

  postUser() {
    const profile = this.props.profile;
    axios.get('/api/users/' + profile.email)
    .then((res) => {
      if (res.data) {
        return;
      } else {
        axios.post('/api/users', {
          username: profile.nickname,
          email: profile.email,
          profilePhoto: profile.picture,
          about: '',
          friends: []
        }).then((res) => {
          window.location.replace("http://stackoverflow.com");
        }).catch((err) => {
          console.error('there was a profile post error: ', err);
        })
      }
    })
    .catch((err) => {
      console.error('there was a profile get error: ', err);
    })
  }

  componentDidMount() {
    this.getHardiness();
    this.postUser();
  }

  render() {
    const profile = this.props.profile;
    const userGardens = [];
    return(
      <div>
        <div className="profile-style">
          <div className="row">
            <div className="col-md-3 profile-left">
              <ProfilePic profile={profile} />
              <hr className="profile-divider-line" />
              <About profile={profile} />
              <FriendsList profile={profile} />
              <hr className="profile-divider-line" />
            </div>
            <div className="col-md-9">
              <RecentPosts profile={profile} />
              <RecentGardens
                profile={profile}
                userGardens={userGardens}
              />
            </div>
          </div>
        </div>
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.userProfileReducer.profile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchPlantHardiness(hardiness) {
      dispatch(setPlantHardiness(hardiness));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
