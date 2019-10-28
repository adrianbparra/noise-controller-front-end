import React from 'react';
import { BrowserRouter as Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import '../App.css';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import Home from './Home';
import axiosWithAuth from '../axiosWithAuth';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          component={props => <Login {...props} />}
        /> 

        <PrivateRoute
          exact
          path="/home"
          component={props => <Home {...props} />}
        />
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;