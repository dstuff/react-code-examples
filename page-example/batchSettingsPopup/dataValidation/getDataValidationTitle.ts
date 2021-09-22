import { ILanguage } from '@apollo/components';

import { serviceNameMap, ValidationData } from 'models';
import { formatDateTimeToLuxonLocale } from 'utils';
import { i18n } from 'services/Internationalization';

export const getTitle = (data: ValidationData, language: ILanguage): string => {
  const time = formatDateTimeToLuxonLocale(data.errorTime, language);
  const moduleText = serviceNameMap[data.module];

  return `${time} – ${i18n.t(moduleText)}`;
};
