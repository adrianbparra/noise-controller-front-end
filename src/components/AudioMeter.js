import React from 'react';
import {Progress, Segment} from "semantic-ui-react"
import styled from "styled-components";

const AudioContainerStyle = styled.div`
    height: 100%;
    padding: 0!important;
    min-height: 22vh;

`;
const AudioMeterStyle = styled.div.attrs(props => ({
    style : {
    height: props.height + "%",
    backgroundColor: "hsl(" + (100 - props.color) + ", 100%, 50%)",
    }
}) )`
    width: 100%;
    display: inline-block;
    position: absolute;
    bottom: 0;
    left: 0;
    overflow: hidden;
    border-radius: .3rem;
`;

function AudioMeter({range}) {
    
    return (
        <AudioContainerStyle as={Segment}>
            <AudioMeterStyle height={range} color={range}/>
        </AudioContainerStyle>
    );
}

export default AudioMeter;