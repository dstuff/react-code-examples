import React, { useCallback } from 'react';
import { UIDataTableRow } from '@apollo/apollo-ui-reactjs';
import { observer } from 'mobx-react-lite';

import { BatchListItem } from 'models';
import { useStores } from 'stores';
import { TableCells } from '../tableCell';
import * as T from './types';

export const TableRow = observer(
  (props: T.IProps): JSX.Element => {
    const {
      data: { rows, headers }
    } = props;

    const { overviewBatchPopupStore } = useStores();
    const { setBatchInfo } = overviewBatchPopupStore;

    const openBatch = useCallback((e: BatchListItem) => {
      setBatchInfo(e);
    }, []);

    return (
      <React.Fragment>
        {rows.map((row: BatchListItem) => {
          return (
            <UIDataTableRow id={row.id} key={`id-${row.id}`} onClick={() => openBatch(row)}>
              <TableCells row={row} headers={headers} />
            </UIDataTableRow>
          );
        })}
      </React.Fragment>
    );
  }
);
