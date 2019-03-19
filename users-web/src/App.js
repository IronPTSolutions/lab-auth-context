import React, { Component } from 'react';
import NavBar from './components/misc/NavBar';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12"><NavBar /></div>
        </div>
      </div>
    );
  }
}

export default App;
