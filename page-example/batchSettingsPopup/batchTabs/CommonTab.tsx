import React from 'react';

import { TabType } from 'models';
import { BatchRegistrationTab } from './BatchRegistrationTab';
import { DataValidationTab } from './DataValidationTab';
import * as T from './types';

export const CommonTab = React.memo((props: T.IProps): JSX.Element | null => {
  const { type } = props;

  switch (type) {
    case TabType.Registration: {
      return <BatchRegistrationTab />;
    }
    case TabType.Validation: {
      return <DataValidationTab />;
    }
    default: {
      return null;
    }
  }
});
