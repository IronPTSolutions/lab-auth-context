import React, { Component } from 'react';
import NavBar from './components/misc/NavBar';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserList from './components/users/UserList';
import PrivateRoute from './guards/PrivateRoute';
import AdminMessage from './components/misc/AdminMessage';
import { Forbidden, NotFound } from './components/errors/Error';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12"><NavBar /></div>
          <div className="col-12">
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/users" component={UserList} />
              <PrivateRoute exact path="/admin" role={"admin"} component={AdminMessage} />
              <Route exact path="/forbidden" component={Forbidden}/>
              <Route exact path="/not-found" component={NotFound}/>
              <Redirect to="/not-found"/>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
