import flattenDeep from 'lodash-es/flattenDeep';

import { Mapper } from './mapper';
import {
  BatchReportDetailsDataResponse,
  BatchReportRawData,
  BatchReportResponse,
  House,
  mapServiceToSubscription,
  Parameter
} from 'models';

export class OverviewBatchReportResponseMapper implements Mapper<BatchReportResponse[] | null, BatchReportRawData[]> {
  constructor(private readonly houses: House[]) {}

  map(data: BatchReportResponse[] | null): BatchReportRawData[] {
    if (!data) {
      return [];
    }

    return flattenDeep(
      data.map((br: BatchReportResponse, index: number) => {
        // handle missing prior batches
        br.batchesData.forEach((brd: BatchReportDetailsDataResponse, brdIndex: number) => {
          if (!brd.batchId && !brd.batchName) {
            br.batchesData[brdIndex] = OverviewBatchReportResponseMapper.getDefaultBatchesData(index, brd);
          }
        });

        return br.batchesData.map((bd) => {
          return bd.parametersData.map((pd) => ({
            houseId: br.houseId,
            houseName: br.houseName,
            batchId: bd.batchId,
            batchName: bd.batchName,
            batchNumber: bd.batchNumber,
            endAge: bd.batchEndAge,
            parameter: pd?.parameter,
            data: pd?.daysData ?? [],
            hasData: Boolean(pd?.daysData),
            hasSubscription:
              this.houses
                .find((h) => h.id === br.houseId)
                ?.subscriptionTypes?.includes(mapServiceToSubscription[pd?.parameter]) ?? false
          }));
        });
      })
    );
  }

  private static getDefaultBatchesData(
    index: number,
    batchData: BatchReportDetailsDataResponse
  ): BatchReportDetailsDataResponse {
    return {
      batchId: `batchId-${index}`,
      batchName: 'No batch',
      batchNumber: batchData.batchNumber,
      batchEndAge: batchData.batchEndAge,
      parametersData: [
        {
          parameter: Parameter.FeedConsumption,
          daysData: null
        },
        {
          parameter: Parameter.WaterConsumption,
          daysData: null
        }
      ]
    };
  }
}
