import React from 'react';
import { UIToggle } from '@apollo/apollo-ui-reactjs';
import { useTranslation } from 'react-i18next';

import * as T from './types';

export const ThinningToggleInput = React.memo(
  (props: T.IProps): JSX.Element => {
    const { t } = useTranslation();
    const { checked, value, onChange, disabled } = props;

    return (
      <UIToggle
        id="with-thinning-toggle"
        value={value.toString()}
        label={t('batchRegistrationForm.With thinning')}
        checked={!!checked}
        onChange={onChange}
        disabled={disabled}
      />
    );
  }
);
