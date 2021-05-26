import React, { useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import {  Menu, Dropdown, Icon } from 'semantic-ui-react';
import { useLazyQuery } from '@apollo/client';

import { USER } from "../../queries/queries.js";
import { AuthContext } from "../../auth/auth.js";

import NavSettings from "./NavSettings.js";
import MenuItem from "./MenuItem";

function NavAuth() {
  const { user } = useContext(AuthContext);

  const [isMobile, setMobile] = React.useState(getWindowWidth())
  const  [getUser, {loading, data, error, called, variables }] = useLazyQuery(USER)

  useEffect(()=>{
    
    function handleResize() {
      setMobile(getWindowWidth());
      
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    
  },[])

  useEffect(() => {

    if (user){
      getUser()
    }
  },[user])

  function getWindowWidth(){
    const { innerWidth } = window;
    return innerWidth  < 768 ? true : false
    
  }

      if(user){
        return (
          <>
          <Dropdown
            item 
            text = {data && data.getUser.selectedClass ? isMobile ? `${data.getUser.selectedClass.name.slice(0,10)}...` : data.getUser.selectedClass.name : "Classes"  }
            simple
            loading={loading}
          >
            <Menu.Menu>
              <Menu.Item
                as={Link} to="/classform"
              >
                Add A Class
              </Menu.Item>
              <Menu.Item
                as={Link} to="/classes"
              >
                All Classes
              </Menu.Item>
              <Dropdown.Divider />
              {data && data.getUser.classes.map(cls=> <MenuItem key={cls.id} cls={cls} /> )}

            </Menu.Menu>

          </Dropdown>

          {isMobile ? 
            <Menu.Menu position="right">
              <Dropdown
                item
                simple
                trigger={(<span><Icon name="user"/></span>)}
              >
                <Menu.Menu>
                  <NavSettings/>
                </Menu.Menu>
              </Dropdown>
            </Menu.Menu> : 
            <Menu.Menu position="right">
              <NavSettings/>
            </Menu.Menu>    
          }

          </>
        )
      } else {
        return (
          <Menu.Menu position="right">
            <Menu.Item
              as={Link} to="/login"
            >
              Login
            </Menu.Item>
            <Menu.Item
              as={Link} to="/signup"
            >
              Sign Up
            </Menu.Item>

          </Menu.Menu>
        )
      }

    
}

export default NavAuth