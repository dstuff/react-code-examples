import React from 'react';
import { UITypography } from '@apollo/apollo-ui-reactjs';
import { ILanguage } from '@apollo/components';

import { useStores } from 'stores';
import { formatDateToLuxonLocale } from 'utils';
import * as T from './types';

import styles from '../tableCell.module.scss';

const formatDateToString = (date: string | null | undefined, language: ILanguage): string | null => {
  return date ? formatDateToLuxonLocale(date, language) : null;
};

export const BatchDateCell = React.memo((props: T.IProps): JSX.Element | null => {
  const { date } = props;
  const { accountStore } = useStores();
  const { languageRFC4646 } = accountStore;

  if (!date) {
    // workaround to fix row height difference on Mozilla Firefox
    return <>&nbsp;</>;
  }

  return (
    <UITypography variant="body1" className={styles.cellText}>
      {formatDateToString(date, languageRFC4646)}
    </UITypography>
  );
});
