import React from 'react';
import { useTranslation } from 'react-i18next';
import { UIDivider } from '@apollo/apollo-ui-reactjs';

import { Accordion } from 'components';
import { FarmSelect, HouseSelect, CountriesSelect, RegionsSelect } from './selects';

export const FilterBodyLocationsPanel = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Accordion title={t('Locations')} toggled={true} data-test-id="locations">
      <CountriesSelect />
      <UIDivider size="small" />
      <RegionsSelect />
      <UIDivider size="small" />
      <FarmSelect />
      <UIDivider size="small" />
      <HouseSelect />
    </Accordion>
  );
};
