import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import '../App.css';
function Nav() {
  return (
    <Menu pointing className='fixed'>
      <Container className='nav'>
        <Menu.Item key='home'>
          <NavLink exact to="/home">Home</NavLink>
        </Menu.Item>
        <Menu.Item key='scores'>
          <NavLink to={`/scores`}>Scores</NavLink>
        </Menu.Item>
        <Menu.Item key='settings'>
          <NavLink to="/settings">Settings</NavLink>
        </Menu.Item>
        <Menu.Item key='logout'>
          <NavLink to="/logout">Log Out</NavLink>
        </Menu.Item>
      </Container>
    </Menu>
  );
}
export default Nav;