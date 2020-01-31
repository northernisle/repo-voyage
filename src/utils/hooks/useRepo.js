const useRepo = repos => [
  repos?.pending,
  repos?.error,
  {
    ...repos?.response
  },
  {
    ...repos?.options
  }
];

export default useRepo;
