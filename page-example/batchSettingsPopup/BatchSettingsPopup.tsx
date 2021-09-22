import React, { useCallback } from 'react';
import { UIAnimation, UISidePanel } from '@apollo/apollo-ui-reactjs';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import { useStores } from 'stores';
import { BatchInfoHeader } from './BatchInfoHeader';
import { BatchInfoFooter } from './BatchInfoFooter';
import { BatchInfoBody } from './BatchInfoBody';

export const BatchSettingsPopup = observer((): JSX.Element | null => {
  const { t } = useTranslation();
  const { overviewBatchPopupStore, overviewBatchSettingsFormStore, overviewNotificationStore } = useStores();

  const { show, hidePopup, batchInfo, activeTab } = overviewBatchPopupStore;
  const { saveFormData, isFormValid, isFormLoading } = overviewBatchSettingsFormStore;
  const { hasError } = overviewNotificationStore;

  const hidePanel = useCallback(() => {
    hidePopup();
  }, []);

  return (
    <UIAnimation animation="slide-in-right" show={show || false}>
      {show && (
        <UISidePanel data-test-id="batch-popup" show={show} onHide={hidePanel} title={t('batchPopup.Batch info')}>
          <BatchInfoHeader
            house={batchInfo?.houseName}
            farm={batchInfo?.farmName}
            name={batchInfo?.name}
            start={batchInfo?.start}
            end={batchInfo?.end}
            hasError={hasError}
          />
          <BatchInfoBody tabType={activeTab} />

          <BatchInfoFooter
            onCancel={hidePanel}
            onSave={saveFormData}
            saveText="Save"
            isDisabled={isFormLoading || !isFormValid}
          />
        </UISidePanel>
      )}
    </UIAnimation>
  );
});
