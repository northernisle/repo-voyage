const processAsyncAction = (
  state = {
    pending: false,
    data: null,
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
        data: action.response
      };

    case 'error':
      return {
        pending: false,
        data: null,
        error: action.error
      };

    default:
      return state;
  }
};

export default processAsyncAction;
