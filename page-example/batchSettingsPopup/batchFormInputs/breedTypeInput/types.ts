import { DmFormField, ListItem } from 'models';

export interface IProps {
  field: DmFormField;
  disabled?: boolean;
  options: ListItem[];
  onChange: (value: string) => void;
}
