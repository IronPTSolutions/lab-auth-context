import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { withAuthConsumer } from '../contexts/AuthStore';

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={(props) =>
      rest.isAuthenticated() ?
        <Component {...props} /> :
        <Redirect to="/login" />
    }/>
  );
}

export default withAuthConsumer(PrivateRoute)