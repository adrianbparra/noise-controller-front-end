import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import styled from "styled-components";

const GameScreenSegment = styled.div`
    height:auto;
    width: 95%;
    border: 1px solid rgba(34,36,38,.15);
    border-radius: .28571429rem;
    margin-left: auto;
    margin-right: auto;

`;

function AnimalScreen(props) {
    return (
        <GameScreenSegment>
            Game Screen
            {/* shows animals depending on time counted and voice low */}
        </GameScreenSegment>
    );
}

export default AnimalScreen;