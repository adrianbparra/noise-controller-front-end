import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "semantic-ui-css/semantic.min.css";

import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";

const link = createHttpLink({
    uri: 'http://localhost:4000'
  });

const authLink = setContext(() => {
    const token = localStorage.getItem("jwtToken");

    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ""
        }
    }
})
  
const client = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache()
});


ReactDOM.render(
    <Router>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </Router>, 
    document.getElementById('root'));