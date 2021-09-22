import React, { useCallback } from 'react';
import { UIButton, UIGrid } from '@apollo/apollo-ui-reactjs';
import { useTranslation } from 'react-i18next';

import { BatchFieldNameEnum } from 'models';
import { Panel } from 'components';
import { ThinningToggleInput } from '../../batchFormInputs';
import { SlaughterDatesForm } from '../slaughterDatesForm';
import * as T from './types';

import styles from '../batchSettingsForm.module.scss';

const plannedSlaughterDatesFieldsLimit = 5;
const slaughterDatesFieldsLimit = plannedSlaughterDatesFieldsLimit * 2;

export const SlaughterSection = React.memo((props: T.IProps): JSX.Element | null => {
  const { t } = useTranslation();
  const {
    batchForm,
    isLoading,
    updateFormValue,
    slaughterFields,
    isHistoric,
    isThinning,
    updateFieldByName,
    addSlaughterData,
    removeSlaughterData
  } = props;

  const isAddSlaughterDisabled = useCallback(() => {
    return slaughterFields.length >= (isHistoric ? slaughterDatesFieldsLimit : plannedSlaughterDatesFieldsLimit);
  }, [slaughterFields.length, isHistoric]);

  if (!batchForm[BatchFieldNameEnum.WithThinning] || !slaughterFields.length) {
    return null;
  }

  return (
    <React.Fragment>
      <Panel title={t('batchRegistrationForm.Slaughter information')}>
        <div className={`${styles.formContainer__fieldWrapper} ${styles.formContainer__toggleWrapper}`}>
          <ThinningToggleInput
            value={batchForm[BatchFieldNameEnum.WithThinning].value}
            checked={batchForm[BatchFieldNameEnum.WithThinning].value}
            disabled={isLoading}
            onChange={() =>
              updateFormValue(BatchFieldNameEnum.WithThinning, !batchForm[BatchFieldNameEnum.WithThinning].value)
            }
          />
        </div>

        <SlaughterDatesForm
          slaughterFields={slaughterFields}
          isLoading={isLoading}
          isHistoric={isHistoric}
          isThinning={isThinning}
          updateValue={updateFieldByName}
          removeSlaughterData={removeSlaughterData}
        />
      </Panel>
      {isThinning && (
        <UIGrid className={styles.addSlaughterButton}>
          <UIButton
            disabled={isAddSlaughterDisabled()}
            data-test-id="add-slaughter-date"
            onClick={addSlaughterData}
            small={true}
            icon="plus"
            iconAlignment="left"
          >
            {t('batchRegistrationForm.Add slaughter')}
          </UIButton>
        </UIGrid>
      )}
    </React.Fragment>
  );
});
