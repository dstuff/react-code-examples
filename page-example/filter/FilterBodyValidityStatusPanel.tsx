import React from 'react';
import { useTranslation } from 'react-i18next';

import { Accordion } from 'components';
import { BatchValidityCheckboxList } from './selects';

export const FilterBodyValidityStatusPanel = () => {
  const { t } = useTranslation();

  return (
    <Accordion title={t('Data status')} data-test-id="data-status">
      <BatchValidityCheckboxList />
    </Accordion>
  );
};
