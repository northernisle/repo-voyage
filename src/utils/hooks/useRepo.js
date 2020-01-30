const useRepo = repoList => [
  repoList?.pending,
  repoList?.error,
  {
    data: repoList?.response?.data,
    links: repoList?.response?.links,
    query: repoList?.response?.query
  }
];

export default useRepo;
