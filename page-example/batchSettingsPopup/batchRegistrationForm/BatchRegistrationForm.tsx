import React, { FormEvent, useCallback, useEffect } from 'react';
import { UIGrid } from '@apollo/apollo-ui-reactjs';
import { observer } from 'mobx-react-lite';
import { useStores } from 'stores';

import { BatchSettingsForm } from '../batchSettingsForm';
import { NoDataAvailable, PageLoader } from 'components';

import styles from './batchRegistrationForm.module.scss';

export const BatchRegistrationForm = observer(
  (): JSX.Element => {
    const { overviewBatchSettingsFormStore } = useStores();
    const { batchForm, hasData, isFormLoading, setLoading } = overviewBatchSettingsFormStore;

    useEffect(() => {
      if (hasData && isFormLoading) {
        setLoading(false);
      }
    }, [isFormLoading, hasData]);

    // Need this handler to prevent unpredictable page refresh on date time picker update
    // UI library issue
    const submitForm = useCallback(
      (e: FormEvent<HTMLFormElement>) => {
        e.stopPropagation();
        e.preventDefault();
      },
      [batchForm]
    );

    if (isFormLoading) {
      return (
        <UIGrid className={styles.loaderWrapper}>
          <PageLoader show={true} />
        </UIGrid>
      );
    }

    return (
      <UIGrid>
        {!isFormLoading && !hasData ? (
          <NoDataAvailable />
        ) : (
          <form
            data-cy="batch-registration-form"
            className={styles.formContainer}
            onSubmit={submitForm}
            noValidate={true}
          >
            {hasData && <BatchSettingsForm />}
          </form>
        )}
      </UIGrid>
    );
  }
);
