import React from 'react';
import { UITypography } from '@apollo/apollo-ui-reactjs';

import * as T from './types';

import styles from '../tableCell.module.scss';

export const CommonCell = React.memo(
  (props: T.IProps): JSX.Element => {
    const { data } = props;
    return (
      <UITypography variant="body1" className={styles.cellText}>
        {data}
      </UITypography>
    );
  }
);
