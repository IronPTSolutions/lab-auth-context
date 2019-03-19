import React, { Component } from 'react';
import NavBar from './components/misc/NavBar';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserList from './components/users/UserList';

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
              <Route exact path="/users" component={UserList} />
              <Redirect to="/users"/>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
