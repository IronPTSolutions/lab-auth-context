import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import authService from '../../services/auth-service'

// eslint-disable-next-line no-useless-escape
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const validations = {
  name: (value) => {
    let message;
    if (!value) {
      message = 'Name is required';
    }
    return message;
  },
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

export default class Register extends Component {
  state = {
    user: {
      name: '',
      email: '',
      password: '',
    },
    errors: {
      name: validations.name(),
      email: validations.email(),
      password: validations.password(),
    },
    touch: {},
    isRegistered: false
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
      authService.register(this.state.user)
        .then(
          (user) => this.setState({ isRegistered: true }),
          (error) => {
            const { message, errors } = error.response.data;
            this.setState({
              errors: {
                ...errors,
                email: !errors && message
              },
              touch: {
                ...errors,
                email: !errors && message
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
    const { isRegistered, errors, user, touch } = this.state;
    if (isRegistered) {
      return (<Redirect to="/login" />)
    }

    return (
      <div className="row justify-content-center mt-5">
        <div className="col-xs-12 col-sm-4">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text" style={{ width: '42px' }}><i className="fa fa-user"></i></div>
              </div>
              <input type="text" className={`form-control ${touch.name && errors.name && 'is-invalid'}`} name="name" placeholder="Name" onChange={this.handleChange} value={user.name} onBlur={this.handleBlur} />
              <div className="invalid-feedback">{errors.name}</div>
            </div>

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
              <button type="submit" className="btn btn-primary btn-block" disabled={!this.isValid()}>Register</button>
            </div>
          </form>
          <hr />
          <p className="text-center">Already registered? <Link to="/login">Login</Link></p>
        </div>
      </div>
    );
  }
}