const processAsyncAction = (state, action) => {
  switch (action.status) {
    case 'pending':
      return { ...state, pending: true };

    case 'success':
      return {
        pending: false,
        error: null,
        response: action.response,
        options: state.options
      };

    case 'error':
      return {
        pending: false,
        response: null,
        error: action.error,
        options: state.options
      };

    default:
      return state;
  }
};

export default processAsyncAction;
