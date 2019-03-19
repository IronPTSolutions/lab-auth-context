import React, { Component } from 'react'

const CURRENT_USER_KEY = 'current-user';

const AuthContext = React.createContext();

class AuthStore extends Component {

  state = {
    user: JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || '{}')
  }

  handleUserChange = (user) => {
    this.setState({ user: user });
    if (user && user.email) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(CURRENT_USER_KEY);
  }

  isAuthenticated = () => this.state.user && this.state.user.email;
  isAdmin = () => this.state.user && this.state.user.role === 'admin';

  render() {
    return (
      <AuthContext.Provider value={{
        user: this.state.user,
        onUserChanged: this.handleUserChange,
        isAuthenticated: this.isAuthenticated,
        isAdmin: this.isAdmin,
      }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const withAuthConsumer = (Component) => {
  return (props) => (
    <AuthContext.Consumer>
      {(storeProps) => <Component {...props} {...storeProps}/>}
    </AuthContext.Consumer>
  )
}

export { AuthContext, AuthStore, withAuthConsumer }