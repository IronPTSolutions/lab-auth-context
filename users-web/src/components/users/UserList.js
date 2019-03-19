import React, { Component } from 'react'
import { usersService } from '../../services';
import UserItem from './UserItem';
import { withAuthConsumer } from '../../contexts/AuthStore';

class UserList extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    usersService.list()
      .then(users => this.setState({ users: users }))
  }

  handleDeleteUser = (id) => {
    this.setState({ users: this.state.users.filter(user => user.id !== id) })
  }

  render() {
    const { isAdmin } = this.props;
    const users = this.state
      .users
      .map(user => (<UserItem key={user.id} {...user} adminOptions={isAdmin()} onClickDelete={this.handleDeleteUser}/>));

    return (
      <div className="row">
        <div className="col-12">
          <ul className="list-group mt-5">
            {users}
          </ul>
        </div>
      </div>
    );
  }
}

export default withAuthConsumer(UserList)