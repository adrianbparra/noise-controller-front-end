import React from 'react';
import { BrowserRouter as Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import '../App.css';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/Logout';
import Login from './components/Login';
import Home from './components/Home';
import ScoreCard from './components/ScoreCard';
import ClassSignUp from './components/ClassSignUp';
import Settings from './components/Settings';
import axiosWithAuth from './axiosWithAuth';


function App() {
  return (
    <div className="App">


    <BrowserRouter>
      <Switch> 
        <Route 
          exact
          path='/signup'
          component={props => <Signup {...props} />}
        />

        <Route
          exact
          path="/login"
          component={props => <Login {...props} />}
        /> 

        <Route
          exact
          path="/logout"
          component={props => <Logout {...props} />}
        />

        <Route
          exact
          path='/classform'
          component={props => <ClassSignUp {...props} />}
        />

        <PrivateRoute
          exact
          path="/home"
          component={props => <Home {...props} />}
        />

        <PrivateRoute
          exact
          path='/settings'
          component={props => <Settings {...props} />}
        />



        <PrivateRoute
          exact
          path='/score'
          component={props => <ScoreCard {...props} />}
        />


      </Switch>
    </BrowserRouter>
    
    </div>
  );
}

export default App;