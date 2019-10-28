import React from 'react';


const ScoreCard = props => {
    return (
        <div className='container'>
            <h1>Score: {props.score} </h1>
            <h1>Streak: {props.streak} </h1>
            <h1>Theme: {props.theme} </h1>
            <h1>Date: {props.createdAt} </h1>
        </div>

    );
}

export default ScoreCard;