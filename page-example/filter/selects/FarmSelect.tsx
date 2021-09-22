import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { useStores } from 'stores';
import { CustomMultipleSelect } from 'components';

export const FarmSelect = observer(
  (): JSX.Element => {
    const { t } = useTranslation();
    const { overviewFilterStore, locationsStore } = useStores();

    const { isLoadingLocations } = locationsStore;

    const { setFarmIds, farmsForSelect, farmsSearchText, setFarmsSearchText } = overviewFilterStore;

    return (
      <CustomMultipleSelect
        name="farmSelect"
        defaultSelectText={t('Farms')}
        allSelectedText={t('All farms')}
        isLoading={isLoadingLocations}
        items={farmsForSelect}
        selectValues={setFarmIds}
        searchText={farmsSearchText}
        changeSearchText={setFarmsSearchText}
      />
    );
  }
);
