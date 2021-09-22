import React from 'react';
import { useTranslation } from 'react-i18next';

import { Accordion } from 'components';
import { BatchStatusesCheckboxList } from './selects';

export const FilterBodyBatchDetailsPanel = () => {
  const { t } = useTranslation();

  return (
    <Accordion title={t('Batch details')} data-test-id="batch-details">
      <BatchStatusesCheckboxList />
    </Accordion>
  );
};
