import React, { Component } from 'react';
import GardenSquareGridView from '../GardenSquareGrid/getGardenSquareGrid';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import IndividualGarden from './IndividualGarden';
import axios from 'axios';
import auth from '../client.js';
import { setPosts } from '../Actions/ForumActions';

let userGardens = [];

class RecentGardens extends Component {
  constructor() {
    super()
      this.state = {
        dropDown: false
      }
  }

  toggleDropDown() {
    console.log('toggleDropDown is being toggled');
    this.setState({this.state.dropDown: !this.state.dropDown});
  }

  getUserGardens() {
    const profile = auth.getProfile();
    axios.get('/api/gardens/' + profile.email).then((res) => {
      let personalGarden = res.data;
      for (let i = 0; i < personalGarden.length; i++) {
        let gardenObj = {
          gardenGrid: personalGarden[i].gardenGrid,
          plantGrid: personalGarden[i].plantGrid,
          profileEmail: personalGarden[i].profileEmail,
          gardenName: personalGarden[i].gardenName,
          profilePicture: personalGarden[i].profilePicture
        }
        userGardens.push(gardenObj);
        console.log('userGardens: ', userGardens)
      }
    }).catch((err) => {
      console.error("There was a get request error on the client in User RecentGardens", err);
    });
  }

  componentDidMount() {
    this.getUserGardens();
  }

  render() {
    const profile = auth.getProfile();
    console.log('PROFILE: ', profile)
    return (
      <div className="row">
        <div className="col-md-12 offset-md-2 right userGarden">
          <div className="userGardenSpan">
            <h3>Recent Gardens</h3>
              { userGardens.map((garden, i) => {
                if (!this.state.dropDown) {
                  console.log('THIS IS THE THIS: ', this);
                  return <div>
                    <IndividualGarden gardenName={garden.gardenName} nickname={profile.nickname} profilePicture={garden.profilePicture} onClick={ () => { this.toggleDropDown(); }}/>
                    </div>
                  } else {
                    return <IndividualGarden gardenName={garden.gardenName} plantGrid={garden.plantGrid} gardenGrid={garden.gardenGrid} nickname={profile.nickname} profilePicture={garden.profilePicture} onClick={ () => { this.toggleDropDown(); }}/>
                  }
                }
              )}
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    posts: state.forumReducer.posts,
    currentPost: state.forumReducer.currentPost
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetPost(message) {
      dispatch(setPosts(message));
    }
  };
};
            // <GardenSquareGridView />

export default connect(mapStateToProps, mapDispatchToProps)(RecentGardens);