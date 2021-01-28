import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

//Apollo
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';


import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import  reducer  from "./reducers/index";

//Apollo Client

const link = createHttpLink({
    uri: 'http://localhost:4000'
  });
  
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
});



// const store = createStore(reducer, applyMiddleware(thunk, logger));



ReactDOM.render(
    <Router>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </Router>, 
    document.getElementById('root'));