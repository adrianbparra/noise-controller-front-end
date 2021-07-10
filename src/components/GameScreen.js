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
                
                
                <Grid.Row width={16}>
                    
                    <Grid.Column width={1} only="computer" textAlign="center">
                        Volume
                    </Grid.Column>
                    {/* Animal Screen */}
                    <Grid.Column mobile={16} tablet={16} computer={14}>

                    <AnimalScreen/>

                    </Grid.Column>

                    <Grid.Column width={1} only="computer" textAlign="center">
                        Range
                    </Grid.Column>
                    
                </Grid.Row>
                
                

                <Grid.Row>
                    <Grid.Column only="mobile tablet" width={2} textAlign="center">
                        Volume
                    </Grid.Column>
                    <Grid.Column mobile={12} tablet={12} computer={16} textAlign="center">
                        <Button size='massive' icon='play' content='Start'/>
                    </Grid.Column>
                    <Grid.Column only="mobile tablet" width={2}  textAlign="center">
                        Range
                    </Grid.Column>
                </Grid.Row>
               

            </Grid>

        </Segment>
    );
}

export default GameScreen;