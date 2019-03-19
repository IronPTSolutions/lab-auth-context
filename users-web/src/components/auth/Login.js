import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import authService from '../../services/auth-service'
import { withAuthConsumer } from '../../contexts/AuthStore';

// eslint-disable-next-line no-useless-escape
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const validations = {
  email: (value) => {
    let message;
    if (!value) {
      message = 'Email is required';
    } else if (!EMAIL_PATTERN.test(value)) {
      message = 'Invalid email pattern';
    }
    return message;
  },
  password: (value) => {
    let message;
    if (!value) {
      message = 'Password is required';
    }
    return message;
  }
}

class Login extends Component {
  state = {
    user: {
      email: '',
      password: ''
    },
    errors: {
      email: validations.email(),
      password: validations.password(),
    },
    touch: {},
    isAuthenticated: false
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    })
  }

  handleBlur = (event) => {
    const { name } = event.target;
    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      authService.authenticate(this.state.user)
        .then(
          (user) => {
            this.setState({ isAuthenticated: true }, () => {
              this.props.onUserChanged(user)
            })
          },
          (error) => {
            const { message, errors } = error.response.data;
            this.setState({
              errors: {
                ...errors,
                password: !errors && message
              },
              touch: {
                ...errors,
                password: !errors && message
              }
            })
          }
        )
    }
  }

  isValid = () => {
    return !Object.keys(this.state.user)
      .some(attr => this.state.errors[attr])
  }

  render() {
    const { isAuthenticated, errors, user, touch } =  this.state;
    if (isAuthenticated) {
      return (<Redirect to="/users" />)
    }

    return (
      <div className="row justify-content-center mt-5">
        <div className="col-xs-12 col-sm-4">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text"><i className="fa fa-envelope-o"></i></div>
              </div>
              <input type="text" className={`form-control ${touch.email && errors.email && 'is-invalid'}`} name="email" placeholder="Email" onChange={this.handleChange} value={user.email} onBlur={this.handleBlur} />
              <div className="invalid-feedback">{errors.email}</div>
            </div>

            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text" style={{ width: '42px' }}><i className="fa fa-lock"></i></div>
              </div>
              <input type="password" className={`form-control ${touch.password && errors.password && 'is-invalid'}`} name="password" placeholder="Password" onChange={this.handleChange} value={user.password} onBlur={this.handleBlur} />
              <div className="invalid-feedback">{errors.password}</div>
            </div>

            <div className="from-actions">
              <button type="submit" className="btn btn-primary btn-block" disabled={!this.isValid()}>Login</button>
            </div>
          </form>
          <hr />
          <p className="text-center">Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
      </div>
    );
  }
}


export default withAuthConsumer(Login)