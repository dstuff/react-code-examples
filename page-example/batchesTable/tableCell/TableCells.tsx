import React from 'react';
import { UIDataTableCell } from '@apollo/apollo-ui-reactjs';

import { TableHeader, BatchListItem } from 'models';
import { CommonCell } from './commonCell';
import { BatchStatus } from './batchStatus';
import { BatchDateCell } from './batchDate';
import * as T from './types';

const getCell = (row: BatchListItem, key: string): JSX.Element | null => {
  switch (key) {
    case 'farmName':
    case 'houseName':
    case 'name': {
      return <CommonCell data={row[key]} />;
    }
    case 'start':
    case 'end': {
      return <BatchDateCell date={row[key]} />;
    }
    case 'validity': {
      return <BatchStatus row={row} />;
    }
    default:
      return null;
  }
};

export const TableCells = React.memo(
  (props: T.IProps): JSX.Element => {
    const { row, headers } = props;
    return (
      <React.Fragment>
        {row &&
          headers.map((header: TableHeader, index: number) => {
            return <UIDataTableCell key={`id-${index}`}>{getCell(row, header.key)}</UIDataTableCell>;
          })}
      </React.Fragment>
    );
  }
);
