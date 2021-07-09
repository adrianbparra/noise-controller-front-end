import React, {useState} from 'react';

import styled from "styled-components";
import { Grid, Segment, Button } from 'semantic-ui-react';

import AnimalScreen from "./AnimalScreen";

const GameHeaderText = styled.div`
    font-size: 1.2rem;
    font-weight: 800;
    color: white;
    filter: drop-shadow(0 0 0.25rem black);
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
    text-align: center;
    text-transform: uppercase;
`

function GameScreen() {
    /// will hold state so it will update noise level and animal screen
    return (
        <Segment>
            <Grid columns='equal'>
                {/* time score */}
                <GameHeaderText as={Grid.Column} >Time: {"00:00"}</GameHeaderText>
                <GameHeaderText as={Grid.Column}>Score: {"00"}</GameHeaderText>

            </Grid>

            <Grid>
                
                
                    <Grid.Row columns={16}>
                        {/* Animal Screen */}
                        
                        <AnimalScreen/>
                    </Grid.Row>
                
                

                <Grid.Row>
                    <Grid.Column width={2} textAlign="center">
                        Volume Meter
                    </Grid.Column>
                    <Grid.Column width={12} textAlign="center">
                        <Button size='massive' icon='play' content='Start'/>
                    </Grid.Column>
                    <Grid.Column width={2}  textAlign="center">
                        Range Meter
                    </Grid.Column>
                </Grid.Row>
               

            </Grid>

        </Segment>
    );
}

export default GameScreen;