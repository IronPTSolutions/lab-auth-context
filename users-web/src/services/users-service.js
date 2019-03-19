import http from './base-http-service';

const list = () => http.get('/users')
  .then(response => response.data);

const deleteUser = (id) => http.delete(`/users/${id}`)
  .then(response => response.data);

export default {
  list,
  deleteUser
}