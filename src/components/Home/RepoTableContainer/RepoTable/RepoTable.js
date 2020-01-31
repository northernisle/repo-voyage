import React from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableSortLabel,
  TableRow,
  TablePagination,
  TableBody
} from '@material-ui/core';

const RepoTable = ({
  columns,
  data,
  state,
  handleSort,
  handleRowClick,
  handlePageChange,
  handleRowsPerPageChange
}) => {
  return (
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
                        active={state.orderBy === column.id}
                        direction={
                          state.orderBy === column.id ? state.order : 'desc'
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
                  style={{ cursor: 'pointer' }}
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
          rowsPerPage={state.perPage}
          page={state.page - 1} // github uses a 1-index based page system
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
        />
      )}
    </Paper>
  );
};

export default RepoTable;
