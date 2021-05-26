import React, { useContext } from "react"
import {Link ,useHistory} from "react-router-dom"
import { useApolloClient, useQuery } from "@apollo/client"
import { Menu } from "semantic-ui-react";

import { AuthContext } from "../../auth/auth.js";
import { SELECTEDCLASS } from "../../queries/queries";

function NavSettings(props) {
  const client = useApolloClient()
  const context = useContext(AuthContext);
  const { data } = useQuery(SELECTEDCLASS)

  const history = useHistory();

  const handleLogout = e => {
    e.preventDefault()
    context.logout()
    client.clearStore()
  }

    return (
        <> 
            <Menu.Item
              name="scores"
              onClick={ ()=> {
                let path = "/"+ data.getUser.selectedClass.name + "/scores"
                history.push(path ,data.getUser.selectedClass)
              }}
              tabindex="0"
              disabled={data && data.getUser.selectedClass ? false: true}
            />
  
            <Menu.Item
              name="settings"
              as={Link} to="/settings"
              tabindex="0"
            />
            
            <Menu.Item
              name="logout"
              onClick={handleLogout}
              tabindex="0"
            /> 
  
         </>
    )
    
};

export default NavSettings