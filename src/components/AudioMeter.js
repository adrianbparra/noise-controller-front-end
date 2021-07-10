import React from 'react';
import {Segment} from "semantic-ui-react"
import styled from "styled-components";

const AudioContainerStyle = styled.div`
    height: 100%;
    padding: 0!important;
`;

function AudioMeter(props) {
    return (
        <AudioContainerStyle as={Segment}>
            
        </AudioContainerStyle>
    );
}

export default AudioMeter;