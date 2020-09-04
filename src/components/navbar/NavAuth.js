import React from "react";
import { Link } from 'react-router-dom';
import NavSettings from "./NavSettings.js";
import {  Menu, Dropdown, Icon } from 'semantic-ui-react';

import {connect} from "react-redux" 
import { useLazyQuery } from '@apollo/client';

import {GET_CLASSES} from "../queries/queries.js";


import {selectCurrentClass} from "../../actions/classesAction";





function NavAuth(props) {
  const [isMobile, setMobile] = React.useState(getWindowWidth())
  const [loadClasses, { called,loading, data} ] = useLazyQuery(GET_CLASSES);
 

  // React.useEffect(()=>{

  //   setSelectedClass(props.selectedClass.name)

  // },[props.selectedClass])

  React.useEffect(()=>{

    localStorage.getItem("token") && loadClasses()
    
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

  function changeClass(cls) {
    console.log("class picked",cls)
    //action for currently Selected Class
    props.selectCurrentClass(cls)
  }
  


  // Will check if there is a token as well
  if(localStorage.getItem("token")){
    
    return (
      <>
      <Dropdown
        item 
        text={!true ? "Class" :  isMobile ? `${"longclass name".slice(0,10)}...`: "props.selectedClass.name"}
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
          {data && data.classes.map(cls=>{
            return(
            <Menu.Item
              key={cls.id}
              onClick={()=>changeClass(cls)}
              tabIndex="0"
            >
              {cls.name}
            </Menu.Item>
            )
          })}

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