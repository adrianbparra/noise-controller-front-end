import React from "react";
import { Link } from 'react-router-dom';
import { useQuery } from "@apollo/client";

import Class from "./Class";

import {  Segment,Header, Table,Button,Responsive } from 'semantic-ui-react';

import {USER} from "../../queries/queries";

function Classes() {
    const {data, loading} = useQuery(USER)

    return (
        <Segment>
            <Header as="h2" textAlign="center">All Classes</Header>
            <Table celled definition>
                <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell/>
                        <Table.HeaderCell>Class Name</Table.HeaderCell>
                        <Table.HeaderCell>Grade</Table.HeaderCell>
                        <Table.HeaderCell>Students</Table.HeaderCell>
                        <Table.HeaderCell>Highest Score</Table.HeaderCell>
                        <Table.HeaderCell>Theme</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                <Table.Body>
                { data && data.getUser.classes.map(cls => <Class cls={cls} />)}
                </Table.Body>
                
                <Table.Footer fullWidth>
                    <Responsive as={Table.HeaderCell} minWidth={768}/>
                    
                    <Table.HeaderCell colSpan="5" textAlign="right">
                        <Button
                            content="Add a Class"
                            icon="plus"
                            floated="right"
                            primary
                            as={Link} to="/classform"
                        />
                    </Table.HeaderCell>
                </Table.Footer>

            </Table>

        </Segment>
    )
}




export default Classes;