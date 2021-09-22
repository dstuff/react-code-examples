import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { useStores } from 'stores';
import { Head } from 'components';
import { Header } from './header';
import { OverviewPageBody } from './pageBody';
import { BatchSettingsPopup } from './batchSettingsPopup';

export const Overview = observer(
  (): JSX.Element => {
    const { t } = useTranslation();
    const { overviewBatchesTableStore } = useStores();
    const { loadData, resetData } = overviewBatchesTableStore;

    useEffect(() => {
      void loadData();
      return () => resetData();
    });

    return (
      <React.Fragment>
        <Head title={t('Overview')} />
        <Header />

        <OverviewPageBody />

        <BatchSettingsPopup />
      </React.Fragment>
    );
  }
);
