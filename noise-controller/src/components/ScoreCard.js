import React from 'react';
import '../Score.css';
import { Link } from 'react-router-dom';
import Nav from './Nav';


const ScoreCard = props => {
    return (
        <>
        <Nav />
        <div className='container'>
        <h1>Score Board</h1>
        {/*<Link to='/home'>Home</Link> */}
        <div className='scores-container'>
            <div className='row-1'>
                <div className='column1-1'>
                    <h2>Score: 100 </h2>
                    <h2>Streak:  1</h2>
                    <h2>Theme:  safari</h2>
                    <h2>Date:  2019-07-29 12:55:56</h2>
                </div>
                <div className='column1-2'>
                    <h2>Score: 200 </h2>
                    <h2>Streak:  2</h2>
                    <h2>Theme:  safari</h2>
                    <h2>Date:  2019-10-29 2:55:56</h2>
                </div>
            </div>
            <div className='row-2'>
                <div className='column2-1'>
                        <h2>Score: 100 </h2>
                        <h2>Streak:  1</h2>
                        <h2>Theme:  safari</h2>
                        <h2>Date:  2018-07-29 1:40:36</h2>
                    </div>
                    <div className='column2-2'>
                        <h2>Score: 500 </h2>
                        <h2>Streak:  5</h2>
                        <h2>Theme:  safari</h2>
                        <h2>Date:  2019-10-29 5:25:06</h2>
                    </div>
            </div>
        </div>
        </div>
        </>
    );
}

export default ScoreCard;