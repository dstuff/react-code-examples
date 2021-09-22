import { mount } from 'enzyme';
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { configure } from 'mobx';

import { StoreProviderMock } from 'tests/mocks';
import { LoadingDataTable, NoDataAvailableTable, PaginationDataTable } from 'components';
import { BatchStatus, BatchValidity, TableData } from 'models';
import { TABLE_HEADERS } from '@constants';
import { i18n } from 'services/Internationalization';
import ResizeObserver from 'tests/mocks/resizeObserver';
import { createStore, TStore } from 'stores/store';
import { BatchesTable } from './BatchesTable';
import { TableRow } from './tableRow';

(window as any).ResizeObserver = ResizeObserver;

describe('BatchesTables', () => {
  const data = {
    rows: [
      {
        id: '1',
        name: 'batch 0000',
        day: 15,
        start: '2020-15-09',
        end: null,
        validity: BatchValidity.Valid,
        status: BatchStatus.Current,
        farmName: 'sky',
        houseName: 'house 1',
        locationId: 'gggg.f1.h2',
        availableModules: [11, 12, 2]
      },
      {
        id: '2',
        name: 'batch 0001',
        day: 15,
        start: '2020-15-07',
        end: '2020-22-08',
        validity: BatchValidity.Valid,
        status: BatchStatus.Historic,
        farmName: 'sky',
        houseName: 'house 1',
        locationId: 'gggg.f1.h2',
        availableModules: [11, 12, 2]
      }
    ],
    headers: TABLE_HEADERS
  };
  const batchesCount = 2;
  const setSortHeader = jest.fn();
  const isLoading = false;


  const getWrapper = (
    store: TStore,
    storeData?: {
      data: TableData,
      batchesCount: number,
      isLoading: boolean,
      setSortHeader: () => void
    }
  ) => {

    store.overviewBatchesTableStore.isLoading =  storeData?.isLoading || false;
    store.overviewBatchesTableStore.batchesCount = storeData?.batchesCount || batchesCount;
    store.overviewBatchesTableStore.batchList = storeData?.data.rows || [];
    store.overviewBatchesTableStore.filterByStatus = storeData?.data.rows.map(d=> {return d.status}) || [];
    store.overviewBatchesTableStore.filterByValidity = [BatchValidity.Valid, BatchValidity.ValidationFailed, BatchValidity.MissingRegistration];
    store.overviewBatchesTableStore.selectedHouses = storeData?.data.rows.map(d=> {return d.locationId}) || [];

    return mount(
      <I18nextProvider i18n={i18n}>
        <StoreProviderMock store={store}>
          <BatchesTable />
        </StoreProviderMock>
      </I18nextProvider>
    );
  };

  const getStore = (): TStore => createStore();

  beforeEach(() => {
    configure({ enforceActions: 'never' });
  });

  it('should load all components', () => {
    const storeData = {
      setSortHeader,
      data,
      isLoading,
      batchesCount
    };
    const store = getStore();
    const wrapper = getWrapper(store, storeData);

    expect(wrapper.find(TableRow)).toHaveLength(1);
    expect(wrapper.find(PaginationDataTable)).toHaveLength(1);
  });

  it('should load NoDataAvailableTable component', () => {
    const storeData = {
      setSortHeader,
      data: {
        rows: [],
        headers: []
      },
      isLoading: false,
      batchesCount: 0
    };
    const store = getStore();
    const wrapper = getWrapper(store, storeData);

    expect(wrapper.find(NoDataAvailableTable)).toHaveLength(1);
  });

  it('should load LoadingDataTable component', () => {
    const storeData = {
      setSortHeader,
      data: {
        rows: [],
        headers: []
      },
      isLoading: true,
      batchesCount: 0
    };
    const store = getStore();
    const wrapper = getWrapper(store, storeData);

    expect(wrapper.find(LoadingDataTable)).toHaveLength(1);
  });
});
