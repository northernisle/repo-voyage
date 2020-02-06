import { setDelegations } from '../elapsedTimeActions';

export default async (dispatch, type, requestFn, timerDelegations = 0) => {
  dispatch({
    type,
    status: 'pending'
  });

  let response = null;
  let error = null;
  let status = null;

  try {
    dispatch(setDelegations(timerDelegations));
    response = await requestFn();

    status = 'success';
  } catch (e) {
    error = e;
    status = 'error';
  }

  dispatch({
    type,
    status,
    error,
    response
  });
};
