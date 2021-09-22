import React, { useCallback } from 'react';
import { UIDataTable, UIDataTableBody } from '@apollo/apollo-ui-reactjs';
import { observer } from 'mobx-react-lite';

import {
  ContainerDataTable,
  HeaderDataTable,
  LoadingDataTable,
  NoDataAvailableTable,
  PaginationDataTable
} from 'components';
import { useStores } from 'stores';
import { TableRow } from './tableRow';

const maxHeight = '100%';

export const BatchesTable = observer(
  (): JSX.Element => {
    const { overviewBatchesTableStore } = useStores();

    const {
      itemsPerPage,
      setItemsPerPage,
      offset,
      setOffset,
      pageLimits,
      isLoading,
      setSortHeader,
      filteredData,
      batchesCount
    } = overviewBatchesTableStore;

    const setSort = useCallback((sortKey: string = 'label', sortDir?: 'asc' | 'desc') => {
      setSortHeader(sortKey, sortDir === 'asc' ? 'desc' : 'asc');
    }, []);

    if (isLoading) {
      return <LoadingDataTable />;
    }

    if (
      !filteredData.headers ||
      filteredData.headers.length === 0 ||
      !filteredData.rows ||
      filteredData.rows.length === 0
    ) {
      return <NoDataAvailableTable />;
    }

    return (
      <ContainerDataTable>
        <UIDataTable id="batches-table" withPagination={true} maxHeight={maxHeight} stickyColumns={1}>
          <HeaderDataTable headers={[filteredData.headers]} sortedHeaderKey="start" onSort={setSort} />

          <UIDataTableBody>
            <TableRow data={filteredData} />
          </UIDataTableBody>
        </UIDataTable>
        <PaginationDataTable
          itemsCount={batchesCount}
          offset={offset}
          setOffset={setOffset}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          pageLimits={pageLimits}
          isLoading={isLoading}
        />
      </ContainerDataTable>
    );
  }
);
