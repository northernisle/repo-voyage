const processAsyncAction = (state, action) => {
  switch (action.status) {
    case 'pending':
      return { ...state, pending: true };

    case 'success':
      return {
        ...state,
        pending: false,
        error: null,
        response: action.response
      };

    case 'error':
      return {
        ...state,
        pending: false,
        response: null,
        error: action.error
      };

    default:
      return state;
  }
};

export default processAsyncAction;
