import axios from 'axios';
import React, { Component } from 'react';
import { addAbout } from '../Actions/UserActions';

let userAboutObject = {};
class About extends Component {
  constructor() {
    super()
    this.state = {
      edit: false,
      about: ''
    }
  }

  getAbout() {
    const profile = this.props.profile;
    console.log('here is the profile: ', profile)
    axios.get('api/users/' + profile.email)
    .then((res) => {
      console.log('here is the res in ABOUTJS: ', res)
      userAboutObject = {
        id: res.data._id,
        about: res.data.about
      }
      console.log('successfully getting the user information in AboutJS')
    }).catch((err) => {
      console.error('there has been an error in rendering your AboutMe: ', err);
    });
  }

  renderAboutMe() {
    let newMessage;
    if (this.state.edit) {
      return (
        <div>
          <textarea className="textArea" rows="4" ref={(message) => newMessage = message } type="string" name="newMessage" defaultValue={userAboutObject.about}>
          </textarea>
          <button type="submit" onClick ={ () => {
            newMessage.value = JSON.stringify(newMessage.value);
            this.setAbout(userAboutObject.id, newMessage.value);
            newMessage.value = '';
          }}>submit</button>
        </div>
      )
    }
    return (
      <div>
        <p>{userAboutObject.about}</p>
        <button type="submit" onClick ={ () => {
          this.toggleState();
          }}>edit</button>
      </div>
      )
   }

  setAbout(id, about) {
    console.log('here is the about id: ', id, ' here is the about in about ', about)
    axios.put('api/users/' + id, {
      about: about
    }).then((res) => {
      console.log("Successfully posted your AboutMe! ", res.data);
      this.toggleState();
    }).then((res) => {
      this.getAbout();
    }).catch((err) => {
      console.error("Error in submitting your AboutMe - About.js: ", err);
    });
  }

  toggleState() {
    this.setState({edit: !this.state.edit});
  }

  componentDidMount() {
    this.getAbout();
  }

  render() {
    return (
      <div className="row userAboutMe">
        <div className="col-md-12 about">
          <h3 id="aboutMe"> About Me </h3>
          <div>
            { this.renderAboutMe() }
          </div>
        </div>
      </div>
      )
  }
}


export default About;
