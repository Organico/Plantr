import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import auth from './client.js';
import WeatherTest from './weather/Weather.js';

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
    let profilePic = {
    height: '30px',
    width: '30px',
    backgroundImage: 'url(' + profile.picture + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '50%'
  }
    return (
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#"><img src="logo.png" height="40px" width="70px"/></a>
        <div  id="navbarNavDropdown" className="navbar-collapse collapse">
        <ul className="navbar-nav mr-auto">

            <li className="nav-item">
              <a className="nav-link" href="#squares">Community Gardens</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#creategarden">Create A Garden</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#forum">Forum</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">About Us</a>
            </li>
        </ul>
        <ul className="navbar-nav">
            <li className="nav-item navbarDivider">
              <a className="nav-link weather"><WeatherTest className="nav-link" /></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="javascript:window.location.reload()" onClick={auth.logout.bind(this)}>Logout</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#profile"><img style={profilePic} /></a>
            </li>
        </ul>
        </div>
    </nav>
    );
  }
}


            // <li className="nav-item">
            //   <a className="nav-link" href="#plant">Plant Test Env</a>
            // </li>