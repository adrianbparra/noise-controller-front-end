import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Table,Button } from "semantic-ui-react";

import { updateUser } from "../../queries/queries";




function Class({cls}) {

    const history = useHistory();

    const editClass = e =>{

        // props.selectCurrentClass(cls)
        console.log("edit class")
        history.push(`/classes/${cls.name}`)

    }

    const handleDelete = e => {
        // props.deleteClass(cls.id)
        console.log("delete class")
    }

    return (

        <Table.Row>
            <Table.Cell textAlign="center" collapsing>
                <Button color="primary" icon="edit" content="Edit" onClick={editClass}/>
                
                <Button color="red" icon="delete" content="Delete" onClick={handleDelete}/>
            </Table.Cell>
            <Table.Cell>{cls.name}</Table.Cell>
            <Table.Cell>{cls.grade}</Table.Cell>
            <Table.Cell>{cls.numberOfKids}</Table.Cell>
            <Table.Cell >{cls.highestScore}</Table.Cell>
            <Table.Cell>{cls.theme}</Table.Cell>

        </Table.Row>
    )
}



export default Class;