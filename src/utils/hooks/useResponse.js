const useResponse = response => ({
  pending: response?.pending,
  error: response?.error,
  response: response?.response ?? {},
  options: response?.options ?? {}
});

export default useResponse;
