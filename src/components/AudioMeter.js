import React from 'react';
import {Progress, Segment} from "semantic-ui-react"
import styled from "styled-components";

const AudioContainerStyle = styled.div`
    height: 100%;
    padding: 0!important;
    min-height: 22vh;

`;
const AudioMeterStyle = styled.div`
    width: 100%;
    display: inline-block;
    height: ${props => props.height + "%" };
    background-color: ${props => "hsl("+ (100 - props.color) +", 100%, 50%)"};
    position: absolute;
    bottom: 0;
    left: 0;
    overflow: hidden;
    border-radius: .28571429rem;

`;

function AudioMeter({range}) {
    
    return (
        <AudioContainerStyle as={Segment}>
            <AudioMeterStyle height={50} color={50}/>
        </AudioContainerStyle>
    );
}

export default AudioMeter;