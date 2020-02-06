import { combineReducers } from 'redux';
import repoList from './repoList';
import repo from './repo';
import token from './auth';
import elapsed from './elapsedTime';

export default combineReducers({ repoList, repo, token, elapsed });
