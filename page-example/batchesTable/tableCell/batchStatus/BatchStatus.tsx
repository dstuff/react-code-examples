import React from 'react';
import { UITypography } from '@apollo/apollo-ui-reactjs';
import { useTranslation } from 'react-i18next';

import { BatchValidityStatusIcon } from 'components';
import { mapBatchValidityStatus } from 'models';
import * as T from '../types';

import styles from '../tableCell.module.scss';

export const BatchStatus = React.memo(
  (props: T.ICell): JSX.Element => {
    const { t } = useTranslation();
    const { row } = props;
    const status = mapBatchValidityStatus[row.validity];

    return (
      <React.Fragment>
        <BatchValidityStatusIcon validity={row.validity} />
        <UITypography variant="body1" truncate={true} className={styles.cell_text}>
          {t(`validityStatus.${status}`)}
        </UITypography>
      </React.Fragment>
    );
  }
);
