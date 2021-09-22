import React from 'react';
import { useTranslation } from 'react-i18next';

import { CustomSelect } from 'components';
import * as T from './types';

export const BreedTypeInput = React.memo((props: T.IProps): JSX.Element | null => {
  const { t } = useTranslation();
  const { field, onChange, disabled, options } = props;

  if (!field) {
    return null;
  }

  return (
    <CustomSelect
      name={field.key}
      items={options}
      label={t('batchRegistrationForm.Breed')}
      hasError={field.hasError}
      helperText={field.helperText}
      defaultSelectText={t('batchRegistrationForm.Breed')}
      disabled={disabled}
      selectValue={onChange}
      isRequired={true}
    />
  );
});
