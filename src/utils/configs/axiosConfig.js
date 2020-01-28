import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com'
});

api.defaults.headers.common['Accept'] = 'application/vnd.github.v3+json';

export default api;
