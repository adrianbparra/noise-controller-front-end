import React from 'react';

import styled from "styled-components";
import { Grid, Segment } from 'semantic-ui-react';

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
    return (
        <Segment>
            <Grid columns='equal'>
                {/* time score */}
                <GameHeaderText as={Grid.Column} >Time: {"00:00"}</GameHeaderText>
                <GameHeaderText as={Grid.Column}>Score: {"00"}</GameHeaderText>

            </Grid>

            <AnimalScreen></AnimalScreen>
            {/* Animal screen */}

            {/* voice bar start total bar */}
        </Segment>
    );
}

export default GameScreen;