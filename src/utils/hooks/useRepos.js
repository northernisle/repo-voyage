const useRepos = repos => [
  repos?.pending,
  repos?.error,
  {
    ...repos?.response
  },
  {
    ...repos?.options
  }
];

export default useRepos;
