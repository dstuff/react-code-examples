import React from 'react';
import { UIGrid, UITypography } from '@apollo/apollo-ui-reactjs';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { serviceNameMap } from 'models';
import { Accordion, PageLoader, Panel } from 'components';
import { useStores } from 'stores';
import { getTitle } from './getDataValidationTitle';

import styles from './dataValidation.module.scss';

export const DataValidation = observer((): JSX.Element | null => {
  const { t } = useTranslation();
  const { overviewValidationDataStore, accountStore } = useStores();

  const { isLoading, validationData, isValidationPending } = overviewValidationDataStore;
  const { languageRFC4646 } = accountStore;

  if (!validationData) {
    return null;
  }

  if (isLoading && !validationData.length) {
    return (
      <UIGrid className={styles.loaderWrapper}>
        <PageLoader show={isLoading} />
      </UIGrid>
    );
  }

  if (isValidationPending && !validationData?.length) {
    return (
      <UITypography className={styles.emptyData} variant="body1">
        {t('batchPopup.We did not validate your data yet')}
      </UITypography>
    );
  }

  if (!validationData?.length) {
    return (
      <UITypography className={styles.emptyData} variant="body1">
        {t('batchPopup.Data are valid')}
      </UITypography>
    );
  }

  return (
    <Panel title={t('batchPopup.Title')} className={styles.body}>
      {validationData.map((data, index: number) => {
        return (
          <Accordion
            key={`id-${data.module}-${data.errorTime}-${index}`}
            title={getTitle(data, languageRFC4646)}
            data-test-id={`${serviceNameMap[data.module]}`}
            type={'list-item'}
            toggled={true}
            isTransparent={true}
          >
            <UITypography variant="label">{t('batchPopup.Message')}</UITypography>
            <UITypography variant="body1">{data.message}</UITypography>
          </Accordion>
        );
      })}
    </Panel>
  );
});
