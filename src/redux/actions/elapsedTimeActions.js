import {
  SET_ELAPSED_DELEGATIONS,
  SET_ELAPSED_TIME,
  RESET_ELAPSED_TIME
} from './actionTypes';

export const setTime = time => ({
  type: SET_ELAPSED_TIME,
  payload: time
});

export const setDelegations = delegations => ({
  type: SET_ELAPSED_DELEGATIONS,
  payload: delegations
});

export const resetTime = () => ({
  type: RESET_ELAPSED_TIME,
  payload: null
});
