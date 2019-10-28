import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import '../App.css';
import ScoreCard from './ScoreCard';
import ScoresList from './ScoresList';
import Home from './Home';
import axiosWithAuth from '../axiosWithAuth';

function App() {

  return (
    <div className="App">

  <ScoreCard />

    {/* <Route
      exact
      path='/scorelist/:id'
      component = {props => <ScoresList {...props} teachers={teachers} />}
    /> */}


    </div>
  );
}

export default App;