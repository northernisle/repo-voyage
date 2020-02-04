import React, { useEffect, useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from '../../../../utils/hooks';

const RepoTable = ({
  columns,
  data,
  state,
  handleSort,
  handleRowClick,
  handlePageChange,
  handleRowsPerPageChange
}) => {
  const { t } = useTranslation(undefined, { useSuspense: false });

  const { width } = useWindowDimensions();
  const [size, setSize] = useState('medium');

  useEffect(() => {
    if (width < 600) {
      setSize('small');
    } else {
      setSize('medium');
    }
  }, [width, setSize]);

  return (
    <Paper>
      <TableContainer>
        <Table size={size}>
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
                        {t(column.label)}
                      </TableSortLabel>
                    </>
                  ) : (
                    <>{t(column.label)}</>
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
                  onClick={() => handleRowClick(row.owner.login, row.name)}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.owner.login}</TableCell>
                  <TableCell>{row.language}</TableCell>
                  <TableCell>{row.stargazers_count}</TableCell>
                  <TableCell>{row.watchers_count}</TableCell>
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
          labelRowsPerPage={`${t('Rows per page')}:`}
        />
      )}
    </Paper>
  );
};

export default RepoTable;
