import { mount } from 'enzyme';
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';

import { FilterBody, FilterHeader } from 'components';
import { StoreProviderMock } from 'tests/mocks/storeProviderMock';
import { createStore, TStore } from 'stores/store';
import { i18n } from 'services/Internationalization';
import ResizeObserver from 'tests/mocks/resizeObserver';
import { OverviewFilter } from './OverviewFilter';

(window as any).ResizeObserver = ResizeObserver;

Element.prototype.scrollTo = jest.fn();

describe('OverviewFilter', () => {
  const getWrapper = (store: TStore) =>
    mount(
      <I18nextProvider i18n={i18n}>
        <StoreProviderMock store={store}>
          <OverviewFilter />
        </StoreProviderMock>
      </I18nextProvider>
    );

  const getStore = (): TStore => createStore();

  it('should load all components', () => {
    expect(true).toBeTruthy();
    const store = getStore();

    const wrapper = getWrapper(store);

    expect(wrapper.find(FilterHeader)).toHaveLength(1);
    expect(wrapper.find(FilterBody)).toHaveLength(1);
  });
});
