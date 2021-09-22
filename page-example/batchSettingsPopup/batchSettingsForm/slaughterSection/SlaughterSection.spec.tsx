import React from 'react';
import { mount } from 'enzyme';
import isNil from 'lodash-es/isNil';
import { UIButton } from '@apollo/apollo-ui-reactjs';
import { I18nextProvider } from 'react-i18next';

import { DmFormField, KeyBatchForm } from 'models';
import { Panel, Subheader } from 'components';
import { BatchSettingsMock } from 'tests/mocks';
import { MapBatchSettingsToForm } from 'services';
import { i18n } from 'services/Internationalization';
import ResizeObserver from 'tests/mocks/resizeObserver';
import { createStore, StoreProvider } from 'stores/store';
import { SlaughterSection } from './SlaughterSection';
import { SlaughterDatesForm } from '../slaughterDatesForm';
import * as T from './types';

(window as any).ResizeObserver = ResizeObserver;

const defaultProps = {
  batchForm: {},
  isLoading: false,
  updateFormValue: () => {},
  slaughterFields: [],
  isHistoric: false,
  isThinning: false,
  updateFieldByName: () => {},
  addSlaughterData: () => {},
  removeSlaughterData: () => {}
};

describe('SlaughterSection', () => {
  const getStore = () => createStore();

  const getWrapper = (data: Partial<T.IProps> = {}) => {
    const props = { ...defaultProps, ...data };

    return mount(
      <I18nextProvider i18n={i18n}>
        <StoreProvider store={getStore()}>
          <SlaughterSection {...props} />
        </StoreProvider>
      </I18nextProvider>
    );
  };

  const getBatchForm = async (id?: string) => new MapBatchSettingsToForm().map(await new BatchSettingsMock().getSettings(id ?? '1'));
  const getSlaughterFields = (form: KeyBatchForm) => Object.values(form).filter((field) => !isNil(field?.slaughterIndex));

  it('should load all components', async () => {
    const batchForm = await getBatchForm();
    const slaughterFields = getSlaughterFields(batchForm);

    const wrapper = getWrapper({ batchForm: batchForm, slaughterFields: slaughterFields });

    expect(wrapper.find(SlaughterSection)).toBeDefined();
    expect(wrapper.find(SlaughterSection)).toHaveLength(1);
    expect(wrapper.find(Panel)).toBeDefined();
    expect(wrapper.find(Panel)).toHaveLength(1);
    expect(wrapper.find(Subheader)).toBeDefined();
    expect(wrapper.find(Subheader)).toHaveLength(1);
    expect(wrapper.find(SlaughterDatesForm)).toBeDefined();
    expect(wrapper.find(SlaughterDatesForm)).toHaveLength(1);
  });

  it('should not render SlaughterSection', () => {
    const wrapper = getWrapper({
      batchForm:
        {
          placementDate: {} as DmFormField,
          breedType: {} as DmFormField
        } as KeyBatchForm
    });

    expect(wrapper.find(SlaughterSection)).toBeDefined();
    expect(wrapper.find(SlaughterSection)).toHaveLength(1);
    expect(wrapper.find(Panel)).toHaveLength(0);
  });

  it('should have Add slaughter button', async () => {
    const batchForm = await getBatchForm('2');
    const slaughterFields = getSlaughterFields(batchForm);

    const wrapper = getWrapper({ batchForm: batchForm, slaughterFields: slaughterFields, isThinning: true });

    expect(wrapper.find(UIButton)).toHaveLength(1);
    expect(wrapper.find(UIButton).text()).toBe('Add slaughter');
  });
});
