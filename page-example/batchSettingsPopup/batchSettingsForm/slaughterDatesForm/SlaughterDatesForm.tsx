import React, { useCallback, useEffect, useState } from 'react';
import { UIButtonIcon, UIDivider, UIInput } from '@apollo/apollo-ui-reactjs';
import { useTranslation } from 'react-i18next';
import groupBy from 'lodash-es/groupBy';

import { DmFormField } from 'models';
import { getOrdinalNumber } from 'utils';
import { DateTimePicker } from '../../batchFormInputs';
import * as T from './types';

import styles from './slaughterDatesForm.module.scss';

const ONLY_NUMBERS_REGEX = new RegExp('^[0-9.,]+$');

export const SlaughterDatesForm = React.memo((props: T.IProps): JSX.Element | null => {
  const { t } = useTranslation();
  const { slaughterFields, isLoading, isHistoric, isThinning, updateValue, removeSlaughterData } = props;

  const [fields, setFields] = useState<{ [key: string]: DmFormField[] }>({});

  useEffect(() => {
    setFields(groupBy(slaughterFields, 'slaughterIndex'));
  }, [slaughterFields]);

  const getLabel = useCallback(
    (fieldIndex: number, isThinning: boolean) => {
      if (!isThinning) {
        return t('batchRegistrationForm.Slaughter');
      }

      const prefix = getOrdinalNumber(++fieldIndex, isThinning);
      return `${prefix} ${t('batchRegistrationForm.Slaughter').toLowerCase()}`;
    },
    [slaughterFields.length]
  );

  const onWeightUpdate = useCallback((key: string, targetValue: string) => {
    if (ONLY_NUMBERS_REGEX.test(targetValue) || targetValue === '') {
      updateValue(key, targetValue);
    }
  }, []);

  if (!slaughterFields.length) {
    return null;
  }

  return (
    <React.Fragment>
      {Object.keys(fields).map((fieldIndex, index) => {
        const slaughterDate = fields[fieldIndex][0];
        const slaughterWeight = fields[fieldIndex][1];

        return (
          <React.Fragment key={`row-id-${fieldIndex}`}>
            <div data-test-id="slaughter-row" className={styles.formContainer__combinedFields}>
              <div className={styles.formContainer__combinedField}>
                <DateTimePicker
                  labelText={getLabel(index, !!isThinning)}
                  placeholderText={
                    isHistoric
                      ? t('batchRegistrationForm.Date and time')
                      : t('batchRegistrationForm.Planned date and time')
                  }
                  field={slaughterDate}
                  disabled={!!isLoading}
                  onChange={(date) => updateValue(slaughterDate.key, date)}
                />
              </div>

              {isHistoric && (
                <div className={styles.formContainer__combinedField}>
                  {/* Hack for placing live weight onto correct position */}
                  <div
                    className={`${styles.labelImitationContainer} ${
                      slaughterDate.hasError ? 'labelImitationContainer--dateError' : ''
                    }`}
                  />
                  {slaughterWeight && (
                    <UIInput
                      name="weight-input"
                      label=""
                      value={slaughterWeight.value}
                      placeholder={t('batchRegistrationForm.Live weight')}
                      required={slaughterWeight.required}
                      loading={isLoading}
                      disabled={isLoading}
                      error={slaughterWeight.hasError}
                      helperText={slaughterWeight.helperText}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        onWeightUpdate(slaughterWeight.key, event.currentTarget.value);
                      }}
                      staticPlaceholder={{
                        position: 'right',
                        text: slaughterWeight.unit || ''
                      }}
                    />
                  )}
                </div>
              )}

              {isThinning && (
                <div
                  className={`${styles.formContainer__trashButton} ${
                    slaughterDate.hasError ? 'formContainer__trashButton--dateError' : ''
                  }`}
                >
                  <UIButtonIcon
                    icon="trash"
                    id="trash-icon-button"
                    disabled={Object.keys(fields).length < 2}
                    onClick={() => removeSlaughterData(Number(fieldIndex))}
                  />
                </div>
              )}
            </div>

            {isThinning && (
              <div className={styles.dividerContainer}>
                <UIDivider border={true} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
});
