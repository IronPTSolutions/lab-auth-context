import http from './base-http-service';
import { BehaviorSubject } from 'rxjs';

let users = [];
const users$ = new BehaviorSubject(users);

const list = () => http.get('/users')
  .then(response => {
    users = response.data;
    users$.next(users);
    return users;
  });

const deleteUser = (id) => http.delete(`/users/${id}`)
  .then(response => {
    users = users.filter(user => user.id !== id);
    users$.next(users);
    return response.data;
  });

const onUsersChange = () => users$.asObservable();

export default {
  list,
  deleteUser,
  onUsersChange
}