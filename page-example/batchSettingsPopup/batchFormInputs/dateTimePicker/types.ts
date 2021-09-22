import { DmFormField } from 'models';

export interface IProps {
  field: DmFormField;
  labelText: string;
  placeholderText: string;
  disabled: boolean;
  onChange: (date: string) => void;
}
