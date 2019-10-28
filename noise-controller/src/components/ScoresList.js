// Where we will render classroom daily scores (multiple daily scores from the entire week maybe? depends on data..)
import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../axiosWithAuth';
import ScoreCard from './ScoreCard';

const ScoresList = props => {
    let [scores, setScores] = useState();

    useEffect(() => {
        axiosWithAuth()
            .get('https://noise-controller-backend.herokuapp.com/api/teachers')
            .then(res => {
                setScores(res.data.results);
                console.log(res.data.results);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className='container'>
            {scores.map(score => {
                return <ScoreCard score={scores.score} streak={scores.streak} theme={scores.theme} date={scores.createdAt} />
            })}
        </div>
    );
}

export default ScoresList;