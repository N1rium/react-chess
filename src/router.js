import React from 'react';
import store from 'store';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomeContainer from 'containers/home';
import MatchContainer from 'containers/match';
import LoginContainer from 'containers/login';
import EmbedContainer from 'containers/embed';
import ProfileContainer from 'containers/profile';

const getUser = () => localStorage.getItem('token');

const PrivateRoute = (props) => {
  if (!getUser()) {
    return <Redirect to={`/login`} />;
  }
  return <Route {...props} />;
};

const MatchRoute = ({ ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        const {
          match: {
            params: { id },
          },
        } = routeProps;
        return <MatchContainer matchId={id} />;
      }}
    />
  );
};

const ProfileRoute = ({ ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        const {
          match: {
            params: { id },
          },
        } = routeProps;
        return <ProfileContainer id={id} />;
      }}
    />
  );
};

const Router = () => (
  <Switch>
    <PrivateRoute exact path="/" component={HomeContainer} />
    <MatchRoute exact path="/match/:id" />
    <ProfileRoute exact path="/profile/:id" />
    <Route exact path="/embed" component={EmbedContainer} />
    <Route exact path="/login" component={LoginContainer} />
    <Route component={() => <Redirect to="/" />} />
  </Switch>
);

export default Router;
