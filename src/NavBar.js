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
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/" src="/logo.png"><img id="logo" src="/logo.png"/></NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>


              <NavItem>
                <NavLink href="#plant">Plant Test Env</NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="#cubes">My 3d Gardens</NavLink>
              </NavItem>


              <NavItem>
                <NavLink href="#squares">My 2d Gardens</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#creategarden">Create Gardens</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#home">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#profile">My Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#forum">Forum</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}