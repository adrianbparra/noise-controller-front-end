import React, {useState} from 'react';

import styled from "styled-components";
import { Grid, Segment, Button } from 'semantic-ui-react';

import AnimalScreen from "./AnimalScreen";
import AudioMeter from "./AudioMeter";

const GameHeaderTextStyle = styled.div`
    font-size: calc(0.5em + 1.6vw);
    font-weight: 800;
    color: white;
    filter: drop-shadow(0 0 0.25rem black);
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
    text-align: center;
    text-transform: uppercase;
    margin: .8vw 0;
`

function GameScreen() {
    /// will hold state so it will update noise level and animal screen
    return (
        <Segment>
            <Grid columns='equal'>
                {/* time score */}
                <GameHeaderTextStyle as={Grid.Column} >Time: {"00:00"}</GameHeaderTextStyle>
                <GameHeaderTextStyle as={Grid.Column}>Score: {"00"}</GameHeaderTextStyle>

            </Grid>

            <Grid>
                
                
                <Grid.Row width={16}>
                    
                    <Grid.Column width={1} only="computer" textAlign="center">
                        <AudioMeter/>
                    </Grid.Column>
                    {/* Animal Screen */}
                    <Grid.Column mobile={16} tablet={16} computer={14}>

                    <AnimalScreen/>

                    </Grid.Column>

                    <Grid.Column width={1} only="computer" textAlign="center">
                        <AudioMeter/>
                    </Grid.Column>
                    
                </Grid.Row>
                
                

                <Grid.Row>
                    <Grid.Column only="mobile tablet" mobile={3} tablet={2} textAlign="center">
                        <AudioMeter/>
                    </Grid.Column>
                    <Grid.Column mobile={10} tablet={12} computer={16} textAlign="center">
                        <Button size='huge' icon='play' content='Start'/>
                    </Grid.Column>
                    <Grid.Column only="mobile tablet" mobile={3} tablet={2}  textAlign="center">
                        <AudioMeter/>
                    </Grid.Column>
                </Grid.Row>
               

            </Grid>

        </Segment>
    );
}

export default GameScreen;