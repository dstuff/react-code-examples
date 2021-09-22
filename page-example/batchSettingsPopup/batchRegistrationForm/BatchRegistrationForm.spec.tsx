import React from 'react';
import { configure } from 'mobx';
import { mount } from 'enzyme';
import { UILoader } from '@apollo/apollo-ui-reactjs';
import { I18nextProvider } from 'react-i18next';

import { MapBatchSettingsToForm } from 'services';
import { NoDataAvailable } from 'components';
import { BatchSettingsMock } from 'tests/mocks';
import { createStore, TStore } from 'stores/store';
import { i18n } from 'services/Internationalization';
import { StoreProviderMock } from 'tests/mocks/storeProviderMock';
import ResizeObserver from 'tests/mocks/resizeObserver';
import { BatchRegistrationForm } from './BatchRegistrationForm';
import { BatchSettingsForm } from '../batchSettingsForm';

(window as any).ResizeObserver = ResizeObserver;

describe('BatchRegistrationForm', () => {
  const getWrapper = (store: TStore) => {
    return mount(
      <I18nextProvider i18n={i18n}>
        <StoreProviderMock store={store}>
          <BatchRegistrationForm />
        </StoreProviderMock>
      </I18nextProvider>
    );
  };

  const getStore = (): TStore => createStore();
  const getBatchForm = async (id?: string) => new MapBatchSettingsToForm().map(await new BatchSettingsMock().getSettings(id ?? '1'));

  beforeEach(() => {
    configure({ enforceActions: 'never', computedConfigurable: true });
  });

  it('should load all components', async () => {
    const store = getStore();
    store.overviewBatchSettingsFormStore.batchForm = await getBatchForm();
    store.overviewBatchSettingsFormStore.isFormLoading = false;

    const wrapper = getWrapper(store);

    expect(wrapper.find(BatchRegistrationForm)).toBeDefined();
    expect(wrapper.find(BatchRegistrationForm)).toHaveLength(1);
    expect(wrapper.find(BatchSettingsForm)).toHaveLength(1);
  });

  it('should render UILoader component', () => {
    const store = getStore();
    store.overviewBatchSettingsFormStore.isFormLoading = true;
    const wrapper = getWrapper(store);

    expect(wrapper.find(UILoader)).toBeDefined();
    expect(wrapper.find(UILoader)).toHaveLength(1);
  });

  it('should render NoDataAvailable component', async () => {
    const store = getStore();
    store.overviewBatchSettingsFormStore.batchForm = {};
    store.overviewBatchSettingsFormStore.isFormLoading = false;
    const wrapper = getWrapper(store);

    expect(wrapper.find(NoDataAvailable)).toBeDefined();
    expect(wrapper.find(NoDataAvailable)).toHaveLength(1);
  });
});
