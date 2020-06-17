import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lojabn.herokuapp.com/',
});

export default api;
