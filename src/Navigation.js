import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';

const Navigation = ({ id, location, logout }) =>
  <Segment inverted>
    <Menu inverted borderless>
      <Menu.Item as={Link} to="/cubes" color="green" name="cubes" active={location === '/cubes'} />
      <Menu.Item as={Link} to="/squares" color="green" name="My 2D Gardens" active={location === '/squares'} />
      <Menu.Item as={Link} to="/creategarden" color="green" name="Create 2D Garden" active={location === '/creategarden'} />
      <Menu.Item as={Link} to="/test" color="green" name="test" active={location === '/test'} />
      <Menu.Item as={Link} to="/layout" name="Layout" color="green" active={location === '/layout'} />
      <Menu.Item as={Link} to="/userprofile" name="profile" color="green" active={location === '/userprofile'} />
    </Menu>
  </Segment>;

export default Navigation;

Navigation.propTypes = {
  location: React.PropTypes.string.isRequired,
};

