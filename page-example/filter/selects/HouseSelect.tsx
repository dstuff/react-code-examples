import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { useStores } from 'stores';
import { CustomMultipleSelect } from 'components';

export const HouseSelect = observer(
  (): JSX.Element => {
    const { t } = useTranslation();
    const { overviewFilterStore, locationsStore } = useStores();
    const { isLoadingLocations } = locationsStore;

    const { setHouseIds, housesForSelect, housesSearchText, setHousesSearchText } = overviewFilterStore;

    return (
      <CustomMultipleSelect
        name="houseSelect"
        defaultSelectText={t('Houses')}
        allSelectedText={t('Houses')}
        isLoading={isLoadingLocations}
        items={housesForSelect}
        selectValues={setHouseIds}
        searchText={housesSearchText}
        changeSearchText={setHousesSearchText}
        disabled={(!housesForSelect || housesForSelect.length === 0) && !housesSearchText.length}
      />
    );
  }
);
