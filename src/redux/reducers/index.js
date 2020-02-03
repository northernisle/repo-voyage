import { combineReducers } from 'redux';
import repoList from './repoList';
import repo from './repo';
import token from './auth';

export default combineReducers({ repoList, repo, token });
