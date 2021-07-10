import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import styled from "styled-components";
import backgroundImage from "../images/farm_background.png"

const GameScreenSegment = styled.div`
    width: 95%;
    height: 95%;
    border: 1px solid rgba(34,36,38,.15);
    border-radius: .28571429rem;
    margin-left: auto;
    margin-right: auto;
    background-color: #9fc5e8ff
`;

const  Image = styled.img`
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    object-fit: cover;
`;

function AnimalScreen(props) {
    return (
        <GameScreenSegment>
            <Image src={backgroundImage} alt="Farm Background"/>
        </GameScreenSegment>
    );
}

export default AnimalScreen;