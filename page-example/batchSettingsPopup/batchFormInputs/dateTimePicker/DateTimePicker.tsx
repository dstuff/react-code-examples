import React, { useCallback, useState } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { UIDateTimePicker } from '@apollo/apollo-ui-reactjs';

import { useStores } from 'stores';
import { formatDateTimeToLuxonLocale, fromNativeJsToIso } from 'utils';
import { TimeViewTypes } from 'models';
import * as T from './types';

const TIME_FORMAT: TimeViewTypes = ['hours', 'minutes'];

export const DateTimePicker = React.memo(
  (props: T.IProps): JSX.Element => {
    const { t } = useTranslation();
    const { field, disabled, onChange, labelText, placeholderText } = props;
    const { accountStore } = useStores();
    const { languageRFC4646 } = accountStore;
    const lang = i18n.language;

    const [open, setOpen] = useState<boolean>(false);

    const formatDisplayValue = useCallback(() => {
      return formatDateTimeToLuxonLocale(field.value, languageRFC4646);
    }, [field.value, languageRFC4646]);

    const closePicker = useCallback(() => {
      setOpen(false);
    }, []);

    const openPicker = useCallback(() => {
      setOpen(true);
    }, []);

    return (
      <UIDateTimePicker
        open={open}
        locale={lang}
        timeViews={TIME_FORMAT}
        date={true}
        label={labelText}
        required={field.required}
        error={field.hasError}
        helperText={field.helperText}
        placeholder={!field.value ? t(placeholderText) : undefined}
        disabled={disabled}
        value={field.value || new Date()}
        displayValue={formatDisplayValue()}
        onChange={(date: Date) => {
          onChange(fromNativeJsToIso(date));
          openPicker();
        }}
        onClickOutside={closePicker}
        onClose={closePicker}
        onOpen={openPicker}
      />
    );
  }
);
