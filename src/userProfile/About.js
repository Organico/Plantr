import axios from 'axios';
import React, { Component } from 'react';

let userAboutObject = {};
userAboutObject.about = "Farming is a big passion of mine that I inherited from my father. He was raised on a mango and banana farm in the outskirts of Ismalia, Egypt. My current passion is trying to grow hardy plants in unexpected places, including Russian Pomegranates and Hardy Kiwis in Northern Virginia."

class About extends Component {
  constructor() {
    super()
    this.state = {
      edit: false
    }
  }

  getAbout() {
    const profile = this.props.profile;
    axios.get('api/users/' + profile.email)
    .then((res) => {
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
    // functionality doesn't exist - needs to be reworked
    if (this.state.edit) {
      return (
        <div>
          <textarea className="textArea" rows="4" ref={(message) => newMessage = message } type="string" name="newMessage" defaultValue={JSON.parse(userAboutObject.about)}>
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
    axios.put('api/users/' + id + '/', {
      about: about
    }).then((res) => {
      console.log("Successfully posted your AboutMe! ", res.data);
      this.toggleState();
      this.getAbout();
    }).catch((err) => {
      console.error("Error in submitting your AboutMe - About.js: ", err);
    });
  }

  toggleState() {
    this.setState({edit: !this.state.edit});
  }

  componentDidMount() {
    // this.getAbout();
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
