import React from 'react'
import { withAuthConsumer } from '../../contexts/AuthStore';

const AdminMessage = ({ user }) => (<h4 className="mt-5">Hi <em>{user.email}</em> your role is {user.role}!</h4>)

export default withAuthConsumer (AdminMessage)