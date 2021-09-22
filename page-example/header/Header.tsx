import React from 'react';
import { useTranslation } from 'react-i18next';
import { UIPageHeader } from '@apollo/apollo-ui-reactjs';

import styles from '../overview.module.scss';

export const Header = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className={styles.page__header}>
      <UIPageHeader title={t('Overview')} />
    </div>
  );
};
