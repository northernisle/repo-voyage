const useResponse = response => [
  response?.pending,
  response?.error,
  {
    ...response?.response
  },
  {
    ...response?.options
  }
];

export default useResponse;
