import { BatchFieldNameEnum, DmFormField, KeyBatchForm } from 'models';
import * as T from '../types';

export interface IProps {
  batchForm: KeyBatchForm;
  isLoading: boolean;
  isHistoric: boolean;
  isThinning: boolean;
  updateFieldByName: (name: string, value: T.UpdateFormValue) => void;
  addSlaughterData: () => void;
  removeSlaughterData: (index: number) => void;
  slaughterFields: DmFormField[];
  updateFormValue: (name: BatchFieldNameEnum, value: T.UpdateFormValue) => void;
}
