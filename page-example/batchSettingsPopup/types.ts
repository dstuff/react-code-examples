import { TabType } from 'models';

export interface IProps {
  tabType: TabType;
}

export interface IFooter {
  onCancel: () => void;
  onSave?: () => void;
  saveText?: 'Save' | 'Confirm';
  isDisabled?: boolean;
}

export interface IHeader {
  name?: string;
  house?: string;
  farm?: string;
  start?: string;
  end?: string | null;
  hasError?: boolean;
}
