import React from "react"
import {  Menu } from 'semantic-ui-react';




function MenuItems({cls},props) {

    const changeClass = (e) => {
        console.log("change class:", cls)
    }

    return(
        <Menu.Item
            key={cls.id}
            onClick={changeClass}
            tabIndex="0"
        >
            {cls.name}
        </Menu.Item>        
    )
}

export default MenuItems