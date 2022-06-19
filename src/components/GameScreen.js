import React, {useState, useEffect, Suspense} from 'react';

import styled from "styled-components";
import { Grid, Segment, Button } from 'semantic-ui-react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";

import AnimalScreen from "./AnimalScreen";
import Box from "./gameObjects/Box.js";
import Cow from "./gameObjects/Cow/Cow.js";
import Grass from "./gameObjects/Grass.js";
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
    height: calc(100vh - 350px);
`

function GameScreen() {
    const [audio, setAudio] = useState(null)
    const [audioData,setAudioData] = useState([])

    const getMedia = async () => {
        try {
          const audio = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
          })
          setAudio(audio)

        } catch (err) {
          console.log('Error:', err)
          alert("Unable to use Microphone")
        }
    }

    const stopMedia = () => {
        audio.getTracks().forEach(track => track.stop())
        setAudio(null)
    }

    const handleGame = () => {
        console.log("handle media")
        if (audio){
            stopMedia()
        } else{
            getMedia()
        }
    }

    useEffect(()=>{
        let context = new AudioContext();
        let analyser = context.createAnalyser();
        
        if (audio){
    
            let audioSrc = context.createMediaStreamSource(audio);
            
            audioSrc.connect(analyser);
    
            function renderframe() {
                let freqData = new Uint8Array(analyser.frequencyBinCount)
                requestAnimationFrame(renderframe)
                analyser.getByteFrequencyData(freqData)

                setAudioData(freqData)
    
            }
    
            renderframe()

        } else {

            if (context){
                context.close()
            }
            if (analyser){
                analyser.disconnect()
            }

        }

        return ()=>{

        }

    },[audio])

    useEffect(()=>{

        console.log(audioData)


    },[audioData])

    
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
                            camera={{ position: [0, 35, 240], fov: 15 }}
                        >
                            <Sky sunPosition={[10, 40, -400]} />
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 40, -400]} intensity={.3} />
                            <Suspense fallback={null}>
                                {/* <Box position={[0,0,0]}/> */}
                                <Grass/>
                                <FarmHouse position={[0,.01,0]}/>
                                <Cow position={[10, 2.2, 0]}/>
                                

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
                        <Button onClick={handleGame} size='huge' icon='play' content='Start'/>
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