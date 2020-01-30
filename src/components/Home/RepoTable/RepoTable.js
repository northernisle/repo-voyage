import React, { useState, useEffect, useMemo } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableSortLabel,
  TableRow,
  TablePagination,
  TableBody,
  LinearProgress,
  CircularProgress
} from '@material-ui/core';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { queryRepos, setPerPage } from '../../../redux/actions';
import columns from './columns';
import useRepo from '../../../utils/hooks/useRepo';

import styles from './repoTable.module.scss';

const cx = classnames.bind(styles);

const RepoTable = ({ repoList, queryRepos, setPerPage }) => {
  const [pending, error, response] = useRepo(repoList);
  const { data, links, query } = response;
  const initialLoad = pending && !data;
  const showTable = pending || data;

  const [order, setOrder] = useState({ direction: null, property: null });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setOrder({ direction: null, property: null });
    setPage(0);
  }, [query]);

  const handleSort = property => {
    const isAsc = order.property === property && order.direction === 'desc';
    const direction = isAsc ? 'asc' : 'desc';
    let _order = { direction, property };

    if (order.direction === 'asc') {
      _order = { direction: null, property: null };
    }

    requestData(_order);
    setOrder(_order);
  };

  const handlePageChange = (event, newPage) => {
    const requiredPage = newPage > page ? 'next' : 'prev';

    requestData(null, links[requiredPage].page - 1); // github uses a 1-index based page system
    setPage(newPage);
  };

  const handleRowsPerPageChange = event => {
    const rows = parseInt(event.target.value, 10);

    setPerPage(rows);
    requestData();
    setRowsPerPage(rows);
  };

  const handleRowClick = () => {};

  const requestData = (_order = null, _page = null) => {
    const { direction, property } = _order ?? order;

    queryRepos({
      value: query,
      orderBy: property,
      order: direction,
      page: (_page ?? page) + 1 // github uses a 1-index based page system
    });
  };

  // conditional rending of the 'visible' class
  const className = useMemo(
    () => cx({ linearLoader: true, visible: pending }),
    [pending]
  );

  if (initialLoad) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <div className={styles.container}>
        Uhh, our engine has overheated. We have to let it cool down.
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <LinearProgress className={className} variant="query" />
      {showTable && (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell key={column.id}>
                      {column.sortable ? (
                        <>
                          <TableSortLabel
                            active={order.property === column.id}
                            direction={
                              order.property === column.id
                                ? order.direction
                                : 'desc'
                            }
                            onClick={() => handleSort(column.id)}
                          >
                            {column.label}
                          </TableSortLabel>
                        </>
                      ) : (
                        <>{column.label}</>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.items.map(row => {
                  return (
                    <TableRow
                      className={styles.row}
                      key={row.id}
                      hover
                      onClick={() => handleRowClick(row.name, row.owner.login)}
                    >
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.owner.login}</TableCell>
                      <TableCell>{row.language}</TableCell>
                      <TableCell>{row.stargazers_count}</TableCell>
                      <TableCell>{row.watchers}</TableCell>
                      <TableCell>{row.forks}</TableCell>
                      <TableCell>{row.open_issues}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {data && (
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={data?.total_count}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleRowsPerPageChange}
            />
          )}
        </Paper>
      )}
    </div>
  );
};

export default connect(({ repoList }) => ({ repoList }), { queryRepos, setPerPage })(RepoTable);
