import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { useStores } from 'stores';
import { BatchFieldNameEnum } from 'models';
import { BreedTypeInput, DateTimePicker } from '../batchFormInputs';
import { SlaughterSection } from './slaughterSection';
import * as T from './types';

import styles from './batchSettingsForm.module.scss';

export const BatchSettingsForm = observer((): JSX.Element | null => {
  const { t } = useTranslation();
  const { overviewBatchSettingsFormStore, overviewBatchPopupStore } = useStores();
  const {
    isFormLoading,
    batchForm,
    breedsForSelect,
    isThinning,
    addSlaughterData,
    updateFieldByName,
    removeSlaughterData,
    slaughterFields,
    hasSwSubscription
  } = overviewBatchSettingsFormStore;
  const { isHistoric, show } = overviewBatchPopupStore;

  const updateFormValue = useCallback((name: BatchFieldNameEnum, value: T.UpdateFormValue) => {
    updateFieldByName(name, value);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <React.Fragment>
      <div className={styles.formContainer__fieldWrapper}>
        <BreedTypeInput
          field={batchForm[BatchFieldNameEnum.BreedType]}
          disabled={isFormLoading}
          options={breedsForSelect}
          onChange={(data: string) => updateFormValue(BatchFieldNameEnum.BreedType, data)}
        />
      </div>

      <div className={styles.formContainer__fieldWrapper}>
        <DateTimePicker
          labelText={t('batchRegistrationForm.Placement date and time')}
          placeholderText={t('batchRegistrationForm.Date and time of placement birds')}
          field={batchForm[BatchFieldNameEnum.PlacementDateTime]}
          disabled={isFormLoading}
          onChange={(date) => updateFormValue(BatchFieldNameEnum.PlacementDateTime, date)}
        />
      </div>

      {hasSwSubscription && (
        <SlaughterSection
          batchForm={batchForm}
          isHistoric={isHistoric}
          isLoading={isFormLoading}
          isThinning={isThinning}
          updateFormValue={updateFormValue}
          updateFieldByName={updateFieldByName}
          addSlaughterData={addSlaughterData}
          removeSlaughterData={removeSlaughterData}
          slaughterFields={slaughterFields}
        />
      )}
    </React.Fragment>
  );
});
