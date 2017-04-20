import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

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
    return (
      <div className="nav">
        <Navbar color="transparent" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          {/*<NavbarBrand href="/" src="/logo.png"><img id="logo" src="/logo.png"/></NavbarBrand>*/}
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>


              <NavItem>
                <NavLink href="#home"><span className="navText">Home</span></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#weather"><span className="navText">Weather</span></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#plant"><span className="navText">Plant Test Env</span></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#cubes"><span className="navText">My 3d Gardens</span></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#squares"><span className="navText">My 2d Gardens</span></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#creategarden"><span className="navText">Create Gardens</span></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#profile"><span className="navText">My Profile</span></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#forum"><span className="navText">Forum</span></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}