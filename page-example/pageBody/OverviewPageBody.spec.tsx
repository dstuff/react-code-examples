import React from 'react';
import { mount } from 'enzyme';
import { configure } from 'mobx';
import { ApolloComponentsProvider } from '@apollo/components';
import { I18nextProvider } from 'react-i18next';

import { ContentPanel, ExpansionPanel, SearchPanel } from 'components';
import { i18n } from 'services/Internationalization';
import { createStore, TStore } from 'stores/store';
import { StoreProviderMock } from 'tests/mocks';
import ResizeObserver from 'tests/mocks/resizeObserver';
import { OverviewPageBody } from './OverviewPageBody';

import { BatchesTable } from '../batchesTable';
import { OverviewFilter } from '../filter';

(window as any).ResizeObserver = ResizeObserver;
Element.prototype.scrollTo = () => {};

describe('OverviewPageBody', () => {
  const getWrapper = (store: TStore) => {
    return mount(
      <ApolloComponentsProvider accessToken={''} i18n={i18n} language={'en-US'}>
        <I18nextProvider i18n={i18n}>
          <StoreProviderMock store={store}>
            <OverviewPageBody />
          </StoreProviderMock>
        </I18nextProvider>
      </ApolloComponentsProvider>
    );
  };

  const getStore = (): TStore => createStore();

  beforeEach(() => {
    configure({ enforceActions: 'never', computedConfigurable: true });
  });

  it('should load all components', () => {
    const store = getStore();
    const wrapper = getWrapper(store);

    expect(wrapper.find(OverviewPageBody)).toBeDefined();
    expect(wrapper.find(OverviewPageBody)).toHaveLength(1);
    expect(wrapper.find(ExpansionPanel)).toHaveLength(1);
    expect(wrapper.find(ContentPanel)).toHaveLength(1);
    expect(wrapper.find(SearchPanel)).toHaveLength(1);
    expect(wrapper.find(BatchesTable)).toHaveLength(1);
    expect(wrapper.find(OverviewFilter)).toHaveLength(1);
  });
});
