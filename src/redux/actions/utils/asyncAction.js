export default async (dispatch, type, requestFn) => {
  dispatch({
    type,
    status: 'pending'
  });

  let response = null;
  let error = null;
  let status = null;

  try {
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
