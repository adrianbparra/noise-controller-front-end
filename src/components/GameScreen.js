import React, {useState, Suspense} from 'react';

import styled from "styled-components";
import { Grid, Segment, Button } from 'semantic-ui-react';
import { Canvas } from "@react-three/fiber";
import { Environment,OrbitControls } from "@react-three/drei";

import AnimalScreen from "./AnimalScreen";
import Box from "./gameObjects/Box.js";
import Cow from "./gameObjects/Cow/Cow.js";
import World from "./gameObjects/Environment.js";
import FarmHouse from "./gameObjects/FarmHouse.js";
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

const CanvasScreen = styled.div`
    height: calc(100vh - 400px);
`

function GameScreen() {
    
    return (
        <Segment>
            <Grid columns='equal'>
                {/* time score */}
                <GameHeaderTextStyle as={Grid.Column} >Time: {"00:00"}</GameHeaderTextStyle>
                <GameHeaderTextStyle as={Grid.Column}>Score: {"00"}</GameHeaderTextStyle>

            </Grid>

            <Grid>
                
                
                <Grid.Row width={16} stretched>
                    
                    <Grid.Column width={1} only="computer" textAlign="center">
                        <AudioMeter/>
                    </Grid.Column>
                    {/* Animal Screen */}
                    <CanvasScreen as={Grid.Column} mobile={16} tablet={16} computer={14}>
                    
                        <Canvas
                            camera={{ position: [0, 20, 160], fov: 15 }}
                        >
                                {/* <Environment preset="sunset" background /> */}
                                <ambientLight intensity={0.1} />
                                {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
                                <pointLight position={[10, 40, 40]} intensity={.6} />
                            <Suspense fallback={null}>
                                {/* <Box position={[0,0,0]}/> */}
                                <World/>
                                <FarmHouse position={[0,.01,0]}/>
                                {/* <Cow position={[0, 2, 0]}/> */}
                                

                            </Suspense>
                            <OrbitControls/>
                        </Canvas>


                    </CanvasScreen>

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