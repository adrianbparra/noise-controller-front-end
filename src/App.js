import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AuthProvider } from "./auth/auth.js";
import AuthRoute from "./auth/AuthRoute.js";

import Signup from './components/Signup';
import PrivateRoute from './auth/PrivateRoute';
import Login from './components/Login';
import Home from './components/Home';
import ScoreList from "./components/ScoresList";
import Classes from "./components/classes/Classes";
import ClassSignUp from './components/ClassSignUp';
import Settings from './components/settings/Settings';
import Game from './components/Game';
import GameScreen from "./components/GameScreen";
import NavBar from "./components/navbar/NavBar.js";

import styled from "styled-components";
import { Container } from 'semantic-ui-react';


const ContStyled = styled.div`
  padding: 2rem;
  @media only screen and (max-width: 768px){
    padding: 2rem .4rem;
    
  }
`;

function App() {
  return (
    
    <AuthProvider>
      <ContStyled as={Container}>

        <Router>

          <NavBar/>

          <Switch> 

            <Route 
              exact
              path='/'
              component={props => <GameScreen {...props} />}
            />

            <AuthRoute
              exact
              path="/signup"
              component={props => <Signup {...props} />}
            />

            <AuthRoute
              exact
              path="/login"
              component={props => <Login {...props} />}
            />

            <PrivateRoute
              exact
              path='/classform'
              component={props => <ClassSignUp {...props} />}
            />

            <PrivateRoute
              exact
              path='/classes/:name'
              component={props => <ClassSignUp {...props}/>}
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
              path='/:name/scores'
              component={props => <ScoreList {...props} />}
            />
            
            <PrivateRoute
              exact
              path='/classes'
              component={props => <Classes {...props} />}
            />

            <Route path="*">
              <div>Lost? Where are you?</div>
            </Route>

          </Switch>
          
        </Router>
      </ContStyled>
    </AuthProvider>
    
  );
}

export default App;