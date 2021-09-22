import React from 'react';
import { UIButton, UIButtonContainer, UISidePanelFooter } from '@apollo/apollo-ui-reactjs';
import { useTranslation } from 'react-i18next';

import * as T from './types';

export const BatchInfoFooter = React.memo(
  (props: T.IFooter): JSX.Element => {
    const { t } = useTranslation();

    return (
      <UISidePanelFooter>
        <UIButtonContainer align="right">
          <UIButton data-test-id="close-popup" onClick={props.onCancel}>
            {t('Close')}
          </UIButton>
          {props.saveText && (
            <UIButton data-test-id="save-data" theme="confirm" onClick={props.onSave} disabled={props.isDisabled}>
              {t(props.saveText)}
            </UIButton>
          )}
        </UIButtonContainer>
      </UISidePanelFooter>
    );
  }
);
