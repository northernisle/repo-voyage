import axios from 'axios';
import store from '../../redux/store';
import { resetTime, setTime } from '../../redux/actions/elapsedTimeActions';

const api = axios.create({
  baseURL: 'https://api.github.com'
});

api.defaults.headers.common['Accept'] = 'application/vnd.github.v3+json';

setTimeout(() => {
  const { token } = store.getState();

  updateToken(token);
}, 0); // Pushing this to the end of the call stack in order for the store to initialize

export const updateToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

api.interceptors.request.use(config => {
  config.metadata = { start: new Date().getTime() };
  return config;
}, error => Promise.reject(error));

api.interceptors.response.use(response => {
  const start = response.config.metadata.start;
  const end = new Date().getTime();
  const elapsed = end - start;

  store.dispatch(setTime(elapsed));

  return response;
}, error => {
  store.dispatch(resetTime());

  return Promise.reject(error);
});

export default api;
