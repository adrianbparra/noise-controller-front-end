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
    const [volumeReading, setVolumeReading] = useState(0)
    const [rangeReading,setRangeReading] = useState(0)
    const [time,setTime] = useState(0)
    const [animals, setAnimals] = useState([])

    const getMedia = async () => {
        try {
          const audioMedia = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
          })
          setAudio(audioMedia)

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
        if (audio){
            stopMedia()
        } else{
            getMedia()
        }
    }

    useEffect(()=>{
        const context = new AudioContext();
        const analyser = context.createAnalyser();
        let raId = null;
        
        if (audio){
    
            let audioSrc = context.createMediaStreamSource(audio);
            
            audioSrc.connect(analyser);
            
            function renderframe() {
                let freqData = new Uint8Array(analyser.frequencyBinCount)
                raId = requestAnimationFrame(renderframe)
                analyser.getByteFrequencyData(freqData)
                setAudioData(freqData)
            }
    
            renderframe()

        } else {

            setVolumeReading(0)
            setRangeReading(0)
            setTime(0)

            if (context){
                context.close()
            }
            if (analyser){
                analyser.disconnect()
            }

        }

        return ()=>{
            cancelAnimationFrame(raId)
        }

    },[audio])

    useEffect(()=>{

        if (audio){

            const volume = audioData.reduce((s,a)=>s+a,0)/1024*5

            setVolumeReading(volume >= 100 ? 100 : volume)
            
            if (volume >= 100) {
                if(rangeReading > 100){
                    setRangeReading(0)
                } 
                else {
                    setRangeReading(rangeReading + 1)
                }
            }

        } else {
            setTime(0)
            setVolumeReading(0)
            setRangeReading(0)
        }

    },[audioData])

    useEffect(()=>{

        let interval

        if (audio){
            interval = setInterval(() => {
                setTime((time)=> time + 1000)
            }, 1000);

            
        } else {
            clearInterval(interval)
            setTime(0)
        }

        return ()=>{
            clearInterval(interval)
        }

    },[audio])
    
    useEffect(()=>{

        if (time % 5000 == 0 && time > 0){
            // add an animal
            console.log(animals)

            setAnimals([<Cow key={time}/>,...animals])

        }
    },[time])
    
    return (
        <Segment>
            <Grid columns='equal'>
                <GameHeaderTextStyle as={Grid.Column} >Time: {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:{("0" + Math.floor((time / 1000) % 60)).slice(-2)} </GameHeaderTextStyle>
            </Grid>

            <Grid>
                
                <Grid.Row width={16} stretched>
                    
                    <Grid.Column width={1} only="computer" textAlign="center">
                        <AudioMeter range={rangeReading}/>
                    </Grid.Column>
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
                                {/* <Cow position={[10, 2.2, 0]}/> */}
                                {animals.map(animal => animal)}

                            </Suspense>
                            <OrbitControls/>
                        </Canvas>

                    </CanvasScreen>

                    <Grid.Column width={1} only="computer" textAlign="center">
                        <AudioMeter range={volumeReading}/>
                    </Grid.Column>
                    
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column only="mobile tablet" mobile={3} tablet={2} textAlign="center">
                        <AudioMeter range={rangeReading}/>
                    </Grid.Column>
                    <Grid.Column mobile={10} tablet={12} computer={16} textAlign="center">
                        <Button onClick={handleGame} size='huge' icon={audio ? "stop": "play"} content={audio ? "STOP":"START"}/>
                    </Grid.Column>
                    <Grid.Column only="mobile tablet" mobile={3} tablet={2}  textAlign="center">
                        <AudioMeter range={volumeReading}/>
                    </Grid.Column>
                </Grid.Row>

            </Grid>

        </Segment>
    );
}

export default GameScreen;