import { DateTime } from 'luxon';
import { DmFormField } from 'models';

export interface IProps {
  slaughterFields: DmFormField[];
  isHistoric: boolean;
  isLoading?: boolean;
  isThinning?: boolean;
  updateValue: (name: string, value: number | string | DateTime) => void;
  removeSlaughterData: (index: number) => void;
}
