import React, { Component } from 'react'
import { usersService } from '../../services';

class UserItem extends Component {

  handleDelete = (id) => {
    usersService.deleteUser(id)
      .then(() => this.props.onClickDelete(id))
  }

  render() {
    const { id, name, email, role, adminOptions } = this.props;

    return (
      <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
        <span>
          {adminOptions && <i className="mr-2 fa fa-times text-danger" onClick={this.handleDelete.bind(this, id)}></i>}
          {name}
          <small className="ml-2">{email}</small></span>
        <span className={`badge badge-pill badge-${role === 'admin' ? 'danger' : 'primary'}`}>{role}</span>
      </li>
    );
  }
}

export default UserItem