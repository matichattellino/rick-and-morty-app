import React from 'react'
import { AppRegistry } from 'react-native'
import { ApolloProvider,ApolloClient, InMemoryCache } from '@apollo/client';
import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache()
});

const Client = () => {
    return (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    )
  }
  
AppRegistry.registerComponent('rick-and-morty-app', () => Client)