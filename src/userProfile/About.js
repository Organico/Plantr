import axios from 'axios';
import React, { Component } from 'react';
import { addAbout } from '../Actions/UserActions';

class About extends Component {
  constructor() {
    super()
    this.state = {
      edit: false,
      about: '',
      id: ''
    }
  }

  getAbout() {
    const profile = this.props.profile;
    axios.get('api/users/' + profile.email)
    .then((res) => {
      this.setState({ about: res.data.about, id: res.data._id })
    }).catch((err) => {
      console.error('there has been an error in rendering your AboutMe: ', err);
    });
  }

  renderAboutMe() {
    let newMessage;
    if (this.state.edit) {
      return (
        <div>
          <textarea className="textArea" rows="4" ref={(message) => newMessage = message } type="string" name="newMessage" defaultValue={this.state.about}>
          </textarea>
          <button type="submit" onClick ={ () => {
            newMessage.value = JSON.stringify(newMessage.value);
            this.setAbout(this.state.id, newMessage.value);
            newMessage.value = '';
          }}>submit</button>
        </div>
      )
    }
    return (
      <div>
        <p>{this.state.about}</p>
        <button type="submit" onClick ={ () => {
          this.toggleState();
          }}>edit</button>
      </div>
      )
   }

  setAbout(id, about) {
    axios.put('api/users/' + id, {
      about: about
    }).then((res) => {
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
