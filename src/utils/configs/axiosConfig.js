import axios from 'axios';
import store from '../../redux/store';

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

export default api;
