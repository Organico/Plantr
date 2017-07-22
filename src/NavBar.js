import auth from './client.js';
import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import WeatherTest from './weather/Weather.js';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
        dropdownOpen: false
      };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    let profilePic = {
    height: '30px',
    width: '30px',
    backgroundImage: 'url(' + this.props.profile.picture + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '50%'
  }
    return (
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <Dropdown className="navbar-toggler navbar-toggler-right btn" type="button" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle>
              <span className="menu-button">MENU <span className="navbar-toggler-icon" onClick={this.toggle}>
              </span></span>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem><li className="nav-item">
                <Link className="nav-link" to="/squares">Community Gardens</Link>
              </li></DropdownItem>
            <DropdownItem><Link className="nav-link" to="/creategarden">Create A Garden</Link></DropdownItem>
            <DropdownItem><Link className="nav-link" to="/forum">Forum</Link></DropdownItem>
            <DropdownItem><Link className="nav-link" to="/about">About Us</Link></DropdownItem>
            <DropdownItem><li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
              </li></DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Link className="navbar-brand" to="/"><img src="logo.png" height="40px" width="70px"/></Link>
        <div  id="navbarNavDropdown" className="navbar-collapse collapse">
          <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/squares">Community Gardens</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/creategarden">Create A Garden</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/forum">Forum</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About Us</Link>
              </li>
          </ul>
          <ul className="navbar-nav">
              <li className="nav-item navbarDivider">
                <div className="nav-link weather"><WeatherTest className="nav-link" /></div>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="javascript:window.location.reload()" onClick={auth.logout.bind(this)}>Logout</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile"><img style={profilePic} /></Link>
              </li>
          </ul>
        </div>
    </nav>
    );
  }
}
