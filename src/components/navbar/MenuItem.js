import React from "react"
import {  Menu } from 'semantic-ui-react';
import { useMutation, useQuery } from "@apollo/client";

import { UPDATESELECTEDCLASS, SELECTEDCLASS, USER } from "../../queries/queries";



function MenuItems({cls}) {

    const {data} = useQuery(SELECTEDCLASS);

    const [ updateSelectedClass ] = useMutation(UPDATESELECTEDCLASS, {
        update(cache, {data: { updateUser }}){
            const data = cache.readQuery({
                query: USER
            });
            cache.writeQuery({ 
            query: USER, 
            data:{
                ...data,
                getUser: {
                ...data.getUser,
                selectedClass: updateUser.selectedClass,
                }
            }
            });
        }
    });

    const changeClass = () => {
        updateSelectedClass({variables:{selectedClassId: cls.id}})
    }

    return(
        <Menu.Item
            onClick={changeClass}
            tabIndex="0"
            active= {data && data.getUser.selectedClass.id === cls.id}
        >
            {cls.name}
        </Menu.Item>        
    )
}

export default MenuItems