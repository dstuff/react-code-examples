import * as React from 'react';
import { configure } from 'mobx';
import { mount } from 'enzyme';
import { I18nextProvider } from 'react-i18next';

import { ValidationData } from 'models';
import { MapValidationData } from 'services';
import { Accordion } from 'components';
import { createStore, TStore } from 'stores/store';
import { i18n } from 'services/Internationalization';
import { DataValidation } from './DataValidation';
import { StoreProviderMock, ValidationDataServiceMock } from 'tests/mocks';

describe('DataValidation', () => {
  const mockedDataValidationService = new ValidationDataServiceMock();
  const getWrapper = (
    store: TStore,
    storeData?: {
      validationData?: ValidationData[];
      isLoading?: boolean;
    }
  ) => {
    store.overviewValidationDataStore.isLoading = storeData?.isLoading || false;
    store.overviewValidationDataStore.validationData = storeData?.validationData || [];

    return mount(
      <I18nextProvider i18n={i18n}>
        <StoreProviderMock store={store}>
          <DataValidation />
        </StoreProviderMock>
      </I18nextProvider>
    );
  };

  const getStore = (): TStore => createStore();

  beforeEach(() => {
    configure({ enforceActions: 'never' });
  });

  it('should load all components', async () => {
    const data = new MapValidationData().map(await mockedDataValidationService.getValidationByBatchId('111'));
    const store = getStore();
    const wrapper = getWrapper(store, { validationData: data });

    expect(wrapper.find(Accordion)).toHaveLength(3);
  });
});
