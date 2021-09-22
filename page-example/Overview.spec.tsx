import React from 'react';
import { mount } from 'enzyme';
import { configure } from 'mobx';
import { I18nextProvider } from 'react-i18next';

import { i18n } from 'services/Internationalization';
import { createStore, TStore } from 'stores/store';
import { StoreProviderMock } from 'tests/mocks';
import { Overview } from './Overview';
import ResizeObserver from '../../tests/mocks/resizeObserver';
import { BatchSettingsPopup } from './batchSettingsPopup';
import { Header } from './header';
import { OverviewPageBody } from './pageBody';

(window as any).ResizeObserver = ResizeObserver;
Element.prototype.scrollTo = () => {};

describe('Overview', () => {
  const getWrapper = (store: TStore) => {
    return mount(
      <I18nextProvider i18n={i18n}>
        <StoreProviderMock store={store}>
          <Overview />
        </StoreProviderMock>
      </I18nextProvider>
    );
  };

  const getStore = (): TStore => createStore();

  beforeEach(() => {
    configure({ enforceActions: 'never' });
  });

  it('should load all components', () => {
    expect(true).toBeTruthy();
    const store = getStore();
    const wrapper = getWrapper(store);

    expect(wrapper.find(Overview)).toBeDefined();
    expect(wrapper.find(Overview)).toHaveLength(1);
    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(OverviewPageBody)).toHaveLength(1);
    expect(wrapper.find(BatchSettingsPopup)).toHaveLength(1);
  });
});
