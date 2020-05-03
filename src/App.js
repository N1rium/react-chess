import React from 'react';
import history from './store/history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Routes from './router';
import Header from './components/header';

import { split } from 'apollo-link';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider } from '@apollo/react-hooks';
import ThemeWrapper from './theme-wrapper';

import 'babel-polyfill';
import 'whatwg-fetch';

import store from './store';

const cache = new InMemoryCache();

const wsLink = new WebSocketLink({
  uri: `wss://backend-dot-chessports-dev-276113.ew.r.appspot.com/graphql`,
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: 'https://backend-dot-chessports-dev-276113.ew.r.appspot.com/graphql',
  headers: {
    token: localStorage.getItem('token'),
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache,
});

export default () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ThemeWrapper>
          <Header />
          <div className="app-content">
            <Router history={history}>
              <Routes />
            </Router>
          </div>
        </ThemeWrapper>
      </ApolloProvider>
    </Provider>
  );
};
