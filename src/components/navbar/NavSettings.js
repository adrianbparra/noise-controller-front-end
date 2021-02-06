import React, { useContext } from "react"
import {Link ,useHistory} from "react-router-dom"

import { AuthContext } from "../../auth/auth.js";

import { Menu } from "semantic-ui-react";

function NavSettings(props) {
  const context = useContext(AuthContext);

  const history = useHistory();

  const handleLogout = e => {
    e.preventDefault()
    context.logout()
  }

    return (
        <> 
            <Menu.Item
            //   onClick={handleMenuChange}
              onClick={ ()=> {
                let path = "/"+ props.selectedClass.name + "/scores"
                history.push(path ,props.selectedClass)
              }}
              tabindex="0"
              name="scores"
              // disabled={props.selectedClass.name ? false: true}
            />
  
            <Menu.Item
            //   onClick={handleMenuChange}
              as={Link} to="/settings"
              name="settings"
            />
            
            <Menu.Item
              name="logout"
              // active={selectedMenu === "logout"}
              onClick={handleLogout}
              tabindex="0"
            /> 
  
         </>
    )
    
};

export default NavSettings