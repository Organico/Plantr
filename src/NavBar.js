import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import auth from './client.js';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const profile = auth.getProfile();
    console.log('here is the profile: ', profile);
    console.log('here are the props in NavBar: ', this.props)
  //   let profilePic = {
  //   height: '50px',
  //   width: '50px',
  //   backgroundImage: 'url(' + this.props.post.profile + ')',
  //   backgroundRepeat: 'no-repeat',
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center'
  // }
    return (
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#home"><span id="navbrand">Plantr</span></a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#weather">Weather</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#plant">Plant Test Env</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#vrgarden">VR Gardens</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#squares">My 2D Gardens</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#creategarden">Create A Garden</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#profile">My Profile</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#forum">Forum</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="javascript:window.location.reload()" onClick={auth.logout.bind(this)}>Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}