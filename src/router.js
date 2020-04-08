import React from 'react';
import store from 'store';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomeContainer from 'containers/home';
import LocalPlayContainer from 'containers/localplay';
import MatchContainer from 'containers/match';
import ComponentsDemo from 'containers/components-demo';

// const getUser = () => store.getState().auth.user;

const PrivateRoute = props => {
  // if (!getUser()) {
  //   return <Redirect to={`/authlanding?path=${window.location.pathname}`} />;
  // }
  return <Route {...props} />;
};

const Router = () => (
  <Switch>
    <PrivateRoute exact path="/" component={HomeContainer} />
    <PrivateRoute exact path="/localplay" component={LocalPlayContainer} />
    <PrivateRoute exact path="/demo" component={ComponentsDemo} />
    <PrivateRoute exact path="/match/:id" component={MatchContainer} />
    <Route component={() => <Redirect to="/" />} />
  </Switch>
);

export default Router;
