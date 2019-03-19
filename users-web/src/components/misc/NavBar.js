import React, { Fragment, Component } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { withAuthConsumer } from '../../contexts/AuthStore';
import { authService } from '../../services'

class NavBar extends Component {

  handleLogout = () => {
    authService.logout()
      .then(() => {
        this.props.onUserChanged({})
        this.props.history.push('/login')
      })
  }

  render() {
    const { user, isAuthenticated } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light mt-5" style={{ borderRadius: "5px" }}>
        <Link className="navbar-brand" to="/users">Auth Context Lab</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/users">Users</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav my-2 my-lg-0">
            {!isAuthenticated() &&
              <Fragment>
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/register">Register</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/login">Login</NavLink></li>
              </Fragment>
            }
            {isAuthenticated() &&
              <Fragment>
                <li className="nav-item"><a className="nav-link" href="#">{user.email}</a></li>
                <li className="nav-item"><button className="btn-link nav-link" onClick={this.handleLogout}>Logout</button></li>
              </Fragment>
            }
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(withAuthConsumer(NavBar));