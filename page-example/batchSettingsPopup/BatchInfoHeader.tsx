import React from 'react';
import { UISnackBar, UISnackBars, UITypography } from '@apollo/apollo-ui-reactjs';
import { useTranslation } from 'react-i18next';

import { formatDateToLuxonLocale, getRangeAsString, toUniversalLuxonDate } from 'utils';
import { useStores } from 'stores';
import * as T from './types';

import styles from './batchSettingsPopup.module.scss';

const ERROR_MESSAGE = 'validationMessages.Something went wrong';

export const BatchInfoHeader = React.memo((props: T.IHeader) => {
  const { t } = useTranslation();
  const { farm, house, name, start, end, hasError } = props;
  const { accountStore } = useStores();
  const { languageRFC4646 } = accountStore;

  const subLabel = [farm, house].filter((n) => !!n).join(', ');

  const startDate = start && formatDateToLuxonLocale(toUniversalLuxonDate(start), languageRFC4646);
  const endDate = end ? formatDateToLuxonLocale(toUniversalLuxonDate(end), languageRFC4646) : t('batchPopup.today');

  const date = getRangeAsString(startDate, endDate);

  return (
    <div className={styles.popupHeader}>
      {hasError && (
        <UISnackBars>
          <UISnackBar type="alarm" icon="warning" text={t(ERROR_MESSAGE)} />
        </UISnackBars>
      )}

      <UITypography variant="caption" className={styles.subLabel}>
        {subLabel}
      </UITypography>
      <UITypography component="p" variant="body1">
        <UITypography variant="button" component="span">
          {`${name}`}&nbsp;
        </UITypography>
        <UITypography variant="label" component="span">
          {date}
        </UITypography>
      </UITypography>
    </div>
  );
});
