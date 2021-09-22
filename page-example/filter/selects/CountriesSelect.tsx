import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { useStores } from 'stores';
import { CustomMultipleSelect } from 'components/selects';

export const CountriesSelect = observer(
  (): JSX.Element => {
    const { t } = useTranslation();
    const { overviewFilterStore, locationsStore } = useStores();
    const { isLoadingLocations } = locationsStore;

    const { setCountriesIds, countriesForSelect, countriesSearchText, setCountriesSearchText } = overviewFilterStore;

    return (
      <CustomMultipleSelect
        name="countriesForSelect"
        defaultSelectText={t('Countries')}
        allSelectedText={t('All countries')}
        isLoading={isLoadingLocations}
        items={countriesForSelect}
        selectValues={setCountriesIds}
        searchText={countriesSearchText}
        changeSearchText={setCountriesSearchText}
      />
    );
  }
);
