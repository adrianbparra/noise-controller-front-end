// Where we will render classroom daily scores (multiple daily scores from the entire week maybe? depends on data..)
import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom"

import ScoreCard from './ScoreCard';
import { Table, Segment, Header } from "semantic-ui-react";

const ScoresList = props => {
    const history = useHistory();

    // useEffect(() => {
    //     console.log("class  change")
    //     if(props.selectedClass.name && props.match.params.name !== props.selectedClass.name){
    //         props.getScores(props.selectedClass.id)
    //         let path =  "/" + props.selectedClass.name + "/scores";
    //         history.push(path, props.selectedClass)
    //     }
    // }, [props.selectedClass]);

    useEffect(()=> {
        console.log("match change", props.match.params)
        
        let [classUrl] = props.classes.filter(cls => cls.name === props.match.params.name)
        
        if(props.match.params.name !== props.selectedClass.name){
                console.log(props.match.params)
            
                props.selectCurrentClass(classUrl)
            } else {
                
        }

    },[props.match.params])


    ///refresh page is props.selectedClass update

    return (
        <Segment>
            <Header as="h2" textAlign="center">
               Scores for {props.selectedClass.name}
            </Header>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Theme</Table.HeaderCell>
                        <Table.HeaderCell>Score</Table.HeaderCell>
                        <Table.HeaderCell>Streak</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {props.scores ? props.scores.map(score => <ScoreCard score={score} />): null}

                </Table.Body>

            </Table>
            
        </Segment>
    );
}


export default ScoresList;