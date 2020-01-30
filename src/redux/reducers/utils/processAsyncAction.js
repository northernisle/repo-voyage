const processAsyncAction = (
  state = {
    pending: false,
    response: null,
    error: null
  },
  action
) => {
  switch (action.status) {
    case 'pending':
      return { ...state, pending: true };

    case 'success':
      return {
        pending: false,
        error: null,
        response: action.response
      };

    case 'error':
      return {
        pending: false,
        response: null,
        error: action.error
      };

    default:
      return state;
  }
};

export default processAsyncAction;
