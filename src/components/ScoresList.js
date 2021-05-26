// Where we will render classroom daily scores (multiple daily scores from the entire week maybe? depends on data..)
import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom"
import { Table, Segment, Header } from "semantic-ui-react";
import { useQuery } from "@apollo/client";

import {SELECTEDCLASS} from "../queries/queries";
import ScoreCard from './ScoreCard';

const ScoresList = props => {
    const { data } = useQuery(SELECTEDCLASS);
    const history = useHistory();

    useEffect(() => {
        if(data && props.match.params.name !== data.getUser.selectedClass.name){
            let pathname =  "/" + data.getUser.selectedClass.name + "/scores";
            history.replace({ pathname })
        }
    }, [data]);

    return (
        <Segment>
            <Header as="h2" textAlign="center">
               Scores for {data && data.getUser.selectedClass.name}
            </Header>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Theme</Table.HeaderCell>
                        <Table.HeaderCell>Score</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data && data.getUser.selectedClass.scores.map(score => <ScoreCard score={score} />)}

                </Table.Body>

            </Table>
            
        </Segment>
    );
}


export default ScoresList;