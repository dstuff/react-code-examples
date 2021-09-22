import { configure } from 'mobx';
import { OverviewTabType } from 'models';
import {
  FileSaverService,
  IBatchService,
  IFileSaverService,
  ITwOverviewBatchReportService,
  ITwOverviewService,
  TwOverviewBatchReportService
} from 'services';
import { BatchServiceMock, TwOverviewServiceMock } from 'tests';
import { TStore } from '../../store';
import { AccountStore } from '../../accountStore';
import { OverviewFilterStore } from '../overviewFilterStore';
import { BatchReportTableStore } from './batchReportTableStore';
import { OverviewStore } from '../overviewStore';

describe('overviewBatchReportStore', () => {
  const getRootStore = (): jest.Mocked<TStore> => {
    const rootStore = {
      overviewFilterStore: {
        setFilter: jest.fn(),
        setHousesIds: jest.fn()
      } as Partial<OverviewFilterStore>,
      overviewStore: {
        currentTabType: OverviewTabType.OverviewTab
      } as Partial<OverviewStore>,
      accountStore: {
        language: 'en'
      } as Partial<AccountStore>
    } as TStore;

    rootStore.overviewFilterStore = new OverviewFilterStore(rootStore, mockedBatchService);
    rootStore.overviewStore = new OverviewStore(rootStore, mockedOverviewService);
    return rootStore;
  };

  let mockedBatchService: IBatchService;
  let mockedBatchReportService: ITwOverviewBatchReportService;
  let mockedFileSaverService: IFileSaverService;
  let mockedOverviewService: ITwOverviewService;

  beforeEach(() => {
    configure({ enforceActions: 'never' });
    mockedBatchService = new BatchServiceMock();
    mockedBatchReportService = new TwOverviewBatchReportService();
    mockedFileSaverService = new FileSaverService();
    mockedOverviewService = new TwOverviewServiceMock();
  });

  const getStore = (rootStore: any): BatchReportTableStore => {
    return new BatchReportTableStore(rootStore, mockedBatchReportService, mockedFileSaverService);
  };

  it('should set default values', () => {
    const store = getStore(getRootStore());

    expect(store.isReportLoading).toBeFalsy();
    expect(store.isExporting).toBeFalsy();

    expect(store.reportData).toHaveLength(0);
    expect(store.filteredData).toBeDefined();
    expect(Object.keys(store.filteredData)).toHaveLength(0);
    expect(store.showLimitedEvaluation).toBeTruthy();
    expect(store.selectedWarningTypes).toHaveLength(0);
    expect(store.sortKey).toBe('farmName');
    expect(store.sortDir).toBe('asc');
  });

  it('#setSort should change sort direction', () => {
    const store = getStore(getRootStore());

    expect(store.sortDir).toBe('asc');

    store.setSort('farmName', 'desc');
    expect(store.sortDir).toBe('desc');
  });

  it('#setLimitedEvaluation should set Limited evaluation to true', () => {
    const store = getStore(getRootStore());

    store.setLimitedEvaluation(true);
    expect(store.showLimitedEvaluation).toBeTruthy();
  });

  it('#setLimitedEvaluation should set Limited evaluation to false', () => {
    const store = getStore(getRootStore());

    store.setLimitedEvaluation(false);
    expect(store.showLimitedEvaluation).toBeFalsy();
  });
});
