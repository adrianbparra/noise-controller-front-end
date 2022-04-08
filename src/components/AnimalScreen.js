import React, { useRef, useState, useMemo } from 'react';
import { Canvas,useFrame} from "@react-three/fiber";
import * as THREE from "three";
import styled from "styled-components";
import backgroundImage from "../images/farm_background.png"

const GameScreenDivStyle = styled.div`
    border: 1px solid rgba(34,36,38,.15);
    border-radius: .28571429rem;
    background-color: #9fc5e8ff;
`;

const  ImageStyle = styled.img`
    max-width: 100%;
    max-height: 100%;
    height: auto;
    display: block;
`;

function AnimalScreen() {
    return (
        <GameScreenDivStyle>
            <ImageStyle src={backgroundImage} alt="Farm Background"/>
        </GameScreenDivStyle>
    );
}

export default AnimalScreen;