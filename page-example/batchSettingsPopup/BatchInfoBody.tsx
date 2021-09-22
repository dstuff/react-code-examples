import React from 'react';
import { UISidePanelScrollableContent } from '@apollo/apollo-ui-reactjs';

import { TabType } from 'models';
import { PopupTabPanel } from './PopupTabPanel';
import { CommonTab } from './batchTabs';
import * as T from './types';

export const BatchInfoBody = React.memo((props: T.IProps): JSX.Element | null => {
  return (
    <UISidePanelScrollableContent>
      <PopupTabPanel />
      <CommonTab type={props.tabType || TabType.Validation} />
    </UISidePanelScrollableContent>
  );
});
