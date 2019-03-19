import React, { Component } from 'react';
import NavBar from './components/misc/NavBar';
import { Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12"><NavBar /></div>
          <div className="col-12">
            <Switch>
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
