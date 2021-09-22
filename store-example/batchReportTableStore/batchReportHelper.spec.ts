import { OverviewBatchReportPdfWarningTypesRequest, TwParameter, TwType } from 'models';
import { getPdfRequestWarningTypes } from './batchReportHelper';

describe('overviewBatchReportHelper', () => {
  const warningsData = {
    [TwParameter.FeedConsumption]: [TwType.Stagnation, TwType.Reduction, TwType.Deviation],
    [TwParameter.WaterConsumption]: [TwType.Deviation, TwType.Drift]
  };

  it('#getPdfRequestWarningTypes should map correct data', () => {
    const expectedWarningsData: OverviewBatchReportPdfWarningTypesRequest[] = [
      {
        type: TwParameter.FeedConsumption,
        eventType: TwType.Stagnation
      },
      {
        type: TwParameter.FeedConsumption,
        eventType: TwType.Reduction
      },
      {
        type: TwParameter.FeedConsumption,
        eventType: TwType.Deviation
      },
      {
        type: TwParameter.WaterConsumption,
        eventType: TwType.Deviation
      },
      {
        type: TwParameter.WaterConsumption,
        eventType: TwType.Drift
      }
    ];

    const result = getPdfRequestWarningTypes(warningsData);
    expect(result).toStrictEqual(expectedWarningsData);
  });

  it('#getPdfRequestWarningTypes should correct map empty parameter', () => {
    const expectedWarningsData: OverviewBatchReportPdfWarningTypesRequest[] = [
      {
        type: TwParameter.FeedConsumption,
        eventType: TwType.Stagnation
      },
      {
        type: TwParameter.FeedConsumption,
        eventType: TwType.Reduction
      },
      {
        type: TwParameter.FeedConsumption,
        eventType: TwType.Deviation
      }
    ];
    const warnings = { ...warningsData, [TwParameter.WaterConsumption]: [] };
    const result = getPdfRequestWarningTypes(warnings);

    expect(result).toStrictEqual(expectedWarningsData);
  });
});
