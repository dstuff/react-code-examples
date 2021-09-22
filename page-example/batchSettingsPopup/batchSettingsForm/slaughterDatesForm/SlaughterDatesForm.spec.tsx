import React from 'react';
import { mount } from 'enzyme';
import isNil from 'lodash-es/isNil';
import { UIButtonIcon, UIInput } from '@apollo/apollo-ui-reactjs';
import { I18nextProvider } from 'react-i18next';

import { MapBatchSettingsToForm } from 'services';
import { BatchSettingsMock } from 'tests/mocks';
import { KeyBatchForm } from 'models';
import { i18n } from 'services/Internationalization';
import { createStore, StoreProvider } from 'stores/store';
import { SlaughterDatesForm } from './SlaughterDatesForm';
import { DateTimePicker } from '../../batchFormInputs';
import * as T from './types';

const defaultProps = {
  isLoading: false,
  updateValue: () => {},
  slaughterFields: [],
  isHistoric: false,
  isThinning: true,
  removeSlaughterData: () => {}
};

describe('SlaughterDatesForm', () => {
  const getStore = () => createStore();

  const getWrapper = (data: Partial<T.IProps> = {}) => {
    const props = { ...defaultProps, ...data };

    return mount(
      <I18nextProvider i18n={i18n}>
        <StoreProvider store={getStore()}>
          <SlaughterDatesForm {...props} />
        </StoreProvider>
      </I18nextProvider>
    );
  };

  const getBatchForm = async (id?: string) => new MapBatchSettingsToForm()
    .map(await new BatchSettingsMock().getSettings(id ?? '1'));
  const getSlaughterFields = (form: KeyBatchForm) => Object.values(form)
    .filter((field) => !isNil(field?.slaughterIndex));

  it('should load all components', async () => {
    const batchForm = await getBatchForm('2');
    const slaughterFields = getSlaughterFields(batchForm);

    const wrapper = getWrapper({ slaughterFields: slaughterFields, isHistoric: true });

    expect(wrapper.find(SlaughterDatesForm)).toBeDefined();
    expect(wrapper.find(SlaughterDatesForm)).toHaveLength(1);
    expect(wrapper.find(DateTimePicker)).toHaveLength(1);
    expect(wrapper.find(UIInput).filterWhere((el) => el.prop('name') === 'weight-input'))
      .toHaveLength(1);
    expect(wrapper.findWhere((el) => el.prop('icon') === 'trash'))
      .toHaveLength(1);
  });

  it('should not render children components', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(SlaughterDatesForm).filter('.formContainer__combinedFields')).toHaveLength(0);
  });
});
