import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { useStores } from 'stores';
import { CustomMultipleSelect } from 'components';

export const RegionsSelect = observer(
  (): JSX.Element => {
    const { t } = useTranslation();
    const { overviewFilterStore, locationsStore } = useStores();
    const { isLoadingLocations } = locationsStore;

    const { setRegionsIds, regionsForSelect, regionsSearchText, setRegionsSearchText } = overviewFilterStore;

    return (
      <CustomMultipleSelect
        name="regionsForSelect"
        defaultSelectText={t('Regions')}
        allSelectedText={t('All regions')}
        isLoading={isLoadingLocations}
        items={regionsForSelect}
        selectValues={setRegionsIds}
        searchText={regionsSearchText}
        changeSearchText={setRegionsSearchText}
      />
    );
  }
);
