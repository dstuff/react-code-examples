import { action, computed, observable, reaction, runInAction } from 'mobx';
import orderBy from 'lodash-es/orderBy';

import {
  BatchNumOrderEnum,
  BatchReportRawData,
  House,
  ITableHeader,
  OverviewBatchReport,
  TwParameter,
  TwTypesByParameter
} from 'models';
import { generatePdfFileName } from 'utils';
import {
  getBatchReportHeaders,
  IFileSaverService,
  ITwOverviewBatchReportService,
  TwOverviewBatchReportMapper,
  TwOverviewBatchReportResponseMapper
} from 'services';
import { OverviewFilterStore } from '../overviewFilterStore';
import { TStore } from '../../store';
import { getPdfRequestWarningTypes, mapReportDataToRows } from './batchReportHelper';

export class BatchReportTableStore {
  @observable isReportLoading?: boolean;
  @observable isExporting?: boolean;

  @observable reportData: BatchReportRawData[] = [];
  @observable filteredData: { [key: number]: OverviewBatchReport[] } = {};

  @observable showLimitedEvaluation = true;
  @observable selectedWarningTypes: TwTypesByParameter = [];

  @observable sortKey?: string = 'farmName';
  @observable sortDir?: 'asc' | 'desc' = 'asc';

  @computed get rows(): OverviewBatchReport[] {
    if (!this.selectedParameters?.length || !this.filteredData) {
      return [];
    }

    const rowData = mapReportDataToRows(this.filteredData);
    return this.sortRows(rowData);
  }

  @computed get selectedBatches(): BatchNumOrderEnum[] {
    return [this.selectedMainBatch, this.selectedSecondaryBatch].filter((b) => b !== undefined) as BatchNumOrderEnum[];
  }

  @computed
  get headers(): ITableHeader[][] {
    if (!Object.keys(this.filteredData).length) {
      return [[]];
    }

    return this.sortHeaders(
      getBatchReportHeaders(
        this.filteredData[this.firstBatchReportRowKey] ?? [],
        this.selectedParameters,
        this.selectedBatches
      ),
      this.sortKey,
      this.sortDir
    );
  }

  @computed get selectedFeedTypes() {
    return this.selectedFilterWarningTypes[TwParameter.FeedConsumption];
  }

  @computed get selectedWaterTypes() {
    return this.selectedFilterWarningTypes[TwParameter.WaterConsumption];
  }

  get selectedHouses(): House[] {
    return this.rootStore.locationsStore.housesFromAllFarms.filter((h) =>
      this.overviewFilterStore.selectedBatchReportHousesIds.includes(h.id)
    );
  }

  constructor(
    private readonly rootStore: TStore,
    private readonly batchReportService: ITwOverviewBatchReportService,
    private readonly fileSaverService: IFileSaverService
  ) {
    reaction(
      () => this.overviewFilterStore.selectedBatchReportHousesIds,
      (houses) => {
        if (this.isBatchReport && houses?.length) {
          void this.loadData();
        }
      }
    );

    reaction(
      () => this.selectedBatches,
      (batches) => {
        if (this.isBatchReport && batches?.length) {
          void this.loadData();
        }
      }
    );

    reaction(
      () => Object.values(this.overviewFilterStore.selectedWarningTypes),
      () => {
        this.filterReportData();
      }
    );

    reaction(
      () => this.selectedParameters,
      () => {
        this.filterReportData();
      }
    );

    reaction(
      () => this.overviewFilterStore.showLimitedEvaluations,
      () => this.filterReportData()
    );
  }

  @action
  setSort = (sortKey: string, sortDir?: 'asc' | 'desc') => {
    this.sortKey = sortKey;
    this.sortDir = sortDir;
  };

  @action
  filterReportData = () => {
    this.filteredData = new TwOverviewBatchReportMapper(
      this.selectedParameters,
      this.selectedFilterWarningTypes,
      this.showLimitedEvaluation
    ).map(this.reportData);
  };

  @action exportData = async () => {
    try {
      this.isExporting = true;

      const filter = {
        houseIds: this.overviewFilterStore.selectedBatchReportHousesIds,
        withLimitedEvaluations: this.showLimitedEvaluation,
        warningEventTypes: getPdfRequestWarningTypes(this.selectedFilterWarningTypes),
        warningTypes: this.selectedParameters,
        batchNumber: this.overviewFilterStore.selectedMainBatch,
        batchNumberToCompare: this.overviewFilterStore.selectedSecondaryBatch
      };

      const blob = await this.batchReportService.getReportPdf(filter);

      if (blob) {
        const fileName = generatePdfFileName('batch-report');

        // save PDF
        this.fileSaverService.save(blob, fileName);
      }

      runInAction(() => {
        this.isExporting = false;
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      runInAction(() => {
        this.isExporting = false;
      });
    }
  };

  @action
  setLimitedEvaluation = (state: boolean) => {
    this.showLimitedEvaluation = state;
  };

  @action
  loadData = async () => {
    await this.fetchData();
  };

  private sortHeaders(
    headers: ITableHeader[][] | null,
    sortKey?: string | number,
    sortDirection?: 'asc' | 'desc'
  ): ITableHeader[][] {
    return headers
      ? headers.map((hh: ITableHeader[]) =>
          hh.map((header: ITableHeader) => {
            if (sortKey === header.key) {
              header.sortDirection = sortDirection;
            } else {
              header.sortDirection = undefined;
            }
            return header;
          })
        )
      : [];
  }

  private async fetchData() {
    this.isReportLoading = true;
    const housesIds = this.overviewFilterStore.selectedBatchReportHousesIds;
    try {
      const response = await this.batchReportService.getBatchReportData(
        housesIds,
        this.selectedMainBatch ?? 0,
        this.selectedSecondaryBatch
      );

      const responseData = new TwOverviewBatchReportResponseMapper(this.selectedHouses).map(response);
      const mappedData = new TwOverviewBatchReportMapper(
        this.selectedParameters,
        this.selectedFilterWarningTypes,
        this.showLimitedEvaluation
      ).map(responseData);

      runInAction(() => {
        this.isReportLoading = false;
        this.reportData = responseData;
        this.filteredData = mappedData;
      });

      this.setSort('birdAge', 'asc');
    } catch (e) {
      runInAction(() => {
        this.isReportLoading = false;
        this.reportData = [];
      });
    }
  }

  private sortRows(rows: any[]): any[] {
    return orderBy(rows, [this.sortKey], [this.sortDir || 'asc']);
  }

  private get selectedParameters(): TwParameter[] {
    return this.overviewFilterStore.parameterTypes;
  }

  private get selectedMainBatch(): BatchNumOrderEnum | undefined {
    return this.overviewFilterStore.selectedMainBatch;
  }

  private get selectedSecondaryBatch(): BatchNumOrderEnum | undefined {
    return this.overviewFilterStore.selectedSecondaryBatch;
  }

  private get selectedFilterWarningTypes(): TwTypesByParameter {
    return this.overviewFilterStore.selectedWarningTypes;
  }

  private get overviewFilterStore(): OverviewFilterStore {
    return this.rootStore.overviewFilterStore;
  }

  private get firstBatchReportRowKey(): number {
    return Number(Object.keys(this.filteredData)[0]) ?? 0;
  }

  private get isBatchReport(): boolean {
    return this.rootStore.overviewStore.isBatchReportTab;
  }
}
