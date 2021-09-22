import React from 'react';
import { mount } from 'enzyme';
import { configure } from 'mobx';
import { I18nextProvider } from 'react-i18next';

import { i18n } from 'services/Internationalization';
import { createStore, TStore } from 'stores/store';
import { StoreProviderMock } from 'tests/mocks';
import ResizeObserver from 'tests/mocks/resizeObserver';
import { BatchSettingsForm } from './BatchSettingsForm';
import { BreedTypeInput } from '../batchFormInputs';

(window as any).ResizeObserver = ResizeObserver;

describe('BatchSettingsForm', () => {
  const getWrapper = (store: TStore) => {
    return mount(
      <I18nextProvider i18n={i18n}>
        <StoreProviderMock store={store}>
          <BatchSettingsForm />
        </StoreProviderMock>
      </I18nextProvider>
    );
  };

  const getStore = (): TStore => createStore();

  beforeEach(() => {
    configure({ enforceActions: 'never', computedConfigurable: true });
  });

  it('should load form', () => {
    const store = getStore();
    const wrapper = getWrapper(store);

    expect(wrapper.find(BatchSettingsForm)).toBeDefined();
    expect(wrapper.find(BatchSettingsForm)).toHaveLength(1);
  });

  it('should show empty form', () => {
    const store = getStore();
    store.overviewBatchPopupStore.show = false;
    const wrapper = getWrapper(store);

    expect(wrapper.find(BreedTypeInput)).toHaveLength(0);
  });
});
