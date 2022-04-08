import React from 'react';
import { Link } from 'react-router-dom';

import NavAuth from "./NavAuth.js";

import {  Menu } from 'semantic-ui-react';
import styled from "styled-components";

const MenuStyled = styled.div`
margin-bottom: 2rem!important;
`;


function NavBar() {

  return (
    <Menu as={MenuStyled}>
      <Menu.Item key='home'
        name="Lets Play"
        as = {Link} 
        exact 
        to="/"
      >
        
      </Menu.Item>

      <NavAuth/>
      
    </Menu>
  );
}

export default NavBar;