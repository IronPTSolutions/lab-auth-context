import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true
});

const authenticate = (user) => http.post('/authenticate', user)
  .then(response => response.data);

const register = (user) => http.post('/register', user)
  .then(response => response.data);

const logout = () => http.post('/logout')
  .then(response => response.data);

export default {
  authenticate,
  register,
  logout
}