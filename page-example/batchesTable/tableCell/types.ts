import { BatchListItem, TableHeader } from 'models';

export interface IProps {
  row: BatchListItem;
  headers: TableHeader[];
}

export interface ICell {
  row: BatchListItem;
}
