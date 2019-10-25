import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import '../App.css';
import jwtDecode from 'jwt-decode';
import ScoresList from './ScoresList';
import Home from './Home';
import axiosWithAuth from '../axiosWithAuth';
import ClassSignUp from './ClassSignUp';

function App() {

  return (
    <div className="App">

  

    {/* <Route
      exact
      path='/scorelist/:id'
      component = {props => <ScoresList {...props} teachers={teachers} />}
    /> */}


    </div>
  );
}

export default App;