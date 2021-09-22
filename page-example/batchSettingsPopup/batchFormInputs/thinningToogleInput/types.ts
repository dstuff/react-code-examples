import { FormEvent } from 'react';

export interface IProps {
  value: number | string;
  checked?: boolean;
  disabled?: boolean;
  onChange: (value: FormEvent<HTMLInputElement>) => void;
}
