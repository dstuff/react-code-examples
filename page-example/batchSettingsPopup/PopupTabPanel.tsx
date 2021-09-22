import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { UITab, UITabs } from '@apollo/apollo-ui-reactjs';
import { useTranslation } from 'react-i18next';

import { useStores } from 'stores';
import { TabType } from 'models';

export const PopupTabPanel = observer((): JSX.Element | null => {
  const { t } = useTranslation();
  const { overviewBatchPopupStore } = useStores();
  const { tabs, setTab } = overviewBatchPopupStore;

  const onTabClick = useCallback((type: TabType) => {
    setTab(type);
  }, []);

  return (
    <UITabs data-test-id="popup-tabs">
      {tabs &&
        tabs.map((tab, index) => {
          return (
            <UITab
              id={tab.type.toString()}
              key={`id-${index}`}
              onClick={() => onTabClick(tab.type)}
              active={tab.active}
              label={t(`batchSettingsPopupTabs.${tab.label}`)}
            />
          );
        })}
    </UITabs>
  );
});
