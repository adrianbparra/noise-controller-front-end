import React from "react";
import { Link } from 'react-router-dom';
import NavSettings from "./NavSettings.js";
import MenuItem from "./MenuItem.js"
import {  Menu, Dropdown, Icon } from 'semantic-ui-react';

import {connect} from "react-redux";
import { useQuery,gql } from '@apollo/client';

import {USER} from "../../queries/queries.js";


import {selectCurrentClass} from "../../actions/classesAction";





function NavAuth(props) {
  const [isMobile, setMobile] = React.useState(getWindowWidth())
  // const [loadClasses, { called,loading, data} ] = useLazyQuery(GET_CLASSES);
  const  {loading, data, error, called, variables} = useQuery(USER)
  // console.log(loading,data,error,called,variables)

  React.useEffect(()=>{
    
    function handleResize() {
      setMobile(getWindowWidth());
      
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    
  },[])

  function getWindowWidth(){
    const { innerWidth} = window;
    return innerWidth  < 768 ? true : false
    
  }

      if(data){
        return (
          <>
          <Dropdown
            item 
            text={!data.user.selectedClass ? "Class" :  isMobile ? `${data.user.selectedClass.name.slice(0,10)}...`: data.user.selectedClass.name}
            simple
            scrolling
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
              {data.user && data.user.classes.map(cls=> <MenuItem cls={cls} /> )}

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
              // onClick={handleMenuChange}
              as={Link} to="/login"
            >
              Login
            </Menu.Item>
            <Menu.Item
              // onClick={handleMenuChange}
              as={Link} to="/signup"
            >
              Sign Up
            </Menu.Item>

          </Menu.Menu>
        )
      }

    
}

// const mapStatetoProps = state=>({
//   account: state.accountReducer,
//   classes: state.classReducer.classes,
//   selectedClass: state.classReducer.selectedClass
// })

export default NavAuth