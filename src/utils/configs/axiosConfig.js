import axios from 'axios';
import store from '../../redux/store';
import { resetTime, setTime } from '../../redux/actions/elapsedTimeActions';

const api = axios.create({
  baseURL: 'https://api.github.com'
});

api.defaults.headers.common['Accept'] = 'application/vnd.github.v3+json';

const currentToken = window.localStorage.getItem('authToken');
if (currentToken) {
  api.defaults.headers.common['Authorization'] = `Token ${currentToken}`;
}

api.interceptors.request.use(config => {
  config.start = new Date().getTime();
  return config;
}, error => Promise.reject(error));

api.interceptors.response.use(response => {
  const end = new Date().getTime();
  const start = response.config.start;
  const elapsed = end - start;

  store.dispatch(setTime(elapsed));

  return response;
}, error => {
  store.dispatch(resetTime());

  return Promise.reject(error);
});

export const updateToken = token => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
